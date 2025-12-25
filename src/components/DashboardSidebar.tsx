'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

import { buttonVariants } from '@/components/ui/buttonVariants';

export const DashboardSidebar = () => {
  const [language, setLanguage] = useState('EN');
  const [reportsOpen, setReportsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 h-screen w-[220px] overflow-y-auto bg-slate-800 text-white">
      {/* Logo */}
      <div className="border-b border-slate-700 p-4">
        <Link href="/" className="block">
          <div className="text-lg font-bold">
            FoodLabelMaker
            <span className="text-sm font-normal">.com</span>
          </div>
        </Link>
      </div>

      {/* Subscribe Button */}
      <div className="space-y-3 p-4">
        <Link
          href="/pricing"
          className={buttonVariants({
            className: 'w-full bg-red-400 hover:bg-red-500 text-white',
          })}
        >
          Subscribe Now
        </Link>
        <div className="text-center text-xs">
          <div>
            Get
            <span className="font-bold">15% OFF</span>
          </div>
          <div>Yearly Subscription</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="px-4 py-2">
        <div className="mb-2 text-xs font-semibold text-slate-400">
          Nutrition Facts Labeling
        </div>
        <ul className="space-y-1">
          <li>
            <Link
              href="/recipes"
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-700 ${
                pathname === '/recipes' ? 'bg-slate-700' : ''
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Recipes
            </Link>
          </li>
          <li>
            <Link
              href="/costs"
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-700 ${
                pathname === '/costs' ? 'bg-slate-700' : ''
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Costs
            </Link>
          </li>
          <li>
            <Link
              href="/custom-ingredients"
              className={`flex items-center gap-2 rounded px-3 py-2 text-sm hover:bg-slate-700 ${
                pathname === '/custom-ingredients' ? 'bg-slate-700' : ''
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Custom Ingredients
            </Link>
          </li>
          <li>
            <button
              onClick={() => setReportsOpen(!reportsOpen)}
              className={`flex w-full items-center gap-2 rounded px-3 py-2 text-left text-sm hover:bg-slate-700 ${
                pathname?.includes('/custom-reports') ? 'bg-slate-700' : ''
              }`}
            >
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Custom Reports
              <span className="ml-auto rounded bg-yellow-500 px-1.5 py-0.5 text-xs font-bold text-slate-900">
                NEW
              </span>
              <svg
                className={`size-3 transition-transform ${reportsOpen ? 'rotate-90' : ''}`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            {reportsOpen && (
              <ul className="ml-6 mt-1 space-y-1 border-l border-slate-600 pl-2">
                <li>
                  <Link
                    href="/custom-reports/menu-label"
                    className={`block rounded px-3 py-2 text-sm hover:bg-slate-700 ${
                      pathname === '/custom-reports/menu-label' ? 'bg-slate-700' : ''
                    }`}
                  >
                    Menu Label
                  </Link>
                </li>
                <li>
                  <Link
                    href="/custom-reports/ingredient-comparison"
                    className={`block rounded px-3 py-2 text-sm hover:bg-slate-700 ${
                      pathname === '/custom-reports/ingredient-comparison' ? 'bg-slate-700' : ''
                    }`}
                  >
                    <span className="rounded bg-yellow-500 px-1 py-0.5 text-xs font-bold text-slate-900">
                      NEW
                    </span>
                    {' '}
                    Ingredient Comparison
                  </Link>
                </li>
              </ul>
            )}
          </li>
        </ul>

        <div className="mb-2 mt-4 flex items-center gap-2 text-xs font-semibold text-slate-400">
          <span className="rounded bg-teal-600 px-1.5 py-0.5 text-white">BETA</span>
        </div>
        <Link
          href="/supplement-facts"
          className="flex items-center gap-2 rounded px-3 py-2 text-sm text-slate-400 hover:bg-slate-700"
        >
          Supplement Facts Labeling
          <svg className="ml-auto size-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
        </Link>
      </nav>

      {/* Book Demo Button */}
      <div className="p-4">
        <Link
          href="/demo"
          className={buttonVariants({
            variant: 'outline',
            className: 'w-full border-2 border-white text-white hover:bg-slate-700',
          })}
        >
          Book a Free Demo
        </Link>
      </div>

      {/* Account Section */}
      <div className="border-t border-slate-700 p-4">
        <div className="mb-2 text-xs font-semibold text-slate-400">Account</div>
        <ul className="space-y-2">
          <li>
            <Link href="/account" className="flex items-center gap-2 text-sm hover:text-slate-300">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Account
            </Link>
          </li>
          <li>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Language
              </div>
              <select
                value={language}
                onChange={e => setLanguage(e.target.value)}
                className="rounded border border-slate-600 bg-slate-700 px-2 py-1 text-sm"
              >
                <option value="EN">EN</option>
                <option value="FR">FR</option>
                <option value="ES">ES</option>
              </select>
            </div>
          </li>
          <li>
            <Link href="/sign-out" className="flex items-center gap-2 text-sm hover:text-slate-300">
              <svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign out
            </Link>
          </li>
        </ul>
      </div>

      {/* Footer Links */}
      <div className="border-t border-slate-700 p-4 text-xs text-slate-400">
        <div className="mb-2 flex flex-wrap gap-2">
          <Link href="/hire-expert" className="hover:text-white">Hire an Expert</Link>
          <span>·</span>
          <Link href="/faq" className="hover:text-white">FAQ</Link>
          <span>·</span>
          <Link href="/about" className="hover:text-white">About Us</Link>
          <span>·</span>
          <Link href="/terms" className="hover:text-white">Terms & Conditions</Link>
          <span>·</span>
          <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
        </div>
        <div className="mt-3 text-xs">
          Powered By FoodLabelMaker © 2025 All Rights Reserved
        </div>
      </div>
    </aside>
  );
};
