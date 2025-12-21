export type SeoOptions = {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
};

export function buildMetadata({ title, description, canonical, image }: SeoOptions = {}) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const fullTitle = title ? `${title} | ${process.env.NEXT_PUBLIC_SITE_NAME || "My Blog"}` : (process.env.NEXT_PUBLIC_SITE_NAME || "My Blog");

  return {
    title: fullTitle,
    description: description || process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
    alternates: { canonical: canonical || baseUrl },
    openGraph: {
      title: fullTitle,
      description: description || process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
      url: canonical || baseUrl,
      siteName: process.env.NEXT_PUBLIC_SITE_NAME || "My Blog",
      images: image ? [{ url: image }] : undefined,
      type: "website" as const,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title: fullTitle,
      description: description || process.env.NEXT_PUBLIC_SITE_DESCRIPTION || "",
      images: image ? [image] : undefined,
    },
  };
}



