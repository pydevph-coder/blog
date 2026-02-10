"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";

// import AdBanner from "@/components/AdBanner";

const STEPS = [
  "Overview & Requirements",
  "Beta Notice & Ads",
  "Download APK",
] as const;


export function DownloadButton() {
  const [status, setStatus] = useState<
    "idle" | "preparing" | "redirecting" | "error"
  >("idle");

  const startDownload = async () => {
    try {
      setStatus("preparing");

      const res = await fetch("/api/download/android");
      const data = await res.json();

      if (!data?.url) {
        throw new Error("No URL returned");
      }

      setStatus("redirecting");

      // small delay = nicer UX
      setTimeout(() => {
        window.location.href = data.url;
      }, 800);
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <div className="space-y-3">
      <button
        onClick={startDownload}
        disabled={status === "preparing"}
        className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
      >
        {status === "idle" && "Download APK"}
        {status === "preparing" && "Preparing secure download..."}
        {status === "redirecting" && "Starting download..."}
        {status === "error" && "Retry Download"}
      </button>

      {status === "redirecting" && (
        <p className="text-xs text-gray-500">
          If your download didn’t start, please try again.
        </p>
      )}

      {status === "error" && (
        <p className="text-xs text-red-500">
          Something went wrong while generating the link.
        </p>
      )}
    </div>
  );
}

export function KivyStudioDownloadClient() {
  const [step, setStep] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);

  // Add a 15s delay before the "Next" button becomes clickable on each step
  useEffect(() => {
    setCanGoNext(false);
    setSecondsLeft(15);

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanGoNext(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step]);

  const goNext = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const goPrev = () => setStep((s) => Math.max(s - 1, 0));

  return (
    <>
      {/* Adsterra Popunder Script */}
      <Script
        src="https://pl28682294.effectivegatecpm.com/c4/70/c0/c470c027d903ceccfba531a44f34b794.js"
        strategy="beforeInteractive"
      />
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left ad rail */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className=" top-24 space-y-4">
          <AdBannerContainer/>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Hero */}
          <section className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:border-emerald-500/50 dark:bg-emerald-900/40 dark:text-emerald-200">
              Official Download • Kivy Studio
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-emerald-700 to-blue-700 dark:from-gray-50 dark:via-emerald-300 dark:to-blue-300 bg-clip-text text-transparent">
              Download Kivy Studio – Build Android Apps with Just Python + Kivy
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
              Follow the simple, <strong>3-stage download flow</strong> below to get the latest Kivy
              Studio APK, source code, and setup instructions. No Android Studio required – just
              Python, Kivy, and your Android device.
            </p>

            {/* Top in-content ad */}
            <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
            <AdBanner468x60 />
            </div>
          </section>

          {/* Stepper */}
          <section className="space-y-6">
            <ol className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between rounded-2xl border border-gray-200 bg-white/80 p-4 text-sm shadow-sm dark:border-gray-700 dark:bg-gray-900/70">
              {STEPS.map((label, index) => {
                const isActive = index === step;
                const isCompleted = index < step;
                return (
                  <li
                    key={label}
                    className="flex flex-1 items-center gap-3 md:gap-2"
                  >
                    <div
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-semibold",
                        isActive
                          ? "border-emerald-500 bg-emerald-500 text-white shadow-sm"
                          : isCompleted
                          ? "border-emerald-400 bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-200"
                          : "border-gray-300 bg-gray-50 text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400",
                      ].join(" ")}
                    >
                      {index + 1}
                    </div>
                    <div className="flex flex-col">
                      <span
                        className={[
                          "text-xs font-semibold uppercase tracking-wide",
                          isActive
                            ? "text-emerald-700 dark:text-emerald-300"
                            : "text-gray-600 dark:text-gray-400",
                        ].join(" ")}
                      >
                        Step {index + 1}
                      </span>
                      <span className="text-xs text-gray-700 dark:text-gray-300">{label}</span>
                    </div>
                    {index < STEPS.length - 1 && (
                      <div className="hidden flex-1 border-t border-dashed border-gray-300 last:hidden md:block dark:border-gray-700" />
                    )}
                  </li>
                );
              })}
            </ol>

            {/* Step content */}
            <div className="space-y-6">
              {step === 0 && <StepOverview />}
              {step === 1 && <StepChooseType />}
              {step === 2 && <StepDownloadLinks />}

              {/* Middle in-flow ad */}
              <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
            <AdBanner468x60 />
            </div>

              <div className="flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={goPrev}
                    disabled={step === 0}
                    className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-200 disabled:text-gray-400 dark:border-gray-700 dark:text-gray-200 dark:hover:bg-gray-800 disabled:dark:border-gray-800 disabled:dark:text-gray-500"
                  >
                    Previous
                  </button>
                  <div className="flex gap-3">
                {step < STEPS.length - 1 ? (
                    // Regular Next button for steps before the last
                    <button
                    type="button"
                    onClick={goNext}
                    disabled={!canGoNext}
                    className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-emerald-600/60"
                    >
                    {!canGoNext && secondsLeft > 0
                        ? `Please wait ${secondsLeft}s`
                        : step === STEPS.length - 1
                        ? "Continue to Download"
                        : "Next"}
                    </button>
                ) : (
                    // Replace button with DownloadButton on the last step
                    <DownloadButton />
                )}

               
                </div>

                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Hint: The next button unlocks after a short delay so you can review the info on
                  each step.
                </p>
              </div>
            </div>
          </section>

          {/* Bottom section with extra SEO content + ad slot */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Why Use Kivy Studio Instead of Android Studio?
              </h2>
              <p>
                Traditional Android development requires Java/Kotlin, Gradle, and Android Studio –
                which can feel heavy, slow, and overwhelming, especially on low-spec machines or for
                beginners. Kivy Studio is designed for{" "}
                <strong>Python-first Android development</strong>, with a fast feedback loop and a
                much gentler learning curve.
              </p>
              <p>
                If you&apos;re a Python developer who wants to ship Android apps, prototypes, AI/ML
                demos, or classroom projects, Kivy Studio gives you an{" "}
                <strong>Expo Go–style workflow</strong> tailored to the Kivy ecosystem. Install the
                APK, connect your device, and start coding in minutes.
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                For production releases, you can still use Buildozer and Android Studio – Kivy
                Studio is focused on development, iteration, and education.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
              <AdBanner320x50 />
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-100">
                Looking for more details first?{" "}
                <Link href="/projects/kivy-studio" className="font-semibold underline">
                  Read the full Kivy Studio project overview
                </Link>{" "}
                to see features, workflows, and example projects.
              </div>
            </div>
          </section>
        </div>
      </div>
      
      
    </main>
    </>
  );
}

function StepOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Step 1 – Check Requirements & Read Before You Download
        </h2>
        <p>
          Kivy Studio is built for <strong>Android 7.0 (API 24) and above</strong>, and runs best on
          modern devices with at least 2 GB of RAM. On desktop, you&apos;ll want{" "}
          <strong>Windows</strong> with Python 3.8+ installed, plus a code editor like VS Code or
          PyCharm.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Android phone or tablet with APK sideloading enabled</li>
          <li>Stable Wi‑Fi connection for live code sync</li>
          <li>Python 3.8+ installed on your Windows machine</li>
          <li>
            Optional: USB debugging enabled if you prefer wired connections with KivyStudioBridge
          </li>
        </ul>
        <p>
          Once you&apos;re ready, move to the next step to <strong>choose how you want to install</strong>{" "}
          Kivy Studio: pre-built APK for instant setup, or full source code if you prefer to build
          everything yourself.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
          Security tip: Always download APK files from trusted sources only. Double-check hashes or
          release tags if they are provided with the download.
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100">
          Verified open-source project – MIT licensed. You can audit the code, fork it, and adapt it
          to your own needs.
        </div>
      </div>
    </div>
  );
}

function StepChooseType() {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
      <div className="space-y-3 rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Step 2 – Important Beta Notice (APK Only)
        </h2>
        <p>
          Right now, Kivy Studio is available as a{" "}
          <strong>beta APK build only</strong>. This means features may change, bugs may appear, and
          you should expect <strong>future updates</strong> to improve stability and add new
          functionality.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>This download is for the <strong>Android APK</strong> only.</li>
          <li>Some features are experimental and may change between versions.</li>
          <li>
            For production work, you&apos;ll want to update regularly as new builds are released.
          </li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          By continuing, you understand that this is a beta version and that{" "}
          <strong>updating to newer releases is recommended</strong> when they become available.
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
        <AdBanner468x60 />
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-xs text-emerald-900 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-100">
          Tip: Check back on this page regularly to see when a new beta or stable APK is available.
        </div>
      </div>
    </div>
  );
}

function StepDownloadLinks() {
  return (
    <div className="space-y-6 rounded-2xl border border-emerald-200 bg-emerald-50/70 p-6 text-sm text-emerald-900 shadow-sm dark:border-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-50">
      <h2 className="text-lg font-semibold text-emerald-900 dark:text-emerald-50">
        Step 3 – Download Kivy Studio APK
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-emerald-300 bg-white/90 p-4 text-sm text-emerald-900 shadow-xs dark:border-emerald-600 dark:bg-emerald-900/70 dark:text-emerald-50">
          <h3 className="text-sm font-semibold">Download Android APK (Beta)</h3>
          <p className="text-xs">
            Get the latest <strong>beta APK</strong> build of the Kivy Studio Android app. Enable
            &quot;Install from unknown sources&quot; on your device if prompted.
          </p>
          <DownloadButton />
          {/* <button
            onClick={async () => {
                const res = await fetch("/api/download/android");
                const data = await res.json();
                window.location.href = data.url;
              }}
              
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
            Download APK
            </button> */}

          {/* <Link
            href="https://github.com/yourusername/kivy-studio/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-emerald-700"
          >
            Go to Releases (APK)
          </Link> */}
          <p className="text-[11px] text-emerald-900/80 dark:text-emerald-100/80">
            This is a <strong>beta version</strong>. For the best experience, plan to{" "}
            <strong>update to newer builds</strong> when they are released.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-emerald-300 bg-white/90 p-4 text-sm text-emerald-900 shadow-xs dark:border-emerald-600 dark:bg-emerald-900/70 dark:text-emerald-50">
          <h3 className="text-sm font-semibold">Staying Up to Date</h3>
          <p className="text-xs">
            Because this is a beta, performance, features, and compatibility will improve over time.
            Check the releases page frequently or watch the repository for notifications so you
            don&apos;t miss important updates.
          </p>
          <p className="text-[11px] text-emerald-900/80 dark:text-emerald-100/80">
            Future updates may include bug fixes, new example projects, and better support for more
            Android versions and devices.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-emerald-300 bg-emerald-50/80 p-4 text-xs text-emerald-900 dark:border-emerald-600 dark:bg-emerald-900/60 dark:text-emerald-50">
        Need help during setup? You can open a GitHub issue or reach out via email at{" "}
        <a
          href="mailto:pydevph@gmail.com"
          className="font-semibold underline"
        >
          pydevph@gmail.com
        </a>
        . Please include your device model, Android version, and a screenshot of any error messages.
      </div>
    </div>
  );
}


