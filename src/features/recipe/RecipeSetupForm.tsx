'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { DashboardSidebar } from '@/components/DashboardSidebar';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { toast } from '@/components/ui/use-toast';

export const RecipeSetupForm = () => {
  const router = useRouter();
  const [recipeName, setRecipeName] = useState('');
  const [recipeCode, setRecipeCode] = useState('');
  const [category, setCategory] = useState('');
  const [packages, setPackages] = useState('1');
  const [servings, setServings] = useState('1');
  const [isLiquid, setIsLiquid] = useState(false);
  const [usePercent, setUsePercent] = useState(false);
  const [generalInfoOpen, setGeneralInfoOpen] = useState(true);
  const [servingSizeOpen, setServingSizeOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [errors, setErrors] = useState({ recipeName: false, category: false });
  const [showFormError, setShowFormError] = useState(false);

  const handleContinue = () => {
    const newErrors = {
      recipeName: !recipeName.trim(),
      category: !category,
    };

    setErrors(newErrors);

    if (newErrors.recipeName || newErrors.category) {
      setShowFormError(true);
      return;
    }

    setShowFormError(false);

    // Save recipe data to localStorage
    const recipeData = {
      recipeName,
      recipeCode,
      category,
      packages,
      servings,
      isLiquid,
      usePercent,
    };
    localStorage.setItem('recipeData', JSON.stringify(recipeData));

    // Show success toast
    toast({
      title: 'Your recipe has been created successfully!',
    });

    // Navigate after a short delay to allow toast to appear
    setTimeout(() => {
      router.push('/recipe-builder');
    }, 500);
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      <div className="ml-[220px] flex-1">
        <div className="mx-auto max-w-5xl p-6">
          <h1 className="mb-6 text-3xl font-bold text-slate-700">Set up your recipe</h1>

          <div className="mb-6 rounded-lg border border-slate-200 bg-white">
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
                      value={recipeName}
                      onChange={(e) => {
                        setRecipeName(e.target.value);
                        if (errors.recipeName) {
                          setErrors({ ...errors, recipeName: false });
                          setShowFormError(false);
                        }
                      }}
                      placeholder="Type your recipe name here"
                      className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-1 ${
                        errors.recipeName
                          ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                          : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                      }`}
                    />
                    {errors.recipeName && (
                      <p className="mt-1 text-sm text-red-500">Name is required</p>
                    )}
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
                      value={recipeCode}
                      onChange={e => setRecipeCode(e.target.value)}
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
                    value={category}
                    onChange={(e) => {
                      setCategory(e.target.value);
                      if (errors.category) {
                        setErrors({ ...errors, category: false });
                        setShowFormError(false);
                      }
                    }}
                    className={`w-full rounded border px-3 py-2 focus:outline-none focus:ring-1 ${
                      errors.category
                        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
                        : 'border-slate-300 focus:border-teal-500 focus:ring-teal-500'
                    }`}
                  >
                    <option value="">Select category</option>
                    <option value="baked-goods">Baked Goods</option>
                    <option value="beverages">Beverages</option>
                    <option value="confectionery">Confectionery</option>
                    <option value="cooked-meals">Cooked Meals, Salads, & Sauces</option>
                    <option value="dairy">Dairy</option>
                    <option value="snacks">Snacks</option>
                  </select>
                  {errors.category && (
                    <p className="mt-1 text-sm text-red-500">Category is required</p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 rounded-lg border border-slate-200 bg-white">
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
                      value={packages}
                      onChange={e => setPackages(e.target.value)}
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
                      value={servings}
                      onChange={e => setServings(e.target.value)}
                      min="1"
                      className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mb-6 rounded-lg border border-slate-200 bg-white">
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
                      checked={isLiquid}
                      onChange={e => setIsLiquid(e.target.checked)}
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
                      checked={usePercent}
                      onChange={e => setUsePercent(e.target.checked)}
                      className="peer sr-only"
                    />
                    <div className="peer h-6 w-11 rounded-full bg-slate-300 after:absolute after:left-[2px] after:top-[2px] after:size-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-teal-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500" />
                  </label>
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col items-center py-8">
            <button
              type="button"
              onClick={handleContinue}
              className={buttonVariants({
                size: 'lg',
                className: 'bg-teal-700 hover:bg-teal-800 text-white px-12',
              })}
            >
              Continue
            </button>
            {showFormError && (
              <p className="mt-2 text-sm text-red-500">Fill in the required fields</p>
            )}
          </div>
        </div>
      </div>

      <div className="fixed bottom-6 right-6">
        <button type="button" className="relative flex size-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg hover:bg-teal-800">
          <svg className="size-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold">
            2
          </span>
        </button>
      </div>
    </div>
  );
};
