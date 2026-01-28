ALTER TABLE "food_label" ALTER COLUMN "recipe_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "food_label" ALTER COLUMN "recipe_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "food_label" ALTER COLUMN "sort_order" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "food_label" ALTER COLUMN "sort_order" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "nutrition" ALTER COLUMN "recipe_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ALTER COLUMN "recipe_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ALTER COLUMN "sort_order" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recipe_ingredient" ALTER COLUMN "sort_order" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "servings" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "servings" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "prep_time" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "prep_time" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "cook_time" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "recipe" ALTER COLUMN "cook_time" DROP NOT NULL;