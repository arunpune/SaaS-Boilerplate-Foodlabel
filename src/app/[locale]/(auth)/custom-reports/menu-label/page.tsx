import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { MenuLabelPage } from '@/features/reports/MenuLabelPage';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Reports',
  });

  return {
    title: 'Menu Label Reports - FoodLabelMaker',
    description: 'Create menu label reports',
  };
}

const MenuLabel = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <MenuLabelPage />;
};

export default MenuLabel;
