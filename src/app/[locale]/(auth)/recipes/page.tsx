import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { RecipesPage } from '@/features/recipe/RecipesPage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Recipe',
  });

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
