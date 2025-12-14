import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata(props: { params: { locale: string } }) {
  const t = await getTranslations({
    locale: props.params.locale,
    namespace: 'Navbar',
  });

  return {
    title: t('resources'),
    description: 'Resources and guides for food labelling',
  };
}

const ResourcesPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-4 text-4xl font-bold">Resources</h1>
        <p className="mb-12 text-lg text-muted-foreground">
          Guides, templates, and documentation for food labelling
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">Getting Started</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Learn the basics of food nutrition labelling
            </p>
            <span className="cursor-pointer text-sm text-primary hover:underline">
              Read more →
            </span>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">Compliance Guide</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Understand regulatory requirements by country
            </p>
            <span className="cursor-pointer text-sm text-primary hover:underline">
              Read more →
            </span>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">Label Templates</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Pre-designed templates for various countries
            </p>
            <span className="cursor-pointer text-sm text-primary hover:underline">
              Browse templates →
            </span>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">API Documentation</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Integrate our labelling API into your workflow
            </p>
            <span className="cursor-pointer text-sm text-primary hover:underline">
              View docs →
            </span>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">Video Tutorials</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Step-by-step video guides for common tasks
            </p>
            <span className="cursor-pointer text-sm text-primary hover:underline">
              Watch videos →
            </span>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-xl font-semibold">FAQ</h3>
            <p className="mb-4 text-sm text-muted-foreground">
              Answers to frequently asked questions
            </p>
            <span className="cursor-pointer text-sm text-primary hover:underline">
              View FAQ →
            </span>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ResourcesPage;
