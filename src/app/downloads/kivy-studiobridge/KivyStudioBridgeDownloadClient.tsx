"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AdBanner468x60, AdBanner320x50, AdBannerContainer } from "@/components/Ads";
import {AdBanner300x160} from "@/components/Banner1"

const STEPS = [
  "Overview & Requirements",
  "Beta Notice & Ads",
  "Download for Windows",
] as const;

export function KivyStudioBridgeDownloadClient() {
  const [step, setStep] = useState(0);
  const [canGoNext, setCanGoNext] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState(15);

  // 15-second delay before user can click Next on each step
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
    <main className="w-full px-4 py-12">
      <div className="flex gap-6 max-w-7xl mx-auto">
        {/* Left ad rail */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-24 space-y-4">
          <AdBannerContainer/>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex-1 min-w-0 space-y-10">
          {/* Hero */}
          <section className="space-y-5">
            <span className="inline-flex items-center rounded-full border border-indigo-200 bg-indigo-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-indigo-700 dark:border-indigo-500/50 dark:bg-indigo-900/40 dark:text-indigo-200">
              Official Download • KivyStudioBridge (Windows)
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold leading-tight bg-gradient-to-r from-gray-900 via-indigo-700 to-sky-600 dark:from-gray-50 dark:via-indigo-300 dark:to-sky-300 bg-clip-text text-transparent">
              Download KivyStudioBridge – Windows Companion for Kivy Studio Android
            </h1>
            <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 max-w-3xl">
              Follow this simple, <strong>3-stage download flow</strong> to get the latest
              KivyStudioBridge build for Windows. This bridge connects your desktop editor to the
              Kivy Studio Android app for real-time Python/Kivy development.
            </p>

            {/* Top in-content ad */}
            <div id="ad-468x60-container" className="rounded-xl border border-dashed border-gray-300 bg-gray-50 px-4 py-5 text-center text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-900/40 dark:text-gray-400">
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
                          ? "border-indigo-500 bg-indigo-500 text-white shadow-sm"
                          : isCompleted
                          ? "border-indigo-400 bg-indigo-50 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200"
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
                            ? "text-indigo-700 dark:text-indigo-300"
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
              {step === 1 && <StepBetaNotice />}
              {step === 2 && <StepDownloadLinks />}

              {/* Mid-flow ad */}
              <div id="ad-300x160-container" className="rounded-xl border border-dashed border-amber-300 bg-amber-50 px-4 py-5 text-center text-xs text-amber-800 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-100">
                <AdBanner300x160 />
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
                  <button
                    type="button"
                    onClick={goNext}
                    disabled={step === STEPS.length - 1 || !canGoNext}
                    className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:bg-indigo-600/60"
                  >
                    {step === STEPS.length - 1
                      ? "Next"
                      : !canGoNext && secondsLeft > 0
                      ? `Please wait ${secondsLeft}s`
                      : step === STEPS.length - 2
                      ? "Continue to Download"
                      : "Next"}
                  </button>
                </div>
                <p className="text-[11px] text-gray-500 dark:text-gray-400">
                  Hint: The next button unlocks after a short delay so you can read instructions and
                  see ads.
                </p>
              </div>
            </div>
          </section>

          {/* Extra SEO content + bottom ad */}
          <section className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
            <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
                Why Use KivyStudioBridge Instead of Manual Sync?
              </h2>
              <p>
                Manually copying files between Windows and Android can be slow, error‑prone, and
                frustrating. KivyStudioBridge automates the process with <strong>file watching</strong>,
                <strong>network transfer</strong>, and <strong>tight integration with Kivy Studio</strong>,
                so every save in your editor can instantly refresh the app on your phone.
              </p>
              <p>
                If you&apos;re serious about building Python/Kivy apps for Android, KivyStudioBridge
                turns your PC and phone into a smooth development pair: desktop for coding, Android
                for live preview.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-center text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
                <AdBanner468x60 />
              </div>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900 dark:border-blue-700 dark:bg-blue-900/30 dark:text-blue-100">
                Want to see the full ecosystem?{" "}
                <Link href="/projects/kivy-studio" className="font-semibold underline">
                  Explore the Kivy Studio Android project
                </Link>{" "}
                and{" "}
                <Link href="/projects/kivy-studiobridge" className="font-semibold underline">
                  read more about KivyStudioBridge
                </Link>
                .
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}

function StepOverview() {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Step 1 – Check Requirements (Windows + Android)
        </h2>
        <p>
          KivyStudioBridge is built for <strong>Windows</strong> and works together with the
          <strong> Kivy Studio Android app</strong>. Before downloading, make sure you have:
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>Windows 10 or newer (64‑bit recommended)</li>
          <li>Kivy Studio installed and running on your Android device</li>
          <li>Python 3.8+ installed on Windows (for advanced usage or source builds)</li>
          <li>A shared Wi‑Fi network or USB connection for the bridge to talk to your phone</li>
        </ul>
        <p>
          Once these basics are in place, continue to the next step to read some important{" "}
          <strong>beta release information</strong> before downloading.
        </p>
      </div>

      <div className="space-y-4">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
          Tip: For the smoothest experience, connect your PC and Android device to the same Wi‑Fi
          network and keep Kivy Studio open while using the bridge.
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-xs text-indigo-900 dark:border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-100">
          You can still use Kivy Studio on Android alone, but KivyStudioBridge unlocks the{" "}
          <strong>full desktop workflow</strong>.
        </div>
      </div>
    </div>
  );
}

function StepBetaNotice() {
  return (
    <div className="grid gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] items-start">
      <div className="space-y-3 rounded-xl border border-gray-200 bg-white/80 p-5 text-sm text-gray-700 shadow-sm dark:border-gray-700 dark:bg-gray-900/70 dark:text-gray-200">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-50">
          Step 2 – Important Beta Notice (Windows Build)
        </h2>
        <p>
          The current KivyStudioBridge release is a <strong>beta version</strong>. That means you
          get early access to the full desktop bridge experience, but you should expect{" "}
          <strong>frequent updates</strong>, small glitches, and rapid improvements over time.
        </p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>This download is for the <strong>Windows executable/installer</strong> only.</li>
          <li>Some UI elements or advanced features may change in future releases.</li>
          <li>
            For serious work or teaching, plan to <strong>update regularly</strong> when new versions
            are published.
          </li>
        </ul>
        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree that this is beta software and that{" "}
          <strong>installing future updates is recommended</strong> to keep your bridge stable and
          secure.
        </p>
      </div>

      <div className="space-y-3">
        <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 text-xs text-gray-600 dark:border-gray-700 dark:bg-gray-900/60 dark:text-gray-300">
          <AdBanner468x60 />
        </div>
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 text-xs text-indigo-900 dark:border-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-100">
          Check this page again periodically to see when a new KivyStudioBridge beta or stable build
          is available.
        </div>
      </div>
    </div>
  );
}

function StepDownloadLinks() {
  return (
    <div className="space-y-6 rounded-2xl border border-indigo-200 bg-indigo-50/70 p-6 text-sm text-indigo-900 shadow-sm dark:border-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-50">
      <h2 className="text-lg font-semibold text-indigo-900 dark:text-indigo-50">
        Step 3 – Download KivyStudioBridge for Windows
      </h2>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-3 rounded-xl border border-indigo-300 bg-white/90 p-4 text-sm text-indigo-900 shadow-xs dark:border-indigo-600 dark:bg-indigo-900/70 dark:text-indigo-50">
          <h3 className="text-sm font-semibold">Download Windows Build (Beta)</h3>
          <p className="text-xs">
            Get the latest <strong>Windows executable/installer</strong> for KivyStudioBridge. Run
            the installer and follow on-screen instructions to complete setup.
          </p>
          <Link
            href="https://github.com/yourusername/kivystudiobridge/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Go to Releases (Windows)
          </Link>
          <p className="text-[11px] text-indigo-900/80 dark:text-indigo-100/80">
            This is a <strong>beta build</strong>. For the best experience, plan to{" "}
            <strong>install newer versions</strong> as they are released.
          </p>
        </div>

        <div className="space-y-3 rounded-xl border border-indigo-300 bg-white/90 p-4 text-sm text-indigo-900 shadow-xs dark:border-indigo-600 dark:bg-indigo-900/70 dark:text-indigo-50">
          <h3 className="text-sm font-semibold">Staying Updated</h3>
          <p className="text-xs">
            Watch the repository or releases page so you&apos;re notified when fresh builds land.
            Updates may include performance fixes, better logging, improved connection handling, and
            new tooling for teaching or teams.
          </p>
          <p className="text-[11px] text-indigo-900/80 dark:text-indigo-100/80">
            Pair each new KivyStudioBridge version with the latest Kivy Studio Android APK for the
            smoothest development experience.
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-dashed border-indigo-300 bg-indigo-50/80 p-4 text-xs text-indigo-900 dark:border-indigo-600 dark:bg-indigo-900/60 dark:text-indigo-50">
        Need help with installation or connection issues? Reach out via email at{" "}
        <a
          href="mailto:pydevph@gmail.com"
          className="font-semibold underline"
        >
          pydevph@gmail.com
        </a>
        {" "}with your Windows version, Python version (if used), and a short description of your setup.
      </div>
    </div>
  );
}



