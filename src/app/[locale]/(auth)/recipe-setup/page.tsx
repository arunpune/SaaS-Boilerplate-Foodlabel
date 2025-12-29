import { unstable_setRequestLocale } from 'next-intl/server';

import { Toaster } from '@/components/ui/toaster';
import { RecipeSetupForm } from '@/features/recipe/RecipeSetupForm';

export async function generateMetadata() {
  return {
    title: 'Set up your recipe - FoodLabelMaker',
    description: 'Create FDA compliant nutrition labels',
  };
}

const RecipeSetupPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <RecipeSetupForm />
      <Toaster />
    </>
  );
};

export default RecipeSetupPage;
