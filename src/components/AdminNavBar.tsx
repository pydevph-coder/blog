"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNavBar() {
  const pathname = usePathname();

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const baseLinkClasses =
    "hover:underline text-white/80 hover:text-white";
  const activeClasses =
    " font-semibold underline underline-offset-4 decoration-2";

  return (
    <header className="sticky top-0 z-40 border-b bg-gray-900/90 text-white backdrop-blur">
      <div className="w-full px-4 md:px-8 py-3 flex items-center justify-start gap-8">
        <Link
          href="/admin"
          className="text-lg font-semibold whitespace-nowrap"
        >
          Admin Panel
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/admin"
            className={`${baseLinkClasses}${
              pathname === "/admin" ? activeClasses : ""
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/admin/posts"
            className={`${baseLinkClasses}${
              isActive("/admin/posts") ? activeClasses : ""
            }`}
          >
            Posts
          </Link>
          <Link
            href="/admin/new-post"
            className={`${baseLinkClasses}${
              isActive("/admin/new-post") ? activeClasses : ""
            }`}
          >
            New Post
          </Link>
          <Link
            href="/admin/categories"
            className={`${baseLinkClasses}${
              isActive("/admin/categories") ? activeClasses : ""
            }`}
          >
            Categories
          </Link>
          <Link
            href="/admin/tags"
            className={`${baseLinkClasses}${
              isActive("/admin/tags") ? activeClasses : ""
            }`}
          >
            Tags
          </Link>
          <Link
            href="/admin/analytics"
            className={`${baseLinkClasses}${
              isActive("/admin/analytics") ? activeClasses : ""
            }`}
          >
            Analytics
          </Link>
          <Link
            href="/admin/contacts"
            className={`${baseLinkClasses}${
              isActive("/admin/contacts") ? activeClasses : ""
            }`}
          >
            Contacts
          </Link>
          <Link
            href="/admin/logout"
            className="text-red-200 hover:text-red-100 hover:underline"
          >
            Logout
          </Link>
        </nav>
      </div>
    </header>
  );
}


