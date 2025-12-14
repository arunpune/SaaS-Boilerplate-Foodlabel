import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('industries_restaurants'),
    description: 'Solutions for Restaurants and Food Service',
  };
}

const RestaurantsPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Restaurants and Food Service</h1>
        <p className="text-lg text-muted-foreground">
          Menu nutrition labelling solutions for restaurants and food service providers
        </p>
      </div>
    </main>
  );
};

export default RestaurantsPage;
