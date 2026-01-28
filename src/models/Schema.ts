import {
  bigint,
  integer,
  pgTable,
  serial,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';

// This file defines the structure of your database tables using the Drizzle ORM.

// To modify the database schema:
// 1. Update this file with your desired changes.
// 2. Generate a new migration by running: `npm run db:generate`

// The generated migration file will reflect your schema changes.
// The migration is automatically applied during the next database interaction,
// so there's no need to run it manually or restart the Next.js server.

// Need a database for production? Check out https://www.prisma.io/?via=saasboilerplatesrc
// Tested and compatible with Next.js Boilerplate
export const organizationSchema = pgTable(
  'organization',
  {
    id: text('id').primaryKey(),
    stripeCustomerId: text('stripe_customer_id'),
    stripeSubscriptionId: text('stripe_subscription_id'),
    stripeSubscriptionPriceId: text('stripe_subscription_price_id'),
    stripeSubscriptionStatus: text('stripe_subscription_status'),
    stripeSubscriptionCurrentPeriodEnd: bigint(
      'stripe_subscription_current_period_end',
      { mode: 'number' },
    ),
    updatedAt: timestamp('updated_at', { mode: 'date' })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
    createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
  },
  (table) => {
    return {
      stripeCustomerIdIdx: uniqueIndex('stripe_customer_id_idx').on(
        table.stripeCustomerId,
      ),
    };
  },
);

export const todoSchema = pgTable('todo', {
  id: serial('id').primaryKey(),
  ownerId: text('owner_id').notNull(),
  title: text('title').notNull(),
  message: text('message').notNull(),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Recipe Schema
export const recipeSchema = pgTable('recipe', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  name: text('name').notNull(),
  description: text('description'),
  servings: integer('servings'),
  prepTime: integer('prep_time'), // in minutes
  cookTime: integer('cook_time'), // in minutes
  instructions: text('instructions'),
  category: text('category'), // e.g., 'breakfast', 'lunch', 'dinner', 'snack'
  cuisine: text('cuisine'), // e.g., 'italian', 'mexican', 'chinese'
  difficulty: text('difficulty'), // e.g., 'easy', 'medium', 'hard'
  isPublic: text('is_public').default('false'), // 'true' or 'false'
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Recipe Ingredients Schema
export const recipeIngredientSchema = pgTable('recipe_ingredient', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').notNull().references(() => recipeSchema.id, { onDelete: 'cascade' }),
  name: text('name').notNull(),
  quantity: text('quantity').notNull(),
  unit: text('unit'), // e.g., 'cups', 'grams', 'tablespoons'
  notes: text('notes'), // optional notes about the ingredient
  sortOrder: integer('sort_order').default(0), // for ordering ingredients in the recipe
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Food Labels/Images Schema (Nutrition labels, food images, etc.)
export const foodLabelSchema = pgTable('food_label', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').references(() => recipeSchema.id, { onDelete: 'cascade' }),
  userId: text('user_id').notNull(),
  labelType: text('label_type').notNull(), // e.g., 'nutrition_label', 'food_image', 'step_image'
  imageUrl: text('image_url').notNull(), // Supabase storage URL
  imagePath: text('image_path').notNull(), // Storage path for reference
  caption: text('caption'),
  sortOrder: integer('sort_order').default(0),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});

// Nutrition Information Schema
export const nutritionSchema = pgTable('nutrition', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id').notNull().references(() => recipeSchema.id, { onDelete: 'cascade' }),
  calories: text('calories'),
  protein: text('protein'), // in grams
  carbohydrates: text('carbohydrates'), // in grams
  fat: text('fat'), // in grams
  fiber: text('fiber'), // in grams
  sugar: text('sugar'), // in grams
  sodium: text('sodium'), // in mg
  cholesterol: text('cholesterol'), // in mg
  servingSize: text('serving_size'),
  updatedAt: timestamp('updated_at', { mode: 'date' })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
  createdAt: timestamp('created_at', { mode: 'date' }).defaultNow().notNull(),
});
