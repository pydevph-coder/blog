import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { buildMetadata } from "@/lib/seo";
import NavSwitcher from "@/components/NavSwitcher";
import { SpeedInsights } from "@vercel/speed-insights/next";
import TrackingScript from "@/components/TrackingScript";
import { GlobalPopunderScripts } from "@/components/Ads";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = buildMetadata({});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      <GlobalPopunderScripts />
        <meta name="monetag" content="982761930711917dd55d2584d1c227c2" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NavSwitcher />
        <div className="w-full px-1 md:px-4 py-4">{children}</div>
        <TrackingScript />
        <SpeedInsights />
        
      </body>
    </html>
  );
}
