
"use client";

import { useEffect, useId } from "react";
import Script from "next/script";

/* ---------- Type support for ad script ---------- */
declare global {
  interface Window {
    atOptions?: {
      key: string;
      format: string;
      height: number;
      width: number;
      params: Record<string, unknown>;
    };
  }
}

/* ---------- Global popunder scripts ---------- */

export function GlobalPopunderScripts() {
  return (
    <>
      <Script
        id="popunder-top"
        src="https://pl28682294.effectivegatecpm.com/c4/70/c0/c470c027d903ceccfba531a44f34b794.js"
        strategy="afterInteractive"
      />

      <Script
        id="popunder-bottom"
        src="https://pl28682352.effectivegatecpm.com/fd/0f/9e/fd0f9e7c5ec34e88dff09ea3d1b4439f.js"
        strategy="afterInteractive"
      />
    </>
  );
}

/* ---------- 468x60 banner ---------- */

export function AdBanner468x60() {
  const containerId = "ad-468x60-container";

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.atOptions = {
      key: "89fd2317f6e2b437cdde510b2d21dd6c",
      format: "iframe",
      height: 60,
      width: 468,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/89fd2317f6e2b437cdde510b2d21dd6c/invoke.js";
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
      style={{ minHeight: 60, minWidth: 468 }}
    />
  );
}

/* ---------- Responsive container banner ---------- */


interface Props {
  refreshKey: number;
}

export function AdBannerContainer({ refreshKey }: Props) {
  const containerId = "container-68d358cd97189f3d2e4f773c995f3ef1";

  useEffect(() => {
    if (typeof window === "undefined") return;

    const container = document.getElementById(containerId);
    if (!container) return;

    // Clear old ad
    container.innerHTML = "";

    const script = document.createElement("script");
    script.src =
      "https://pl28682386.effectivegatecpm.com/68d358cd97189f3d2e4f773c995f3ef1/invoke.js";

    script.async = true;
    script.setAttribute("data-cfasync", "false");

    container.appendChild(script);
  }, [refreshKey]); // 🔥 now it refreshes when key changes

  return <div id={containerId} className="flex justify-center" />;
}

/* ---------- 320x50 mobile banner ---------- */

export function AdBanner320x50() {
  const containerId = "ad-320x50-container";

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.atOptions = {
      key: "83e171a7d2c565bf53337a3f95c40907",
      format: "iframe",
      height: 50,
      width: 320,
      params: {},
    };

    const script = document.createElement("script");
    script.src =
      "https://www.highperformanceformat.com/83e171a7d2c565bf53337a3f95c40907/invoke.js";
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


/* ---------- 300x160 mobile banner ---------- */

export function AdBanner300x160() {
  const containerId = "ad-300x160-container";

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.atOptions  = { 'key' : 'dd1ce2dad46eaa5e51d39dc9d7fce6d3', 
      'format' : 'iframe', 
      'height' : 300, 
      'width' : 160, 
      'params' : {} 
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
