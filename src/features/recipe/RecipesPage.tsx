'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ChatWidget } from '@/components/ChatWidget';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { buttonVariants } from '@/components/ui/buttonVariants';

import { getUserRecipesAction } from './actions';

type Recipe = {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  servings: number | null;
  updatedAt: Date;
  createdAt: Date;
};

export const RecipesPage = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Load recipes from the database
    const loadRecipes = async () => {
      try {
        console.log('=== Loading Recipes ===');
        setLoading(true);
        // TODO: Replace with actual user ID from auth
        const result = await getUserRecipesAction('user-123');

        console.log('Recipes fetch result:', result);

        if (result.success && result.recipes) {
          console.log('Recipes loaded:', result.recipes);
          setRecipes(result.recipes);
        } else {
          console.error('Failed to load recipes:', result.error);
          setError(result.error || 'Failed to load recipes');
        }
      } catch (err) {
        console.error('Error loading recipes:', err);
        setError('Failed to load recipes');
      } finally {
        setLoading(false);
        console.log('=== Recipes Loading Complete ===');
      }
    };

    loadRecipes();
  }, []);

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        <div className="border-b border-slate-200 bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-slate-700">My Recipes</h1>
            <Link
              href="/recipe-setup"
              className={buttonVariants({
                className: 'bg-red-400 hover:bg-red-500 text-white',
              })}
            >
              <svg className="mr-2 size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              New Recipe
            </Link>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex min-h-[400px] items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-4 size-12 animate-spin rounded-full border-y-2 border-teal-600"></div>
              <p className="text-slate-600">Loading recipes...</p>
            </div>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="flex min-h-[400px] items-center justify-center p-6">
            <div className="text-center">
              <div className="mb-4 text-red-500">
                <svg className="mx-auto size-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-slate-700">{error}</p>
            </div>
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && recipes.length === 0 && (
          <div className="flex min-h-[600px] items-center justify-center p-6">
            <div className="text-center">
              <div className="mx-auto mb-8 flex size-64 items-center justify-center rounded-full bg-gray-100">
                <div className="relative">
                  <svg className="size-32 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <div className="absolute -right-4 -top-4 flex size-16 items-center justify-center rounded-full bg-red-400 text-white">
                    <svg className="size-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                  </div>
                </div>
              </div>

              <h2 className="mb-8 text-2xl font-semibold text-slate-700">
                Create your
                <br />
                own recipe
              </h2>

              <Link
                href="/recipe-setup"
                className={buttonVariants({
                  size: 'lg',
                  className: 'bg-red-400 hover:bg-red-500 text-white px-12 py-6 text-lg',
                })}
              >
                Start Now
              </Link>
            </div>
          </div>
        )}

        {/* Recipes List */}
        {!loading && !error && recipes.length > 0 && (
          <div className="p-6">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {recipes.map(recipe => (
                <Link
                  key={recipe.id}
                  href={`/recipe-builder?id=${recipe.id}`}
                  className="block rounded-lg border border-slate-200 bg-white p-6 transition-shadow hover:shadow-lg"
                >
                  <div className="mb-2 flex items-start justify-between">
                    <h3 className="text-lg font-semibold text-slate-700">{recipe.name}</h3>
                    {recipe.category && (
                      <span className="rounded bg-teal-100 px-2 py-1 text-xs font-medium text-teal-700">
                        {recipe.category}
                      </span>
                    )}
                  </div>
                  {recipe.description && (
                    <p className="mb-3 line-clamp-2 text-sm text-slate-600">{recipe.description}</p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-slate-500">
                    {recipe.servings && (
                      <div className="flex items-center gap-1">
                        <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        {recipe.servings}
                        {' '}
                        servings
                      </div>
                    )}
                    <div>
                      Updated
                      {' '}
                      {new Date(recipe.updatedAt).toLocaleDateString()}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <ChatWidget />
      </div>
    </div>
  );
};
