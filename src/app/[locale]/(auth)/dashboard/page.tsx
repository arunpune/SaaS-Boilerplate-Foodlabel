import { useTranslations } from 'next-intl';

import { TitleBar } from '@/features/dashboard/TitleBar';

const DashboardIndexPage = () => {
  const t = useTranslations('DashboardIndex');

  return (
    <>
      <TitleBar
        title={t('title_bar')}
        description={t('title_bar_description')}
      />

      <div className="mt-8 p-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Quick Actions</h3>
            <p className="text-sm text-muted-foreground">Manage your labels and settings</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Recent Activity</h3>
            <p className="text-sm text-muted-foreground">View your recent label creations</p>
          </div>

          <div className="rounded-lg border bg-card p-6">
            <h3 className="mb-2 text-lg font-semibold">Statistics</h3>
            <p className="text-sm text-muted-foreground">Track your usage and metrics</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardIndexPage;
