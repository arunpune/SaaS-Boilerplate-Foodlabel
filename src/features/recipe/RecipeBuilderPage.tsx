'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { ChatWidget } from '@/components/ChatWidget';
import { DashboardSidebar } from '@/components/DashboardSidebar';

import { createRecipeAction, getRecipeDetailsAction } from './actions';
import { CustomizeLabelTab } from './CustomizeLabelTab';
import { NotesAttachmentsTab } from './NotesAttachmentsTab';
import { NutritionBreakdownTab } from './NutritionBreakdownTab';
import { NutritionLabel } from './NutritionLabel';
import { RecipeBuilderTab } from './RecipeBuilderTab';
import { RecipeCostingTab } from './RecipeCostingTab';
import type { RecipeData } from './RecipeSetupTab';
import { RecipeSetupTab } from './RecipeSetupTab';
import { RecipeTabs } from './RecipeTabs';

export const RecipeBuilderPage = () => {
  const searchParams = useSearchParams();
  const recipeId = searchParams?.get('id');

  const [activeTab, setActiveTab] = useState('setup');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [ingredients, setIngredients] = useState<any[]>([]);
  const [recipeLoaded, setRecipeLoaded] = useState(false);
  const [currentRecipeId, setCurrentRecipeId] = useState<number | null>(
    recipeId ? Number.parseInt(recipeId, 10) : null,
  );
  const [recipeData, setRecipeData] = useState<RecipeData>({
    recipeName: '',
    recipeCode: '',
    category: '',
    packages: '1',
    servings: '1',
    servingType: 'packages',
    servingWeight: '',
    servingWeightUnit: 'g',
    isLiquid: false,
    usePercent: false,
  });

  // Load existing recipe if ID is provided (only once)
  useEffect(() => {
    if (recipeId && !recipeLoaded) {
      console.log('[RecipeBuilderPage] Loading recipe with ID:', recipeId);
      const loadRecipe = async () => {
        try {
          const result = await getRecipeDetailsAction(Number.parseInt(recipeId, 10));

          if (result.success && result.data) {
            const { recipe, ingredients } = result.data;

            // Load recipe data
            const loadedRecipeData: RecipeData = {
              recipeName: recipe.name,
              recipeCode: recipe.description || '',
              category: recipe.category || '',
              packages: '1',
              servings: recipe.servings?.toString() || '1',
              servingType: 'packages',
              servingWeight: '',
              servingWeightUnit: 'g',
              isLiquid: false,
              usePercent: false,
            };

            setRecipeData(loadedRecipeData);
            localStorage.setItem('recipeData', JSON.stringify(loadedRecipeData));
            setCurrentRecipeId(recipe.id);
            setRecipeLoaded(true);

            // Load ingredients
            if (ingredients && ingredients.length > 0) {
              const formattedIngredients = ingredients.map((ing: any) => {
                const fdcIdMatch = ing.notes?.match(/FDA ID: (\d+)/);
                return {
                  id: `${ing.id}-loaded`,
                  fdcId: fdcIdMatch ? Number.parseInt(fdcIdMatch[1], 10) : undefined,
                  name: ing.name,
                  amount: ing.quantity,
                  unit: ing.unit || 'g',
                  waste: '0',
                  grams: 0,
                  percentage: 0,
                };
              });

              console.log('[RecipeBuilderPage] Saving loaded ingredients to localStorage:', formattedIngredients);
              localStorage.setItem('recipeIngredients', JSON.stringify(formattedIngredients));

              // Trigger custom event to notify RecipeBuilderTab
              window.dispatchEvent(new CustomEvent('localStorageUpdated', { detail: { key: 'recipeIngredients' } }));
            } else {
              console.log('[RecipeBuilderPage] No ingredients to load, clearing localStorage');
              localStorage.setItem('recipeIngredients', JSON.stringify([]));
              window.dispatchEvent(new CustomEvent('localStorageUpdated', { detail: { key: 'recipeIngredients' } }));
            }
          }
        } catch (error) {
          console.error('Error loading recipe:', error);
        }
      };

      loadRecipe();
    }
  }, [recipeId, recipeLoaded]);

  useEffect(() => {
    // Load recipe data from localStorage
    const savedData = localStorage.getItem('recipeData');
    if (savedData) {
      setRecipeData(JSON.parse(savedData));
    }

    // Load ingredients from localStorage
    const savedIngredients = localStorage.getItem('recipeIngredients');
    if (savedIngredients) {
      setIngredients(JSON.parse(savedIngredients));
    }

    // Listen for localStorage changes
    const handleStorageChange = () => {
      const updatedData = localStorage.getItem('recipeData');
      if (updatedData) {
        setRecipeData(JSON.parse(updatedData));
      }

      const updatedIngredients = localStorage.getItem('recipeIngredients');
      if (updatedIngredients) {
        setIngredients(JSON.parse(updatedIngredients));
      }
    };

    // Listen for custom events
    const handleLocalStorageUpdated = (e: CustomEvent) => {
      if (e.detail.key === 'recipeIngredients') {
        const updatedIngredients = localStorage.getItem('recipeIngredients');
        if (updatedIngredients) {
          const parsed = JSON.parse(updatedIngredients);
          console.log('[RecipeBuilderPage] Custom event received, updating ingredients immediately:', parsed.length);
          setIngredients(parsed);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageUpdated', handleLocalStorageUpdated as EventListener);

    // Poll for changes (since storage event doesn't fire in same tab)
    const interval = setInterval(() => {
      const updatedData = localStorage.getItem('recipeData');
      if (updatedData) {
        const parsed = JSON.parse(updatedData);
        setRecipeData((prev) => {
          const prevString = JSON.stringify(prev);
          if (prevString !== updatedData) {
            console.log('[RecipeBuilderPage] Recipe data changed in localStorage');
            return parsed;
          }
          return prev;
        });
      }

      const updatedIngredients = localStorage.getItem('recipeIngredients');
      if (updatedIngredients) {
        const parsed = JSON.parse(updatedIngredients);
        setIngredients((prev) => {
          // Compare lengths and IDs instead of full JSON string
          if (prev.length !== parsed.length) {
            console.log('[RecipeBuilderPage] Ingredients length changed:', prev.length, '->', parsed.length);
            return parsed;
          }

          // Check if any ingredient IDs changed
          const prevIds = prev.map((i: any) => i.id).sort().join(',');
          const parsedIds = parsed.map((i: any) => i.id).sort().join(',');
          if (prevIds !== parsedIds) {
            console.log('[RecipeBuilderPage] Ingredient IDs changed');
            return parsed;
          }

          // Check if any amounts changed
          const prevAmounts = JSON.stringify(prev.map((i: any) => ({ id: i.id, amount: i.amount })));
          const parsedAmounts = JSON.stringify(parsed.map((i: any) => ({ id: i.id, amount: i.amount })));
          if (prevAmounts !== parsedAmounts) {
            console.log('[RecipeBuilderPage] Ingredient amounts changed');
            return parsed;
          }

          return prev;
        });
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageUpdated', handleLocalStorageUpdated as EventListener);
      clearInterval(interval);
    };
  }, []);

  const handleSaveRecipe = async () => {
    if (!recipeData.recipeName) {
      setSaveMessage('Please enter a recipe name');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setSaving(true);
    setSaveMessage('');

    try {
      console.log('=== Starting Recipe Save ===');
      console.log('Recipe Data:', recipeData);
      console.log('Current Recipe ID:', currentRecipeId);

      const recipePayload = {
        userId: 'user-123', // Replace with actual user ID from auth
        name: recipeData.recipeName,
        description: recipeData.recipeCode,
        servings: Number.parseInt(recipeData.servings, 10) || 1,
        category: recipeData.category,
      };

      console.log('Recipe Payload:', recipePayload);

      // Either update existing recipe or create new one
      const result = currentRecipeId
        ? await (async () => {
          console.log('Updating existing recipe:', currentRecipeId);
          const { updateRecipeAction } = await import('./actions');
          return updateRecipeAction({
            id: currentRecipeId,
            ...recipePayload,
          });
        })()
        : await createRecipeAction(recipePayload);

      console.log('Recipe Save Result:', result);

      if (result.success && result.recipe) {
        console.log('Recipe saved successfully:', result.recipe);

        // Update current recipe ID if this was a new recipe
        if (!currentRecipeId) {
          setCurrentRecipeId(result.recipe.id);
          console.log('Set new recipe ID:', result.recipe.id);
        }

        // Get ingredients from localStorage
        const savedIngredients = localStorage.getItem('recipeIngredients');
        console.log('Ingredients from localStorage:', savedIngredients);

        if (savedIngredients) {
          try {
            const ingredients = JSON.parse(savedIngredients);
            console.log('Parsed ingredients:', ingredients);

            // Save ingredients if there are any
            if (ingredients.length > 0) {
              // First, delete existing ingredients for this recipe (in case of update)
              if (currentRecipeId) {
                console.log('Deleting old ingredients for recipe:', currentRecipeId);
                const { deleteRecipeIngredientsAction } = await import('./actions');
                const deleteResult = await deleteRecipeIngredientsAction(currentRecipeId);
                console.log('Delete ingredients result:', deleteResult);
              }

              const ingredientsPayload = ingredients.map((ing: any, index: number) => ({
                name: ing.name,
                quantity: ing.amount || '0',
                unit: ing.unit || 'g',
                notes: ing.fdcId ? `FDA ID: ${ing.fdcId}` : undefined,
                sortOrder: index,
              }));

              console.log('Ingredients payload:', ingredientsPayload);

              const { addIngredientsAction } = await import('./actions');
              const ingredientsResult = await addIngredientsAction({
                recipeId: result.recipe.id,
                ingredients: ingredientsPayload,
              });

              console.log('Add ingredients result:', ingredientsResult);

              if (ingredientsResult.success) {
                console.log('Ingredients saved successfully!');
              } else {
                console.error('Failed to save ingredients:', ingredientsResult.error);
              }
            } else {
              console.log('No ingredients to save');
            }
          } catch (error) {
            console.error('Failed to save ingredients:', error);
          }
        } else {
          console.log('No ingredients found in localStorage');
        }

        setSaveMessage(`✓ Recipe ${currentRecipeId ? 'updated' : 'saved'} successfully! ID: ${result.recipe.id}`);
        setTimeout(() => setSaveMessage(''), 5000);
      } else {
        console.error('Recipe save failed:', result);
        setSaveMessage(`✗ Failed to save: ${result.error}`);
        setTimeout(() => setSaveMessage(''), 5000);
      }
    } catch (error) {
      console.error('Error saving recipe:', error);
      setSaveMessage('✗ Error saving recipe');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setSaving(false);
      console.log('=== Recipe Save Complete ===');
    }
  };

  const handleNewRecipe = () => {
    console.log('[RecipeBuilderPage] Creating new recipe, clearing all data');

    // Clear all data
    const defaultData = {
      recipeName: '',
      recipeCode: '',
      category: '',
      packages: '1',
      servings: '1',
      servingType: 'packages' as const,
      servingWeight: '',
      servingWeightUnit: 'g',
      isLiquid: false,
      usePercent: false,
    };

    setRecipeData(defaultData);
    setCurrentRecipeId(null);
    localStorage.setItem('recipeData', JSON.stringify(defaultData));
    localStorage.setItem('recipeIngredients', JSON.stringify([]));

    // Trigger custom event to notify all components
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { detail: { key: 'recipeIngredients' } }));
    window.dispatchEvent(new CustomEvent('localStorageUpdated', { detail: { key: 'recipeData' } }));

    console.log('[RecipeBuilderPage] All data cleared');
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        {/* Recipe Header */}
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-700">
                {recipeData.recipeName || 'Untitled Recipe'}
              </h1>
              <button type="button" className="text-slate-600 hover:text-slate-800">
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <span className="text-sm text-slate-500">
                Recipe Code:
                {' '}
                {recipeData.recipeCode || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage}
                </span>
              )}
              <button
                type="button"
                onClick={handleNewRecipe}
                className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                New Recipe
              </button>
              <button
                type="button"
                onClick={handleSaveRecipe}
                disabled={saving}
                className="flex items-center gap-2 rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-gray-400"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {saving ? 'Saving...' : 'Save Recipe'}
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage Recipe
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <RecipeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className={`${activeTab === 'builder' ? 'flex gap-6 p-6' : 'mx-auto max-w-5xl p-6'}`}>
          {activeTab === 'builder' ? (
            <>
              {/* Left: Recipe Builder */}
              <div className="flex-1">
                <RecipeBuilderTab />
              </div>

              {/* Right: Nutrition Label */}
              <div className="w-[320px] shrink-0">
                <div className="sticky top-6">
                  <NutritionLabel
                    ingredients={ingredients.filter(ing => ing.fdcId)}
                    servings={Number.parseInt(recipeData.servings) || 1}
                    servingSize={`${recipeData.servingWeight || '0'}${recipeData.servingWeightUnit || 'g'}`}
                  />
                </div>
              </div>
            </>
          ) : (
            <>
              {activeTab === 'setup' && <RecipeSetupTab />}

              {activeTab === 'customize' && (
                <CustomizeLabelTab
                  ingredients={ingredients.filter(ing => ing.fdcId)}
                  servings={Number.parseInt(recipeData.servings) || 1}
                  servingSize={`${recipeData.servingWeight || '0'}${recipeData.servingWeightUnit || 'g'}`}
                />
              )}

              {activeTab === 'nutrition' && <NutritionBreakdownTab />}

              {activeTab === 'notes' && <NotesAttachmentsTab />}

              {activeTab === 'costing' && <RecipeCostingTab />}
            </>
          )}
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};
