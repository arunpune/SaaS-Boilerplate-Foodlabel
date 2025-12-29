import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('industries_meal_plan'),
    description: 'Solutions for Meal Plan Services',
  };
}

const MealPlanPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Meal Plan</h1>
        <p className="text-lg text-muted-foreground">
          Create detailed nutrition labels for meal planning services
        </p>
      </div>
    </main>
  );
};

export default MealPlanPage;
