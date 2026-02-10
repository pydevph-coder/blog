 "use client";
 
import { useEffect } from "react";

/* ---------- 300x160 mobile banner ---------- */

export function AdBanner300x160() {
  const containerId = "ad-300x160-container";

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.atOptions = {
      key: "dd1ce2dad46eaa5e51d39dc9d7fce6d3",
      format: "iframe",
      height: 300,
      width: 160,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/dd1ce2dad46eaa5e51d39dc9d7fce6d3/invoke.js";
    script.async = true;

    const container = document.getElementById(containerId);
    if (container) {
      container.innerHTML = "";
      container.appendChild(script);
    }
  }, []);

  return (
    <div
      id={containerId}
      className="flex items-center justify-center mx-auto"
      style={{ minHeight: 50, minWidth: 320 }}
    />
  );
}
