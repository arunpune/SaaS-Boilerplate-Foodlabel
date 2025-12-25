'use client';

import Link from 'next/link';
import { useState } from 'react';

import { DashboardSidebar } from '@/components/DashboardSidebar';
import { ChatWidget } from '@/components/ChatWidget';
import { buttonVariants } from '@/components/ui/buttonVariants';

export const CostsPage = () => {
  const [activeTab, setActiveTab] = useState('ingredient');

  const ingredientCosts = [
    { name: 'Semi Sweet Chocolate Chips', price: '8', amount: '300', unit: 'g', cost: '$0.03/g' },
    { name: 'Leavening agents, baking soda', price: '0.08', amount: '5', unit: 'g', cost: '$0.02/g' },
    { name: 'Vanilla extract', price: '0.08', amount: '4', unit: 'g', cost: '$0.02/g' },
    { name: 'Butter, without salt', price: '0.4', amount: '200', unit: 'g', cost: '$0.00/g' },
    { name: 'Leavening agents, baking powder, low-sodium', price: '1', amount: '3', unit: 'g', cost: '$0.33/g' },
    { name: 'Egg, whole, raw, fresh', price: '0.12', amount: '88', unit: 'g', cost: '$0.00/g' },
  ];

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />

      {/* Main Content */}
      <div className="ml-[220px] flex-1">
        {/* Page Content */}
        <div className="p-6">
          <h1 className="mb-6 text-3xl font-bold text-slate-700">My Costs</h1>

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-200">
            <div className="flex gap-8">
              <button
                onClick={() => setActiveTab('ingredient')}
                className={`flex items-center gap-2 border-b-2 pb-3 ${
                  activeTab === 'ingredient'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Ingredient Costs
              </button>
              <button
                onClick={() => setActiveTab('other')}
                className={`flex items-center gap-2 border-b-2 pb-3 ${
                  activeTab === 'other'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Other Costs
              </button>
              <button
                onClick={() => setActiveTab('margins')}
                className={`flex items-center gap-2 border-b-2 pb-3 ${
                  activeTab === 'margins'
                    ? 'border-teal-600 text-teal-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                Margins
              </button>
            </div>
          </div>

          {/* Ingredient Costs Tab */}
          {activeTab === 'ingredient' && (
            <div>
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-2xl font-semibold text-slate-700">Ingredient Costs</h2>
                <div className="flex gap-3">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search"
                      className="w-64 rounded border border-gray-300 py-2 pl-4 pr-10 focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"
                    />
                    <svg className="absolute right-3 top-3 size-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <button className={buttonVariants({ className: 'bg-teal-700 hover:bg-teal-800 text-white' })}>
                    <svg className="mr-2 size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Add New Ingredient Cost
                  </button>
                  <button className={buttonVariants({ variant: 'outline', className: 'border-red-400 text-red-400 hover:bg-red-50' })}>
                    Download
                    <svg className="ml-2 size-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <p className="mb-4 text-sm text-slate-600">Enter the total price you pay for each ingredient</p>

              {/* Table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 bg-white">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                        Ingredient
                        <span className="text-red-500">*</span>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                        <div className="flex items-center gap-1">
                          Price($)
                          <span className="text-red-500">*</span>
                          <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                        Amount
                        <span className="text-red-500">*</span>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                        Units
                        <span className="text-red-500">*</span>
                      </th>
                      <th className="px-6 py-3 text-left text-sm font-semibold text-slate-700">
                        <div className="flex items-center gap-1">
                          Cost
                          <svg className="size-4 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                          </svg>
                        </div>
                      </th>
                      <th className="px-6 py-3" />
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {ingredientCosts.map((item, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm text-slate-700">{item.name}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <input
                              type="text"
                              value={item.price}
                              className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                              readOnly
                            />
                            <span className="text-sm text-gray-500">for</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={item.amount}
                            className="w-20 rounded border border-gray-300 px-2 py-1 text-sm"
                            readOnly
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select className="rounded border border-gray-300 px-2 py-1 text-sm" disabled>
                            <option>{item.unit}</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm font-semibold text-slate-700">{item.cost}</td>
                        <td className="px-6 py-4">
                          <div className="flex gap-2">
                            <button className="text-teal-600 hover:text-teal-800">
                              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                            </button>
                            <button className="text-red-500 hover:text-red-700">
                              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'other' && (
            <div className="py-12 text-center text-gray-500">
              <p>Other Costs tab content would go here</p>
            </div>
          )}

          {activeTab === 'margins' && (
            <div className="py-12 text-center text-gray-500">
              <p>Margins tab content would go here</p>
            </div>
          )}
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
