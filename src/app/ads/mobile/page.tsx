import { buildMetadata } from "@/lib/seo";
import { MobileAdsPageClient } from "./MobileAdsPageClient";

export const dynamic = "force-dynamic";
export const metadata = buildMetadata({
  title: "Kivy Studio – Support Screen (Mobile Ads)",
  description:
    "Short mobile ad screen to support Kivy Studio development before the Google Play Store release.",
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/ads/mobile`,
  image: "/file.svg",
});

export default function MobileAdsPage() {
  return <MobileAdsPageClient />;
}


