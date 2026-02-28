import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";
import {SafeAdBanner} from "@/components/SafeBanner";
export const metadata = buildMetadata({
  title: "KivyStudioBridge – Windows Companion for Kivy Studio Android",
  description:
    "KivyStudioBridge is the Windows desktop companion for Kivy Studio. Edit Python/Kivy code on your PC and sync it in real time to the Kivy Studio Android app over Wi‑Fi or USB.",
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/projects/kivy-studiobridge`,
  image: "/file.svg",
});

export default function KivyStudioBridgeProjectPage() {
  return (
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left sidebar – ad rail */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className="sticky top-24 space-y-4">
              <AdBannerContainer refreshKey={0}/>
           
           
         </div>
          {/* <div className="sticky top-24 space-y-4">
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
          </div> */}
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-12">
          {/* Hero */}
          <section className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:border-indigo-500/40 dark:bg-indigo-900/30 dark:text-indigo-200">
                Project • Windows Desktop • Kivy Studio Companion
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-indigo-700 to-sky-600 dark:from-gray-50 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
                KivyStudioBridge – Real-Time Desktop Bridge for Kivy Studio Android
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                KivyStudioBridge is the <strong>Windows desktop application</strong> that links your
                editor to the Kivy Studio Android app. It watches your Python/Kivy project, syncs
                files over the network, and keeps your phone in lockstep with every save.
              </p>

              <ul className="grid gap-3 text-sm text-gray-700 dark:text-gray-300 md:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>Desktop–device bridge</strong> – connect your Windows PC and Android
                    device over Wi‑Fi or USB.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>Live file watching</strong> – automatically sync code and assets whenever
                    you hit save.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>PyInstaller-ready</strong> – packaged as a Windows app for smooth
                    installation on student and lab machines.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>Optimized UI</strong> – PyQt5 desktop interface with tabs, logs, and
                    connection status.
                  </span>
                </li>
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/downloads/kivy-studiobridge"
                  className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-600/40 transition hover:-translate-y-0.5 hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 dark:ring-offset-gray-900"
                >
                  Download KivyStudioBridge for Windows
                </Link>
                <Link
                  href="/projects/kivy-studio"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800/60"
                >
                  View Kivy Studio Android Project
                </Link>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tech stack: Python, PyQt5, socket networking, file watching, Windows packaging
                (PyInstaller), tightly integrated with the Kivy Studio Android app.
              </p>
            </div>

            <div className="relative mx-auto w-full max-w-md">
              <div className="relative overflow-hidden rounded-3xl border border-gray-200 bg-white/80 p-6 shadow-xl dark:border-gray-700 dark:bg-gray-900/80">
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>
                  <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                    Windows Bridge UI
                  </span>
                </div>

                <div className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-gray-200 bg-slate-950 dark:border-gray-700">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <Image
                      src="/studio/bridge.png"
                      width={96}
                      height={96}
                      alt="KivyStudioBridge icon"
                      className="h-20 w-20 rounded-2xl bg-slate-900/70 p-4 shadow-lg shadow-indigo-500/40"
                    />
                    <h2 className="text-lg font-semibold text-white">
                      Bridge Your Editor and Kivy Studio
                    </h2>
                    <p className="text-xs text-slate-300">
                      Start KivyStudioBridge on Windows, point it at your project, connect your
                      Android device, and watch your saves flow instantly to the Kivy Studio app.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Mid-page ad */}
          <section className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
          <SafeAdBanner
            adKey="89fd2317f6e2b437cdde510b2d21dd6c"
            width={468}
            height={60}
          />
          </section>

          {/* What it does */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              What Is KivyStudioBridge?
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              KivyStudioBridge is a{" "}
              <strong>desktop companion app for the Kivy Studio Android environment</strong>. It runs
              on Windows and takes care of <strong>watching your project files, packaging them, and
              sending them over the network</strong> to the Kivy Studio app running on your phone or
              tablet.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              Under the hood it uses <strong>PyQt5</strong> for a modern UI, background threads for
              sending code to your device, and robust networking logic so the connection stays
              stable while you focus on writing Python and Kivy UI code.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-indigo-200 bg-indigo-50/70 p-5 dark:border-indigo-800/60 dark:bg-indigo-900/30">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-indigo-700 dark:text-indigo-200">
                  Smart File Sync
                </h3>
                <ul className="space-y-2 text-sm text-indigo-900 dark:text-indigo-100">
                  <li>• Watches your Kivy project for changes</li>
                  <li>• Handles Python, KV, assets, and configs</li>
                  <li>• Sends only what changed to keep sync fast</li>
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-800/60 dark:bg-emerald-900/30">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                  Developer-Friendly UI
                </h3>
                <ul className="space-y-2 text-sm text-emerald-900 dark:text-emerald-100">
                  <li>• Tabbed interface with styled controls</li>
                  <li>• Real-time log viewer for bridge activity</li>
                  <li>• Clear connection and status indicators</li>
                </ul>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-5 dark:border-purple-800/60 dark:bg-purple-900/30">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-200">
                  Classroom & Lab Ready
                </h3>
                <ul className="space-y-2 text-sm text-purple-900 dark:text-purple-100">
                  <li>• Windows-friendly installer via PyInstaller</li>
                  <li>• Minimal configuration for students</li>
                  <li>• Perfect for teaching Python mobile dev</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Workflow with Kivy Studio */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              How KivyStudioBridge Works with Kivy Studio
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              The bridge is designed to disappear into the background – once configured, it simply
              moves your code between Windows and Android so Kivy Studio can reload it.
            </p>

            <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
              <ol className="space-y-4 rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-100">
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">1. Open Your Project</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Point KivyStudioBridge at the same project folder used by the Kivy Studio Android
                    app.
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">2. Connect Device</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Make sure your Android device is running Kivy Studio and reachable via Wi‑Fi or
                    USB (depending on setup).
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">3. Edit in Your Favorite IDE</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Use VS Code, PyCharm, or any editor on Windows. The bridge detects file saves and
                    syncs them to the device.
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">4. Watch Kivy Studio Reload</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Each time files arrive, Kivy Studio reloads your app, giving you a live preview on
                    Android with almost zero friction.
                  </span>
                </li>
              </ol>

              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                  <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-50">
                    Ideal Use Cases
                  </h3>
                  <ul className="space-y-1 text-sm">
                    <li>• Teaching mobile development with Python in labs and classrooms</li>
                    <li>• Rapid prototyping of Kivy UIs and animations from Windows</li>
                    <li>• Building AI/ML demos that run on-device but are coded on desktop</li>
                  </ul>
                </div>

                <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/70 p-4 text-center text-xs text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
                  <AdBanner320x50/>
                </div>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section className="rounded-2xl bg-gradient-to-r from-indigo-600 via-blue-600 to-sky-500 px-6 py-10 text-center text-white shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Supercharge Your Kivy Studio Workflow?
            </h2>
            <p className="mt-3 text-sm md:text-base text-indigo-100 max-w-2xl mx-auto">
              Download KivyStudioBridge for Windows and turn your desktop into a real-time control
              center for Kivy Studio on Android. Code in comfort on your PC, see the results instantly
              on your device.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/downloads/kivy-studiobridge"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-indigo-700 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-indigo-50"
              >
                Go to Download Page
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center rounded-lg border border-white/70 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Contact Me About This Project
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}



