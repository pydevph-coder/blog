import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/tracking";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import slugify from "slugify";

async function createTag(formData: FormData) {
  "use server";
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== "1") {
    redirect("/admin/login");
  }

  const name = String(formData.get("name") || "").trim();
  const slug = slugify(name, { lower: true, strict: true }) || `tag-${Date.now()}`;

  const tag = await prisma.tag.create({
    data: { name, slug },
  });

  await createAuditLog("create", "tag", tag.id, `Created tag: ${name}`);
  redirect("/admin/tags");
}

async function deleteTag(id: string) {
  "use server";
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== "1") {
    redirect("/admin/login");
  }

  const tag = await prisma.tag.findUnique({ where: { id } });
  if (tag) {
    await prisma.tag.delete({ where: { id } });
    await createAuditLog("delete", "tag", id, `Deleted tag: ${tag.name}`);
  }
  redirect("/admin/tags");
}

export default async function TagsPage() {
  const tags = await prisma.tag.findMany({
    include: {
      _count: {
        select: { posts: true },
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Tags</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage blog tags
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Create Form */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">Create Tag</h2>
          <form action={createTag} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Name *
              </label>
              <input
                type="text"
                name="name"
                required
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                placeholder="e.g., JavaScript, Python, Linux"
              />
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Tag
            </button>
          </form>
        </div>

        {/* Tags Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <div
                key={tag.id}
                className="flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800"
              >
                <span className="text-sm font-medium text-blue-900 dark:text-blue-100">
                  #{tag.name}
                </span>
                <span className="text-xs text-blue-600 dark:text-blue-400">
                  ({tag._count.posts} posts)
                </span>
                <form action={deleteTag.bind(null, tag.id)} className="inline">
                  <button
                    type="submit"
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300 text-xs"
                  >
                    ×
                  </button>
                </form>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

