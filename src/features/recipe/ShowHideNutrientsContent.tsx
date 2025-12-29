'use client';

import { useState } from 'react';

type NutrientToggle = {
  id: string;
  label: string;
  enabled: boolean;
  hasInfo?: boolean;
};

export const ShowHideNutrientsContent = () => {
  const [showAllNutrients, setShowAllNutrients] = useState(false);
  const [showProteinDV, setShowProteinDV] = useState(false);
  const [showAbbreviatedNames, setShowAbbreviatedNames] = useState(false);
  const [useRoundedValues, setUseRoundedValues] = useState(false);

  const [standardComponents, setStandardComponents] = useState<NutrientToggle[]>([
    { id: 'totalFat', label: 'Total Fat', enabled: true },
    { id: 'saturatedFat', label: 'Saturated Fat', enabled: true },
    { id: 'transFat', label: 'Trans Fat', enabled: true },
    { id: 'cholesterol', label: 'Cholesterol', enabled: true },
    { id: 'sodium', label: 'Sodium', enabled: true },
    { id: 'totalCarbs', label: 'Total Carbohydrates', enabled: true },
    { id: 'dietaryFiber', label: 'Dietary Fiber', enabled: true },
    { id: 'totalSugars', label: 'Total Sugars', enabled: true },
    { id: 'addedSugars', label: 'Added Sugars', enabled: true },
    { id: 'protein', label: 'Protein', enabled: true },
  ]);

  const [vitamins, setVitamins] = useState<NutrientToggle[]>([
    { id: 'vitaminD', label: 'Vitamin D', enabled: true },
    { id: 'vitaminA', label: 'Vitamin A, RAE', enabled: false },
    { id: 'vitaminC', label: 'Vitamin C', enabled: false },
    { id: 'vitaminE', label: 'Vitamin E', enabled: false },
    { id: 'vitaminK', label: 'Vitamin K', enabled: false },
    { id: 'thiamin', label: 'Thiamin (B1)', enabled: false },
    { id: 'riboflavin', label: 'Riboflavin (B2)', enabled: false },
    { id: 'niacin', label: 'Niacin (B3)', enabled: false },
    { id: 'vitaminB6', label: 'Vitamin B6', enabled: false },
    { id: 'folateDFE', label: 'Folate DFE', enabled: false },
    { id: 'folicAcid', label: '(Folic Acid)', enabled: false },
    { id: 'vitaminB12', label: 'Vitamin B12', enabled: false },
    { id: 'biotin', label: 'Biotin', enabled: false },
    { id: 'pantothenicAcid', label: 'Pantothenic acid', enabled: false },
    { id: 'betaCarotene', label: 'Beta Carotene', enabled: false },
    { id: 'retinol', label: 'Retinol', enabled: false },
  ]);

  const [minerals, setMinerals] = useState<NutrientToggle[]>([
    { id: 'fluoride', label: 'Fluoride', enabled: false },
    { id: 'calcium', label: 'Calcium', enabled: true },
    { id: 'iron', label: 'Iron', enabled: true },
    { id: 'potassium', label: 'Potassium', enabled: true },
    { id: 'phosphorus', label: 'Phosphorus', enabled: false },
    { id: 'iodine', label: 'Iodine', enabled: false },
    { id: 'magnesium', label: 'Magnesium', enabled: false },
    { id: 'zinc', label: 'Zinc', enabled: false },
    { id: 'selenium', label: 'Selenium', enabled: false },
    { id: 'copper', label: 'Copper', enabled: false },
    { id: 'manganese', label: 'Manganese', enabled: false },
    { id: 'chromium', label: 'Chromium', enabled: false },
    { id: 'molybdenum', label: 'Molybdenum', enabled: false },
    { id: 'chloride', label: 'Chloride', enabled: false },
  ]);

  const [otherNutrients, setOtherNutrients] = useState<NutrientToggle[]>([
    { id: 'caloriesFat', label: 'Calories from Fat', enabled: false },
    { id: 'caloriesSatFat', label: 'Calories from SatFat', enabled: false },
    { id: 'otherCarbs', label: 'Other Carbohydrates', enabled: false },
    { id: 'polyunsaturatedFat', label: 'Polyunsaturated Fat', enabled: false },
    { id: 'monounsaturatedFat', label: 'Monounsaturated Fat', enabled: false },
    { id: 'insolubleFiber', label: 'Insoluble Fiber', enabled: false },
    { id: 'solubleFiber', label: 'Soluble Fiber', enabled: false },
    { id: 'sugarAlcohol', label: 'Sugar Alcohol', enabled: false, hasInfo: true },
    { id: 'choline', label: 'Choline', enabled: false },
    { id: 'inulin', label: 'Inulin', enabled: false },
    { id: 'caffeine', label: 'Caffeine', enabled: false },
    { id: 'water', label: 'Water', enabled: false },
    { id: 'sucrose', label: 'Sucrose', enabled: false },
    { id: 'glucose', label: 'Glucose', enabled: false },
    { id: 'fructose', label: 'Fructose', enabled: false },
    { id: 'maltose', label: 'Maltose', enabled: false },
    { id: 'galactose', label: 'Galactose', enabled: false },
    { id: 'ash', label: 'Ash', enabled: false },
    { id: 'omega3', label: 'Omega-3 Fatty Acids', enabled: false },
    { id: 'omega6', label: 'Omega-6 Fatty Acids', enabled: false },
  ]);

  const toggleNutrient = (category: string, id: string) => {
    const updateCategory = (items: NutrientToggle[]) =>
      items.map(item => item.id === id ? { ...item, enabled: !item.enabled } : item);

    switch (category) {
      case 'standard':
        setStandardComponents(updateCategory);
        break;
      case 'vitamins':
        setVitamins(updateCategory);
        break;
      case 'minerals':
        setMinerals(updateCategory);
        break;
      case 'other':
        setOtherNutrients(updateCategory);
        break;
    }
  };

  const ToggleSwitch = ({ enabled, onChange }: { enabled: boolean; onChange: () => void }) => (
    <button
      type="button"
      onClick={onChange}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
        enabled ? 'bg-teal-700' : 'bg-slate-300'
      }`}
    >
      <span
        className={`inline-block size-4 rounded-full bg-white transition-transform${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );

  const InfoIcon = () => (
    <svg className="size-4 text-teal-700" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
    </svg>
  );

  return (
    <div className="space-y-8">
      {/* Show All Nutrients Toggle */}
      <div className="flex items-center gap-3">
        <ToggleSwitch enabled={showAllNutrients} onChange={() => setShowAllNutrients(!showAllNutrients)} />
        <span className="font-medium text-slate-700">Show All Nutrients</span>
      </div>

      {/* Nutrients Grid */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {/* Standard Components */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Standard Components</h3>
          <div className="space-y-3">
            {standardComponents.map(nutrient => (
              <div key={nutrient.id} className="flex min-w-0 items-center gap-2.5">
                <ToggleSwitch
                  enabled={nutrient.enabled}
                  onChange={() => toggleNutrient('standard', nutrient.id)}
                />
                <span className="min-w-0 flex-1 text-sm text-slate-700">{nutrient.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vitamins */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Vitamins</h3>
          <div className="space-y-3">
            {vitamins.map(nutrient => (
              <div key={nutrient.id} className="flex min-w-0 items-center gap-2.5">
                <ToggleSwitch
                  enabled={nutrient.enabled}
                  onChange={() => toggleNutrient('vitamins', nutrient.id)}
                />
                <span className="min-w-0 flex-1 text-sm text-slate-700">{nutrient.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Minerals */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Minerals</h3>
          <div className="space-y-3">
            {minerals.map(nutrient => (
              <div key={nutrient.id} className="flex min-w-0 items-center gap-2.5">
                <ToggleSwitch
                  enabled={nutrient.enabled}
                  onChange={() => toggleNutrient('minerals', nutrient.id)}
                />
                <span className="min-w-0 flex-1 text-sm text-slate-700">{nutrient.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Other Nutrients */}
        <div>
          <h3 className="mb-4 text-base font-semibold text-slate-900">Other Nutrients</h3>
          <div className="space-y-3">
            {otherNutrients.map(nutrient => (
              <div key={nutrient.id} className="flex min-w-0 items-center gap-2.5">
                <ToggleSwitch
                  enabled={nutrient.enabled}
                  onChange={() => toggleNutrient('other', nutrient.id)}
                />
                <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm text-slate-700">
                  <span className="min-w-0 flex-1">{nutrient.label}</span>
                  {nutrient.hasInfo && <InfoIcon />}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Settings */}
      <div className="space-y-4 border-t border-slate-200 pt-6">
        <div className="flex min-w-0 items-center gap-2.5">
          <ToggleSwitch enabled={showProteinDV} onChange={() => setShowProteinDV(!showProteinDV)} />
          <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-slate-700">
            <span className="min-w-0 flex-1">Show Protein Daily Value %</span>
            <InfoIcon />
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2.5">
          <ToggleSwitch enabled={showAbbreviatedNames} onChange={() => setShowAbbreviatedNames(!showAbbreviatedNames)} />
          <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-slate-700">
            <span className="min-w-0 flex-1">Show Abbreviated Nutrient Names</span>
            <InfoIcon />
          </span>
        </div>

        <div className="flex min-w-0 items-center gap-2.5">
          <ToggleSwitch enabled={useRoundedValues} onChange={() => setUseRoundedValues(!useRoundedValues)} />
          <span className="flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-slate-700">
            <span className="min-w-0 flex-1">Use Rounded Nutrient Values for Daily Value % Calculation.</span>
            <InfoIcon />
          </span>
        </div>
      </div>

      {/* Reset Button */}
      <button
        type="button"
        className="text-sm text-slate-400 hover:text-slate-600 hover:underline"
      >
        Reset
      </button>
    </div>
  );
};
