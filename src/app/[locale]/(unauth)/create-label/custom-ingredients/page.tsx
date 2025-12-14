import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Navbar } from '@/components/layout/Navbar';
import { CustomIngredientsContent } from '@/features/label/CustomIngredientsContent';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'CreateLabel',
  });

  return {
    title: `${t('custom_ingredients')} - ${t('meta_title')}`,
    description: t('meta_description'),
  };
}

const CustomIngredientsPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      <CustomIngredientsContent />
    </>
  );
};

export default CustomIngredientsPage;
