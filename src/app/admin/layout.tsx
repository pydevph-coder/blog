"use client";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    console.log("🔒 Admin Layout - Checking auth for:", pathname);

    // Skip auth check for login and logout pages
    if (pathname === "/admin/login" || pathname === "/admin/logout") {
      console.log("⏭️  Skipping auth check for login/logout page");
      setIsChecking(false);
      return;
    }

    // Check if authenticated by making a request
    fetch("/api/auth/check")
      .then((res) => res.json())
      .then((data) => {
        console.log("Auth check result:", data);
        if (!data.isAuthenticated) {
          console.log("❌ Not authenticated - redirecting to login");
          router.push("/admin/login");
        } else {
          console.log("✅ Authenticated - allowing access");
          setIsChecking(false);
        }
      })
      .catch((err) => {
        console.error("Auth check failed:", err);
        router.push("/admin/login");
      });
  }, [pathname, router]);

  // Show loading while checking
  if (isChecking && pathname !== "/admin/login" && pathname !== "/admin/logout") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4 text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
