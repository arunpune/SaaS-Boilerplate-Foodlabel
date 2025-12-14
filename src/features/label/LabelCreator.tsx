'use client';

import { DollarSign, FileBarChart, FileText, Package } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';

import { cn } from '@/utils/Helpers';

export const LabelCreator = () => {
  const t = useTranslations('CreateLabel');
  const pathname = usePathname();

  const menuItems = [
    {
      name: t('recipes'),
      href: '/create-label/recipes',
      icon: FileText,
    },
    {
      name: t('costs'),
      href: '/create-label/costs',
      icon: DollarSign,
    },
    {
      name: t('custom_ingredients'),
      href: '/create-label/custom-ingredients',
      icon: Package,
    },
    {
      name: t('custom_reports'),
      href: '/create-label/custom-reports',
      icon: FileBarChart,
    },
  ];

  return (
    <div className="flex min-h-[calc(100vh-80px)]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-background">
        <div className="p-6">
          <h2 className="mb-6 text-lg font-semibold">{t('sidebar_title')}</h2>
          <nav className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                  )}
                >
                  <Icon className="size-4" />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">{t('welcome_title')}</h1>
            <p className="mt-2 text-muted-foreground">
              {t('welcome_description')}
            </p>
          </div>

          {/* Placeholder content */}
          <div className="rounded-lg border border-border bg-card p-8 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
              <FileText className="size-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-semibold">
              {t('get_started_title')}
            </h3>
            <p className="text-muted-foreground">
              {t('get_started_description')}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};
