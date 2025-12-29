import Link from 'next/link';

import { buttonVariants } from '@/components/ui/buttonVariants';

export const PromoBanner = () => (
  <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 py-3">
    <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-4 px-4 text-center">
      <div className="flex items-center gap-2">
        <svg
          className="size-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="font-bold text-gray-800">Limited Time!</span>
      </div>
      <span className="text-gray-800">Additional 15% OFF</span>
      <span className="font-semibold text-gray-800">Yearly Subscription</span>
      <Link
        className={buttonVariants({
          className: 'bg-teal-700 hover:bg-teal-800 text-white px-6',
        })}
        href="/pricing"
      >
        Buy Now & Save
      </Link>
    </div>
  </div>
);
