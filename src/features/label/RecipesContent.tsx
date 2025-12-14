'use client';

import { Plus } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';

import { LabelLayout } from './LabelLayout';

export const RecipesContent = () => {
  const t = useTranslations('CreateLabel');

  return (
    <LabelLayout
      title={t('recipes')}
      description="Manage your food recipes and formulations"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Your Recipes</h2>
            <p className="text-sm text-muted-foreground">
              Create and manage recipe formulations for your products
            </p>
          </div>
          <Button>
            <Plus className="mr-2 size-4" />
            New Recipe
          </Button>
        </div>

        {/* Empty state */}
        <div className="rounded-lg border border-dashed border-border bg-muted/50 p-12 text-center">
          <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-primary/10">
            <Plus className="size-6 text-primary" />
          </div>
          <h3 className="mb-2 text-lg font-semibold">No recipes yet</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Get started by creating your first recipe
          </p>
          <Button variant="outline">Create Recipe</Button>
        </div>
      </div>
    </LabelLayout>
  );
};
