import type { Metadata } from "next";
import { TrendingUp, Users, Eye, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Analytics",
  description: "Site analytics and performance metrics.",
};

const analyticsMetrics = [
  { label: "Total Visitors", value: "45.2k", icon: Users, trend: "+12.5%" },
  { label: "Page Views", value: "128.3k", icon: Eye, trend: "+8.2%" },
  { label: "Avg. Session", value: "5m 32s", icon: Clock, trend: "+2.3%" },
  { label: "Conversion Rate", value: "3.24%", icon: TrendingUp, trend: "+1.8%" },
];

const topPages = [
  { title: "Home", views: 12543, bounce: "42%" },
  { title: "About", views: 8234, bounce: "38%" },
  { title: "Works", views: 7891, bounce: "45%" },
  { title: "Contact", views: 5234, bounce: "51%" },
];

export default function AnalyticsPage() {
  return (
    <main className="p-8">
      <header className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-slate-500">Analytics</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-slate-900">
          Performance Metrics
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-slate-600">
          Track your site's performance, visitor engagement, and conversion metrics over time.
        </p>
      </header>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {analyticsMetrics.map(({ label, value, icon: Icon, trend }) => (
          <article key={label} className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm font-medium text-slate-500">{label}</p>
                <p className="mt-4 text-3xl font-semibold text-slate-900">{value}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                <Icon className="h-5 w-5" />
              </div>
            </div>
            <p className="mt-5 text-sm font-medium text-green-700">{trend}</p>
          </article>
        ))}
      </section>

      <section className="mt-6 grid gap-4 xl:grid-cols-[2fr_1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Top Pages</h2>
          <div className="mt-6 overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3 text-left font-medium text-slate-600">Page</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">Views</th>
                  <th className="px-4 py-3 text-right font-medium text-slate-600">Bounce Rate</th>
                </tr>
              </thead>
              <tbody>
                {topPages.map((page) => (
                  <tr key={page.title} className="border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{page.title}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{page.views.toLocaleString()}</td>
                    <td className="px-4 py-3 text-right text-slate-600">{page.bounce}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Traffic Source</h2>
          <div className="mt-6 space-y-4">
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Organic</span>
                <span>56%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-blue-500" style={{ width: "56%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Direct</span>
                <span>28%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-purple-500" style={{ width: "28%" }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm font-medium text-slate-700 mb-2">
                <span>Referral</span>
                <span>16%</span>
              </div>
              <div className="h-2 rounded-full bg-slate-200">
                <div className="h-2 rounded-full bg-pink-500" style={{ width: "16%" }}></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
