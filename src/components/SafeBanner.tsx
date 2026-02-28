"use client";

import { useEffect, useRef } from "react";

interface AdProps {
  adKey: string;
  width: number;
  height: number;
}

export function SafeAdBanner({ adKey, width, height }: AdProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!iframeRef.current) return;

    const doc = iframeRef.current.contentDocument;
    if (!doc) return;

    doc.open();
    doc.write(`
      <html>
        <head></head>
        <body style="margin:0;padding:0;display:flex;justify-content:center;align-items:center;">
          <script>
            var atOptions = {
              key: "${adKey}",
              format: "iframe",
              height: ${height},
              width: ${width},
              params: {}
            };
          </script>
          <script src="https://www.highperformanceformat.com/${adKey}/invoke.js"></script>
        </body>
      </html>
    `);
    doc.close();
  }, [adKey, width, height]);

  return (
    <iframe
      ref={iframeRef}
      width={width}
      height={height}
      style={{ border: "none", overflow: "hidden" }}
      scrolling="no"
    />
  );
}
