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
      {/* ... rest of the component unchanged ... */}
    </div>
  );
}
