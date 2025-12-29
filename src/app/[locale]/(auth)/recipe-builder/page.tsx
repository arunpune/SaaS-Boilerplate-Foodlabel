import { unstable_setRequestLocale } from 'next-intl/server';

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
      <RecipeBuilderPage />
      <Toaster />
    </>
  );
};

export default RecipeBuilder;
