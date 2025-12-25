'use client';

import Link from 'next/link';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/buttonVariants';

import { IngredientSearch } from './IngredientSearch';

interface Ingredient {
  id: string;
  fdcId?: number;
  name: string;
  amount: string;
  unit: string;
  waste: string;
  grams: number;
  percentage: number;
}

export const RecipeBuilderTab = () => {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customIngredientName, setCustomIngredientName] = useState('');

  const handleSelectIngredient = (food: any) => {
    const newIngredient: Ingredient = {
      id: `${food.fdcId}-${Date.now()}`,
      fdcId: food.fdcId,
      name: food.description,
      amount: '',
      unit: 'g',
      waste: '0',
      grams: 0,
      percentage: 0,
    };
    setIngredients([...ingredients, newIngredient]);
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
    setIngredients(ingredients.map(ing => 
      ing.id === id ? { ...ing, [field]: value } : ing,
    ));
  };

  const calculateTotals = () => {
    const totalGrams = ingredients.reduce((sum, ing) => sum + (ing.grams || 0), 0);
    const totalPercentage = ingredients.reduce((sum, ing) => sum + (ing.percentage || 0), 0);
    return { totalGrams, totalPercentage };
  };

  const { totalGrams, totalPercentage } = calculateTotals();

  return (
    <div className="space-y-6">
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
                />
              </td>
              <td className="py-3 pr-4">
                <input
                  type="text"
                  className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </td>
              <td className="py-3 pr-4">
                <select className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
                  <option>g</option>
                  <option>kg</option>
                  <option>ml</option>
                  <option>l</option>
                </select>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1">
                  <input
                    type="text"
                    defaultValue="0"
                    className="w-16 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
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
            {ingredients.map((ingredient) => (
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
                    onChange={(e) => updateIngredient(ingredient.id, 'amount', e.target.value)}
                    className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </td>
                <td className="py-3 pr-4">
                  <select
                    value={ingredient.unit}
                    onChange={(e) => updateIngredient(ingredient.id, 'unit', e.target.value)}
                    className="w-24 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  >
                    <option>g</option>
                    <option>kg</option>
                    <option>ml</option>
                    <option>l</option>
                    <option>oz</option>
                    <option>lb</option>
                  </select>
                </td>
                <td className="py-3 pr-4">
                  <div className="flex items-center gap-1">
                    <input
                      type="number"
                      value={ingredient.waste}
                      onChange={(e) => updateIngredient(ingredient.id, 'waste', e.target.value)}
                      className="w-16 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <span className="text-sm text-slate-500">%</span>
                  </div>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm text-slate-700">{ingredient.grams.toFixed(2)}</span>
                </td>
                <td className="py-3 pr-4">
                  <span className="text-sm text-slate-700">{ingredient.percentage.toFixed(1)}%</span>
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
            <span className="text-sm text-slate-700">{totalPercentage.toFixed(1)}%</span>
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
                onChange={(e) => setCustomIngredientName(e.target.value)}
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
