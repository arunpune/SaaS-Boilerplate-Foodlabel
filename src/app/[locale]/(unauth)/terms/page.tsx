import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  return {
    title: 'Terms of Service',
    description: 'Terms of Service for Food Label Generator',
  };
}

const TermsPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Terms of Service</h1>
        <div className="prose max-w-3xl text-muted-foreground">
          <p>Last updated: December 2, 2025</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Acceptance of Terms</h2>
          <p>
            By accessing and using this service, you accept and agree to be bound by the terms
            and provision of this agreement.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. Use License</h2>
          <p>
            Permission is granted to temporarily use the service for personal, non-commercial
            transitory viewing only.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. Disclaimer</h2>
          <p>
            The materials on this service are provided on an 'as is' basis. We make no
            warranties, expressed or implied, and hereby disclaim and negate all other warranties
            including, without limitation, implied warranties or conditions of merchantability,
            fitness for a particular purpose, or non-infringement of intellectual property or
            other violation of rights.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Limitations</h2>
          <p>
            In no event shall our company or its suppliers be liable for any damages arising out
            of the use or inability to use the materials on our service.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. Contact Information</h2>
          <p>
            If you have any questions about these Terms, please contact us.
          </p>
        </div>
      </div>
    </main>
  );
};

export default TermsPage;
