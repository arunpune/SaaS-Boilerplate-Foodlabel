'use server';

import { eq } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';

import { db } from '@/libs/DB';
import {
  nutritionSchema,
  recipeIngredientSchema,
  recipeSchema,
} from '@/models/Schema';

/**
 * Server action to create a new recipe
 */
export async function createRecipeAction(data: {
  userId: string;
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
  try {
    const [recipe] = await db
      .insert(recipeSchema)
      .values({
        userId: data.userId,
        name: data.name,
        description: data.description,
        servings: data.servings,
        prepTime: data.prepTime,
        cookTime: data.cookTime,
        instructions: data.instructions,
        category: data.category,
        cuisine: data.cuisine,
        difficulty: data.difficulty,
        isPublic: data.isPublic ? 'true' : 'false',
      })
      .returning();

    revalidatePath('/');

    return { success: true, recipe };
  } catch (error) {
    console.error('Error creating recipe:', error);
    return { success: false, error: 'Failed to create recipe' };
  }
}

/**
 * Server action to add ingredients to a recipe
 */
export async function addIngredientsAction(data: {
  recipeId: number;
  ingredients: Array<{
    name: string;
    quantity: string;
    unit?: string;
    notes?: string;
    sortOrder?: number;
  }>;
}) {
  try {
    const ingredients = await db
      .insert(recipeIngredientSchema)
      .values(
        data.ingredients.map((ingredient, index) => ({
          recipeId: data.recipeId,
          name: ingredient.name,
          quantity: ingredient.quantity,
          unit: ingredient.unit,
          notes: ingredient.notes,
          sortOrder: ingredient.sortOrder ?? index,
        })),
      )
      .returning();

    revalidatePath('/');

    return { success: true, ingredients };
  } catch (error) {
    console.error('Error adding ingredients:', error);
    return { success: false, error: 'Failed to add ingredients' };
  }
}

/**
 * Server action to add nutrition information
 */
export async function addNutritionAction(data: {
  recipeId: number;
  calories?: string;
  protein?: string;
  carbohydrates?: string;
  fat?: string;
  fiber?: string;
  sugar?: string;
  sodium?: string;
  cholesterol?: string;
  servingSize?: string;
}) {
  try {
    const [nutrition] = await db
      .insert(nutritionSchema)
      .values({
        recipeId: data.recipeId,
        calories: data.calories,
        protein: data.protein,
        carbohydrates: data.carbohydrates,
        fat: data.fat,
        fiber: data.fiber,
        sugar: data.sugar,
        sodium: data.sodium,
        cholesterol: data.cholesterol,
        servingSize: data.servingSize,
      })
      .returning();

    revalidatePath('/');

    return { success: true, nutrition };
  } catch (error) {
    console.error('Error adding nutrition:', error);
    return { success: false, error: 'Failed to add nutrition' };
  }
}

/**
 * Server action to get all recipes for a user
 */
export async function getUserRecipesAction(userId: string) {
  try {
    const recipes = await db
      .select()
      .from(recipeSchema)
      .where(eq(recipeSchema.userId, userId));

    return { success: true, recipes };
  } catch (error) {
    console.error('Error fetching recipes:', error);
    return { success: false, error: 'Failed to fetch recipes' };
  }
}

/**
 * Server action to get a recipe with all its details
 */
export async function getRecipeDetailsAction(recipeId: number) {
  try {
    const recipe = await db.query.recipeSchema.findFirst({
      where: (recipe, { eq }) => eq(recipe.id, recipeId),
    });

    if (!recipe) {
      return { success: false, error: 'Recipe not found' };
    }

    const ingredients = await db
      .select()
      .from(recipeIngredientSchema)
      .where(eq(recipeIngredientSchema.recipeId, recipeId));

    const nutrition = await db.query.nutritionSchema.findFirst({
      where: (nutrition, { eq }) => eq(nutrition.recipeId, recipeId),
    });

    return {
      success: true,
      data: {
        recipe,
        ingredients,
        nutrition,
      },
    };
  } catch (error) {
    console.error('Error fetching recipe details:', error);
    return { success: false, error: 'Failed to fetch recipe details' };
  }
}
