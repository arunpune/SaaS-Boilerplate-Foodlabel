'use client';

import { ChatWidget } from '@/components/ChatWidget';
import { DashboardSidebar } from '@/components/DashboardSidebar';
import { buttonVariants } from '@/components/ui/buttonVariants';

export const MenuLabelPage = () => (
  <div className="flex min-h-screen">
    <DashboardSidebar />

    {/* Main Content */}
    <div className="ml-[220px] flex-1">
      {/* Page Content */}
      <div className="p-6">
        <h1 className="mb-8 text-3xl font-bold text-slate-700">Menu Label Reports</h1>

        {/* Empty State */}
        <div className="flex min-h-[500px] items-center justify-center">
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
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-sm font-bold text-gray-800">
                  MENU
                  <br />
                  LABEL REPORT
                </div>
              </div>
            </div>

            <h2 className="mb-2 text-2xl font-semibold text-slate-700">
              No Menu Label Report Yet
            </h2>

            <p className="mb-8 text-slate-600">
              Start creating your first Menu Label Report
            </p>

            <button
              className={buttonVariants({
                size: 'lg',
                className: 'bg-red-400 hover:bg-red-500 text-white px-8',
              })}
            >
              Create Menu Label Report
              <svg className="ml-2 size-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <ChatWidget />
    </div>
  </div>
);
