import { notFound } from "next/navigation";
import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";

const samples = {
  "2048": {
    title: "2048 Puzzle – Kivy Studio Sample Project",
    description:
      "Learn how the classic 2048 puzzle game is built with Kivy. This Kivy Studio sample shows grid layouts, touch handling, and smooth tile animations – perfect for game development beginners.",
  },
  calculator: {
    title: "Calculator App – Kivy Studio Sample Project",
    description:
      "A clean, responsive calculator built with Kivy and bundled in Kivy Studio. Great for understanding layouts, button interactions, and basic state management in Python mobile apps.",
  },
  clock: {
    title: "Digital Clock – Kivy Studio Sample Project",
    description:
      "A stylish digital clock sample for Kivy Studio that demonstrates custom fonts, real-time updates, and timing logic in a mobile UI.",
  },
  drawingapp: {
    title: "Drawing App – Kivy Studio Sample Project",
    description:
      "A canvas-based drawing application included with Kivy Studio. Explore touch input, custom brushes, and saving drawings using Kivy widgets.",
  },
  gradientdemo: {
    title: "Gradient Demo – Kivy Studio Sample Project",
    description:
      "A lightweight gradient demo showcasing custom backgrounds, color transitions, and visual polish in Kivy UIs.",
  },
  kivybird: {
    title: "KivyBird – Flappy Bird Style Game in Kivy",
    description:
      "KivyBird is a Flappy Bird–style game built with Kivy. This Kivy Studio sample shows sprite animation, collision detection, and simple game loops – ideal for learning Python game development.",
  },
  spacegame: {
    title: "Space Game – Kivy Studio Sample Project",
    description:
      "An arcade-style space game sample that demonstrates movement, shooting mechanics, and basic game physics using Kivy.",
  },
  admob: {
    title: "AdMob Integration – Kivy Studio Sample Project",
    description:
      "A practical example of integrating AdMob with Kivy apps. Use this sample to understand banner and interstitial ads inside Kivy Studio projects.",
  },
  "c4k-tflite": {
    title: "TensorFlow Lite Object Detection – Kivy Studio Sample",
    description:
      "A Camera4Kivy + TensorFlow Lite object detection demo. Learn how to run on-device ML models inside Kivy Studio using real-time camera input.",
  },
  "c4k-tflite-example": {
    title: "TensorFlow Lite Example (Camera4Kivy) – Kivy Studio Sample",
    description:
      "A full TensorFlow Lite example project using Camera4Kivy and Kivy Studio, ideal for exploring machine learning on Android with Python.",
  },
  "c4k-qr-example": {
    title: "QR Code Scanner – Kivy Studio Sample Project",
    description:
      "A QR code scanner built with Camera4Kivy and Kivy, packaged as a Kivy Studio sample. Great for learning how to access the camera and process frames in real time.",
  },
  "c4k-photo": {
    title: "Camera Photo App – Kivy Studio Sample Project",
    description:
      "A camera photo capture example using Camera4Kivy, demonstrating taking photos, saving images, and navigating between screens in a Kivy app.",
  },
  scanatomy: {
    title: "Scanatomy – Kivy Studio Medical Imaging Sample",
    description:
      "Scanatomy is a richer demo project that blends images, navigation, and interactivity. Use it to study more complex Kivy layouts and multi-screen flows inside Kivy Studio.",
  },
  mapsample: {
    title: "Map Sample – Kivy Studio Mapping Project",
    description:
      "A map-view sample application showing how to embed maps, handle location-based content, and integrate HTML views in a Kivy app.",
  },
} as const;

type SampleSlug = keyof typeof samples;

type PageProps = {
  params: Promise<{ slug: SampleSlug }>;
};

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const sample = samples[slug];

  if (!sample) {
    return buildMetadata({
      title: "Kivy Studio Sample Project",
      description:
        "Explore Kivy Studio sample projects and vlogs that walk through Python and Kivy mobile development step by step.",
    });
  }

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return buildMetadata({
    title: sample.title,
    description: sample.description,
    canonical: `${baseUrl}/vlogs/${slug}`,
    image: "/file.svg",
  });
}

export default async function SampleVlogPage({ params }: PageProps) {
  const { slug } = await params;
  const sample = samples[slug];

  if (!sample) {
    notFound();
  }

  const isAdvanced =
    slug === "c4k-tflite" ||
    slug === "c4k-tflite-example" ||
    slug === "c4k-qr-example" ||
    slug === "c4k-photo" ||
    slug === "scanatomy";

  const platformParam = isAdvanced ? "android" : "android";

  return (
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left ad rail */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[250px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner468x60 />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[70px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner320x50 />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[70px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner320x50 />
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[70px] flex items-center justify-center border border-gray-200 dark:border-gray-700">
              <AdBanner320x50 />
            </div>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Hero / vlog intro */}
          <section className="space-y-6">
            <span className="inline-flex items-center rounded-full border border-purple-200 bg-purple-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-purple-700 dark:border-purple-500/40 dark:bg-purple-900/40 dark:text-purple-200">
              Kivy Studio Sample • Vlog & Download
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-purple-700 to-indigo-600 dark:from-gray-50 dark:via-purple-300 dark:to-indigo-300 bg-clip-text text-transparent">
              {sample.title}
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
              {sample.description} This vlog page is designed to walk through the project,
              highlight key concepts, and give you a quick way to download and run the sample inside
              Kivy Studio.
            </p>

            {/* YouTube video placeholder */}
            <div className="mt-4 aspect-video w-full max-w-3xl overflow-hidden rounded-xl border border-gray-200 bg-black shadow-md dark:border-gray-700">
              {/* TODO: Replace VIDEO_ID with your actual YouTube video ID for this sample */}
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/VIDEO_ID"
                title={`${sample.title} – Kivy Studio Vlog`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
          </section>

          {/* Mid-page ad */}
          <section className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-6 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
            <AdBanner468x60 />
          </section>

          {/* Screenshots + highlights */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              What You&apos;ll Learn from This Sample
            </h2>
            <p className="text-sm md:text-base text-gray-700 dark:text-gray-300 max-w-3xl">
              Each Kivy Studio sample is crafted to focus on specific concepts – from UI layout and
              game mechanics to camera access and on-device machine learning. Use this project as a{" "}
              <strong>hands-on learning lab</strong> while you follow along with the vlog.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-50">
                  Screenshot 1
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  {/* Replace this text with an actual <Image> pointing to your screenshot, for example:
                   * <Image src="/studio/samples/{slug}-1.png" ... />
                   */}
                  Add a screenshot here that shows the main screen or core interaction of the app.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-50">
                  Screenshot 2
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Use a second screenshot to highlight an important state, menu, or result screen.
                </p>
              </div>
              <div className="rounded-xl border border-gray-200 bg-white/80 p-4 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-900 dark:text-gray-50">
                  Screenshot 3
                </h3>
                <p className="text-xs text-gray-600 dark:text-gray-400">
                  Optionally show code snippets or a settings view that helps explain how the sample
                  works.
                </p>
              </div>
            </div>
          </section>

          {/* Download section */}
          <section className="space-y-4 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 px-6 py-8 text-white shadow-lg">
            <h2 className="text-2xl font-bold">
              Download This Kivy Studio Sample Project
            </h2>
            <p className="text-sm md:text-base text-purple-100 max-w-2xl">
              Download the full project files, open them inside Kivy Studio on Android, and follow
              along with the vlog. You&apos;ll be able to tweak the code, experiment, and truly
              understand how everything works.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                href={`/api/download/${platformParam}?sample=${slug}`}
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-purple-700 shadow-md shadow-black/10 transition hover:-translate-y-0.5 hover:bg-purple-50"
              >
                Download Sample Project (ZIP)
              </Link>
              <Link
                href="/downloads/kivy-studio"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Get Kivy Studio APK
              </Link>
            </div>
            <p className="text-[11px] text-purple-100/90 mt-1">
              Note: The download link uses the same Supabase-powered pattern as the main Kivy Studio
              and KivyStudioBridge downloads. Make sure your backend is configured to serve this
              sample under the <code className="bg-purple-700/40 px-1 py-0.5 rounded">sample={slug}</code>{" "}
              parameter.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}



