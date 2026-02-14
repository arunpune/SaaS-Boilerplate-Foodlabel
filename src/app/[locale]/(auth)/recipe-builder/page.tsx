import { unstable_setRequestLocale } from 'next-intl/server';
import { Suspense } from 'react';

import { Toaster } from '@/components/ui/toaster';
import { RecipeBuilderPage } from '@/features/recipe/RecipeBuilderPage';

export async function generateMetadata() {
  return {
    title: 'Recipe Builder - FoodLabelMaker',
    description: 'Build your recipe with nutrition facts',
  };
}

const RecipeBuilder = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <RecipeBuilderPage />
      </Suspense>
      <Toaster />
    </>
  );
};

export default RecipeBuilder;
