import { unstable_setRequestLocale } from 'next-intl/server';

export async function generateMetadata() {
  return {
    title: 'Privacy Policy',
    description: 'Privacy Policy for Food Label Generator',
  };
}

const PrivacyPage = (props: { params: { locale: string } }) => {
  unstable_setRequestLocale(props.params.locale);

  return (
    <main className="flex min-h-[60vh] items-center justify-center">
      <div className="container px-4 py-16">
        <h1 className="mb-8 text-4xl font-bold">Privacy Policy</h1>
        <div className="prose max-w-3xl text-muted-foreground">
          <p>Last updated: December 2, 2025</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Information We Collect</h2>
          <p>
            We collect information you provide directly to us when you create an account, use our
            services, or communicate with us.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. How We Use Your Information</h2>
          <p>
            We use the information we collect to provide, maintain, and improve our services, to
            develop new services, and to protect our company and our users.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. Information Sharing</h2>
          <p>
            We do not share your personal information with companies, organizations, or
            individuals outside of our company except in the following cases: with your consent,
            for legal reasons, or to protect rights and safety.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Data Security</h2>
          <p>
            We work hard to protect our users from unauthorized access to or unauthorized
            alteration, disclosure, or destruction of information we hold.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. Your Rights</h2>
          <p>
            You have the right to access, update, or delete your personal information at any
            time. You may also have the right to object to or restrict certain types of
            processing of your personal information.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">6. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </main>
  );
};

export default PrivacyPage;
