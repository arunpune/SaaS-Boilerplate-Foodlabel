import { unstable_setRequestLocale } from 'next-intl/server';

import { RecipesPage } from '@/features/recipe/RecipesPage';

export async function generateMetadata() {
  return {
    title: 'Recipes - FoodLabelMaker',
    description: 'Create FDA compliant nutrition labels',
  };
}

const Recipes = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <RecipesPage />;
};

export default Recipes;
