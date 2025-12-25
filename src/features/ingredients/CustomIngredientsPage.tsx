'use client';

import Link from 'next/link';

import { DashboardSidebar } from '@/components/DashboardSidebar';
import { ChatWidget } from '@/components/ChatWidget';
import { buttonVariants } from '@/components/ui/buttonVariants';

export const CustomIngredientsPage = () => {
  const ingredients = [
    {
      code: 'A11223344',
      name: 'Semi Sweet Chocolate Chips',
      date: '20-12-2025',
      category: 'Sweets',
      supplier: '-',
      supplierCode: '-',
      tags: ['Vegetarian'],
      tagCount: 1,
    },
  ];

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        {/* Page Content */}
        <div className="p-6">
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-3xl font-bold text-slate-700">Custom Ingredients (1)</h1>
            <button className={buttonVariants({ className: 'bg-teal-700 hover:bg-teal-800 text-white' })}>
              <svg className="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
              Add new ingredient
            </button>
          </div>

          {/* Filters */}
          <div className="mb-6 flex gap-4">
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search for ingredient"
                className="w-full rounded border border-gray-300 py-2 pl-4 pr-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
              />
              <svg className="absolute right-3 top-3 size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <select className="rounded border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
              <option>All Tags</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
              <option>Gluten Free</option>
            </select>
            <select className="rounded border border-gray-300 px-4 py-2 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500">
              <option>All Categories</option>
              <option>Sweets</option>
              <option>Dairy</option>
              <option>Grains</option>
            </select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-1">
                      Ingredient code
                      <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Ingredient name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                    <div className="flex items-center gap-1">
                      Date
                      <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Category</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Supplier Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Supplier Code</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">Tags</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {ingredients.map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-slate-700">{item.code}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{item.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.date}</td>
                    <td className="px-6 py-4 text-sm text-slate-700">{item.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.supplier}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{item.supplierCode}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {item.tags.map((tag, i) => (
                          <span key={i} className="rounded-full bg-teal-100 px-3 py-1 text-xs font-medium text-teal-800">
                            {tag}
                          </span>
                        ))}
                        <span className="text-xs text-gray-500">
                          +
                          {item.tagCount}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button className="text-gray-400 hover:text-gray-600">
                        <svg className="size-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="mt-6 flex items-center justify-center gap-2">
            <button className="rounded p-2 hover:bg-gray-100" disabled>
              <svg className="size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button className="flex size-10 items-center justify-center rounded bg-teal-700 text-white">
              1
            </button>
            <button className="rounded p-2 hover:bg-gray-100">
              <svg className="size-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6">
        <button className="relative flex size-14 items-center justify-center rounded-full bg-teal-700 text-white shadow-lg hover:bg-teal-800">
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
