import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('industries_hospitality'),
    description: 'Solutions for Hospitality & Hotels',
  };
}

const HospitalityHotelsPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Hospitality & Hotels</h1>
        <p className="text-lg text-muted-foreground">
          Comprehensive nutrition labelling for hospitality and hotel food services
        </p>
      </div>
    </main>
  );
};

export default HospitalityHotelsPage;
