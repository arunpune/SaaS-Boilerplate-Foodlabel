import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { IngredientComparisonPage } from '@/features/reports/IngredientComparisonPage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Reports',
  });

  return {
    title: 'Ingredients Comparison - FoodLabelMaker',
    description: 'Compare ingredients',
  };
}

const IngredientComparison = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <IngredientComparisonPage />;
};

export default IngredientComparison;
