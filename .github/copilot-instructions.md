# SaaS Boilerplate - AI Coding Agent Instructions

## Project Overview

This is a production-ready Next.js 14 SaaS boilerplate using App Router, TypeScript, Tailwind CSS, and Shadcn UI. It's designed for multi-tenant SaaS applications with authentication, billing, and internationalization built-in.

**Stack**: Next.js 14 (App Router) • TypeScript • Drizzle ORM • Clerk Auth • Stripe • next-intl • Shadcn UI • Vitest • Playwright

## Architecture

### Route Organization (`src/app/[locale]/`)

- `(auth)/` - Protected routes requiring authentication (includes ClerkProvider)
  - `(center)/` - Centered layout for auth flows (sign-in/sign-up)
  - `dashboard/` - Main authenticated area
  - `onboarding/` - New user/org setup
- `(unauth)/` - Public landing pages
- Each route group has its own `layout.tsx` defining layout boundaries

**Critical**: All page components must call `unstable_setRequestLocale(props.params.locale)` at the top for next-intl static generation.

### Feature-Based Organization

Components live in three layers:
- `src/components/` - Reusable UI components (ActiveLink, LocaleSwitcher) and Shadcn UI primitives (`ui/`)
- `src/features/` - Feature-specific components grouped by domain (auth, billing, dashboard, landing, sponsors)
- `src/templates/` - Page-level composition components (Hero, Navbar, Footer, Pricing)

### Database & ORM

**Dual-mode database setup** in `src/libs/DB.ts`:
- **Development/build**: Uses PGlite (embedded PostgreSQL) for local development without external dependencies
- **Production**: Connects to PostgreSQL via `DATABASE_URL` environment variable

Schema defined in `src/models/Schema.ts` using Drizzle ORM. To modify:
1. Update schema file
2. Run `npm run db:generate` to create migration
3. Migrations auto-apply on next interaction (no manual run needed unless using Edge runtime)

Explore database: `npm run db:studio` opens Drizzle Studio at https://local.drizzle.studio

## Authentication & Multi-Tenancy

**Clerk** handles auth with organization (team) support. Key integration points:

- `src/middleware.ts` - Protects `/dashboard` and `/onboarding` routes, redirects to org selection if no org is set
- `src/app/[locale]/(auth)/layout.tsx` - `ClerkProvider` with locale-aware URLs
- Environment variables: `CLERK_SECRET_KEY`, `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`

**Organization setup**: Enable in Clerk Dashboard → Organization management → Settings → "Enable organization"

## Internationalization (i18n)

Uses `next-intl` with Crowdin for automated translations:

- **Developer focus**: Only maintain English (or default locale) in `src/locales/en.json`
- **Automated sync**: Crowdin syncs translations via GitHub Actions on push to main
- Configure locales in `src/utils/AppConfig.ts` (`AppConfig.locales`)
- All routes nested under `[locale]` dynamic segment
- Server components: `getTranslations()` • Client components: `useTranslations()`

## Styling & UI

**Shadcn UI** components in `src/components/ui/`:
- Use `class-variance-authority` for variant patterns (see `buttonVariants.ts`)
- Tailwind config extends HSL-based CSS variables for theming (`tailwind.config.ts`)
- Global styles in `src/styles/global.css`
- **Client directive**: Most Shadcn components need `'use client'` due to interactivity

## Environment Variables

Type-safe validation via `@t3-oss/env-nextjs` in `src/libs/Env.ts`:
- **Server-only**: `CLERK_SECRET_KEY`, `DATABASE_URL`, `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`
- **Client**: `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- Create `.env.local` for secrets (gitignored)

**FIXME markers**: Search `FIXME:` project-wide for required customizations (Stripe price IDs, Sentry config, etc.)

## Development Workflow

### Running the App
```bash
npm run dev          # Starts Next.js (port 3000) + Spotlight (Sentry dev mode)
npm run dev:next     # Next.js only (used by Playwright)
```

### Testing
```bash
npm run test         # Vitest unit tests (*.test.{ts,tsx} in src/)
npm run test:e2e     # Playwright E2E tests (tests/e2e/*.e2e.ts)
npx playwright install  # First-time setup for Playwright browsers
```

**Test patterns**:
- Unit tests colocated with source (`src/hooks/UseMenu.test.ts`)
- E2E tests in `tests/e2e/` (config: `playwright.config.ts`)
- `tests/integration/` for integration tests

### Code Quality
```bash
npm run lint         # ESLint with Antfu config + Next.js + Tailwind CSS
npm run lint:fix     # Auto-fix issues
npm run check-types  # TypeScript project-wide check
npm run commit       # Interactive Commitizen (Conventional Commits required)
```

**ESLint config** (`eslint.config.mjs`):
- Uses Antfu flat config as base
- Enforces simple-import-sort (auto-sorts imports)
- `type` preferred over `interface`
- Tailwind CSS class order enforcement

### Stripe Integration

Setup payment (development):
```bash
stripe login         # Authenticate Stripe CLI
npm run stripe:setup-price  # Create test prices
npm run dev          # Webhook secret appears in terminal output
```

Copy price IDs to `src/utils/AppConfig.ts` (`PricingPlanList`). Add to `.env.local`:
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET` (from dev server output)

Configure customer portal: https://dashboard.stripe.com/test/settings/billing/portal

## Billing & Subscriptions

**Current implementation** (free version):
- **Display-only pricing**: `PricingInformation` component renders plans from `AppConfig.PricingPlanList`
- **Database schema**: `organizationSchema` includes Stripe fields (`stripeCustomerId`, `stripeSubscriptionId`, etc.)
- **Type system**: `src/types/Subscription.ts` defines `PricingPlan`, `IStripeSubscription`, `PlanDetails`

**Price configuration**:
- Three tiers: `FREE`, `PREMIUM`, `ENTERPRISE` (defined in `PLAN_ID`)
- Each plan has `testPriceId`, `devPriceId`, `prodPriceId` - select via `BILLING_PLAN_ENV`
- Features defined per plan (teamMember, website, storage, transfer counts)

**Note**: Full Stripe integration (checkout, webhooks, customer portal) available in Pro version. Free version provides UI foundation and schema setup.

## Deployment Targets

**Vercel** (recommended):
- Auto-detects Next.js configuration
- Environment variable helpers in `src/utils/Helpers.ts`:
  - `getBaseUrl()` checks `VERCEL_PROJECT_PRODUCTION_URL`, `VERCEL_URL`, falls back to localhost
  - `VERCEL_ENV` used to determine production context

**General deployment**:
```bash
npm run build    # Runs DB migrations automatically
npm run start    # Starts production server (port 3000)
```

**Environment setup**:
- Set `DATABASE_URL` for remote PostgreSQL (PGlite only for dev/build)
- Configure `VERCEL_BYPASS_TOKEN` for Checkly monitoring (see `checkly.config.ts`)
- Sentry: Update `org`/`project` in `next.config.mjs`, add `SENTRY_AUTH_TOKEN` for source maps
- Checkly: Set `CHECKLY_API_KEY` and `CHECKLY_ACCOUNT_ID` in GitHub Actions

**GitHub Actions**:
- `.github/workflows/CI.yml` - Tests, builds, linting, Crowdin sync on PR/push
- Matrix testing: Node 20.x and 22.6 (22.6 needed due to Next.js build issues)
- E2E runs with Percy visual testing (optional, needs `PERCY_TOKEN`)
- Codecov integration for coverage reports

## CI/CD & Branch Workflow

**GitHub Actions pipeline** (`.github/workflows/CI.yml`):

1. **Build job**: Tests builds on Node 20.x and 22.6
2. **Test job**: Runs sequentially
   - Commit message validation (Commitizen) for PRs
   - ESLint → TypeScript checks → Unit tests (with coverage)
   - Storybook tests → E2E tests (Playwright + Percy)
3. **Crowdin sync**: Auto-commits translations to PR branch

**Commit conventions**:
- **Required**: Conventional Commits format (`feat:`, `fix:`, `chore:`, etc.)
- Use `npm run commit` for interactive prompts (Commitizen)
- Commitlint validates all PR commits from base to head

**Test artifacts**: Uploaded to GitHub Actions for 7 days on failure (videos, traces)

**Branch protection** (recommended setup):
- Require passing CI checks
- Enforce commit message format via Commitlint
- Auto-sync translations before merge

## Critical Patterns

### Server vs Client Components

**Default to Server Components** unless:
- Uses React hooks (useState, useEffect)
- Needs event handlers (onClick, onChange)
- Uses browser APIs

**Client components** require `'use client'` directive. Examples: `LocaleSwitcher.tsx`, `ToggleMenuButton.tsx`, entire Shadcn UI library.

### Import Aliases

Use `@/` prefix for absolute imports (configured in `tsconfig.json`):
```typescript
import { Button } from '@/components/ui/button';
import { db } from '@/libs/DB';
import { AppConfig } from '@/utils/AppConfig';
```

### Drizzle ORM Patterns

Access database via `db` from `src/libs/DB.ts`:
```typescript
import { db } from '@/libs/DB';
import { todoSchema } from '@/models/Schema';

// Query examples
await db.select().from(todoSchema).where(eq(todoSchema.ownerId, userId));
await db.insert(todoSchema).values({ title, message, ownerId });
```

### Logging

Use `src/libs/Logger.ts` (Pino) instead of console:
- Development: Pretty-printed console output
- Production: JSON logs to Better Stack (if `LOGTAIL_SOURCE_TOKEN` set)

## Deployment

```bash
npm run build        # Production build with automatic DB migration
npm run start        # Run production server
```

**Pre-deployment checklist**:
1. Set `DATABASE_URL` for production PostgreSQL
2. Set all required env vars (`CLERK_SECRET_KEY`, Stripe keys, Sentry DSN)
3. Update Sentry config in `next.config.mjs` (org/project)
4. Configure Checkly for monitoring (`checkly.config.ts`)
5. Search `FIXME:` for project-specific customizations

## Testing & Monitoring

- **Error tracking**: Sentry (dev: Spotlight at http://localhost:8969, prod: cloud)
- **E2E monitoring**: Checkly runs `*.check.e2e.ts` tests in production
- **Code coverage**: Codecov (set `CODECOV_TOKEN` in GitHub Actions)
- **Visual testing**: Percy (optional, GitHub Actions only)

## Common Tasks

**Add a new locale**: Update `AppConfig.locales` in `src/utils/AppConfig.ts`, create `src/locales/{locale}.json`

**Modify database schema**: Edit `src/models/Schema.ts` → `npm run db:generate`

**Add Shadcn component**: `npx shadcn-ui@latest add [component]` (auto-configured via `components.json`)

**Create pricing plan**: Update `PricingPlanList` in `src/utils/AppConfig.ts` with Stripe price IDs

**Disable auto-migration** (Edge runtime): Comment out `await migrate()` in `src/libs/DB.ts`, run `npm run db:migrate` manually

## VSCode Integration

Press `Cmd+Shift+B` (Mac) / `Ctrl+Shift+B` (Windows) for project-wide TypeScript checking.

Recommended extensions defined in `.vscode/extension.json`.
