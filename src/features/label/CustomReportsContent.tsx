'use client';

import { Download, FileBarChart } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { LabelLayout } from './LabelLayout';

export const CustomReportsContent = () => {
  const t = useTranslations('CreateLabel');

  return (
    <LabelLayout
      title={t('custom_reports')}
      description="Generate and manage custom reports for your products"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <FileBarChart className="mb-3 size-10 text-primary" />
            <h3 className="mb-2 text-lg font-semibold">Nutrition Report</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Generate detailed nutrition facts labels and reports
            </p>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              Generate
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <FileBarChart className="mb-3 size-10 text-primary" />
            <h3 className="mb-2 text-lg font-semibold">Cost Analysis</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Analyze ingredient costs and pricing strategies
            </p>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              Generate
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <FileBarChart className="mb-3 size-10 text-primary" />
            <h3 className="mb-2 text-lg font-semibold">Ingredient List</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Export formatted ingredient lists for labels
            </p>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              Generate
            </Button>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <FileBarChart className="mb-3 size-10 text-primary" />
            <h3 className="mb-2 text-lg font-semibold">Allergen Report</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Generate allergen declarations and warnings
            </p>
            <Button variant="outline" size="sm">
              <Download className="mr-2 size-4" />
              Generate
            </Button>
          </div>
        </div>
      </div>
    </LabelLayout>
  );
};
