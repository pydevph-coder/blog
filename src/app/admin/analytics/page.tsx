import Link from "next/link";
import { prisma } from "@/lib/prisma";

type PrismaWithAnalytics = typeof prisma & {
  pageView?: typeof prisma.pageView;
  userAction?: typeof prisma.userAction;
};

async function getAnalytics() {
  const now = new Date();
  const last7Days = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

  const prismaAny = prisma as unknown as PrismaWithAnalytics;

  const pageViewClient = prismaAny.pageView;
  const userActionClient = prismaAny.userAction;

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
