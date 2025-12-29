import { unstable_setRequestLocale } from 'next-intl/server';

import { CostsPage } from '@/features/costs/CostsPage';

export async function generateMetadata() {
  return {
    title: 'My Costs - FoodLabelMaker',
    description: 'Manage ingredient and production costs',
  };
}

const Costs = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <CostsPage />;
};

export default Costs;
