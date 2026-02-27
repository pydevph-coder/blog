"use client";

import Script from "next/script";

export default function AdBanner() {
  return (
    <div
      id="ad-container"
      className="w-full max-w-[320px] h-[50px] mx-auto text-center"
    >
      {/* Inline options must run in global scope */}
      <Script id="hpf-options" strategy="beforeInteractive">
        {`
          window.atOptions = {
            'key' : '83e171a7d2c565bf53337a3f95c40907',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        `}
      </Script>

      {/* Load the ad script */}
      <Script
        src="https://www.highperformanceformat.com/83e171a7d2c565bf53337a3f95c40907/invoke.js"
        strategy="beforeInteractive"
      />
    </div>
  );
}
