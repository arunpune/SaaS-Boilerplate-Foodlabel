'use client';

import { useEffect, useState } from 'react';

import { ChatWidget } from '@/components/ChatWidget';
import { DashboardSidebar } from '@/components/DashboardSidebar';

import { createRecipeAction } from './actions';
import { CustomizeLabelTab } from './CustomizeLabelTab';
import { NotesAttachmentsTab } from './NotesAttachmentsTab';
import { NutritionBreakdownTab } from './NutritionBreakdownTab';
import { RecipeBuilderTab } from './RecipeBuilderTab';
import { RecipeCostingTab } from './RecipeCostingTab';
import type { RecipeData } from './RecipeSetupTab';
import { RecipeSetupTab } from './RecipeSetupTab';
import { RecipeTabs } from './RecipeTabs';

export const RecipeBuilderPage = () => {
  const [activeTab, setActiveTab] = useState('setup');
  const [saving, setSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  const [recipeData, setRecipeData] = useState<RecipeData>({
    recipeName: '',
    recipeCode: '',
    category: '',
    packages: '1',
    servings: '1',
    isLiquid: false,
    usePercent: false,
  });

  useEffect(() => {
    // Load recipe data from localStorage
    const savedData = localStorage.getItem('recipeData');
    if (savedData) {
      setRecipeData(JSON.parse(savedData));
    }

    // Listen for localStorage changes
    const handleStorageChange = () => {
      const updatedData = localStorage.getItem('recipeData');
      if (updatedData) {
        setRecipeData(JSON.parse(updatedData));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    // Poll for changes (since storage event doesn't fire in same tab)
    const interval = setInterval(() => {
      const updatedData = localStorage.getItem('recipeData');
      if (updatedData) {
        const parsed = JSON.parse(updatedData);
        setRecipeData((prev) => {
          if (JSON.stringify(prev) !== updatedData) {
            return parsed;
          }
          return prev;
        });
      }
    }, 500);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const handleSaveRecipe = async () => {
    if (!recipeData.recipeName) {
      setSaveMessage('Please enter a recipe name');
      setTimeout(() => setSaveMessage(''), 3000);
      return;
    }

    setSaving(true);
    setSaveMessage('');

    try {
      const result = await createRecipeAction({
        userId: 'user-123', // Replace with actual user ID from auth
        name: recipeData.recipeName,
        description: recipeData.recipeCode,
        servings: parseInt(recipeData.servings, 10) || 1,
        category: recipeData.category,
      });

      if (result.success) {
        setSaveMessage(`✓ Recipe saved successfully! ID: ${result.recipe?.id}`);
        setTimeout(() => setSaveMessage(''), 5000);
      } else {
        setSaveMessage(`✗ Failed to save: ${result.error}`);
        setTimeout(() => setSaveMessage(''), 5000);
      }
    } catch {
      setSaveMessage('✗ Error saving recipe');
      setTimeout(() => setSaveMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        {/* Recipe Header */}
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-700">
                {recipeData.recipeName || 'Untitled Recipe'}
              </h1>
              <button type="button" className="text-slate-600 hover:text-slate-800">
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </button>
              <span className="text-sm text-slate-500">
                Recipe Code:
                {' '}
                {recipeData.recipeCode || 'N/A'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {saveMessage && (
                <span className={`text-sm ${saveMessage.includes('✓') ? 'text-green-600' : 'text-red-600'}`}>
                  {saveMessage}
                </span>
              )}
              <button
                type="button"
                onClick={handleSaveRecipe}
                disabled={saving}
                className="flex items-center gap-2 rounded bg-teal-600 px-4 py-2 text-sm font-medium text-white hover:bg-teal-700 disabled:bg-gray-400"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                </svg>
                {saving ? 'Saving...' : 'Save Recipe'}
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download
              </button>
              <button
                type="button"
                className="flex items-center gap-2 rounded border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50"
              >
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Manage Recipe
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <RecipeTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab Content */}
        <div className="mx-auto max-w-5xl p-6">
          {activeTab === 'setup' && <RecipeSetupTab />}

          {activeTab === 'builder' && <RecipeBuilderTab />}

          {activeTab === 'customize' && <CustomizeLabelTab />}

          {activeTab === 'nutrition' && <NutritionBreakdownTab />}

          {activeTab === 'notes' && <NotesAttachmentsTab />}

          {activeTab === 'costing' && <RecipeCostingTab />}
        </div>
      </div>

      <ChatWidget />
    </div>
  );
};
