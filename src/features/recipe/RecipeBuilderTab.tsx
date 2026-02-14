'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { buttonVariants } from '@/components/ui/buttonVariants';

import { IngredientSearch } from './IngredientSearch';

type Ingredient = {
  id: string;
  fdcId?: number;
  name: string;
  amount: string;
  unit: string;
  waste: string;
  grams: number;
  percentage: number;
};

const STORAGE_KEY = 'recipeIngredients';

export const RecipeBuilderTab = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customIngredientName, setCustomIngredientName] = useState('');

  // Load ingredients from localStorage on mount AND when tab becomes visible
  useEffect(() => {
    console.log('[RecipeBuilderTab] Component mounted or tab switched, loading ingredients...');
    const loadIngredients = () => {
      const savedIngredients = localStorage.getItem(STORAGE_KEY);
      console.log('[RecipeBuilderTab] Saved ingredients from localStorage:', savedIngredients);

      if (savedIngredients) {
        try {
          const parsed = JSON.parse(savedIngredients);
          console.log('[RecipeBuilderTab] Parsed ingredients:', parsed);
          setIngredients(parsed);
        } catch (error) {
          console.error('[RecipeBuilderTab] Failed to load ingredients:', error);
        }
      } else {
        console.log('[RecipeBuilderTab] No saved ingredients found');
        setIngredients([]);
      }
    };

    // Load on mount/tab switch
    loadIngredients();

    // Also reload when visibility changes (tab switching)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        console.log('[RecipeBuilderTab] Tab became visible, reloading ingredients');
        loadIngredients();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Listen for storage changes from other components
    const handleStorageChange = (e: StorageEvent) => {
      console.log('[RecipeBuilderTab] Storage event:', e.key, e.newValue);
      if (e.key === STORAGE_KEY && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          console.log('[RecipeBuilderTab] Updating from storage event:', parsed);
          setIngredients(parsed);
        } catch (error) {
          console.error('[RecipeBuilderTab] Failed to parse storage change:', error);
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      console.log('[RecipeBuilderTab] Component unmounting');
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  // Save ingredients to localStorage whenever they change
  useEffect(() => {
    console.log('[RecipeBuilderTab] Ingredients changed, saving to localStorage:', ingredients);
    const currentData = JSON.stringify(ingredients);
    const existingData = localStorage.getItem(STORAGE_KEY);

    // Only save if data actually changed
    if (currentData !== existingData) {
      localStorage.setItem(STORAGE_KEY, currentData);

      // Dispatch custom event for same-tab updates (for parent components)
      window.dispatchEvent(new CustomEvent('localStorageUpdated', { detail: { key: STORAGE_KEY } }));

      console.log('[RecipeBuilderTab] Saved to localStorage');
    } else {
      console.log('[RecipeBuilderTab] Data unchanged, skipping save');
    }
  }, [ingredients]);

  const handleSelectIngredient = (food: any) => {
    console.log('[RecipeBuilderTab] ==> Adding ingredient:', food);
    console.log('[RecipeBuilderTab] Current ingredients before add:', ingredients);
    console.log('[RecipeBuilderTab] Ingredients count before:', ingredients.length);

    const newIngredient: Ingredient = {
      id: `${food.fdcId}-${Date.now()}`,
      fdcId: food.fdcId,
      name: food.description,
      amount: '100',
      unit: 'g',
      waste: '0',
      grams: 100,
      percentage: 0,
    };
    const updatedIngredients = [...ingredients, newIngredient];
    console.log('[RecipeBuilderTab] Updated ingredients after add:', updatedIngredients);
    console.log('[RecipeBuilderTab] Ingredients count after:', updatedIngredients.length);
    console.log('[RecipeBuilderTab] Calling setIngredients...');
    setIngredients(updatedIngredients);
    console.log('[RecipeBuilderTab] ==> setIngredients called successfully');
  };

  const handleAddCustomIngredient = () => {
    setShowCustomModal(true);
  };

  const handleSaveCustomIngredient = () => {
    if (customIngredientName.trim()) {
      const newIngredient: Ingredient = {
        id: `custom-${Date.now()}`,
        name: customIngredientName,
        amount: '',
        unit: 'g',
        waste: '0',
        grams: 0,
        percentage: 0,
      };
      setIngredients([...ingredients, newIngredient]);
      setCustomIngredientName('');
      setShowCustomModal(false);
    }
  };

  const handleRemoveIngredient = (id: string) => {
    setIngredients(ingredients.filter(ing => ing.id !== id));
  };

  const updateIngredient = (id: string, field: keyof Ingredient, value: string | number) => {
    setIngredients(ingredients.map((ing) => {
      if (ing.id === id) {
        const updated = { ...ing, [field]: value };

        // Calculate grams based on amount and waste percentage
        // Formula: grams = amount - (amount * waste% / 100)
        if (field === 'amount' || field === 'waste') {
          const amount = field === 'amount' ? Number.parseFloat(value as string) : Number.parseFloat(updated.amount);
          const waste = field === 'waste' ? Number.parseFloat(value as string) : Number.parseFloat(updated.waste);
          const wasteAmount = (amount * waste) / 100;
          updated.grams = isNaN(amount) ? 0 : amount - wasteAmount;
        }

        return updated;
      }
      return ing;
    }));
  };

  const calculateTotals = () => {
    // Calculate total grams (after waste removal)
    const totalGrams = ingredients.reduce((sum, ing) => {
      const amount = Number.parseFloat(ing.amount) || 0;
      const waste = Number.parseFloat(ing.waste) || 0;
      const wasteAmount = (amount * waste) / 100;
      const grams = amount - wasteAmount;
      return sum + grams;
    }, 0);

    // Calculate percentage for each ingredient based on grams after waste
    const ingredientsWithPercentage = ingredients.map((ing) => {
      const amount = Number.parseFloat(ing.amount) || 0;
      const waste = Number.parseFloat(ing.waste) || 0;
      const wasteAmount = (amount * waste) / 100;
      const grams = amount - wasteAmount;
      const percentage = totalGrams > 0 ? (grams / totalGrams) * 100 : 0;
      return { ...ing, percentage, grams };
    });

    return {
      totalGrams,
      totalPercentage: 100,
      ingredientsWithPercentage,
    };
  };

  const { totalGrams, totalPercentage, ingredientsWithPercentage } = calculateTotals();

  console.log('[RecipeBuilderTab] Render - ingredients count:', ingredients.length);
  console.log('[RecipeBuilderTab] Render - ingredientsWithPercentage count:', ingredientsWithPercentage.length);

  // Handler to add sample ingredients
  const handleAddSampleIngredients = () => {
    console.log('[RecipeBuilderTab] Adding sample ingredients...');

    // Sample ingredients with real USDA FDC IDs
    const sampleIngredients = [
      {
        fdcId: 169225,
        description: 'Tomatoes, raw',
      },
      {
        fdcId: 171477,
        description: 'Chicken, broilers or fryers, breast, meat only, cooked, roasted',
      },
      {
        fdcId: 171413,
        description: 'Oil, olive, salad or cooking',
      },
    ];

    // Create all sample ingredients
    const newIngredients = sampleIngredients.map(sampleFood => ({
      id: `${sampleFood.fdcId}-${Date.now()}-${Math.random()}`,
      fdcId: sampleFood.fdcId,
      name: sampleFood.description,
      amount: '100',
      unit: 'g',
      waste: '0',
      grams: 100,
      percentage: 0,
    }));

    // Add all at once
    setIngredients(prev => [...prev, ...newIngredients]);
    console.log('[RecipeBuilderTab] Sample ingredients added:', newIngredients);
  };

  return (
    <div className="space-y-6">
      {/* Debug Info */}
      <div className="rounded-lg border-2 border-blue-300 bg-blue-50 p-4">
        <h3 className="mb-2 font-semibold text-blue-900">Debug Info (Remove in production)</h3>
        <div className="text-sm text-blue-800">
          <p>
            <strong>Ingredients in state:</strong>
            {' '}
            {ingredients.length}
          </p>
          <p>
            <strong>ingredientsWithPercentage:</strong>
            {' '}
            {ingredientsWithPercentage.length}
          </p>
          <p>
            <strong>LocalStorage key:</strong>
            {' '}
            {STORAGE_KEY}
          </p>
          <p>
            <strong>Saved ingredients:</strong>
            {' '}
            {localStorage.getItem(STORAGE_KEY) ? JSON.parse(localStorage.getItem(STORAGE_KEY)!).length : 0}
          </p>
          <p className="mt-2 text-xs"><em>Use the "Add 3 Sample Ingredients" button below to test</em></p>
          <p><strong>Ingredients list:</strong></p>
          <ul className="ml-4 list-disc">
            {ingredients.map(ing => (
              <li key={ing.id}>
                {ing.name}
                {' '}
                -
                {' '}
                {ing.amount}
                {ing.unit}
                {' '}
                -
                {ing.percentage.toFixed(2)}
                %
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Quick Add Sample Button */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-4">
        <div>
          <h3 className="font-semibold text-slate-700">Demo Mode</h3>
          <p className="text-sm text-slate-600">Add sample ingredients to test nutrition calculations</p>
        </div>
        <button
          type="button"
          onClick={handleAddSampleIngredients}
          className="flex items-center gap-2 rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700"
        >
          <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add 3 Sample Ingredients
        </button>
      </div>

      {/* Ingredients Table */}
      <div className="overflow-visible">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-slate-300">
              <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                Ingredient
                <span className="text-red-500">*</span>
              </th>
              <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                Amount
                <span className="text-red-500">*</span>
              </th>
              <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                Unit
                <span className="text-red-500">*</span>
              </th>
              <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                <div className="flex items-center gap-1">
                  Waste
                  <span className="text-red-500">*</span>
                  <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </th>
              <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">Grams</th>
              <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">Percentage</th>
              <th className="pb-3 text-left text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {/* Search Row */}
            <tr className="border-b border-slate-200">
              <td className="py-3 pr-4">
                <IngredientSearch
                  onSelectIngredient={handleSelectIngredient}
                  onAddCustomIngredient={handleAddCustomIngredient}
                />
              </td>
              <td className="py-3 pr-4">
                <input
                  type="number"
                  placeholder=""
                  className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  disabled
                />
              </td>
              <td className="py-3 pr-4">
                <select className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500" disabled>
                  <option>g</option>
                  <option>kg</option>
                  <option>mg</option>
                  <option>oz</option>
                  <option>lb</option>
                </select>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    defaultValue="0"
                    className="w-16 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    disabled
                  />
                  <span className="text-sm text-slate-500">%</span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className="text-sm text-slate-500">-</span>
              </td>
              <td className="py-3 pr-4">
                <span className="text-sm text-slate-500">-</span>
              </td>
              <td className="py-3">
                <span className="text-sm text-slate-500">-</span>
              </td>
            </tr>

            {/* Added Ingredients */}
            {ingredientsWithPercentage.map(ingredient => (
              <tr key={ingredient.id} className="border-b border-slate-200">
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-2">
                    {ingredient.fdcId && (
                      <span className="rounded bg-teal-100 px-2 py-0.5 text-xs font-medium text-teal-700">
                        {ingredient.fdcId}
                      </span>
                    )}
                    <span className="text-sm text-slate-700">{ingredient.name}</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <input
                    type="number"
                    value={ingredient.amount}
                    onChange={e => updateIngredient(ingredient.id, 'amount', e.target.value)}
                    className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </td>
                <td className="py-3 pr-4">
                  <select
                    value={ingredient.unit}
                    onChange={e => updateIngredient(ingredient.id, 'unit', e.target.value)}
                    className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option>g</option>
                    <option>kg</option>
                    <option>mg</option>
                    <option>oz</option>
                    <option>lb</option>
                    <option>ml</option>
                    <option>l</option>
                  </select>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={ingredient.waste}
                      onChange={e => updateIngredient(ingredient.id, 'waste', e.target.value)}
                      className="w-16 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm text-slate-700">{ingredient.grams.toFixed(2)}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm text-slate-700">
                    {ingredient.percentage.toFixed(1)}
                    %
                  </span>
                </td>
                <td className="py-3">
                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(ingredient.id)}
                    className="text-red-500 hover:text-red-700"
                    title="Remove ingredient"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Gross Totals */}
      <div className="flex items-center border-t border-slate-200 pt-4">
        <div className="w-1/3">
          <span className="text-sm font-semibold text-slate-700">Gross Totals</span>
        </div>
        <div className="flex w-2/3 gap-4">
          <div className="flex-1">
            <span className="text-sm text-slate-700">{totalGrams.toFixed(2)}</span>
          </div>
          <div className="flex-1">
            <span className="text-sm text-slate-700">
              {totalPercentage.toFixed(1)}
              %
            </span>
          </div>
        </div>
      </div>

      {/* Recipe Yield Adjustments */}
      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Recipe Yield Adjustments</span>
          <Link href="#" className="text-sm text-teal-600 hover:text-teal-700 hover:underline">
            Edit
          </Link>
        </div>
        <div className="mt-2">
          <span className="text-2xl font-semibold text-slate-700">0</span>
        </div>
      </div>

      {/* Recipe Tags */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <svg className="size-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          <h3 className="text-lg font-semibold text-slate-700">Recipe Tags</h3>
          <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800"
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Tag
        </button>
      </div>

      {/* Possible Nutrition Claims */}
      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="mb-2 flex items-center gap-2">
          <h3 className="text-lg font-semibold text-slate-700">Possible Nutrition Claims</h3>
          <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
        </div>
        <p className="mb-4 text-xs italic text-slate-500">*Based on FDA Nutrition Claim Thresholds</p>
        <p className="text-sm text-slate-600">No possible nutrition claims yet</p>
      </div>

      {/* Subscription Banner */}
      <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-6">
        <div className="flex items-center gap-3">
          <svg className="size-8 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <div>
            <h4 className="text-lg font-semibold text-slate-700">Subscribe to a plan to unlock all features</h4>
            <p className="text-sm text-slate-600">Get 15% off Yearly Subscription</p>
          </div>
        </div>
        <Link
          href="/pricing"
          className={buttonVariants({
            className: 'bg-red-400 hover:bg-red-500 text-white px-8',
          })}
        >
          Subscribe Now
        </Link>
      </div>

      {/* Custom Ingredient Modal */}
      {showCustomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-xl">
            <h3 className="mb-4 text-lg font-semibold text-slate-700">Add Custom Ingredient</h3>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Ingredient Name
              </label>
              <input
                type="text"
                value={customIngredientName}
                onChange={e => setCustomIngredientName(e.target.value)}
                placeholder="Enter ingredient name"
                className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                autoFocus
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowCustomModal(false);
                  setCustomIngredientName('');
                }}
                className="rounded border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSaveCustomIngredient}
                className="rounded bg-teal-700 px-4 py-2 text-sm font-medium text-white hover:bg-teal-800"
              >
                Add Ingredient
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
