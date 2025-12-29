import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('pricing'),
    description: 'Pricing plans for food label generation',
  };
}

const PricingPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-center text-4xl font-bold">Pricing</h1>
        <p className="mb-12 text-center text-lg text-muted-foreground">
          Choose the plan that fits your needs
        </p>
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-3">
          <div className="rounded-lg border bg-card p-8">
            <h3 className="mb-2 text-2xl font-bold">Starter</h3>
            <p className="mb-4 text-muted-foreground">For individuals and small teams</p>
            <div className="mb-6 text-3xl font-bold">
              $29
              <span className="text-sm font-normal">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ 50 labels per month</li>
              <li>✓ Basic templates</li>
              <li>✓ Email support</li>
            </ul>
          </div>
          <div className="rounded-lg border-2 border-primary bg-card p-8">
            <h3 className="mb-2 text-2xl font-bold">Professional</h3>
            <p className="mb-4 text-muted-foreground">For growing businesses</p>
            <div className="mb-6 text-3xl font-bold">
              $99
              <span className="text-sm font-normal">/month</span>
            </div>
            <ul className="space-y-2 text-sm">
              <li>✓ Unlimited labels</li>
              <li>✓ All templates</li>
              <li>✓ Priority support</li>
              <li>✓ API access</li>
            </ul>
          </div>
          <div className="rounded-lg border bg-card p-8">
            <h3 className="mb-2 text-2xl font-bold">Enterprise</h3>
            <p className="mb-4 text-muted-foreground">For large organizations</p>
            <div className="mb-6 text-3xl font-bold">Custom</div>
            <ul className="space-y-2 text-sm">
              <li>✓ Everything in Professional</li>
              <li>✓ Custom templates</li>
              <li>✓ Dedicated support</li>
              <li>✓ SLA guarantee</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
};

export default PricingPage;
