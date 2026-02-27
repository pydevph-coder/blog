import { prisma } from "@/lib/prisma";
import { createAuditLog } from "@/lib/tracking";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import slugify from "slugify";
import readingTime from "reading-time";
import { markdownToHtml } from "@/lib/markdown";
import Link from "next/link";

async function createPost(formData: FormData) {
  "use server";
  const cookieStore = await cookies();
  if (cookieStore.get("admin")?.value !== "1") {
    redirect("/admin/login");
  }

  const title = String(formData.get("title") || "").trim();
  const contentHtml = String(formData.get("contentHtml") || "");
  const contentMarkdown = String(formData.get("contentMarkdown") || "");
  const excerpt = String(formData.get("excerpt") || "").slice(0, 300);
  const status = String(formData.get("status") || "DRAFT") as "DRAFT" | "PUBLISHED" | "ARCHIVED";
  const categoryId = String(formData.get("categoryId") || "") || null;
  const tagIds = formData.getAll("tagIds").map((id) => String(id));

  if (!title || (!contentHtml && !contentMarkdown)) throw new Error("Missing required fields");

  const baseSlug = slugify(title, { lower: true, strict: true }) || `post-${Date.now()}`;
  let slug = baseSlug;
  let suffix = 2;
  while (suffix < 1000) {
    const existing = await prisma.post.findUnique({ where: { slug } });
    if (!existing) break;
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  // If HTML is provided, use it directly. Otherwise, convert markdown to HTML
  let finalContentHtml = contentHtml;
  let finalContentMarkdown = contentMarkdown;
  
  if (contentHtml && !contentMarkdown) {
    // HTML provided, no markdown - use HTML directly
    finalContentMarkdown = ""; // Empty markdown if only HTML provided
  } else if (contentMarkdown && !contentHtml) {
    // Markdown provided, convert to HTML
    finalContentHtml = await markdownToHtml(contentMarkdown);
    finalContentMarkdown = contentMarkdown;
  } else if (contentHtml && contentMarkdown) {
    // Both provided, prefer HTML
    finalContentHtml = contentHtml;
  }
  
  const stats = readingTime(finalContentMarkdown || finalContentHtml);

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      excerpt,
      contentMarkdown: finalContentMarkdown,
      contentHtml: finalContentHtml,
      readingTimeMin: Math.ceil(stats.minutes),
      status,
      categoryId: categoryId || null,
      publishedAt: status === "PUBLISHED" ? new Date() : null,
      metaTitle: title,
      metaDescription: excerpt,
    },
  });

  // Add tags
  if (tagIds.length > 0) {
    await prisma.postTag.createMany({
      data: tagIds.map((tagId) => ({ postId: post.id, tagId })),
    });
  }

  await createAuditLog("create", "post", post.id, `Created post: ${title}`);
  redirect("/admin/posts");
}

export default async function NewPostPage() {
  const categories = await prisma.category.findMany({ orderBy: { name: "asc" } });
  const tags = await prisma.tag.findMany({ orderBy: { name: "asc" } });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Create New Post</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Add a new blog post with HTML or Markdown content
            </p>
          </div>
          <Link
            href="/admin/posts"
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            Back to Posts
          </Link>
        </div>

        <form action={createPost} className="space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Enter post title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Excerpt
            </label>
            <textarea
              name="excerpt"
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              placeholder="Brief description of the post"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (HTML) *
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              For projects and assignments, design your content in HTML first, then paste it here. 
              You can also use Markdown in the field below.
            </p>
            <textarea
              name="contentHtml"
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm dark:bg-gray-700 dark:text-gray-100"
              placeholder="Paste your HTML content here... (e.g., &lt;div&gt;&lt;h2&gt;Title&lt;/h2&gt;&lt;p&gt;Content&lt;/p&gt;&lt;/div&gt;)"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Content (Markdown) - Alternative
            </label>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              If you prefer Markdown, use this field instead. Leave HTML field empty.
            </p>
            <textarea
              name="contentMarkdown"
              rows={20}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-mono text-sm dark:bg-gray-700 dark:text-gray-100"
              placeholder="Write your post content in Markdown..."
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Status
              </label>
              <select
                name="status"
                defaultValue="DRAFT"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Category
              </label>
              <select
                name="categoryId"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
              >
                <option value="">No Category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Tags
            </label>
            <div className="border border-gray-300 dark:border-gray-600 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {tags.map((tag) => (
                  <label key={tag.id} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      name="tagIds"
                      value={tag.id}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{tag.name}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Create Post
            </button>
            <Link
              href="/admin/posts"
              className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              Cancel
            </Link>
          </div>
    </form>
      </div>
    </div>
  );
}


