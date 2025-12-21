import Link from "next/link";
import { prisma } from "@/lib/prisma";

async function getAnalytics() {
  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  // In case Prisma Client has not been regenerated yet and analytics models
  // are missing, fall back gracefully so the page still loads.
  const pageViewClient = (prisma as any).pageView as
    | typeof prisma.pageView
    | undefined;
  const userActionClient = (prisma as any).userAction as
    | typeof prisma.userAction
    | undefined;

  const [
    pageViews,
    userActions,
    topPages,
    topPosts,
    deviceStats,
    browserStats,
    dailyViews,
  ] = await Promise.all([
    pageViewClient ? pageViewClient.count() : 0,
    userActionClient ? userActionClient.count() : 0,
    pageViewClient
      ? pageViewClient.groupBy({
          by: ["path"],
          _count: { path: true },
          orderBy: { _count: { path: "desc" } },
          take: 10,
        })
      : Promise.resolve([]),
    prisma.post.findMany({
      where: { status: "PUBLISHED" },
      orderBy: { views: "desc" },
      take: 10,
      select: { id: true, title: true, slug: true, views: true },
    }),
    pageViewClient
      ? pageViewClient.groupBy({
          by: ["device"],
          _count: { device: true },
        })
      : Promise.resolve([]),
    pageViewClient
      ? pageViewClient.groupBy({
          by: ["browser"],
          _count: { browser: true },
        })
      : Promise.resolve([]),
    pageViewClient
      ? pageViewClient.findMany({
          where: { createdAt: { gte: last7Days } },
          select: { createdAt: true },
        })
      : Promise.resolve([]),
  ]);

  // Group daily views
  const dailyViewsMap = new Map<string, number>();
  dailyViews.forEach((view) => {
    const date = new Date(view.createdAt).toLocaleDateString();
    dailyViewsMap.set(date, (dailyViewsMap.get(date) || 0) + 1);
  });

  const dailyViewsData = Array.from(dailyViewsMap.entries())
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return {
    pageViews,
    userActions,
    topPages,
    topPosts,
    deviceStats,
    browserStats,
    dailyViewsData,
  };
}

export default async function AnalyticsPage() {
  const analytics = await getAnalytics();

  const maxViews = Math.max(...analytics.dailyViewsData.map((d) => d.count), 1);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Analytics</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Website traffic and user behavior insights
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Page Views</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {analytics.pageViews.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">User Actions</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {analytics.userActions.toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last 7 Days</p>
                <p className="text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
                  {analytics.dailyViewsData.reduce((sum, d) => sum + d.count, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Daily Views Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Views (Last 7 Days)</h2>
            <div className="space-y-2">
              {analytics.dailyViewsData.map((day) => (
                <div key={day.date} className="flex items-center gap-3">
                  <div className="w-20 text-xs text-gray-600 dark:text-gray-400">
                    {new Date(day.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                  </div>
                  <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-6 relative overflow-hidden">
                    <div
                      className="bg-blue-600 h-full rounded-full transition-all"
                      style={{ width: `${(day.count / maxViews) * 100}%` }}
                    />
                    <span className="absolute inset-0 flex items-center justify-center text-xs font-medium text-gray-700 dark:text-gray-300">
                      {day.count}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Device Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Device Distribution</h2>
            <div className="space-y-3">
              {analytics.deviceStats.map((stat) => {
                const total = analytics.deviceStats.reduce((sum, s) => sum + s._count.device, 0);
                const percentage = total > 0 ? (stat._count.device / total) * 100 : 0;
                return (
                  <div key={stat.device || "unknown"}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300 capitalize">
                        {stat.device || "Unknown"}
                      </span>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {stat._count.device} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Top Pages and Posts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Top Pages</h2>
            <div className="space-y-2">
              {analytics.topPages.map((page, index) => (
                <div
                  key={page.path}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100">{page.path}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {page._count.path}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Top Posts</h2>
            <div className="space-y-2">
              {analytics.topPosts.map((post, index) => (
                <div
                  key={post.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-700"
                >
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400 w-6 flex-shrink-0">
                      #{index + 1}
                    </span>
                    <span className="text-sm text-gray-900 dark:text-gray-100 truncate">{post.title}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-2 flex-shrink-0">
                    {post.views}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

