'use client';

import { Calculator } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { LabelLayout } from './LabelLayout';

export const CostsContent = () => {
  const t = useTranslations('CreateLabel');

  return (
    <LabelLayout
      title={t('costs')}
      description="Track and manage costs for your products"
    >
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Total Costs
                </p>
                <h3 className="mt-2 text-2xl font-bold">$0.00</h3>
              </div>
              <Calculator className="size-8 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Average Cost
                </p>
                <h3 className="mt-2 text-2xl font-bold">$0.00</h3>
              </div>
              <Calculator className="size-8 text-muted-foreground" />
            </div>
          </div>

          <div className="rounded-lg border border-border bg-card p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Products
                </p>
                <h3 className="mt-2 text-2xl font-bold">0</h3>
              </div>
              <Calculator className="size-8 text-muted-foreground" />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-border bg-card p-6">
          <h3 className="mb-4 text-lg font-semibold">Cost Breakdown</h3>
          <div className="text-center text-sm text-muted-foreground">
            No cost data available yet
          </div>
        </div>
      </div>
    </LabelLayout>
  );
};
