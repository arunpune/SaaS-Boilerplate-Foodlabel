CREATE TABLE IF NOT EXISTS "food_label" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" serial NOT NULL,
	"user_id" text NOT NULL,
	"label_type" text NOT NULL,
	"image_url" text NOT NULL,
	"image_path" text NOT NULL,
	"caption" text,
	"sort_order" serial DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "nutrition" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" serial NOT NULL,
	"calories" text,
	"protein" text,
	"carbohydrates" text,
	"fat" text,
	"fiber" text,
	"sugar" text,
	"sodium" text,
	"cholesterol" text,
	"serving_size" text,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe_ingredient" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" serial NOT NULL,
	"name" text NOT NULL,
	"quantity" text NOT NULL,
	"unit" text,
	"notes" text,
	"sort_order" serial DEFAULT 0 NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recipe" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"servings" serial NOT NULL,
	"prep_time" serial NOT NULL,
	"cook_time" serial NOT NULL,
	"instructions" text,
	"category" text,
	"cuisine" text,
	"difficulty" text,
	"is_public" text DEFAULT 'false',
	"updated_at" timestamp DEFAULT now() NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "food_label" ADD CONSTRAINT "food_label_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recipe_ingredient" ADD CONSTRAINT "recipe_ingredient_recipe_id_recipe_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipe"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
