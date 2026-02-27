import { buildMetadata } from "@/lib/seo";
import { KivyStudioDownloadClient } from "./KivyStudioDownloadClient";

export const metadata = buildMetadata({
  title: "Download Kivy Studio – APK & Source Code",
  description:
    "Download Kivy Studio, the Expo Go–style Android environment for Python and Kivy. Get the latest APK, source code, and setup guide in a simple, step-by-step flow.",
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/downloads/kivy-studio`,
  image: "/file.svg",
});

export default function KivyStudioDownloadPage() {
  return <KivyStudioDownloadClient />;
}

