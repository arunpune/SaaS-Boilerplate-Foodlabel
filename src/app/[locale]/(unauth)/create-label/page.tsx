import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

import { LabelCreator } from '@/features/label/LabelCreator';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'CreateLabel',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const CreateLabelPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return <LabelCreator />;
};

export default CreateLabelPage;
