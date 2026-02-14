'use client';

import { useCallback, useEffect, useState } from 'react';

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

type NutritionData = {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbs: number;
  dietaryFiber: number;
  totalSugars: number;
  addedSugars: number;
  protein: number;
  vitaminD: number;
  calcium: number;
  iron: number;
  potassium: number;
};

type NutritionLabelProps = {
  ingredients: Ingredient[];
  servings: number;
  servingSize: string;
};

const STORAGE_KEY = 'nutritionCache';

// Mock nutrition data for demo ingredients (per 100g)
const MOCK_NUTRITION_DATA: Record<number, any> = {
  169225: { // Tomatoes, raw
    foodNutrients: [
      { nutrient: { name: 'Energy', number: '208' }, amount: 18 },
      { nutrient: { name: 'Protein', number: '203' }, amount: 0.88 },
      { nutrient: { name: 'Total lipid (fat)', number: '204' }, amount: 0.2 },
      { nutrient: { name: 'Carbohydrate, by difference', number: '205' }, amount: 3.89 },
      { nutrient: { name: 'Fiber, total dietary', number: '291' }, amount: 1.2 },
      { nutrient: { name: 'Sugars, total including NLEA', number: '269' }, amount: 2.63 },
      { nutrient: { name: 'Calcium, Ca', number: '301' }, amount: 10 },
      { nutrient: { name: 'Iron, Fe', number: '303' }, amount: 0.27 },
      { nutrient: { name: 'Sodium, Na', number: '307' }, amount: 5 },
      { nutrient: { name: 'Vitamin C, total ascorbic acid', number: '401' }, amount: 13.7 },
      { nutrient: { name: 'Vitamin A, IU', number: '318' }, amount: 833 },
      { nutrient: { name: 'Fatty acids, total saturated', number: '606' }, amount: 0.028 },
      { nutrient: { name: 'Fatty acids, total trans', number: '605' }, amount: 0 },
      { nutrient: { name: 'Cholesterol', number: '601' }, amount: 0 },
      { nutrient: { name: 'Potassium, K', number: '306' }, amount: 237 },
      { nutrient: { name: 'Vitamin D (D2 + D3)', number: '328' }, amount: 0 },
    ],
  },
  171477: { // Chicken breast, cooked, roasted
    foodNutrients: [
      { nutrient: { name: 'Energy', number: '208' }, amount: 165 },
      { nutrient: { name: 'Protein', number: '203' }, amount: 31 },
      { nutrient: { name: 'Total lipid (fat)', number: '204' }, amount: 3.6 },
      { nutrient: { name: 'Carbohydrate, by difference', number: '205' }, amount: 0 },
      { nutrient: { name: 'Fiber, total dietary', number: '291' }, amount: 0 },
      { nutrient: { name: 'Sugars, total including NLEA', number: '269' }, amount: 0 },
      { nutrient: { name: 'Calcium, Ca', number: '301' }, amount: 15 },
      { nutrient: { name: 'Iron, Fe', number: '303' }, amount: 1 },
      { nutrient: { name: 'Sodium, Na', number: '307' }, amount: 74 },
      { nutrient: { name: 'Vitamin C, total ascorbic acid', number: '401' }, amount: 0 },
      { nutrient: { name: 'Vitamin A, IU', number: '318' }, amount: 21 },
      { nutrient: { name: 'Fatty acids, total saturated', number: '606' }, amount: 1.0 },
      { nutrient: { name: 'Fatty acids, total trans', number: '605' }, amount: 0.04 },
      { nutrient: { name: 'Cholesterol', number: '601' }, amount: 85 },
      { nutrient: { name: 'Potassium, K', number: '306' }, amount: 256 },
      { nutrient: { name: 'Vitamin D (D2 + D3)', number: '328' }, amount: 0.1 },
    ],
  },
  171413: { // Olive oil
    foodNutrients: [
      { nutrient: { name: 'Energy', number: '208' }, amount: 884 },
      { nutrient: { name: 'Protein', number: '203' }, amount: 0 },
      { nutrient: { name: 'Total lipid (fat)', number: '204' }, amount: 100 },
      { nutrient: { name: 'Carbohydrate, by difference', number: '205' }, amount: 0 },
      { nutrient: { name: 'Fiber, total dietary', number: '291' }, amount: 0 },
      { nutrient: { name: 'Sugars, total including NLEA', number: '269' }, amount: 0 },
      { nutrient: { name: 'Calcium, Ca', number: '301' }, amount: 1 },
      { nutrient: { name: 'Iron, Fe', number: '303' }, amount: 0.56 },
      { nutrient: { name: 'Sodium, Na', number: '307' }, amount: 2 },
      { nutrient: { name: 'Vitamin C, total ascorbic acid', number: '401' }, amount: 0 },
      { nutrient: { name: 'Vitamin A, IU', number: '318' }, amount: 0 },
      { nutrient: { name: 'Fatty acids, total saturated', number: '606' }, amount: 13.8 },
      { nutrient: { name: 'Fatty acids, total trans', number: '605' }, amount: 0 },
      { nutrient: { name: 'Cholesterol', number: '601' }, amount: 0 },
      { nutrient: { name: 'Potassium, K', number: '306' }, amount: 1 },
      { nutrient: { name: 'Vitamin D (D2 + D3)', number: '328' }, amount: 0 },
      { nutrient: { name: 'Vitamin E (alpha-tocopherol)', number: '323' }, amount: 14.35 },
      { nutrient: { name: 'Vitamin K (phylloquinone)', number: '430' }, amount: 60.2 },
    ],
  },
};

export const NutritionLabel = ({ ingredients, servings = 1, servingSize = '55g' }: NutritionLabelProps) => {
  console.log('[NutritionLabel] Render - ingredients count:', ingredients.length, 'servings:', servings);

  const [nutrition, setNutrition] = useState<NutritionData>({
    calories: 0,
    totalFat: 0,
    saturatedFat: 0,
    transFat: 0,
    cholesterol: 0,
    sodium: 0,
    totalCarbs: 0,
    dietaryFiber: 0,
    totalSugars: 0,
    addedSugars: 0,
    protein: 0,
    vitaminD: 0,
    calcium: 0,
    iron: 0,
    potassium: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [lastCalculated, setLastCalculated] = useState<string>('');

  const getCachedNutrition = (fdcId: number) => {
    try {
      const cache = localStorage.getItem(STORAGE_KEY);
      if (cache) {
        const parsed = JSON.parse(cache);
        return parsed[fdcId];
      }
    } catch (error) {
      console.error('Failed to read nutrition cache:', error);
    }
    return null;
  };

  const setCachedNutrition = (fdcId: number, data: any) => {
    try {
      const cache = localStorage.getItem(STORAGE_KEY);
      const parsed = cache ? JSON.parse(cache) : {};
      parsed[fdcId] = data;
      localStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));
    } catch (error) {
      console.error('Failed to cache nutrition data:', error);
    }
  };

  const fetchNutritionData = async (fdcId: number) => {
    // Check cache first
    const cached = getCachedNutrition(fdcId);
    if (cached) {
      console.log(`[NutritionLabel] Using cached data for FDC ID: ${fdcId}`);
      return cached;
    }

    // Check if mock data exists for demo ingredients
    if (MOCK_NUTRITION_DATA[fdcId]) {
      console.log(`[NutritionLabel] Using mock data for demo ingredient FDC ID: ${fdcId}`);
      setCachedNutrition(fdcId, MOCK_NUTRITION_DATA[fdcId]);
      return MOCK_NUTRITION_DATA[fdcId];
    }

    console.log(`[NutritionLabel] Fetching nutrition data for FDC ID: ${fdcId}`);
    try {
      const apiKey = process.env.NEXT_PUBLIC_FDA_API_KEY || 'DEMO_KEY';
      console.log(`[NutritionLabel] Using API key: ${apiKey === 'DEMO_KEY' ? 'DEMO_KEY' : 'Custom key'}`);

      const url = `https://api.nal.usda.gov/fdc/v1/food/${fdcId}?api_key=${apiKey}`;

      // Add timeout to prevent infinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout

      const response = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);

      if (!response.ok) {
        console.error(`[NutritionLabel] API error for FDC ${fdcId}: ${response.status}`);
        throw new Error(`Failed to fetch nutrition data: ${response.status}`);
      }

      const data = await response.json();
      console.log(`[NutritionLabel] Successfully fetched data for FDC ID: ${fdcId}`);

      // Cache the data
      setCachedNutrition(fdcId, data);

      return data;
    } catch (error) {
      console.error(`[NutritionLabel] Error fetching nutrition for FDC ID ${fdcId}:`, error);

      // Fallback to mock data if available and API fails
      if (MOCK_NUTRITION_DATA[fdcId]) {
        console.log(`[NutritionLabel] API failed, falling back to mock data for FDC ID: ${fdcId}`);
        setCachedNutrition(fdcId, MOCK_NUTRITION_DATA[fdcId]);
        return MOCK_NUTRITION_DATA[fdcId];
      }

      return null;
    }
  };

  const getNutrientValue = (nutrients: any[], nutrientNumber: string): number => {
    // Handle both real API format and mock data format
    const nutrient = nutrients?.find((n: any) =>
      n.nutrientNumber === nutrientNumber // Real API format
      || n.nutrient?.number === nutrientNumber, // Mock data format
    );
    return nutrient?.value || nutrient?.amount || 0;
  };

  const calculateNutrition = useCallback(async () => {
    if (!ingredients || ingredients.length === 0) {
      console.log('[NutritionLabel] No ingredients, resetting nutrition');
      setNutrition({
        calories: 0,
        totalFat: 0,
        saturatedFat: 0,
        transFat: 0,
        cholesterol: 0,
        sodium: 0,
        totalCarbs: 0,
        dietaryFiber: 0,
        totalSugars: 0,
        addedSugars: 0,
        protein: 0,
        vitaminD: 0,
        calcium: 0,
        iron: 0,
        potassium: 0,
      });
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    console.log('[NutritionLabel] Starting calculation for', ingredients.length, 'ingredients');
    console.log('[NutritionLabel] Ingredients:', ingredients);

    try {
      const totalNutrition: NutritionData = {
        calories: 0,
        totalFat: 0,
        saturatedFat: 0,
        transFat: 0,
        cholesterol: 0,
        sodium: 0,
        totalCarbs: 0,
        dietaryFiber: 0,
        totalSugars: 0,
        addedSugars: 0,
        protein: 0,
        vitaminD: 0,
        calcium: 0,
        iron: 0,
        potassium: 0,
      };

      let successCount = 0;
      let failCount = 0;

      for (const ingredient of ingredients) {
        if (!ingredient.fdcId) {
          console.log(`[NutritionLabel] Skipping ingredient without fdcId: ${ingredient.name}`);
          continue;
        }

        if (!ingredient.amount) {
          console.log(`[NutritionLabel] Skipping ingredient without amount: ${ingredient.name}`);
          continue;
        }

        const amount = Number.parseFloat(ingredient.amount);
        if (isNaN(amount) || amount <= 0) {
          console.log(`[NutritionLabel] Invalid amount for ${ingredient.name}: ${ingredient.amount}`);
          continue;
        }

        console.log(`[NutritionLabel] Fetching data for: ${ingredient.name} (FDC: ${ingredient.fdcId}, Amount: ${amount}g)`);
        const foodData = await fetchNutritionData(ingredient.fdcId);

        if (foodData && foodData.foodNutrients) {
          successCount++;
          // Calculate based on 100g serving
          const factor = amount / 100;
          console.log(`[NutritionLabel] Applying factor ${factor} for ${ingredient.name}`);

          // Nutrient numbers from USDA database
          totalNutrition.calories += getNutrientValue(foodData.foodNutrients, '208') * factor;
          totalNutrition.totalFat += getNutrientValue(foodData.foodNutrients, '204') * factor;
          totalNutrition.saturatedFat += getNutrientValue(foodData.foodNutrients, '606') * factor;
          totalNutrition.transFat += getNutrientValue(foodData.foodNutrients, '605') * factor;
          totalNutrition.cholesterol += getNutrientValue(foodData.foodNutrients, '601') * factor;
          totalNutrition.sodium += getNutrientValue(foodData.foodNutrients, '307') * factor;
          totalNutrition.totalCarbs += getNutrientValue(foodData.foodNutrients, '205') * factor;
          totalNutrition.dietaryFiber += getNutrientValue(foodData.foodNutrients, '291') * factor;
          totalNutrition.totalSugars += getNutrientValue(foodData.foodNutrients, '269') * factor;
          totalNutrition.protein += getNutrientValue(foodData.foodNutrients, '203') * factor;
          totalNutrition.vitaminD += getNutrientValue(foodData.foodNutrients, '328') * factor;
          totalNutrition.calcium += getNutrientValue(foodData.foodNutrients, '301') * factor;
          totalNutrition.iron += getNutrientValue(foodData.foodNutrients, '303') * factor;
          totalNutrition.potassium += getNutrientValue(foodData.foodNutrients, '306') * factor;
        } else {
          failCount++;
          console.error(`[NutritionLabel] Failed to fetch data for ${ingredient.name} (FDC: ${ingredient.fdcId})`);
        }
      }

      console.log(`[NutritionLabel] Fetch results: ${successCount} success, ${failCount} failed`);
      console.log('[NutritionLabel] Total nutrition (all servings):', totalNutrition);

      // Divide by servings to get per-serving values
      const perServing: NutritionData = {
        calories: Math.round(totalNutrition.calories / servings),
        totalFat: Number((totalNutrition.totalFat / servings).toFixed(1)),
        saturatedFat: Number((totalNutrition.saturatedFat / servings).toFixed(1)),
        transFat: Number((totalNutrition.transFat / servings).toFixed(1)),
        cholesterol: Math.round(totalNutrition.cholesterol / servings),
        sodium: Math.round(totalNutrition.sodium / servings),
        totalCarbs: Math.round(totalNutrition.totalCarbs / servings),
        dietaryFiber: Number((totalNutrition.dietaryFiber / servings).toFixed(1)),
        totalSugars: Math.round(totalNutrition.totalSugars / servings),
        addedSugars: Math.round(totalNutrition.addedSugars / servings),
        protein: Number((totalNutrition.protein / servings).toFixed(1)),
        vitaminD: Number((totalNutrition.vitaminD / servings).toFixed(1)),
        calcium: Math.round(totalNutrition.calcium / servings),
        iron: Number((totalNutrition.iron / servings).toFixed(1)),
        potassium: Math.round(totalNutrition.potassium / servings),
      };

      console.log('[NutritionLabel] Calculated per-serving nutrition:', perServing);
      setNutrition(perServing);
    } catch (error) {
      console.error('[NutritionLabel] Error calculating nutrition:', error);
    } finally {
      console.log('[NutritionLabel] Calculation complete, setting isLoading to false');
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients, servings]);

  useEffect(() => {
    // Only recalculate if ingredients actually changed
    const ingredientsKey = JSON.stringify(ingredients.map(i => ({ fdcId: i.fdcId, amount: i.amount })));
    if (ingredientsKey !== lastCalculated) {
      console.log('[NutritionLabel] Ingredients changed, recalculating...');
      console.log('[NutritionLabel] New key:', ingredientsKey);
      console.log('[NutritionLabel] Old key:', lastCalculated);
      setLastCalculated(ingredientsKey);
      calculateNutrition();
    } else {
      console.log('[NutritionLabel] Ingredients unchanged, skipping calculation');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredients]);

  const calculateDV = (amount: number, dv: number) => {
    return Math.round((amount / dv) * 100);
  };

  return (
    <div className="sticky top-4 w-80 rounded-lg border-2 border-black bg-white p-2 font-sans text-xs">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/90">
          <div className="text-center">
            <div className="size-8 animate-spin rounded-full border-y-2 border-black"></div>
            <p className="mt-2 text-xs">Calculating...</p>
          </div>
        </div>
      )}

      {/* Title */}
      <div className="border-b-8 border-black pb-1">
        <h2 className="text-3xl font-black">Nutrition Facts</h2>
        <div className="flex items-baseline justify-between border-b border-black py-1">
          <span className="text-xs">
            {servings}
            {' '}
            Servings Per Container
          </span>
        </div>
        <div className="flex items-baseline justify-between py-1">
          <span className="text-xs font-bold">Serving Size</span>
          <span className="text-xs font-bold">{servingSize}</span>
        </div>
      </div>

      {/* Calories */}
      <div className="border-b-4 border-black py-1">
        <div className="flex items-baseline justify-between">
          <span className="text-xs font-bold">Amount Per Serving</span>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black">Calories</span>
          <span className="text-3xl font-black">{nutrition.calories}</span>
        </div>
      </div>

      {/* Daily Value Header */}
      <div className="border-b border-black py-1 text-right">
        <span className="text-xs font-bold">% Daily Value *</span>
      </div>

      {/* Total Fat */}
      <div className="flex justify-between border-b border-gray-300 py-1">
        <span className="font-bold">
          <span className="font-bold">Total Fat</span>
          {' '}
          {nutrition.totalFat}
          g
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.totalFat, 78)}
          %
        </span>
      </div>

      {/* Saturated Fat */}
      <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
        <span>
          Saturated Fat
          {' '}
          {nutrition.saturatedFat}
          g
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.saturatedFat, 20)}
          %
        </span>
      </div>

      {/* Trans Fat */}
      <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
        <span className="italic">
          Trans
          {' '}
          Fat
          {' '}
          {nutrition.transFat}
          g
        </span>
      </div>

      {/* Cholesterol */}
      <div className="flex justify-between border-b border-gray-300 py-1">
        <span className="font-bold">
          Cholesterol
          {' '}
          {nutrition.cholesterol}
          mg
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.cholesterol, 300)}
          %
        </span>
      </div>

      {/* Sodium */}
      <div className="flex justify-between border-b border-gray-300 py-1">
        <span className="font-bold">
          Sodium
          {' '}
          {nutrition.sodium}
          mg
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.sodium, 2300)}
          %
        </span>
      </div>

      {/* Total Carbohydrate */}
      <div className="flex justify-between border-b border-gray-300 py-1">
        <span className="font-bold">
          Total Carbohydrate
          {' '}
          {nutrition.totalCarbs}
          g
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.totalCarbs, 275)}
          %
        </span>
      </div>

      {/* Dietary Fiber */}
      <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
        <span>
          Dietary Fiber
          {' '}
          {nutrition.dietaryFiber}
          g
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.dietaryFiber, 28)}
          %
        </span>
      </div>

      {/* Total Sugars */}
      <div className="flex justify-between border-b border-gray-300 py-1 pl-4">
        <span>
          Total Sugars
          {' '}
          {nutrition.totalSugars}
          g
        </span>
      </div>

      {/* Added Sugars */}
      <div className="flex justify-between border-b-4 border-black py-1 pl-8">
        <span className="text-xs">
          Includes
          {' '}
          {nutrition.addedSugars}
          g Added Sugars
        </span>
        <span className="font-bold">
          {calculateDV(nutrition.addedSugars, 50)}
          %
        </span>
      </div>

      {/* Protein */}
      <div className="flex justify-between border-b-8 border-black py-1">
        <span className="font-bold">
          Protein
          {' '}
          {nutrition.protein}
          g
        </span>
      </div>

      {/* Vitamins and Minerals */}
      <div className="border-b-4 border-black py-2">
        <div className="flex justify-between py-0.5">
          <span>
            Vitamin D
            {' '}
            {nutrition.vitaminD}
            mcg
          </span>
          <span>
            {calculateDV(nutrition.vitaminD, 20)}
            %
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span>
            Calcium
            {' '}
            {nutrition.calcium}
            mg
          </span>
          <span>
            {calculateDV(nutrition.calcium, 1300)}
            %
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span>
            Iron
            {' '}
            {nutrition.iron}
            mg
          </span>
          <span>
            {calculateDV(nutrition.iron, 18)}
            %
          </span>
        </div>
        <div className="flex justify-between py-0.5">
          <span>
            Potassium
            {' '}
            {nutrition.potassium}
            mg
          </span>
          <span>
            {calculateDV(nutrition.potassium, 4700)}
            %
          </span>
        </div>
      </div>

      {/* Footer */}
      <div className="pt-1 text-xs">
        <p className="leading-tight">
          * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet. 2,000 calories a day is used for general nutrition advice.
        </p>
      </div>
    </div>
  );
};
