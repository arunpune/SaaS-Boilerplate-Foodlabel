'use client';

import { useState } from 'react';

import { addIngredientsAction, createRecipeAction } from '@/features/recipe/actions';

export default function TestRecipePage() {
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleCreateRecipe = async () => {
    setLoading(true);

    // Create recipe
    const recipeResult = await createRecipeAction({
      userId: 'test-user-123',
      name: 'Test Recipe from UI',
      description: 'Created using the UI form',
      servings: 4,
      prepTime: 15,
      cookTime: 30,
      category: 'dinner',
      difficulty: 'easy',
    });

    if (recipeResult.success && recipeResult.recipe) {
      // Add ingredients
      const ingredientsResult = await addIngredientsAction({
        recipeId: recipeResult.recipe.id,
        ingredients: [
          { name: 'Chicken breast', quantity: '500', unit: 'grams' },
          { name: 'Olive oil', quantity: '2', unit: 'tablespoons' },
          { name: 'Garlic', quantity: '3', unit: 'cloves' },
        ],
      });

      setResult({
        recipe: recipeResult,
        ingredients: ingredientsResult,
      });
    } else {
      setResult(recipeResult);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-3xl font-bold">Test Recipe Database</h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <button
            type="button"
            onClick={handleCreateRecipe}
            disabled={loading}
            className="rounded bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:bg-gray-400"
          >
            {loading ? 'Creating...' : 'Create Test Recipe'}
          </button>

          {result && (
            <div className="mt-6">
              <h2 className="mb-2 text-xl font-semibold">Result:</h2>
              <pre className="overflow-auto rounded bg-gray-100 p-4 text-sm">
                {JSON.stringify(result, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="mt-8 rounded-lg bg-white p-6 shadow">
          <h2 className="mb-4 text-xl font-semibold">How to Use Your UI</h2>
          <ol className="list-inside list-decimal space-y-2">
            <li>Go to your Recipe Builder page</li>
            <li>Fill in the recipe details (name, servings, etc.)</li>
            <li>Add ingredients</li>
            <li>Click "Save Recipe" button</li>
            <li>Check Supabase Table Editor to see your data</li>
          </ol>

          <div className="mt-6 rounded bg-yellow-50 p-4">
            <p className="font-semibold text-yellow-800">Next Steps:</p>
            <ul className="mt-2 list-inside list-disc space-y-1 text-sm text-yellow-700">
              <li>Add a "Save to Database" button to RecipeSetupTab</li>
              <li>Import and call createRecipeAction when clicked</li>
              <li>Show success/error messages to user</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
