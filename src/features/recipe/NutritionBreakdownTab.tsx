'use client';

import { useState } from 'react';

export const NutritionBreakdownTab = () => {
  const [servingSizeTab, setServingSizeTab] = useState<'perServing' | 'per100g'>('perServing');
  const [weightUnit, setWeightUnit] = useState('Weight (g)');
  const [caloriesUnit, setCaloriesUnit] = useState('Calories (kcal)');
  const [nutrientView, setNutrientView] = useState<'perServing' | 'per100g'>('perServing');
  const [nutrientDisplay, setNutrientDisplay] = useState<'values' | 'percentage'>('values');
  const [allergenColumns, setAllergenColumns] = useState(0);
  const [nutrientColumns, setNutrientColumns] = useState(0);
  const [nutrientCount, setNutrientCount] = useState(4);

  const LockIcon = () => (
    <svg className="size-8 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
  );

  return (
    <div className="space-y-8">
      {/* Top Section - Per Serving Size tabs and Download */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setServingSizeTab('perServing')}
            className={`rounded px-4 py-2 text-sm font-medium ${
              servingSizeTab === 'perServing'
                ? 'bg-white text-slate-900 shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Per Serving size
          </button>
          <button
            type="button"
            onClick={() => setServingSizeTab('per100g')}
            className={`rounded px-4 py-2 text-sm font-medium ${
              servingSizeTab === 'per100g'
                ? 'bg-white text-slate-900 shadow'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            Per 100g
          </button>
        </div>
        <button
          type="button"
          className="flex items-center gap-2 rounded bg-white px-4 py-2 text-sm font-medium text-slate-700 shadow hover:bg-slate-50"
        >
          <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border-l-4 border-green-500 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Calories</p>
            </div>
            <LockIcon />
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-yellow-500 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Carbs</p>
            </div>
            <LockIcon />
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-red-500 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Fat</p>
            </div>
            <LockIcon />
          </div>
        </div>
        <div className="rounded-lg border-l-4 border-purple-500 bg-white p-4 shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600">Total Protein</p>
              <p className="text-2xl font-bold text-slate-900">0 g</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recipe Weight in Grams */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recipe Weight in Grams</h3>
            <select
              value={weightUnit}
              onChange={(e) => setWeightUnit(e.target.value)}
              className="rounded border border-slate-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option>Weight (g)</option>
              <option>Weight (kg)</option>
              <option>Weight (oz)</option>
              <option>Weight (lbs)</option>
            </select>
          </div>

          <div className="mb-4 flex gap-2">
            <button className="rounded bg-slate-100 px-3 py-1 text-sm text-slate-600">Per Serving size</button>
            <button className="rounded bg-slate-100 px-3 py-1 text-sm text-slate-600">Per 100g</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
            </button>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>

          {/* Pie Chart */}
          <div className="mt-6 flex items-center justify-center">
            <div className="relative size-64">
              <svg viewBox="0 0 200 200" className="size-full">
                <circle cx="100" cy="100" r="80" fill="#94a3b8" />
                <path d="M 100 100 L 100 20 A 80 80 0 0 1 180 100 Z" fill="#64748b" />
                <text x="60" y="110" className="text-xs fill-white">0.0 g</text>
                <text x="140" y="110" className="text-xs fill-white">0.0 g</text>
              </svg>
            </div>
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center justify-center gap-6">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-slate-400" />
              <span className="text-sm text-slate-600">Maple Sugar</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded-full bg-slate-600" />
              <span className="text-sm text-slate-600">Milk</span>
            </div>
          </div>
        </div>

        {/* Recipe Calories in kcal */}
        <div className="rounded-lg bg-white p-6 shadow">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold text-slate-900">Recipe Calories in kcal</h3>
            <select
              value={caloriesUnit}
              onChange={(e) => setCaloriesUnit(e.target.value)}
              className="rounded border border-slate-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            >
              <option>Calories (kcal)</option>
              <option>Calories (kJ)</option>
            </select>
          </div>

          <div className="mb-4 flex gap-2">
            <button className="rounded bg-slate-100 px-3 py-1 text-sm text-slate-600">Per Serving size</button>
            <button className="rounded bg-slate-100 px-3 py-1 text-sm text-slate-600">Per 100g</button>
          </div>

          <div className="flex items-center gap-4">
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>

          {/* Bar Chart */}
          <div className="mt-6">
            <div className="flex h-64 items-end justify-around gap-8 px-8">
              <div className="flex w-32 flex-col items-center">
                <div className="mb-2 text-xs text-slate-600">0.0 kcal</div>
                <div className="w-full rounded-t bg-slate-400" style={{ height: '1px' }} />
                <div className="mt-2 text-center text-sm text-slate-700">Maple Sugar</div>
              </div>
              <div className="flex w-32 flex-col items-center">
                <div className="mb-2 text-xs text-slate-600">0.0 kcal</div>
                <div className="w-full rounded-t bg-slate-600" style={{ height: '1px' }} />
                <div className="mt-2 text-center text-sm text-slate-700">Milk</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nutrient Breakdown Table */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Nutrient Breakdown</h3>
          <div className="flex items-center gap-4">
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Show:</span>
              <select
                value={nutrientColumns}
                onChange={(e) => setNutrientColumns(Number(e.target.value))}
                className="rounded border border-slate-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="0">0 Columns</option>
                <option value="1">1 Column</option>
                <option value="2">2 Columns</option>
                <option value="3">3 Columns</option>
                <option value="4">4 Columns</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Show:</span>
              <select
                value={nutrientCount}
                onChange={(e) => setNutrientCount(Number(e.target.value))}
                className="rounded border border-slate-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="4">4 Nutrients</option>
                <option value="8">8 Nutrients</option>
                <option value="12">12 Nutrients</option>
                <option value="20">20 Nutrients</option>
              </select>
            </div>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <button
            onClick={() => setNutrientView('perServing')}
            className={`rounded px-3 py-1 text-sm ${
              nutrientView === 'perServing' ? 'bg-white shadow' : 'bg-slate-100'
            }`}
          >
            Per Serving size
          </button>
          <button
            onClick={() => setNutrientView('per100g')}
            className={`rounded px-3 py-1 text-sm ${
              nutrientView === 'per100g' ? 'bg-white shadow' : 'bg-slate-100'
            }`}
          >
            Per 100g
          </button>
          <button
            onClick={() => setNutrientDisplay('values')}
            className={`ml-4 rounded px-3 py-1 text-sm ${
              nutrientDisplay === 'values' ? 'bg-white shadow' : 'bg-slate-100'
            }`}
          >
            Values
          </button>
          <button
            onClick={() => setNutrientDisplay('percentage')}
            className={`rounded px-3 py-1 text-sm ${
              nutrientDisplay === 'percentage' ? 'bg-white shadow' : 'bg-slate-100'
            }`}
          >
            Percentage
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">Ingredient</th>
                <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                  <button className="flex items-center gap-1">
                    Weight (g)
                    <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                </th>
                <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">Total Sugars (g)</th>
                <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">Added Sugars (g)</th>
                <th className="pb-3 text-left text-sm font-semibold text-slate-700">Protein (g)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 text-sm text-slate-700">Sugars, maple</td>
                <td className="py-3 pr-4 text-sm text-slate-600">0.00</td>
                <td className="py-3 pr-4 text-sm text-slate-600">0.00</td>
                <td className="py-3 pr-4 text-sm text-slate-600">0.00</td>
                <td className="py-3 text-sm text-slate-600">0.00</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 text-sm text-slate-700">Milk, whole, 3.25% milkfat, without added vitamin A and vitamin D</td>
                <td className="py-3 pr-4 text-sm text-slate-600">0.00</td>
                <td className="py-3 pr-4 text-sm text-slate-600">0.00</td>
                <td className="py-3 pr-4 text-sm text-slate-600">0.00</td>
                <td className="py-3 text-sm text-slate-600">0.00</td>
              </tr>
              <tr className="bg-slate-50">
                <td className="py-3 pr-4 text-sm font-semibold text-slate-900">Totals</td>
                <td className="py-3 pr-4 text-sm font-semibold text-slate-900">0.00</td>
                <td className="py-3 pr-4 text-sm font-semibold text-slate-900">0.00</td>
                <td className="py-3 pr-4 text-sm font-semibold text-slate-900">0.00</td>
                <td className="py-3 text-sm font-semibold text-slate-900">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Allergen Breakdown Table */}
      <div className="rounded-lg bg-white p-6 shadow">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-semibold text-slate-900">Allergen Breakdown</h3>
          <div className="flex items-center gap-4">
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Show:</span>
              <select
                value={allergenColumns}
                onChange={(e) => setAllergenColumns(Number(e.target.value))}
                className="rounded border border-slate-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="0">0 Columns</option>
                <option value="3">3 Columns</option>
                <option value="6">6 Columns</option>
                <option value="9">9 Allergens</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Show:</span>
              <select className="rounded border border-slate-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
                <option>9 Allergens</option>
                <option>14 Allergens</option>
              </select>
            </div>
            <button className="rounded p-2 hover:bg-slate-100">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">Ingredient</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Soy</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Tree Nuts</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Wheat</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Milk</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Eggs</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Fish</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Peanuts</th>
                <th className="pb-3 pr-4 text-center text-sm font-semibold text-slate-700">Sesame</th>
                <th className="pb-3 text-center text-sm font-semibold text-slate-700">Gluten</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 text-sm text-slate-700">Sugars, maple</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 text-center text-sm text-slate-600">–</td>
              </tr>
              <tr className="border-b border-slate-100">
                <td className="py-3 pr-4 text-sm text-slate-700">Milk, whole, 3.25% milkfat, without added vitamin A and vitamin D</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-teal-700">
                  <svg className="mx-auto size-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 pr-4 text-center text-sm text-slate-600">–</td>
                <td className="py-3 text-center text-sm text-slate-600">–</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
