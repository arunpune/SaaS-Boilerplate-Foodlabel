import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { Navbar } from '@/components/layout/Navbar';
import { CustomReportsContent } from '@/features/label/CustomReportsContent';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'CreateLabel',
  });

  return {
    title: `${t('custom_reports')} - ${t('meta_title')}`,
    description: t('meta_description'),
  };
}

const CustomReportsPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <>
      <Navbar />
      <CustomReportsContent />
    </>
  );
};

export default CustomReportsPage;
