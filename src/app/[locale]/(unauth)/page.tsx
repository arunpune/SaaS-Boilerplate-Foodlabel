import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Index',
  });

  return {
    title: t('meta_title'),
    description: t('meta_description'),
  };
}

const IndexPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-teal-50 via-slate-100 to-teal-100">
      <div className="text-center">
        <h1 className="mb-4 text-5xl font-bold text-teal-700">Welcome to Food Label Maker</h1>
        <p className="mb-8 text-xl text-gray-600">Create FDA compliant nutrition labels with ease</p>
      </div>
    </main>
  );
};

export default IndexPage;
