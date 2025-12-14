'use client';

import { Plus, Search } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { LabelLayout } from './LabelLayout';

export const CustomIngredientsContent = () => {
  const t = useTranslations('CreateLabel');

  return (
    <LabelLayout
      title={t('custom_ingredients')}
      description="Create and manage custom ingredients for your recipes"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="relative max-w-sm flex-1">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search ingredients..."
              className="pl-9"
            />
          </div>
          <Button>
            <Plus className="mr-2 size-4" />
            Add Ingredient
          </Button>
        </div>

        {/* Empty state */}
        <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Plus className="size-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">
            No custom ingredients yet
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Create custom ingredients to use in your recipes
          </p>
          <Button variant="outline">Add Your First Ingredient</Button>
        </div>
      </div>
    </LabelLayout>
  );
};
