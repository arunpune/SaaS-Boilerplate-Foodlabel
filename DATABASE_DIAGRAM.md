# Database Schema Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                         RECIPE MANAGEMENT SYSTEM                     │
└─────────────────────────────────────────────────────────────────────┘

┌──────────────────────┐
│      RECIPE          │
├──────────────────────┤
│ id (PK)              │◄──────────┐
│ user_id              │           │
│ name                 │           │
│ description          │           │
│ servings             │           │
│ prep_time            │           │
│ cook_time            │           │
│ instructions         │           │
│ category             │           │
│ cuisine              │           │
│ difficulty           │           │
│ is_public            │           │
│ created_at           │           │
│ updated_at           │           │
└──────────────────────┘           │
        ▲                          │
        │                          │
        │                          │
        │ (1)              (Many)  │
        │                          │
        │                          │
┌───────┴───────────┐    ┌─────────┴──────────┐
│ RECIPE_INGREDIENT │    │    NUTRITION       │
├───────────────────┤    ├────────────────────┤
│ id (PK)           │    │ id (PK)            │
│ recipe_id (FK) ───┼────┤ recipe_id (FK)     │
│ name              │    │ calories           │
│ quantity          │    │ protein            │
│ unit              │    │ carbohydrates      │
│ notes             │    │ fat                │
│ sort_order        │    │ fiber              │
│ created_at        │    │ sugar              │
│ updated_at        │    │ sodium             │
└───────────────────┘    │ cholesterol        │
                         │ serving_size       │
                         │ created_at         │
        ▲                │ updated_at         │
        │                └────────────────────┘
        │
        │ (1)
        │
        │ (Many)
        │
┌───────┴───────────┐
│   FOOD_LABEL      │
├───────────────────┤
│ id (PK)           │
│ recipe_id (FK) ───┘
│ user_id           │
│ label_type        │────► Types: 'nutrition_label'
│ image_url         │               'food_image'
│ image_path        │               'step_image'
│ caption           │
│ sort_order        │
│ created_at        │
│ updated_at        │
└───────────────────┘
        │
        │
        │ Stored in
        ▼
┌────────────────────────────────┐
│   SUPABASE STORAGE BUCKETS     │
├────────────────────────────────┤
│ • recipe-images                │
│ • nutrition-labels             │
│ • food-labels                  │
└────────────────────────────────┘


════════════════════════════════════════════════════════════════════

RELATIONSHIPS:

1. RECIPE ──< RECIPE_INGREDIENT (One-to-Many)
   - One recipe has many ingredients
   - Cascade delete: deleting recipe deletes ingredients

2. RECIPE ──< NUTRITION (One-to-One)
   - One recipe has one nutrition info
   - Cascade delete: deleting recipe deletes nutrition

3. RECIPE ──< FOOD_LABEL (One-to-Many)
   - One recipe has many images/labels
   - Cascade delete: deleting recipe deletes labels

════════════════════════════════════════════════════════════════════

DATA FLOW EXAMPLE:

1. User creates a recipe
   ↓
2. Recipe ID is generated
   ↓
3. Add ingredients (using recipe_id)
   ↓
4. Add nutrition info (using recipe_id)
   ↓
5. Upload images to Supabase Storage
   ↓
6. Save image URLs in food_label table (using recipe_id)
   ↓
7. Recipe is complete!

════════════════════════════════════════════════════════════════════

EXAMPLE DATA:

RECIPE:
┌────┬─────────┬───────────────┬─────────┬───────────┬──────────┐
│ id │ user_id │ name          │ servings│ prep_time │ cook_time│
├────┼─────────┼───────────────┼─────────┼───────────┼──────────┤
│ 1  │ user123 │ Pasta Carbonara│   4    │    15     │   20     │
└────┴─────────┴───────────────┴─────────┴───────────┴──────────┘

RECIPE_INGREDIENT:
┌────┬───────────┬────────────┬──────────┬──────┐
│ id │ recipe_id │ name       │ quantity │ unit │
├────┼───────────┼────────────┼──────────┼──────┤
│ 1  │     1     │ Pasta      │   400    │  g   │
│ 2  │     1     │ Eggs       │    4     │ pcs  │
│ 3  │     1     │ Bacon      │   200    │  g   │
└────┴───────────┴────────────┴──────────┴──────┘

NUTRITION:
┌────┬───────────┬──────────┬─────────┬───────────────┬─────┐
│ id │ recipe_id │ calories │ protein │ carbohydrates │ fat │
├────┼───────────┼──────────┼─────────┼───────────────┼─────┤
│ 1  │     1     │   650    │   28    │      55       │ 32  │
└────┴───────────┴──────────┴─────────┴───────────────┴─────┘

FOOD_LABEL:
┌────┬───────────┬────────────┬─────────────────────────────────┐
│ id │ recipe_id │ label_type │ image_url                       │
├────┼───────────┼────────────┼─────────────────────────────────┤
│ 1  │     1     │ food_image │ https://...supabase.co/pasta.jpg│
└────┴───────────┴────────────┴─────────────────────────────────┘

════════════════════════════════════════════════════════════════════
