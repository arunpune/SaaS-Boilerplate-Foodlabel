import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';
import { Section } from '@/features/landing/Section';

export const Hero = () => {
  const t = useTranslations('Hero');

  return (
    <Section className="bg-gradient-to-br from-teal-50 via-slate-100 to-teal-100 py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 px-4 lg:grid-cols-2">
        {/* Left Content */}
        <div className="space-y-8">
          <h1 className="text-4xl font-bold leading-tight text-teal-700 md:text-5xl lg:text-6xl">
            Easily Analyze Recipes and Create FDA Compliant Nutrition Labels
          </h1>
          
          <p className="text-lg text-gray-600 md:text-xl">
            Save time and money, create your own label in minutes using our 500k+ ingredient database built by certified nutritionists
          </p>

          <div className="flex flex-col gap-4 sm:flex-row">
            <Link
              className={buttonVariants({ 
                size: 'lg',
                className: 'bg-red-500 hover:bg-red-600 text-white px-8 py-6 text-lg font-semibold'
              })}
              href="/recipe-setup"
            >
              Create a Free Label
            </Link>
          </div>
        </div>

        {/* Right Content - Nutrition Labels */}
        <div className="relative">
          <div className="grid grid-cols-2 gap-4">
            {/* Nutrition Facts Label 1 */}
            <div className="rounded-lg bg-white p-4 shadow-xl">
              <div className="border-b-8 border-black pb-2">
                <h2 className="text-xl font-bold">Nutrition Facts</h2>
                <p className="text-xs">1 Serving Per Container</p>
                <p className="text-sm font-semibold">Serving Size <span className="float-right">250g</span></p>
              </div>
              <div className="border-b-4 border-black py-1">
                <p className="text-xs">Amount Per Serving</p>
                <p className="text-2xl font-bold">Calories <span className="float-right">660</span></p>
              </div>
              <div className="space-y-1 border-b border-black py-2 text-xs">
                <p className="font-semibold text-right">% Daily Value *</p>
                <p className="border-b border-gray-300">Total Fat 52g <span className="float-right font-bold">67%</span></p>
                <p className="border-b border-gray-300 pl-4">Saturated Fat 13g <span className="float-right font-bold">63%</span></p>
                <p className="border-b border-gray-300 pl-4">Trans Fat 0g</p>
                <p className="border-b border-gray-300">Cholesterol 270mg <span className="float-right font-bold">90%</span></p>
                <p className="border-b border-gray-300">Sodium 160mg <span className="float-right font-bold">7%</span></p>
              </div>
            </div>

            {/* Nutrition Facts Label 2 */}
            <div className="mt-8 rounded-lg bg-white p-4 shadow-xl">
              <div className="border-b-4 border-black pb-2">
                <h2 className="text-lg font-bold">Nutrition Facts</h2>
                <p className="text-sm font-semibold">Valeur nutritive</p>
                <p className="text-xs">Per 250g</p>
              </div>
              <div className="border-b-2 border-black py-1">
                <p className="text-xl font-bold">Calories 660</p>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-xs font-semibold text-right">% Daily Value *</p>
                <p>Fat / Lipides 52 g <span className="float-right font-bold">70%</span></p>
              </div>
            </div>
          </div>

          {/* Allergen Icons */}
          <div className="absolute right-0 top-0 rounded-lg bg-white p-3 shadow-lg">
            <p className="mb-2 text-xs font-semibold">Allergens</p>
            <div className="grid grid-cols-3 gap-2">
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-500 text-white">🥛</div>
              <div className="flex size-8 items-center justify-center rounded-full bg-gray-300">🥚</div>
              <div className="flex size-8 items-center justify-center rounded-full bg-red-400">🌾</div>
              <div className="flex size-8 items-center justify-center rounded-full bg-orange-400">🥜</div>
              <div className="flex size-8 items-center justify-center rounded-full bg-yellow-400">🌰</div>
              <div className="flex size-8 items-center justify-center rounded-full bg-blue-700">🐟</div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};
