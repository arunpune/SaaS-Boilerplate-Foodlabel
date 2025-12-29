'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import { AuthButton } from '@/components/AuthButton';
import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="bg-secondary px-3 py-6">
      <CenteredMenu
        logo={<div />}
        rightMenu={(
          <>
            {/* PRO: Dark mode toggle button */}
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li className="mr-2.5">
              <Link className={buttonVariants({ variant: 'outline' })} href="/create-label">
                {t('create_label')}
              </Link>
            </li>
            <AuthButton />
          </>
        )}
      >
        <li>
          <Link href="/">{t('home')}</Link>
        </li>

        <li className="group relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 opacity-60 hover:opacity-100">
              {t('products')}
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/products/food-nutrition-labelling">
                  {t('products_food_nutrition')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/products/supplements-formulation">
                  {t('products_supplements')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li className="group relative">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-1 opacity-60 hover:opacity-100">
              {t('industries')}
              <ChevronDown className="size-4" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem asChild>
                <Link href="/industries/food-manufacturers">
                  {t('industries_food_manufacturers')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industries/hospitality-hotels">
                  {t('industries_hospitality')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industries/supplement-manufacturers">
                  {t('industries_supplement_manufacturers')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industries/meal-plan">
                  {t('industries_meal_plan')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industries/restaurants">
                  {t('industries_restaurants')}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/industries/hospitals-healthcare">
                  {t('industries_hospitals')}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>

        <li>
          <Link href="/pricing">{t('pricing')}</Link>
        </li>

        <li>
          <Link href="/hire-expert">{t('hire_expert')}</Link>
        </li>

        <li>
          <Link href="/resources">{t('resources')}</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
