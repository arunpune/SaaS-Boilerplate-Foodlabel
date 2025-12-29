import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Navbar } from '@/components/layout/Navbar';
import { RecipesContent } from '@/features/label/RecipesContent';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'CreateLabel',
  });

  return {
    title: `${t('recipes')} - ${t('meta_title')}`,
    description: t('meta_description'),
  };
}

const RecipesPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      <RecipesContent />
    </>
  );
};

export default RecipesPage;
