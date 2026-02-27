"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function TrackingScript() {
  const pathname = usePathname();

  useEffect(() => {
    // Track page view
    if (pathname && !pathname.startsWith("/admin")) {
      fetch("/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "pageview",
          path: pathname,
        }),
      }).catch(console.error);
    }
  }, [pathname]);

  return null;
}

