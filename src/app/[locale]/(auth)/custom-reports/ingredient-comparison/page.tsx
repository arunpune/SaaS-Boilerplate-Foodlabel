import { unstable_setRequestLocale } from 'next-intl/server';

import { IngredientComparisonPage } from '@/features/reports/IngredientComparisonPage';

export async function generateMetadata() {
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
