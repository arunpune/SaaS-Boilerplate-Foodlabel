import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Navbar } from '@/components/layout/Navbar';
import { CostsContent } from '@/features/label/CostsContent';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'CreateLabel',
  });

  return {
    title: `${t('costs')} - ${t('meta_title')}`,
    description: t('meta_description'),
  };
}

const CostsPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      <CostsContent />
    </>
  );
};

export default CostsPage;
