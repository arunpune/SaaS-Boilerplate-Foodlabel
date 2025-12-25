import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { CustomIngredientsPage } from '@/features/ingredients/CustomIngredientsPage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Ingredients',
  });

  return {
    title: 'Custom Ingredients - FoodLabelMaker',
    description: 'Manage custom ingredients',
  };
}

const CustomIngredients = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <CustomIngredientsPage />;
};

export default CustomIngredients;
