import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('industries_supplement_manufacturers'),
    description: 'Solutions for Supplement Manufacturers',
  };
}

const SupplementManufacturersPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Supplement Manufacturers</h1>
        <p className="text-lg text-muted-foreground">
          Specialized solutions for dietary supplement manufacturers
        </p>
      </div>
    </main>
  );
};

export default SupplementManufacturersPage;
