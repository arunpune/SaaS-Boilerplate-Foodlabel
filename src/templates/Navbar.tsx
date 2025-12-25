import Link from 'next/link';
import { useTranslations } from 'next-intl';

import { LocaleSwitcher } from '@/components/LocaleSwitcher';
import { buttonVariants } from '@/components/ui/buttonVariants';
import { CenteredMenu } from '@/features/landing/CenteredMenu';
import { Section } from '@/features/landing/Section';

import { Logo } from './Logo';

export const Navbar = () => {
  const t = useTranslations('Navbar');

  return (
    <Section className="bg-white px-3 py-4">
      <CenteredMenu
        logo={<Logo />}
        rightMenu={(
          <>
            <li data-fade>
              <LocaleSwitcher />
            </li>
            <li>
              <Link 
                className={buttonVariants({ variant: 'default', className: 'bg-red-500 hover:bg-red-600 text-white px-6' })} 
                href="/recipe-setup"
              >
                Create a free label
              </Link>
            </li>
            <li className="ml-2">
              <Link 
                className={buttonVariants({ variant: 'outline', className: 'border-2 border-gray-800 text-gray-800 hover:bg-gray-100 px-6' })} 
                href="/sign-in"
              >
                Login
              </Link>
            </li>
          </>
        )}
      >
        <li>
          <Link href="#" className="hover:text-gray-600">Products</Link>
        </li>

        <li>
          <Link href="#" className="hover:text-gray-600">Industries</Link>
        </li>

        <li>
          <Link href="#" className="hover:text-gray-600">Pricing</Link>
        </li>

        <li>
          <Link href="#" className="hover:text-gray-600">Hire an Expert</Link>
        </li>

        <li>
          <Link href="#" className="hover:text-gray-600">Resources</Link>
        </li>
      </CenteredMenu>
    </Section>
  );
};
