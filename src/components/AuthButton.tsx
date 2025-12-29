'use client';

import { SignedIn, SignedOut, SignOutButton } from '@clerk/nextjs';
import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/buttonVariants';

export const AuthButton = () => {
  const t = useTranslations('Navbar');

  return (
    <>
      <SignedOut>
        <li className="ml-1 mr-2.5" data-fade>
          <Link href="/sign-in">{t('sign_in')}</Link>
        </li>
        <li>
          <Link className={buttonVariants()} href="/sign-up">
            {t('sign_up')}
          </Link>
        </li>
      </SignedOut>
      <SignedIn>
        <li className="mr-2.5">
          <Link className={buttonVariants({ variant: 'outline' })} href="/dashboard">
            {t('dashboard')}
          </Link>
        </li>
        <li>
          <SignOutButton>
            <button type="button" className={buttonVariants({ variant: 'destructive' })}>
              {t('sign_out')}
            </button>
          </SignOutButton>
        </li>
      </SignedIn>
    </>
  );
};
