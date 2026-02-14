# Food Label Maker - SaaS Boilerplate

A comprehensive SaaS application for creating FDA-compliant nutrition labels with real-time ingredient management and USDA FoodData Central API integration.

## 🚀 Overview

Food Label Maker is a full-stack SaaS application built on a robust boilerplate that enables users to:
- Create and manage recipes with detailed ingredient tracking
- Generate FDA-compliant nutrition labels dynamically
- Search ingredients using the USDA FoodData Central database
- Calculate nutrition facts based on actual serving sizes
- Export and customize nutrition labels for food products

The application features a complete recipe builder interface with real-time nutrition calculations, persistent data storage, and demo mode for quick testing.

## 📋 Prerequisites

Before you begin, ensure you have the following installed on your system:

- **Node.js** (version 20 or higher)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)
- **USDA FoodData Central API Key** (free at https://fdc.nal.usda.gov/api-key-signup.html)

## 🔧 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/arunpune/SaaS-Boilerplate-Foodlabel.git
cd SaaS-Boilerplate-Foodlabel
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages listed in `package.json`.

### 3. Set Up Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Application URL
NEXT_PUBLIC_APP_URL=http://localhost:3000

# USDA FoodData Central API
NEXT_PUBLIC_FDA_API_KEY=your_usda_api_key_here

# Clerk Authentication (create account at https://clerk.com)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Database (Optional - for production)
DATABASE_URL=your_postgresql_connection_string

# Stripe (Optional - for payment features)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# Sentry (Optional - for error monitoring)
SENTRY_DSN=your_sentry_dsn
SENTRY_ORG=your_sentry_org
SENTRY_PROJECT=your_sentry_project
SENTRY_AUTH_TOKEN=your_sentry_auth_token
```

### 4. Set Up Database

The application uses PGlite for local development (in-memory database). Run migrations:

```bash
npm run db:generate  # Generate migration files
npm run db:migrate   # Apply migrations
npm run db:studio    # (Optional) Open Drizzle Studio to explore database
```

### 5. Configure Clerk Authentication

1. Create an account at [Clerk.com](https://clerk.com)
2. Create a new application in the Clerk Dashboard
3. Copy your API keys to `.env.local`
4. In Clerk Dashboard: Navigate to **Organization management** > **Settings** > Enable **organization**

## 🏃 Running the Project

### Development Mode

Start the development server with hot reload:

```bash
npm run dev
```

The application will be available at **http://localhost:3000**

### Production Build

Build the application for production:

```bash
npm run build
npm run start
```

### Other Useful Commands

```bash
npm run check-types     # Type-check TypeScript files
npm run lint            # Run ESLint
npm run test            # Run unit tests with Vitest
npm run test:e2e        # Run end-to-end tests with Playwright
npm run commit          # Interactive commit with Commitizen
npm run db:push         # Push schema changes to database
```

## ✨ Key Features

### 🍽️ Recipe Builder
- Add ingredients with quantities and units
- Search ingredients from USDA FoodData Central database
- Percentage calculation for each ingredient
- Real-time ingredient list updates
- Sample ingredients button for quick demos
- Cross-tab data persistence

### 📊 FDA-Compliant Nutrition Label
- Dynamic nutrition facts panel
- Real-time calculation based on ingredients and servings
- USDA API integration with automatic fallback
- Mock data for demo mode (3 sample ingredients)
- localStorage caching to minimize API calls
- Per-serving and per-container calculations
- Complete FDA formatting and compliance

### 💾 Data Management
- Persistent storage using localStorage
- PGlite in-memory database for development
- PostgreSQL support for production
- Automatic data synchronization across tabs
- Recipe save and load functionality

### 🔍 Ingredient Search
- Real-time search with USDA database
- Food description preview
- FDC ID tracking for accurate nutrition data
- Type-ahead suggestions

### 🎨 Customization
- Customize label layout and styling
- Adjust serving sizes dynamically
- Edit serving container information
- Export-ready nutrition labels

## 🛠️ Technology Stack

### Core Framework & Language
- **Next.js** 14.2.25 - React framework with App Router
- **React** 18.3.1 - UI library
- **TypeScript** 5.6.3 - Type-safe JavaScript

### Styling & UI Components
- **Tailwind CSS** 3.4.14 - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
  - @radix-ui/react-accordion 1.2.1
  - @radix-ui/react-dropdown-menu 2.1.2
  - @radix-ui/react-label 2.1.0
  - @radix-ui/react-separator 1.1.0
  - @radix-ui/react-slot 1.1.0
  - @radix-ui/react-tooltip 1.1.4
- **class-variance-authority** 0.7.0 - Variant-based styling
- **clsx** 2.1.1 - Conditional classnames
- **tailwind-merge** 2.5.4 - Tailwind class merging
- **tailwindcss-animate** 1.0.7 - Animation utilities
- **Lucide React** 0.453.0 - Icon library

### Database & ORM
- **Drizzle ORM** 0.35.1 - Type-safe ORM
- **@electric-sql/pglite** 0.2.12 - In-memory PostgreSQL
- **pg** 8.13.0 - PostgreSQL client
- **PostgreSQL** - Production database

### Authentication & Authorization
- **Clerk** - Complete authentication solution
  - @clerk/nextjs 6.18.3
  - @clerk/localizations 3.6.0
  - @clerk/themes 2.1.42

### Backend & APIs
- **Supabase** 2.48.0 - Backend-as-a-service
- **USDA FoodData Central API** - Nutrition data source
- **Stripe** 16.12.0 - Payment processing
- **next-safe-action** 7.10.2 - Type-safe server actions

### Forms & Validation
- **React Hook Form** 7.53.0 - Form state management
- **Zod** 3.23.8 - Schema validation
- **@hookform/resolvers** 3.9.0 - Form validation integration

### Internationalization
- **next-intl** 3.21.1 - Internationalization framework

### Testing
- **Vitest** 2.1.9 - Unit testing framework
  - @vitest/ui 2.1.9 - Test UI
  - @vitest/coverage-v8 2.1.9 - Code coverage
- **Playwright** 1.48.1 - E2E testing
- **Testing Library** - React component testing
  - @testing-library/react 16.0.1
  - @testing-library/jest-dom 6.6.1
  - @testing-library/user-event 14.5.2
- **happy-dom** 15.11.7 - DOM implementation for testing

### Code Quality & Formatting
- **ESLint** 8.57.1 - Linting
  - @antfu/eslint-config 2.27.3
  - eslint-config-next 14.2.18
  - Multiple ESLint plugins for React, TypeScript, Tailwind
- **Prettier** 3.3.3 - Code formatting
  - prettier-plugin-organize-imports 4.1.0
  - prettier-plugin-tailwindcss 0.6.8
- **Husky** 9.1.6 - Git hooks
- **lint-staged** 15.2.10 - Pre-commit linting
- **Commitlint** 19.5.0 - Commit message linting
- **Commitizen** 4.3.1 - Interactive commit CLI

### Error Monitoring & Logging
- **Sentry** 8.34.0 - Error tracking
  - @sentry/nextjs 8.34.0
  - @spotlightjs/spotlight 2.5.0
- **Pino** 9.4.0 - Logging
  - pino-pretty 11.3.0

### Development Tools
- **PostCSS** 8.4.47 - CSS processing
  - Autoprefixer 10.4.20
- **Sharp** 0.33.5 - Image optimization
- **npm-run-all** 4.1.5 - Run multiple npm scripts
- **tsx** 4.19.2 - TypeScript execution
- **cross-env** 7.0.3 - Cross-platform env variables

### Build & Deployment Tools
- **@next/bundle-analyzer** 14.2.15 - Bundle analysis
- **semantic-release** 24.2.0 - Automated versioning
- **dotenv-cli** 7.4.2 - Environment variable management

### UI Development
- **Storybook** 8.4.2 - Component documentation
  - @storybook/react 8.4.2
  - @storybook/nextjs 8.4.2
  - @storybook/test 8.4.2

### Additional Libraries
- **date-fns** 3.6.0 - Date utilities
- **nanoid** 5.0.8 - Unique ID generation
- **next-themes** 0.3.0 - Theme management
- **react-day-picker** 8.10.1 - Date picker
- **sonner** 1.7.1 - Toast notifications
- **zod-error** 1.5.0 - Zod error formatting

## 📁 Project Structure

```
SaaS-Boilerplate-Foodlabel/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── [locale]/                 # Internationalized routes
│   │   │   ├── (auth)/              # Authenticated routes
│   │   │   └── (unauth)/            # Public routes
│   │   ├── global-error.tsx         # Global error handler
│   │   ├── robots.ts                # Robots.txt generator
│   │   └── sitemap.ts               # Sitemap generator
│   ├── components/                   # Reusable UI components
│   │   ├── ui/                      # Shadcn UI components
│   │   │   ├── button.tsx
│   │   │   ├── form.tsx
│   │   │   ├── input.tsx
│   │   │   ├── table.tsx
│   │   │   └── ...
│   │   ├── ActiveLink.tsx
│   │   ├── ChatWidget.tsx
│   │   ├── DashboardSidebar.tsx
│   │   └── LocaleSwitcher.tsx
│   ├── features/                     # Feature-specific components
│   │   ├── auth/                    # Authentication features
│   │   ├── billing/                 # Billing & subscription
│   │   ├── costs/                   # Cost management
│   │   ├── dashboard/               # Dashboard features
│   │   ├── ingredients/             # Ingredient management
│   │   ├── landing/                 # Landing page
│   │   ├── recipe/                  # Recipe features ⭐
│   │   │   ├── NutritionLabel.tsx   # FDA nutrition label
│   │   │   ├── RecipeBuilderPage.tsx
│   │   │   ├── RecipeBuilderTab.tsx
│   │   │   ├── CustomizeLabelTab.tsx
│   │   │   ├── IngredientSearch.tsx
│   │   │   └── actions.ts
│   │   ├── reports/                 # Reporting features
│   │   └── sponsors/                # Sponsors section
│   ├── libs/                         # Third-party configurations
│   │   ├── DB.ts                    # Database connection
│   │   ├── Env.ts                   # Environment variables
│   │   ├── FdaApi.ts                # FDA API client
│   │   ├── i18n.ts                  # Internationalization
│   │   ├── Logger.ts                # Logging configuration
│   │   └── Supabase.ts              # Supabase client
│   ├── locales/                      # Translation files
│   │   ├── en.json
│   │   └── fr.json
│   ├── models/                       # Database models
│   │   └── Schema.ts                # Drizzle ORM schema
│   ├── styles/                       # Global styles
│   │   └── global.css
│   ├── templates/                    # Page templates
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Pricing.tsx
│   │   └── ...
│   ├── types/                        # TypeScript types
│   │   ├── Auth.ts
│   │   ├── Enum.ts
│   │   ├── FdaApi.ts
│   │   ├── Subscription.ts
│   │   └── global.d.ts
│   ├── utils/                        # Utility functions
│   │   ├── AppConfig.ts
│   │   └── Helpers.ts
│   ├── instrumentation.ts           # OpenTelemetry
│   └── middleware.ts                # Next.js middleware
├── migrations/                       # Database migrations
│   ├── 0000_init-db.sql
│   ├── 0001_flat_speed.sql
│   └── meta/
├── tests/                            # Test files
│   ├── e2e/                         # End-to-end tests
│   └── integration/                 # Integration tests
├── public/                           # Static assets
│   └── assets/
│       └── images/
├── .github/                          # GitHub workflows
├── .vscode/                          # VSCode configuration
├── checkly.config.ts                # Monitoring configuration
├── drizzle.config.ts                # Drizzle ORM config
├── eslint.config.mjs                # ESLint configuration
├── next.config.mjs                  # Next.js configuration
├── playwright.config.ts             # Playwright config
├── tailwind.config.ts               # Tailwind CSS config
├── tsconfig.json                    # TypeScript config
├── vitest.config.mts                # Vitest config
└── package.json                     # Dependencies & scripts
```

## 🔌 API Configuration

### USDA FoodData Central API

The application integrates with the USDA FoodData Central API for ingredient nutrition data.

1. **Get API Key**: Sign up at https://fdc.nal.usda.gov/api-key-signup.html
2. **Add to Environment**: Add your key to `.env.local`:
   ```bash
   NEXT_PUBLIC_FDA_API_KEY=your_api_key_here
   ```
3. **API Endpoint**: https://api.nal.usda.gov/fdc/v1/food/{fdcId}?api_key={key}

### Features:
- Automatic caching in localStorage
- Mock data fallback for demo mode
- 10-second timeout for reliability
- Error handling with graceful degradation

### Rate Limits:
- **Free Tier**: 1,000 requests per hour
- **Pro Tier**: Higher limits available
- Application implements caching to minimize API calls

## 💾 Database Setup

### Local Development (PGlite)

The project uses PGlite for local development - an in-memory PostgreSQL database that doesn't require separate installation.

```bash
# Generate migration files after schema changes
npm run db:generate

# Apply migrations
npm run db:migrate

# Open Drizzle Studio (visual database explorer)
npm run db:studio
```

### Production Database

For production, configure a PostgreSQL database:

1. **Create Database**: Use services like:
   - [Prisma PostgreSQL](https://www.prisma.io/) (Recommended)
   - [Supabase](https://supabase.com/)
   - [Neon](https://neon.tech/)
   - [Railway](https://railway.app/)

2. **Update Environment**:
   ```bash
   DATABASE_URL=postgresql://user:password@host:port/database
   ```

3. **Run Migrations**:
   ```bash
   npm run db:migrate
   ```

### Schema Changes

To modify the database schema:

1. Edit `src/models/Schema.ts`
2. Generate migration: `npm run db:generate`
3. Review migration files in `migrations/`
4. Apply migration: `npm run db:migrate`

## 🧪 Testing

### Unit Tests (Vitest)

Run unit tests with coverage:

```bash
npm run test              # Run all unit tests
npm run test:watch        # Run tests in watch mode
npm run test:coverage     # Generate coverage report
```

Test files are located alongside source code with `.test.ts` or `.test.tsx` extensions.

### E2E Tests (Playwright)

Run end-to-end tests:

```bash
# Install Playwright browsers (first time only)
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npx playwright test --ui

# Run specific test file
npx playwright test tests/e2e/Sanity.check.e2e.ts
```

### Test Coverage

The project uses Codecov for coverage reporting. Coverage is automatically uploaded on pull requests via GitHub Actions.

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms

The application can be deployed to any platform supporting Next.js:
- **Netlify**
- **AWS Amplify**
- **Cloudflare Pages**
- **Railway**
- **Render**

### Build Command

```bash
npm run build
```

### Environment Variables

Ensure all required environment variables are set in your deployment platform:
- `NEXT_PUBLIC_APP_URL`
- `NEXT_PUBLIC_FDA_API_KEY`
- `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY`
- `CLERK_SECRET_KEY`
- `DATABASE_URL` (for production)

## 🐛 Troubleshooting

### Nutrition Label Not Updating

**Issue**: Nutrition label shows "Calculating..." indefinitely

**Solutions**:
1. Check USDA API key in `.env.local`
2. Verify internet connection
3. Check browser console for API errors
4. Clear localStorage: `localStorage.clear()`
5. Use demo mode with sample ingredients button

### Ingredients Not Saving

**Issue**: Added ingredients disappear after page refresh

**Solutions**:
1. Check browser localStorage is enabled
2. Verify no browser extensions blocking storage
3. Check console for errors
4. Try a different browser

### Database Migration Errors

**Issue**: Schema changes not applying

**Solutions**:
```bash
# Reset and regenerate migrations
npm run db:drop      # Drops all tables (development only!)
npm run db:generate  # Generate new migrations
npm run db:migrate   # Apply migrations
```

### TypeScript Errors

**Issue**: Build failing with TypeScript errors

**Solutions**:
```bash
# Check types
npm run check-types

# Common fixes
npm run lint -- --fix      # Auto-fix linting issues
npm install               # Reinstall dependencies
rm -rf node_modules .next # Clean install
npm install
```

### Port Already in Use

**Issue**: Port 3000 is already in use

**Solutions**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# macOS/Linux
lsof -ti:3000 | xargs kill -9

# Or use different port
PORT=3001 npm run dev
```

### API Rate Limiting

**Issue**: USDA API returning 429 errors

**Solutions**:
1. Application automatically uses cached data
2. Mock data is available for demo mode
3. Wait for rate limit to reset (1 hour)
4. Consider upgrading USDA API plan

## 📚 Additional Documentation

- [FDA_API_INTEGRATION.md](FDA_API_INTEGRATION.md) - FDA API integration details
- [SUPABASE_INTEGRATION.md](SUPABASE_INTEGRATION.md) - Supabase setup guide
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Detailed Supabase configuration
- [QUICK_START.md](QUICK_START.md) - Quick start guide
- [DATABASE_DIAGRAM.md](DATABASE_DIAGRAM.md) - Database schema documentation
- [CHANGELOG.md](CHANGELOG.md) - Version history

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run tests: `npm run test && npm run test:e2e`
5. Commit using Commitizen: `npm run commit`
6. Push to your fork: `git push origin feature/your-feature`
7. Create a Pull Request

### Commit Message Format

This project uses [Conventional Commits](https://www.conventionalcommits.org/). Use the interactive CLI:

```bash
npm run commit
```

Format: `type(scope): description`
- **Types**: feat, fix, docs, style, refactor, test, chore
- **Example**: `feat(recipe): add nutrition label export feature`

## 📄 License

This project is licensed under the terms specified in [LICENSE](LICENSE).

## 🔗 Links

- **Repository**: https://github.com/arunpune/SaaS-Boilerplate-Foodlabel
- **USDA FoodData Central**: https://fdc.nal.usda.gov/
- **Next.js Documentation**: https://nextjs.org/docs
- **Clerk Documentation**: https://clerk.com/docs
- **Drizzle ORM**: https://orm.drizzle.team/

## 📞 Support

For issues and questions:
- Create an issue on GitHub
- Check existing documentation
- Review troubleshooting section

---

Built with ❤️ using modern web technologies and best practices.
