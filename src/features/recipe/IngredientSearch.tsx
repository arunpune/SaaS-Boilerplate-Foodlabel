'use client';

import { Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type FoodItem = {
  fdcId: number;
  description: string;
  dataType?: string;
  brandOwner?: string;
};

type IngredientSearchProps = {
  onSelectIngredient: (ingredient: FoodItem) => void;
  onAddCustomIngredient: () => void;
};

export const IngredientSearch = ({ onSelectIngredient, onAddCustomIngredient }: IngredientSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<FoodItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [error, setError] = useState('');
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const searchFoods = async (query: string) => {
    if (!query || query.length < 2) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Using USDA FoodData Central API
      const apiKey = process.env.NEXT_PUBLIC_FDA_API_KEY || 'DEMO_KEY';
      const response = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${encodeURIComponent(query)}&pageSize=10`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch food data');
      }

      const data = await response.json();

      if (data.foods && data.foods.length > 0) {
        const formattedResults = data.foods.map((food: any) => ({
          fdcId: food.fdcId,
          description: food.description,
          dataType: food.dataType,
          brandOwner: food.brandOwner,
        }));
        setSearchResults(formattedResults);
        setShowDropdown(true);
      } else {
        setSearchResults([]);
        setShowDropdown(true);
      }
    } catch (err) {
      setError('Failed to search ingredients. Please try again.');
      setSearchResults([]);
      setShowDropdown(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Clear previous timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    // Debounce search
    if (value.length >= 2) {
      debounceTimerRef.current = setTimeout(() => {
        searchFoods(value);
      }, 300);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  };

  // Cleanup timer on unmount
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  const handleSelectIngredient = (ingredient: FoodItem) => {
    onSelectIngredient(ingredient);
    setSearchTerm('');
    setSearchResults([]);
    setShowDropdown(false);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    setSearchResults([]);
    setShowDropdown(false);
    setError('');
  };

  return (
    <div className="relative">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="size-4 text-slate-400" />
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onFocus={() => {
            if (searchResults.length > 0) {
              setShowDropdown(true);
            }
          }}
          placeholder="Add Ingredient"
          className="w-full rounded border border-slate-300 px-10 py-2 text-sm placeholder:text-slate-400 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
        />
        {searchTerm && (
          <button
            type="button"
            onClick={handleClearSearch}
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
          >
            <X className="size-4" />
          </button>
        )}
        {isLoading && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3">
            <div className="size-4 animate-spin rounded-full border-2 border-teal-600 border-t-transparent" />
          </div>
        )}
      </div>

      {/* Dropdown Results */}
      {showDropdown && (
        <div className="absolute z-[9999] mt-1 w-[500px] overflow-hidden rounded-md border border-slate-200 bg-white shadow-lg">
          {error && (
            <div className="px-4 py-3 text-sm text-red-600">
              {error}
            </div>
          )}

          {!error && searchResults.length > 0 && (
            <>
              <div className="max-h-64 overflow-auto">
                {searchResults.map(food => (
                  <button
                    key={food.fdcId}
                    type="button"
                    onClick={() => handleSelectIngredient(food)}
                    className="flex w-full items-start gap-3 px-4 py-2.5 text-left hover:bg-slate-50"
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded-full bg-teal-600 text-white">
                      <svg className="size-3.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline gap-1.5">
                        <span className="text-xs font-semibold text-slate-500">
                          {food.fdcId}
                        </span>
                        <span className="break-words text-sm font-medium text-slate-900">
                          {food.description}
                        </span>
                      </div>
                      {food.brandOwner && (
                        <div className="mt-0.5 break-words text-xs text-slate-500">
                          {food.brandOwner}
                        </div>
                      )}
                    </div>
                  </button>
                ))}
              </div>

              {/* Sticky Bottom Actions */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-white">
                <div className="flex items-center justify-between px-4 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddCustomIngredient();
                      handleClearSearch();
                    }}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    Add Custom Ingredient
                  </button>
                  <button
                    type="button"
                    className="text-xs font-medium text-slate-600 hover:text-slate-700 hover:underline"
                  >
                    Advanced Search
                  </button>
                </div>
              </div>
            </>
          )}

          {!error && searchResults.length === 0 && searchTerm.length >= 2 && !isLoading && (
            <>
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No ingredients found
              </div>

              {/* Sticky Bottom Actions */}
              <div className="sticky bottom-0 border-t border-slate-200 bg-white">
                <div className="flex items-center justify-between px-4 py-2">
                  <button
                    type="button"
                    onClick={() => {
                      onAddCustomIngredient();
                      handleClearSearch();
                    }}
                    className="text-xs font-medium text-teal-600 hover:text-teal-700 hover:underline"
                  >
                    Add Custom Ingredient
                  </button>
                  <button
                    type="button"
                    className="text-xs font-medium text-slate-600 hover:text-slate-700 hover:underline"
                  >
                    Advanced Search
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};
