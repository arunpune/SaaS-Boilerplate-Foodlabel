'use client';

import { ChatWidget } from '@/components/ChatWidget';
import { DashboardSidebar } from '@/components/DashboardSidebar';

export const IngredientComparisonPage = () => (
  <div className="flex min-h-screen">
    <DashboardSidebar />

    {/* Main Content */}
    <div className="ml-[220px] flex-1">
      {/* Page Content */}
      <div className="p-6">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-700">Ingredients Comparison</h1>
          <button className="rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
            <svg className="mr-2 inline size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download
          </button>
        </div>

        {/* Search Filters */}
        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for ingredient"
              className="w-full rounded border border-gray-300 py-2 pl-4 pr-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <svg className="absolute right-3 top-3 size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <svg className="size-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12M8 12h12m-12 5h12M3 7h.01M3 12h.01M3 17h.01" />
            </svg>
          </div>
          <div className="relative">
            <input
              type="text"
              placeholder="Select up to 3 ingredients"
              className="w-full rounded border border-gray-300 py-2 pl-4 pr-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <svg className="absolute right-3 top-3 size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Serving Size */}
        <div className="mb-6 flex items-center gap-4">
          <label className="text-sm font-medium text-slate-700">Serving size</label>
          <input
            type="text"
            defaultValue="100 gram"
            className="rounded border border-gray-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
          />
          <div className="ml-auto">
            <select className="rounded border border-gray-300 px-3 py-1 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
              <option>Show: 0 Nutrients</option>
              <option>Show: All Nutrients</option>
            </select>
          </div>
        </div>

        {/* Empty State */}
        <div className="flex min-h-[400px] items-center justify-center rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-center">
            <svg className="mx-auto mb-4 size-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14 2v6h6" />
            </svg>

            <h2 className="mb-2 text-xl font-semibold text-slate-700">
              Compare Ingredients
            </h2>

            <p className="text-slate-500">
              Choose up to 3 ingredients to compare
            </p>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  </div>
);
