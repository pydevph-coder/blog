"use client";
import { usePathname } from "next/navigation";
import NavBar from "./NavBar";
import AdminNavBar from "./AdminNavBar";

export default function NavSwitcher() {
  const pathname = usePathname();

  // Don't show any navbar on login page
  if (pathname === "/admin/login") {
    return null;
  }

  // Don't show navbar on post pages (projects/assignments will have back button)
  if (pathname.startsWith("/post/")) {
    return null;
  }

  // Show admin navbar for admin routes
  if (pathname.startsWith("/admin")) {
    return <AdminNavBar />;
  }

  // Show regular navbar for all public routes
  return <NavBar />;
}
