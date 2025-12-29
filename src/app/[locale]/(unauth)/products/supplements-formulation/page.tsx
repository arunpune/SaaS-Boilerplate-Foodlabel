import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('products_supplements'),
    description: 'Supplements Formulation and Labelling solutions',
  };
}

const SupplementsFormulationPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Supplements Formulation and Labelling</h1>
        <p className="text-lg text-muted-foreground">
          Formulate and label dietary supplements with precision and compliance
        </p>
      </div>
    </main>
  );
};

export default SupplementsFormulationPage;
