'use client';

import { useState } from 'react';

type IngredientCost = {
  id: string;
  name: string;
  price: string;
  amount: string;
  unit: string;
  costPerBatch: string;
};

type OtherCost = {
  id: string;
  description: string;
  cost: string;
};

export const RecipeCostingTab = () => {
  const [ingredientCosts, setIngredientCosts] = useState<IngredientCost[]>([
    { id: '1', name: 'Sugars, maple', price: '', amount: '', unit: 'grams', costPerBatch: '-' },
    { id: '2', name: 'Milk, whole, 3.25% milkfat, without added vitamin A and vitamin D', price: '', amount: '', unit: 'grams', costPerBatch: '-' },
  ]);

  const [otherCosts, setOtherCosts] = useState<OtherCost[]>([]);
  const [sellingPrice, setSellingPrice] = useState('');
  const [margin, setMargin] = useState('');

  const [isIngredientExpanded, setIsIngredientExpanded] = useState(true);
  const [isOtherCostsExpanded, setIsOtherCostsExpanded] = useState(false);
  const [isSellingPriceExpanded, setIsSellingPriceExpanded] = useState(false);

  const updateIngredientCost = (id: string, field: keyof IngredientCost, value: string) => {
    setIngredientCosts(ingredientCosts.map(item =>
      item.id === id ? { ...item, [field]: value } : item,
    ));
  };

  const addOtherCost = () => {
    setOtherCosts([...otherCosts, { id: Date.now().toString(), description: '', cost: '' }]);
  };

  const updateOtherCost = (id: string, field: 'description' | 'cost', value: string) => {
    setOtherCosts(otherCosts.map(item =>
      item.id === id ? { ...item, [field]: value } : item,
    ));
  };

  const removeOtherCost = (id: string) => {
    setOtherCosts(otherCosts.filter(item => item.id !== id));
  };

  const InfoIcon = () => (
    <svg className="size-4 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="flex gap-6">
      {/* Left Side - Cost Sections */}
      <div className="flex-1 space-y-4">
        {/* Section 1: Ingredient Costs */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center justify-between border-b border-slate-200 p-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsIngredientExpanded(!isIngredientExpanded)}
                className="text-slate-600 hover:text-slate-900"
              >
                <svg
                  className={`size-5 transition-transform ${isIngredientExpanded ? 'rotate-90' : ''}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </button>
              <div>
                <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                  <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-sm">1</span>
                  Ingredient Costs
                </h2>
                <p className="text-sm text-slate-600">Enter the total price you pay for each ingredient</p>
              </div>
            </div>
            <button
              type="button"
              className="flex items-center gap-2 rounded bg-red-400 px-4 py-2 text-sm font-medium text-white hover:bg-red-500"
            >
              Download
              <svg className="size-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {isIngredientExpanded && (
            <div className="overflow-x-auto p-4">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                      Ingredients
                      <span className="text-red-500">*</span>
                    </th>
                    <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-1">
                        Price($)
                        <span className="text-red-500">*</span>
                        <InfoIcon />
                      </div>
                    </th>
                    <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                      Amount
                      <span className="text-red-500">*</span>
                    </th>
                    <th className="pb-3 pr-4 text-left text-sm font-semibold text-slate-700">
                      Unit
                      <span className="text-red-500">*</span>
                    </th>
                    <th className="pb-3 text-left text-sm font-semibold text-slate-700">
                      <div className="flex items-center gap-1">
                        Cost Per Batch
                        <InfoIcon />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ingredientCosts.map(ingredient => (
                    <tr key={ingredient.id} className="border-b border-slate-100">
                      <td className="py-3 pr-4">
                        <div className="text-sm text-slate-700">{ingredient.name}</div>
                      </td>
                      <td className="py-3 pr-4">
                        <input
                          type="number"
                          value={ingredient.price}
                          onChange={e => updateIngredientCost(ingredient.id, 'price', e.target.value)}
                          className="w-24 rounded border border-slate-300 px-2 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                          placeholder="0.00"
                        />
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex items-center gap-1">
                          <input
                            type="number"
                            value={ingredient.amount}
                            onChange={e => updateIngredientCost(ingredient.id, 'amount', e.target.value)}
                            className="w-24 rounded border border-slate-300 px-2 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                            placeholder="0"
                          />
                          <span className="text-xs text-slate-500">for</span>
                        </div>
                      </td>
                      <td className="py-3 pr-4">
                        <select
                          value={ingredient.unit}
                          onChange={e => updateIngredientCost(ingredient.id, 'unit', e.target.value)}
                          className="w-32 rounded border border-slate-300 px-2 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                        >
                          <option>grams</option>
                          <option>kg</option>
                          <option>ml</option>
                          <option>liters</option>
                          <option>oz</option>
                          <option>lbs</option>
                        </select>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-slate-500">{ingredient.costPerBatch}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Section 2: Other Costs */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 p-4">
            <button
              type="button"
              onClick={() => setIsOtherCostsExpanded(!isOtherCostsExpanded)}
              className="text-slate-600 hover:text-slate-900"
            >
              <svg
                className={`size-5 transition-transform ${isOtherCostsExpanded ? 'rotate-90' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-sm">2</span>
                Other Costs
                <span className="text-sm font-normal text-slate-500">(Optional)</span>
              </h2>
              <p className="text-sm text-slate-600">
                Enter any other recipe related costs like Packaging, Labor, or Overhead costs
              </p>
            </div>
          </div>

          {isOtherCostsExpanded && (
            <div className="space-y-3 p-4">
              {otherCosts.map(cost => (
                <div key={cost.id} className="flex items-center gap-3">
                  <input
                    type="text"
                    value={cost.description}
                    onChange={e => updateOtherCost(cost.id, 'description', e.target.value)}
                    placeholder="Cost description (e.g., Packaging)"
                    className="flex-1 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <input
                    type="number"
                    value={cost.cost}
                    onChange={e => updateOtherCost(cost.id, 'cost', e.target.value)}
                    placeholder="0.00"
                    className="w-32 rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    type="button"
                    onClick={() => removeOtherCost(cost.id)}
                    className="text-slate-400 hover:text-red-500"
                  >
                    <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addOtherCost}
                className="text-sm text-teal-700 hover:text-teal-800 hover:underline"
              >
                + Add Other Cost
              </button>
            </div>
          )}
        </div>

        {/* Section 3: Selling Price & Margin */}
        <div className="rounded-lg border border-slate-200 bg-white">
          <div className="flex items-center gap-2 border-b border-slate-200 p-4">
            <button
              type="button"
              onClick={() => setIsSellingPriceExpanded(!isSellingPriceExpanded)}
              className="text-slate-600 hover:text-slate-900"
            >
              <svg
                className={`size-5 transition-transform ${isSellingPriceExpanded ? 'rotate-90' : ''}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
              </svg>
            </button>
            <div>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
                <span className="flex size-6 items-center justify-center rounded-full bg-slate-200 text-sm">3</span>
                Selling Price & Margin
              </h2>
              <p className="text-sm text-slate-600">
                Enter either your desired Selling price or your desired margin, the tool will automatically calculate the other
              </p>
            </div>
          </div>

          {isSellingPriceExpanded && (
            <div className="space-y-4 p-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Selling Price ($)</label>
                  <input
                    type="number"
                    value={sellingPrice}
                    onChange={e => setSellingPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-slate-700">Margin (%)</label>
                  <input
                    type="number"
                    value={margin}
                    onChange={e => setMargin(e.target.value)}
                    placeholder="0"
                    className="w-full rounded border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Right Side - Costs Summary */}
      <div className="w-80">
        <div className="sticky top-6 space-y-4">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="mb-4 text-xl font-semibold text-slate-900">Costs</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Cost Per Batch</span>
                <span className="text-lg font-semibold text-slate-900">-</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600">Cost Per Package</span>
                <span className="text-lg font-semibold text-slate-900">-</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-lg border border-slate-300 bg-white px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
          >
            <div className="flex items-center justify-center gap-2">
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
              Cost Breakdown
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
