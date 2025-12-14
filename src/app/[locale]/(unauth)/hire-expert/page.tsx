import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('hire_expert'),
    description: 'Hire an expert for your labelling needs',
  };
}

const HireExpertPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-center text-4xl font-bold">Hire an Expert</h1>
        <p className="mb-8 text-center text-lg text-muted-foreground">
          Get professional help with your food labelling requirements
        </p>
        <div className="mx-auto max-w-2xl rounded-lg border bg-card p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full rounded-md border bg-background px-4 py-2"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-md border bg-background px-4 py-2"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-2 block text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                className="w-full rounded-md border bg-background px-4 py-2"
                placeholder="Tell us about your needs..."
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary px-4 py-2 font-medium text-primary-foreground hover:bg-primary/90"
            >
              Submit Request
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default HireExpertPage;
