import { buildMetadata } from "@/lib/seo";
import { KivyStudioBridgeDownloadClient } from "./KivyStudioBridgeDownloadClient";

export const metadata = buildMetadata({
  title: "Download KivyStudioBridge – Windows Companion for Kivy Studio",
  description:
    "Download KivyStudioBridge, the Windows desktop companion app for Kivy Studio on Android. Connect your editor to your phone and sync Python/Kivy projects in real time.",
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/downloads/kivy-studiobridge`,
  image: "/file.svg",
});

export default function KivyStudioBridgeDownloadPage() {
  return <KivyStudioBridgeDownloadClient />;
}


