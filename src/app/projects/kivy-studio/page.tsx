import Link from "next/link";
import Image from "next/image";
import { buildMetadata } from "@/lib/seo";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";
import { SafeAdBanner

 } from "@/components/SafeBanner";
export const metadata = buildMetadata({
  title: "Kivy Studio – Expo Go for Kivy/Python Android Development",
  description:
    "Kivy Studio is a real-time Android development environment for Python and Kivy. Code once on desktop, run instantly on your Android device – no Android Studio, no APK rebuilds.",
  canonical: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/projects/kivy-studio`,
  image: "/file.svg",
});

export default function KivyStudioProjectPage() {
  return (
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left sidebar – long, scrollable ad rail */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
        <div className=" top-24 space-y-4">
              <AdBannerContainer/>
           
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
          {/* Hero / Above-the-fold */}
          <section className="grid gap-10 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700 dark:border-blue-500/40 dark:bg-blue-900/30 dark:text-blue-200">
                Project • Android + Python • Open Source
              </span>
              <h1 className="text-3xl md:text-5xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-blue-700 to-indigo-700 dark:from-gray-50 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Kivy Studio – Expo Go{" "}
                <span className="whitespace-nowrap">for Kivy/Python Android Development</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed">
                Kivy Studio lets you build and test full Android apps with{" "}
                <strong>pure Python + Kivy</strong> and see changes live on your phone –{" "}
                <strong>no Android Studio, no APK rebuilds, no waiting</strong>. It feels like
                Expo Go, but for the Python ecosystem.
              </p>

              <ul className="grid gap-3 text-sm text-gray-700 dark:text-gray-300 md:grid-cols-2">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>Real-time preview</strong> – edit code on desktop, see it instantly on
                    Android.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>No heavy IDEs</strong> – skip Android Studio, Gradle configs, and long
                    build times.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>Perfect for learning</strong> – students, teachers, and Python
                    beginners.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-5 w-5 flex items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-200 text-xs">
                    ✓
                  </span>
                  <span>
                    <strong>AI/ML ready</strong> – TensorFlow Lite, OpenCV, and more baked in.
                  </span>
                </li>
              </ul>

              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link
                  href="/downloads/kivy-studio"
                  className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/40 transition hover:-translate-y-0.5 hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 dark:ring-offset-gray-900"
                >
                  Download Kivy Studio (APK & Source)
                </Link>
                <Link
                  href="/vlogs"
                  className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-800 transition hover:bg-gray-50 dark:border-gray-700 dark:text-gray-100 dark:hover:bg-gray-800/60"
                >
                  View Blog Posts About Kivy Studio
                </Link>
              </div>

              <p className="text-xs text-gray-500 dark:text-gray-400">
                Tech stack: Python, Kivy 2.3.1, KivyMD, TensorFlow Lite, OpenCV, SQLAlchemy,
                Watchdog, Pyjnius, Camera4Kivy, and a custom Windows bridge app (KivyStudioBridge).
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
                    Android Preview
                  </span>
                </div>

                <div className="relative aspect-[9/16] overflow-hidden rounded-2xl border border-gray-200 bg-slate-950 dark:border-gray-700">
                  <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
                    <Image
                      src="/studio/icon.png"
                      width={96}
                      height={96}
                      alt="Kivy Studio icon"
                      className="h-20 w-20 rounded-2xl bg-white p-4 shadow-lg shadow-blue-500/30"
                    />
                    <h2 className="text-lg font-semibold text-white">
                      Live Python & Kivy on Android
                    </h2>
                    <p className="text-xs text-slate-300">
                      Save your code on desktop and watch it reload instantly on your Android phone.
                      No manual builds. No cables. Just pure Python creativity.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* In-content ad slot */}
          <section className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-6 py-8 text-center text-sm text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
           <SafeAdBanner
            adKey="89fd2317f6e2b437cdde510b2d21dd6c"
            width={468}
            height={60}
          />
          </section>

          {/* Key capabilities */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              What Is Kivy Studio?
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Kivy Studio is a{" "}
              <strong>lightweight, real-time Android development environment for Python developers</strong>.
              It mirrors the development experience of Expo Go, but instead of React Native it uses
              <strong> Kivy and KivyMD</strong>. You code on your Windows machine, and Kivy Studio
              instantly executes that code on your Android device over the network.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              There is <strong>no Android Studio, no Java/Kotlin, and no NDK setup required</strong>.
              You focus purely on Python and UI design, while Kivy Studio handles the packaging,
              permissions, and live reload pipeline in the background.
            </p>

            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-5 dark:border-blue-800/60 dark:bg-blue-900/30">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-700 dark:text-blue-200">
                  Real-time Dev Experience
                </h3>
                <ul className="space-y-2 text-sm text-blue-900 dark:text-blue-100">
                  <li>• Live code reloading with file watching</li>
                  <li>• Instant feedback loop on Android devices</li>
                  <li>• Integrated log viewer and error tracking</li>
                  <li>• Optimized for low CPU and memory usage</li>
                </ul>
              </div>

              <div className="rounded-xl border border-emerald-200 bg-emerald-50/70 p-5 dark:border-emerald-800/60 dark:bg-emerald-900/30">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-200">
                  Built for Learning & Teaching
                </h3>
                <ul className="space-y-2 text-sm text-emerald-900 dark:text-emerald-100">
                  <li>• Preloaded example apps (games, utilities, tools)</li>
                  <li>• Simple project structure and clear conventions</li>
                  <li>• Great for classrooms, coding bootcamps, and self-study</li>
                  <li>• Works offline for most development scenarios</li>
                </ul>
              </div>

              <div className="rounded-xl border border-purple-200 bg-purple-50/70 p-5 dark:border-purple-800/60 dark:bg-purple-900/30">
                <h3 className="mb-2 text-sm font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-200">
                  AI, ML & Computer Vision Ready
                </h3>
                <ul className="space-y-2 text-sm text-purple-900 dark:text-purple-100">
                  <li>• TensorFlow Lite and tflite_runtime pre-integrated</li>
                  <li>• OpenCV and Camera4Kivy for computer-vision projects</li>
                  <li>• NumPy, Pillow, Requests, SQLAlchemy and more included</li>
                  <li>• Perfect for on-device inference and ML prototypes</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Development workflow */}
          <section className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              How the Kivy Studio Workflow Feels in Practice
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Kivy Studio is designed to feel <strong>fast, predictable, and repeatable</strong>.
              You write code once, and the same project structure works on every Android device you
              test on.
            </p>
            <div className="grid gap-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
              <ol className="space-y-4 rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-100">
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">1. Install</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Install the Kivy Studio Android app (APK) and grant storage + network
                    permissions. On desktop, set up the KivyStudioBridge companion app.
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">2. Create a Project</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Create or open a project on your Android device. Your project looks like a
                    standard Kivy app: <code>main.py</code>, optional <code>app.kv</code>,{" "}
                    <code>requirements.txt</code>, and an <code>assets/</code> folder.
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">3. Connect Bridge</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Open the same folder on Windows using KivyStudioBridge. Edit files in VS Code,
                    PyCharm, or any editor. The bridge automatically syncs changes to the device.
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">4. Code & Reload</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    Every time you save, Kivy Studio reloads the app in place. You can tweak UI,
                    animations, ML models, and APIs and see results immediately.
                  </span>
                </li>
                <li>
                  <strong className="block text-gray-900 dark:text-gray-50">5. Prepare for Production</strong>
                  <span className="text-gray-700 dark:text-gray-300">
                    When the app is ready, build a full production APK using Buildozer directly
                    from your Python project, with the same codebase you prototyped in Kivy Studio.
                  </span>
                </li>
              </ol>

              <div className="space-y-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-200">
                  <h3 className="mb-1 text-base font-semibold text-gray-900 dark:text-gray-50">
                    Example: Your First Kivy Studio App
                  </h3>
                  <p className="mb-3">
                    A minimal app can be as simple as a single file{" "}
                    <code className="rounded bg-gray-200 px-1 py-0.5 text-xs text-gray-800 dark:bg-gray-800 dark:text-gray-100">
                      main.py
                    </code>{" "}
                    with a single button:
                  </p>
                  <pre className="overflow-x-auto rounded-lg bg-black/90 p-3 text-xs text-emerald-100">
{`from kivy.app import App
from kivy.uix.button import Button
from kivy.uix.boxlayout import BoxLayout


class MyApp(App):
    def build(self):
        layout = BoxLayout(orientation="vertical")
        btn = Button(text="Hello Kivy Studio!")
        layout.add_widget(btn)
        return layout


if __name__ == "__main__":
    MyApp().run()`}
                  </pre>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400">
                    Save the file on desktop, and your Android phone instantly shows the updated UI
                    through Kivy Studio.
                  </p>
                </div>

                <div className="rounded-xl border border-dashed border-amber-300 bg-amber-50/70 p-4 text-center text-xs text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-200">
                <SafeAdBanner
                  adKey="83e171a7d2c565bf53337a3f95c40907"
                  width={320}
                  height={50}
                />

                </div>
              </div>
            </div>
          </section>

          {/* Example projects */}
          <section className="space-y-5">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-50">
              Built-in Example Projects to Jump-Start Learning
            </h2>
            <p className="text-gray-700 dark:text-gray-300">
              Kivy Studio ships with ready-made projects so you can learn by reading and modifying
              full, working apps instead of starting from a blank screen.
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900/60">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
                  Calculator, Clock & Drawing App
                </h3>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                  UI-heavy sample apps that demonstrate Kivy layouts, widgets, and styling. Great
                  for beginners to explore Kivy&apos;s component system and event handling.
                </p>
                <ul className="text-xs text-gray-600 dark:text-gray-400">
                  <li>• Learn grid layouts, input handling, and basic animations</li>
                  <li>• Understand how to structure screens and navigation</li>
                  <li>• Experiment safely without breaking your main project</li>
                </ul>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white/80 p-5 shadow-sm dark:border-gray-700 dark:bg-gray-900/60">
                <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-gray-50">
                  FlappyBird & 2048 Game Clones
                </h3>
                <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">
                  Game-focused examples that show off sprites, collision detection, and smooth
                  animations using Kivy&apos;s rendering pipeline.
                </p>
                <ul className="text-xs text-gray-600 dark:text-gray-400">
                  <li>• Explore physics-lite interactions and scoring systems</li>
                  <li>• Perfect for students building their first mobile games in Python</li>
                  <li>• Adapt and reskin for your own portfolio projects</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Call to action */}
          <section className="rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 px-6 py-10 text-center text-white shadow-lg">
            <h2 className="text-2xl md:text-3xl font-bold">
              Ready to Build Android Apps with Just Python and Kivy?
            </h2>
            <p className="mt-3 text-sm md:text-base text-blue-100 max-w-2xl mx-auto">
              Download Kivy Studio, connect your Android device, and start turning Python scripts
              into real mobile apps in minutes. No complex toolchains, no heavy IDEs – just code and
              instant results.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Link
                href="/downloads/kivy-studio"
                className="inline-flex items-center justify-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-700 shadow-lg shadow-black/10 transition hover:-translate-y-0.5 hover:bg-blue-50"
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


