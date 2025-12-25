'use client';

import Link from 'next/link';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/buttonVariants';

import { ShowHideNutrientsContent } from './ShowHideNutrientsContent';

export const CustomizeLabelTab = () => {
  const [activeSubTab, setActiveSubTab] = useState('style');
  const [labelStyle, setLabelStyle] = useState('Standard FDA Label');
  const [servingSize, setServingSize] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('english');
  const [ingredientsList, setIngredientsList] = useState('Maple Sugar, Milk');
  const [selectedAllergens, setSelectedAllergens] = useState<string[]>(['Milk']);
  const [allergenStatements, setAllergenStatements] = useState('');
  const [aggregateSubRecipes, setAggregateSubRecipes] = useState(false);

  const subTabs = [
    { id: 'style', label: 'Choose Label Style' },
    { id: 'front', label: 'Front of Pack Label' },
    { id: 'nutrients', label: 'Show/Hide Nutrients' },
    { id: 'language', label: 'Change Language' },
    { id: 'override', label: 'Manual Label Override' },
    { id: 'ingredients', label: 'Edit Ingredients/Allergens' },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-slate-700">Customize your label</h2>
        <div className="flex gap-2">
          <button
            type="button"
            className={buttonVariants({
              className: 'bg-red-400 hover:bg-red-500 text-white px-6',
            })}
          >
            Save
          </button>
          <button
            type="button"
            className="rounded border border-slate-300 bg-white px-6 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Sub Tabs */}
      <div className="border-b border-slate-200">
        <div className="flex gap-8 overflow-x-auto">
          {subTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              className={`whitespace-nowrap border-b-2 pb-3 text-sm font-medium transition-colors ${
                activeSubTab === tab.id
                  ? 'border-slate-700 text-slate-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      <div className={activeSubTab === 'nutrients' ? '' : 'grid grid-cols-1 gap-6 lg:grid-cols-2'}>
        {/* Left Side - Settings */}
        <div className="space-y-6">
          {activeSubTab === 'style' && (
            <>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700">
                  Choose your label style
                </label>
                <select
                  value={labelStyle}
                  onChange={(e) => setLabelStyle(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                >
                  <option>Standard FDA Label</option>
                  <option>🇺🇸 USA (FDA)</option>
                  <option>🇬🇧 UK (FSA)</option>
                  <option>🇨🇦 Canadian (CFIA)</option>
                  <option>🇦🇺 Australia & New Zealand (FSANZ)</option>
                  <option>🇪🇺 EU (DG SANTE)</option>
                  <option>🇲🇽 Mexico (COFEPRIS)</option>
                </select>
              </div>

              <div>
                <label className="mb-2 flex items-center gap-1 text-sm font-medium text-slate-700">
                  Suggested Serving Size
                  <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </label>
                <input
                  type="text"
                  value={servingSize}
                  onChange={(e) => setServingSize(e.target.value)}
                  className="w-full rounded border border-slate-300 px-3 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Enter serving size"
                />
              </div>

              <button
                type="button"
                className="text-sm text-slate-600 hover:text-slate-800 hover:underline"
              >
                Reset
              </button>
            </>
          )}

          {activeSubTab === 'front' && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
              <p className="text-slate-600">Front of Pack Label settings</p>
            </div>
          )}

          {activeSubTab === 'nutrients' && <ShowHideNutrientsContent />}

          {activeSubTab === 'language' && (
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value="english"
                    checked={selectedLanguage === 'english'}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="size-5 border-slate-300 text-teal-700 focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-base text-slate-700">English</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value="arabic"
                    checked={selectedLanguage === 'arabic'}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="size-5 border-slate-300 text-teal-700 focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-base text-slate-700">Arabic</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="language"
                    value="spanish"
                    checked={selectedLanguage === 'spanish'}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="size-5 border-slate-300 text-teal-700 focus:ring-2 focus:ring-teal-500"
                  />
                  <span className="text-base text-slate-700">Spanish</span>
                </label>
              </div>

              <button
                type="button"
                onClick={() => setSelectedLanguage('english')}
                className="text-sm text-slate-400 hover:text-slate-600 hover:underline"
              >
                Reset
              </button>
            </div>
          )}

          {activeSubTab === 'override' && (
            <div className="space-y-6">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-6">
                <p className="text-sm leading-relaxed text-slate-700">
                  Utilize this manual override feature to get full control over the nutrition label, allowing you to input and display your preferred values. Please bear in mind that the values entered through this feature <span className="italic">are not subject to validation</span> by our software. This feature is available to provide you with complete flexibility for making final adjustments to your label.
                </p>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold text-slate-900">Nutrition Facts</h3>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <tbody className="divide-y divide-slate-200">
                      {/* Serving */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Serving</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            defaultValue="1 Serving Per Container"
                            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3" />
                      </tr>

                      {/* Serving Size */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Serving Size</td>
                        <td className="px-4 py-3">
                          <input
                            type="text"
                            defaultValue="0g"
                            className="w-full rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3" />
                      </tr>

                      {/* Saturated Fat */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Saturated Fat</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">g</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Trans Fat */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Trans Fat</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">g</span>
                        </td>
                        <td className="px-4 py-3" />
                      </tr>

                      {/* Cholesterol */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Cholesterol</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">mg</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Sodium */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Sodium</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">mg</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Dietary Fiber */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Dietary Fiber</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">g</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Total Sugars */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Total Sugars</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3" />
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">g</span>
                        </td>
                        <td className="px-4 py-3" />
                      </tr>

                      {/* Added Sugars */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Added Sugars</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">g</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Protein */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Protein</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">g</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Vitamin D */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Vitamin D</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">mcg</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Calcium */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Calcium</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">mg</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Iron */}
                      <tr className="bg-slate-50">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Iron</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">mg</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>

                      {/* Potassium */}
                      <tr className="bg-white">
                        <td className="px-4 py-3 text-sm font-medium text-slate-700">Potassium</td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">mg</span>
                        </td>
                        <td className="px-4 py-3">
                          <input
                            type="number"
                            defaultValue="0"
                            className="w-20 rounded border border-slate-300 px-3 py-1.5 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          />
                        </td>
                        <td className="px-4 py-3">
                          <span className="inline-block rounded bg-slate-200 px-3 py-1.5 text-sm text-slate-600">%</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeSubTab === 'ingredients' && (
            <div className="space-y-8">
              {/* Note */}
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm italic text-slate-700">
                  *Note: Please keep in mind that if you make any future changes to your recipe, the ingredient and allergen statements will automatically reset
                </p>
              </div>

              {/* Edit Ingredients List */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900">Edit Ingredients List</h3>
                <textarea
                  value={ingredientsList}
                  onChange={(e) => setIngredientsList(e.target.value)}
                  rows={4}
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Enter ingredients..."
                />
                <button
                  type="button"
                  onClick={() => setIngredientsList('Maple Sugar, Milk')}
                  className="text-sm text-slate-400 hover:text-slate-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Edit Allergens */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-slate-900">Edit Allergens</h3>
                  <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  {selectedAllergens.map((allergen) => (
                    <span
                      key={allergen}
                      className="inline-flex items-center gap-1.5 rounded bg-slate-100 px-3 py-1.5 text-sm text-slate-700"
                    >
                      {allergen}
                      <button
                        type="button"
                        onClick={() => setSelectedAllergens(selectedAllergens.filter(a => a !== allergen))}
                        className="text-slate-400 hover:text-slate-600"
                      >
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    placeholder="Select allergens"
                    className="flex-1 min-w-[200px] rounded border border-slate-300 px-3 py-1.5 text-sm text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedAllergens(['Milk'])}
                  className="text-sm text-slate-400 hover:text-slate-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Add Additional Allergen Statements */}
              <div className="space-y-3">
                <h3 className="text-base font-semibold text-slate-900">Add Additional Allergen Statements (ex. May Contain Statements)</h3>
                <textarea
                  value={allergenStatements}
                  onChange={(e) => setAllergenStatements(e.target.value)}
                  rows={6}
                  className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  placeholder="Enter additional allergen statements..."
                />
                <button
                  type="button"
                  onClick={() => setAllergenStatements('')}
                  className="text-sm text-slate-400 hover:text-slate-600 hover:underline"
                >
                  Reset
                </button>
              </div>

              {/* Aggregate Sub-Recipes Ingredients */}
              <div className="flex items-center gap-3 border-t border-slate-200 pt-6">
                <button
                  type="button"
                  onClick={() => setAggregateSubRecipes(!aggregateSubRecipes)}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                    aggregateSubRecipes ? 'bg-teal-700' : 'bg-slate-300'
                  }`}
                >
                  <span
                    className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                      aggregateSubRecipes ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
                <div className="flex items-center gap-2">
                  <span className="text-base font-medium text-slate-700">Aggregate Sub-Recipes Ingredients</span>
                  <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Banner */}
          <div className="mt-8 rounded-lg border border-slate-200 bg-amber-50 p-6">
            <div className="flex items-start gap-4">
              <svg className="size-8 shrink-0 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900">Subscribe to a plan to unlock all features</h3>
                <p className="mt-1 text-sm text-slate-600">Get 15% off Yearly Subscription</p>
                <Link
                  href="/pricing"
                  className={buttonVariants({
                    className: 'mt-4 bg-red-400 hover:bg-red-500 text-white px-6',
                  })}
                >
                  Subscribe Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Nutrition Facts Preview */}
        {activeSubTab !== 'nutrients' && (
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-lg border-4 border-black bg-white p-4 font-sans">
            <div className="border-b-8 border-black pb-1">
              <h2 className="text-4xl font-black">Nutrition Facts</h2>
              <p className="text-sm">1 Serving Per Container</p>
            </div>
            
            <div className="border-b-4 border-black py-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold">Serving Size</span>
                <span className="text-xl font-bold">0g</span>
              </div>
            </div>

            <div className="border-b-8 border-black py-1">
              <div className="flex items-baseline justify-between">
                <span className="text-sm font-bold">Amount Per Serving</span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-3xl font-black">Calories</span>
                <div className="flex items-center gap-2">
                  <svg className="size-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="border-b border-black py-1 text-right text-xs font-bold">
              % Daily Value *
            </div>

            <div className="space-y-1 border-b-4 border-black py-2 text-sm">
              <div className="flex items-center justify-between border-b border-black py-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Total Fat</span>
                  <svg className="size-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="size-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between pl-4 text-xs">
                <span>Saturated Fat 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between pl-4 text-xs italic">
                <span>Trans Fat 0g</span>
              </div>
              <div className="flex items-center justify-between border-b border-black py-1">
                <span className="font-bold">Cholesterol 0mg</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex items-center justify-between border-b border-black py-1">
                <span className="font-bold">Sodium 0mg</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex items-center justify-between border-b border-black py-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold">Total Carbohydrate</span>
                  <svg className="size-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <div className="flex items-center gap-2">
                  <svg className="size-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
              <div className="flex justify-between pl-4 text-xs">
                <span>Dietary Fiber 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between pl-4 text-xs">
                <span>Total Sugars 0g</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between border-b border-black py-1 pl-8 text-xs">
                <span>Includes 0g Added Sugars</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="font-bold">Protein 0g</span>
              </div>
            </div>

            <div className="space-y-1 border-b-4 border-black py-2 text-xs">
              <div className="flex justify-between">
                <span>Vitamin D 0mcg</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between">
                <span>Calcium 0mg</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between">
                <span>Iron 0mg</span>
                <span className="font-bold">0%</span>
              </div>
              <div className="flex justify-between">
                <span>Potassium 0mg</span>
                <span className="font-bold">0%</span>
              </div>
            </div>

            <p className="mt-2 text-xs leading-tight">
              * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
            </p>
          </div>
        </div>        )}      </div>
    </div>
  );
};
