"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/home") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname === href || pathname.startsWith(`${href}/`);
  };
  const baseLinkClasses =
    "hover:underline text-neutral-800 dark:text-neutral-100";
  const activeClasses =
    " font-semibold underline underline-offset-4 decoration-2";

  return (
    <header className="sticky top-0 z-40 border-b bg-white/80 dark:bg-neutral-900/80 backdrop-blur">
      <div className="w-full px-4 md:px-8 py-3 flex items-center justify-start gap-8">
        <Link
          href="/"
          className="text-lg font-semibold text-neutral-900 dark:text-neutral-100 whitespace-nowrap"
        >
          {process.env.NEXT_PUBLIC_SITE_NAME || "My Blog"}
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <Link
            href="/home"
            className={`${baseLinkClasses}${
              isActive("/home") ? activeClasses : ""
            }`}
          >
            Home
          </Link>
          <Link
            href="/projects"
            className={`${baseLinkClasses}${
              isActive("/projects") ? activeClasses : ""
            }`}
          >
            Projects
          </Link>
          <Link
            href="/assignments"
            className={`${baseLinkClasses}${
              isActive("/assignments") ? activeClasses : ""
            }`}
          >
            Assignments
          </Link>
          <Link
            href="/vlogs"
            className={`${baseLinkClasses}${
              isActive("/vlogs") ? activeClasses : ""
            }`}
          >
            Vlogs
          </Link>
          <Link
            href="/about"
            className={`${baseLinkClasses}${
              isActive("/about") ? activeClasses : ""
            }`}
          >
            About
          </Link>
          <Link
            href="/contact"
            className={`${baseLinkClasses}${
              isActive("/contact") ? activeClasses : ""
            }`}
          >
            Contact
          </Link>
        </nav>
        <button
          aria-label="Toggle menu"
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded border text-neutral-800 dark:text-neutral-100 ml-auto"
          onClick={() => setOpen((v) => !v)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                open
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t bg-white dark:bg-neutral-900">
          <div className="w-full px-4 md:px-8 py-3 grid gap-2">
            <Link
              href="/home"
              className={`py-2${
                isActive("/home")
                  ? " font-semibold text-neutral-900 dark:text-neutral-100"
                  : " text-neutral-900 dark:text-neutral-100"
              }`}
              onClick={() => setOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/projects"
              className={`py-2${
                isActive("/projects")
                  ? " font-semibold text-neutral-900 dark:text-neutral-100"
                  : " text-neutral-900 dark:text-neutral-100"
              }`}
              onClick={() => setOpen(false)}
            >
              Projects
            </Link>
            <Link
              href="/assignments"
              className={`py-2${
                isActive("/assignments")
                  ? " font-semibold text-neutral-900 dark:text-neutral-100"
                  : " text-neutral-900 dark:text-neutral-100"
              }`}
              onClick={() => setOpen(false)}
            >
              Assignments
            </Link>
            <Link
              href="/vlogs"
              className={`py-2${
                isActive("/vlogs")
                  ? " font-semibold text-neutral-900 dark:text-neutral-100"
                  : " text-neutral-900 dark:text-neutral-100"
              }`}
              onClick={() => setOpen(false)}
            >
              Vlogs
            </Link>
            <Link
              href="/about"
              className={`py-2${
                isActive("/about")
                  ? " font-semibold text-neutral-900 dark:text-neutral-100"
                  : " text-neutral-900 dark:text-neutral-100"
              }`}
              onClick={() => setOpen(false)}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`py-2${
                isActive("/contact")
                  ? " font-semibold text-neutral-900 dark:text-neutral-100"
                  : " text-neutral-900 dark:text-neutral-100"
              }`}
              onClick={() => setOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}