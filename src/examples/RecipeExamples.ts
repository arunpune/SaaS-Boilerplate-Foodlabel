/**
 * Recipe Management Examples
 * 
 * This file contains example code for working with recipes in your application.
 * Copy and adapt these examples to your actual components.
 */

import { db } from '@/libs/DB';
import { uploadFile, deleteFile } from '@/libs/Supabase';
import { 
  recipeSchema, 
  recipeIngredientSchema, 
  foodLabelSchema, 
  nutritionSchema 
} from '@/models/Schema';
import { eq } from 'drizzle-orm';

// ============================================================================
// EXAMPLE 1: Create a New Recipe
// ============================================================================

export async function createRecipe(userId: string, recipeData: {
  name: string;
  description?: string;
  servings?: number;
  prepTime?: number;
  cookTime?: number;
  instructions?: string;
  category?: string;
  cuisine?: string;
  difficulty?: string;
  isPublic?: boolean;
}) {
  // Insert the recipe
  const [recipe] = await db
    .insert(recipeSchema)
    .values({
      userId,
      name: recipeData.name,
      description: recipeData.description,
      servings: recipeData.servings,
      prepTime: recipeData.prepTime,
      cookTime: recipeData.cookTime,
      instructions: recipeData.instructions,
      category: recipeData.category,
      cuisine: recipeData.cuisine,
      difficulty: recipeData.difficulty,
      isPublic: recipeData.isPublic ? 'true' : 'false',
    })
    .returning();

  return recipe;
}

// ============================================================================
// EXAMPLE 2: Add Ingredients to a Recipe
// ============================================================================

export async function addIngredientsToRecipe(
  recipeId: number,
  ingredients: Array<{
    name: string;
    quantity: string;
    unit?: string;
    notes?: string;
    sortOrder?: number;
  }>
) {
  const insertedIngredients = await db
    .insert(recipeIngredientSchema)
    .values(
      ingredients.map((ingredient, index) => ({
        recipeId,
        name: ingredient.name,
        quantity: ingredient.quantity,
        unit: ingredient.unit,
        notes: ingredient.notes,
        sortOrder: ingredient.sortOrder ?? index,
      }))
    )
    .returning();

  return insertedIngredients;
}

// ============================================================================
// EXAMPLE 3: Upload Recipe Image to Supabase
// ============================================================================

export async function uploadRecipeImage(
  userId: string,
  recipeId: number,
  imageFile: File,
  labelType: 'food_image' | 'nutrition_label' | 'step_image' = 'food_image'
) {
  // Generate unique file path
  const timestamp = Date.now();
  const fileName = `${userId}/${recipeId}/${timestamp}-${imageFile.name}`;

  // Upload to Supabase Storage
  const uploadResult = await uploadFile(
    'recipe-images',
    fileName,
    imageFile,
    true // Make it public
  );

  // Save reference in database
  const [foodLabel] = await db
    .insert(foodLabelSchema)
    .values({
      recipeId,
      userId,
      labelType,
      imageUrl: uploadResult.url!,
      imagePath: uploadResult.path,
    })
    .returning();

  return foodLabel;
}

// ============================================================================
// EXAMPLE 4: Add Nutrition Information
// ============================================================================

export async function addNutritionInfo(
  recipeId: number,
  nutritionData: {
    calories?: string;
    protein?: string;
    carbohydrates?: string;
    fat?: string;
    fiber?: string;
    sugar?: string;
    sodium?: string;
    cholesterol?: string;
    servingSize?: string;
  }
) {
  const [nutrition] = await db
    .insert(nutritionSchema)
    .values({
      recipeId,
      ...nutritionData,
    })
    .returning();

  return nutrition;
}

// ============================================================================
// EXAMPLE 5: Get Recipe with All Details
// ============================================================================

export async function getRecipeWithDetails(recipeId: number) {
  // Get the recipe
  const recipe = await db.query.recipeSchema.findFirst({
    where: eq(recipeSchema.id, recipeId),
  });

  if (!recipe) {
    return null;
  }

  // Get ingredients
  const ingredients = await db.query.recipeIngredientSchema.findMany({
    where: eq(recipeIngredientSchema.recipeId, recipeId),
    orderBy: (ingredient, { asc }) => [asc(ingredient.sortOrder)],
  });

  // Get images
  const images = await db.query.foodLabelSchema.findMany({
    where: eq(foodLabelSchema.recipeId, recipeId),
    orderBy: (image, { asc }) => [asc(image.sortOrder)],
  });

  // Get nutrition
  const nutrition = await db.query.nutritionSchema.findFirst({
    where: eq(nutritionSchema.recipeId, recipeId),
  });

  return {
    ...recipe,
    ingredients,
    images,
    nutrition,
  };
}

// ============================================================================
// EXAMPLE 6: Get User's Recipes
// ============================================================================

export async function getUserRecipes(userId: string) {
  const recipes = await db.query.recipeSchema.findMany({
    where: eq(recipeSchema.userId, userId),
    orderBy: (recipe, { desc }) => [desc(recipe.createdAt)],
  });

  return recipes;
}

// ============================================================================
// EXAMPLE 7: Update Recipe
// ============================================================================

export async function updateRecipe(
  recipeId: number,
  updates: Partial<{
    name: string;
    description: string;
    servings: number;
    prepTime: number;
    cookTime: number;
    instructions: string;
    category: string;
    cuisine: string;
    difficulty: string;
    isPublic: boolean;
  }>
) {
  const [updatedRecipe] = await db
    .update(recipeSchema)
    .set({
      ...updates,
      isPublic: updates.isPublic !== undefined 
        ? (updates.isPublic ? 'true' : 'false')
        : undefined,
    })
    .where(eq(recipeSchema.id, recipeId))
    .returning();

  return updatedRecipe;
}

// ============================================================================
// EXAMPLE 8: Delete Recipe and Its Images
// ============================================================================

export async function deleteRecipe(recipeId: number) {
  // Get all images associated with the recipe
  const images = await db.query.foodLabelSchema.findMany({
    where: eq(foodLabelSchema.recipeId, recipeId),
  });

  // Delete images from Supabase Storage
  for (const image of images) {
    try {
      await deleteFile('recipe-images', image.imagePath);
    } catch (error) {
      console.error(`Failed to delete image: ${image.imagePath}`, error);
    }
  }

  // Delete recipe (this will cascade delete ingredients, labels, and nutrition)
  await db.delete(recipeSchema).where(eq(recipeSchema.id, recipeId));

  return { success: true };
}

// ============================================================================
// EXAMPLE 9: Search Recipes
// ============================================================================

export async function searchRecipes(searchTerm: string) {
  // Note: This is a basic example. For production, consider using
  // PostgreSQL full-text search or a dedicated search service
  const recipes = await db.query.recipeSchema.findMany({
    where: (recipe, { or, ilike }) => or(
      ilike(recipe.name, `%${searchTerm}%`),
      ilike(recipe.description, `%${searchTerm}%`)
    ),
  });

  return recipes;
}

// ============================================================================
// EXAMPLE 10: Complete Recipe Creation Flow
// ============================================================================

export async function createCompleteRecipe(
  userId: string,
  data: {
    name: string;
    description?: string;
    servings?: number;
    prepTime?: number;
    cookTime?: number;
    instructions?: string;
    category?: string;
    cuisine?: string;
    difficulty?: string;
    ingredients: Array<{
      name: string;
      quantity: string;
      unit?: string;
      notes?: string;
    }>;
    nutrition?: {
      calories?: string;
      protein?: string;
      carbohydrates?: string;
      fat?: string;
      fiber?: string;
      sugar?: string;
      sodium?: string;
      cholesterol?: string;
      servingSize?: string;
    };
    images?: File[];
  }
) {
  // 1. Create the recipe
  const recipe = await createRecipe(userId, {
    name: data.name,
    description: data.description,
    servings: data.servings,
    prepTime: data.prepTime,
    cookTime: data.cookTime,
    instructions: data.instructions,
    category: data.category,
    cuisine: data.cuisine,
    difficulty: data.difficulty,
  });

  if (!recipe) {
    throw new Error('Failed to create recipe');
  }

  // 2. Add ingredients
  if (data.ingredients.length > 0) {
    await addIngredientsToRecipe(recipe.id, data.ingredients);
  }

  // 3. Add nutrition info
  if (data.nutrition) {
    await addNutritionInfo(recipe.id, data.nutrition);
  }

  // 4. Upload images
  if (data.images && data.images.length > 0) {
    for (const image of data.images) {
      await uploadRecipeImage(userId, recipe.id, image, 'food_image');
    }
  }

  // 5. Return complete recipe
  return getRecipeWithDetails(recipe.id);
}
