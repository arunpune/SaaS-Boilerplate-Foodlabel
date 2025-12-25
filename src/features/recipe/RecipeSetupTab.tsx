'use client';

import { useEffect, useState } from 'react';

export interface RecipeData {
  recipeName: string;
  recipeCode: string;
  category: string;
  packages: string;
  servings: string;
  isLiquid: boolean;
  usePercent: boolean;
}

const defaultRecipeData: RecipeData = {
  recipeName: '',
  recipeCode: '',
  category: '',
  packages: '1',
  servings: '1',
  isLiquid: false,
  usePercent: false,
};

export const RecipeSetupTab = () => {
  const [recipeData, setRecipeData] = useState<RecipeData>(defaultRecipeData);
  const [generalInfoOpen, setGeneralInfoOpen] = useState(true);
  const [servingSizeOpen, setServingSizeOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  useEffect(() => {
    // Load recipe data from localStorage
    const savedData = localStorage.getItem('recipeData');
    if (savedData) {
      setRecipeData(JSON.parse(savedData));
    }
  }, []);

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('recipeData', JSON.stringify(recipeData));
    
    // Show success message
    alert('Recipe saved successfully!');
  };

  const updateField = (field: keyof RecipeData, value: string | boolean) => {
    const updatedData = { ...recipeData, [field]: value };
    setRecipeData(updatedData);
    // Auto-save to localStorage on change
    localStorage.setItem('recipeData', JSON.stringify(updatedData));
  };

  return (
    <div className="space-y-6">
      {/* Recipe General Info */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setGeneralInfoOpen(!generalInfoOpen)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <h2 className="text-xl font-semibold text-slate-700">Recipe General Info</h2>
          <svg
            className={`size-5 transition-transform ${generalInfoOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {generalInfoOpen && (
          <div className="space-y-4 border-t border-slate-200 p-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1 block text-sm font-semibold text-slate-700">
                  Recipe Name
                  <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={recipeData.recipeName}
                  onChange={e => updateField('recipeName', e.target.value)}
                  placeholder="Type your recipe name here"
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-1 flex items-center gap-1 text-sm font-semibold text-slate-700">
                  Recipe Code
                  <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </label>
                <input
                  type="text"
                  value={recipeData.recipeCode}
                  onChange={e => updateField('recipeCode', e.target.value)}
                  placeholder="Type your recipe code here"
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-sm font-semibold text-slate-700">
                Recipe Category
                <span className="text-red-500">*</span>
              </label>
              <p className="mb-2 text-xs text-slate-500">Select a category to organize your recipes</p>
              <select
                value={recipeData.category}
                onChange={e => updateField('category', e.target.value)}
                className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="">Select category</option>
                <option value="baked-goods">Baked Goods</option>
                <option value="beverages">Beverages</option>
                <option value="confectionery">Confectionery</option>
                <option value="cooked-meals">Cooked Meals, Salads, & Sauces</option>
                <option value="dairy">Dairy</option>
                <option value="snacks">Snacks</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Serving Size */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setServingSizeOpen(!servingSizeOpen)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <h2 className="text-xl font-semibold text-slate-700">Serving Size</h2>
          <svg
            className={`size-5 transition-transform ${servingSizeOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {servingSizeOpen && (
          <div className="space-y-4 border-t border-slate-200 p-4">
            <p className="text-sm text-slate-600">
              <span className="text-red-500">*</span>
              {' '}
              Specify the number of servings the recipe makes OR fix a specific serving weight
            </p>

            <div className="space-y-3">
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="servingType"
                  defaultChecked
                  className="size-4 text-teal-600"
                />
                <span className="text-sm font-medium text-slate-700">Specify number of packages and servings</span>
              </label>
              <label className="flex items-center gap-3">
                <input
                  type="radio"
                  name="servingType"
                  className="size-4 text-teal-600"
                />
                <span className="text-sm font-medium text-slate-700">Specify serving size weight</span>
              </label>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs text-slate-500">
                  How many units of sealable items (i.e. bottle or packet) does this recipe make?
                </label>
                <input
                  type="number"
                  value={recipeData.packages}
                  onChange={e => updateField('packages', e.target.value)}
                  min="1"
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
              <div>
                <label className="mb-2 block text-xs text-slate-500">
                  The number of servings that each package of your product has.
                </label>
                <input
                  type="number"
                  value={recipeData.servings}
                  onChange={e => updateField('servings', e.target.value)}
                  min="1"
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Advanced Setup */}
      <div className="rounded-lg border border-slate-200 bg-white">
        <button
          type="button"
          onClick={() => setAdvancedOpen(!advancedOpen)}
          className="flex w-full items-center justify-between p-4 text-left"
        >
          <h2 className="text-xl font-semibold text-slate-700">Advanced Setup</h2>
          <svg
            className={`size-5 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {advancedOpen && (
          <div className="space-y-4 border-t border-slate-200 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Is Your Recipe Liquid?</span>
                <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={recipeData.isLiquid}
                  onChange={e => updateField('isLiquid', e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500" />
              </label>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-slate-700">Input Recipe Ingredients In Percent</span>
                <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input
                  type="checkbox"
                  checked={recipeData.usePercent}
                  onChange={e => updateField('usePercent', e.target.checked)}
                  className="peer sr-only"
                />
                <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500" />
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="flex justify-center py-4">
        <button
          type="button"
          onClick={handleSave}
          className="rounded bg-teal-700 px-12 py-2 font-semibold text-white hover:bg-teal-800"
        >
          Save
        </button>
      </div>
    </div>
  );
};
