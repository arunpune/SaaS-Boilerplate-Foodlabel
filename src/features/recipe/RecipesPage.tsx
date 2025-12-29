'use client';

import Link from 'next/link';

import { ChatWidget } from '@/components/ChatWidget';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { buttonVariants } from '@/components/ui/buttonVariants';

export const RecipesPage = () => (
  <div className="flex min-h-screen">
    <DashboardSidebar />

    {/* Main Content */}
    <div className="ml-[220px] flex-1">

      {/* Empty State */}
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

      <ChatWidget />
    </div>
  </div>
);
