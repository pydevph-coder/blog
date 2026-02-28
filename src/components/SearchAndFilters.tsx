"use client";
import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

type Post = {
  id: string;
  slug: string;
  title: string;
  cat : string;
  excerpt: string | null;
  publishedAt: Date | string | null;
  readingTimeMin: number | null;
  tags: Array<{ tag: { id: string; name: string; slug: string } }>;
};

type Tag = {
  id: string;
  name: string;
  slug: string;
};

type SearchAndFiltersProps = {
  posts: Post[];
  allTags: Tag[];
  type: "projects" | "assignments";
};

// Predefined category groups
const categoryGroups = {
  "Programming Languages": ["javascript", "typescript", "python", "java", "c++", "c", "rust", "go", "php", "ruby", "swift", "kotlin", "dart"],
  "Operating Systems": ["windows", "linux", "macos", "ubuntu", "android", "ios"],
  "Engineering Fields": ["engineering", "mechanical", "electrical", "civil", "software-engineering", "computer-engineering"],
  "IT & CS": ["it", "computer-science", "cs", "information-technology", "data-science", "ai", "machine-learning", "cybersecurity", "networking"],
};

export default function SearchAndFilters({ posts, allTags, type }: SearchAndFiltersProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeCategoryGroup, setActiveCategoryGroup] = useState<string | null>(null);

  // Filter posts based on search and selected tags
  const filteredPosts = useMemo(() => {
    return posts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt && post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
        post.tags.some((pt) => pt.tag.name.toLowerCase().includes(searchQuery.toLowerCase()));

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.every((tagSlug) =>
          post.tags.some((pt) => pt.tag.slug === tagSlug)
        );

      return matchesSearch && matchesTags;
    });
  }, [posts, searchQuery, selectedTags]);

  const toggleTag = (tagSlug: string) => {
    setSelectedTags((prev) =>
      prev.includes(tagSlug) ? prev.filter((t) => t !== tagSlug) : [...prev, tagSlug]
    );
  };

  const selectCategoryGroup = (groupName: string) => {
    const groupTags = categoryGroups[groupName as keyof typeof categoryGroups] || [];
    const availableTags = allTags
      .filter((tag) => groupTags.some((gt) => tag.slug.toLowerCase().includes(gt.toLowerCase())))
      .map((tag) => tag.slug);

    if (activeCategoryGroup === groupName) {
      setActiveCategoryGroup(null);
      setSelectedTags([]);
    } else {
      setActiveCategoryGroup(groupName);
      setSelectedTags(availableTags);
    }
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
    setActiveCategoryGroup(null);
  };

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0;

  return (
    <div className="space-y-6 mb-8">
      {/* Search Bar */}
      <div className="relative">
        <input
          type="text"
          placeholder={`Search ${type}...`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full px-4 py-3 pl-12 border-2 border-gray-300 dark:border-gray-700 rounded-lg focus:border-blue-500 dark:focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-colors bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Category Groups */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Filter by Category
          </h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear all
            </button>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(categoryGroups).map((groupName) => {
            const isActive = activeCategoryGroup === groupName;
            return (
              <button
                key={groupName}
                onClick={() => selectCategoryGroup(groupName)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  isActive
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {groupName}
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Tags */}
      {selectedTags.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide">
            Active Filters
          </h3>
          <div className="flex flex-wrap gap-2">
            {selectedTags.map((tagSlug) => {
              const tag = allTags.find((t) => t.slug === tagSlug);
              if (!tag) return null;
              return (
                <button
                  key={tagSlug}
                  onClick={() => toggleTag(tagSlug)}
                  className="px-3 py-1.5 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors flex items-center gap-2"
                >
                  {tag.name}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600 dark:text-gray-400">
        Showing <span className="font-semibold text-gray-900 dark:text-gray-100">{filteredPosts.length}</span> of{" "}
        <span className="font-semibold text-gray-900 dark:text-gray-100">{posts.length}</span> {type}
      </div>

      {/* Posts List */}
      <div className="space-y-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <article
              key={post.id}
              className={`group border-2 border-gray-200 dark:border-gray-800 rounded-xl p-6 transition-all duration-300 hover:shadow-lg bg-white dark:bg-gray-900 cursor-pointer ${
                type === "projects"
                  ? "hover:border-blue-400 dark:hover:border-blue-600"
                  : "hover:border-green-400 dark:hover:border-green-600"
              }`}
              onClick={() => router.push(`/${post.cat}/${post.slug}`)}
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3
                      className={`text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors duration-200 mb-2 ${
                        type === "projects"
                          ? "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                          : "group-hover:text-green-600 dark:group-hover:text-green-400"
                      }`}
                    >
                      {post.title}
                    </h3>
                    {post.excerpt && (
                      <p className="text-gray-600 dark:text-gray-400 leading-relaxed line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  <svg
                    className={`w-6 h-6 text-gray-400 transition-all duration-200 group-hover:translate-x-1 flex-shrink-0 ${
                      type === "projects"
                        ? "group-hover:text-blue-600 dark:group-hover:text-blue-400"
                        : "group-hover:text-green-600 dark:group-hover:text-green-400"
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>

                {/* Tags */}
                {post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2" onClick={(e) => e.stopPropagation()}>
                    {post.tags.map((pt) => (
                      <Link
                        key={pt.tag.id}
                        href={`/tag/${pt.tag.slug}`}
                        className="px-3 py-1 bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 rounded-full text-xs font-medium hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                      >
                        #{pt.tag.name}
                      </Link>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-500">
                  {post.publishedAt && (
                    <time className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      {new Date(post.publishedAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </time>
                  )}
                  {post.readingTimeMin && (
                    <span className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {post.readingTimeMin} min read
                    </span>
                  )}
                  <span
                    className={`flex items-center gap-1 font-medium ${
                      type === "projects"
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-green-600 dark:text-green-400"
                    }`}
                  >
                    View {type === "projects" ? "project" : "assignment"}
                  </span>
                </div>
              </div>
            </article>
          ))
        ) : (
          <div className="text-center py-16 space-y-4">
            <div className="w-16 h-16 mx-auto bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">No results found</h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
              Try adjusting your search query or filters to find what you&apos;re looking for.
            </p>
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

