"use client";

import { useEffect, useState } from "react";
import {
  GlobalPopunderScripts,
  AdBannerContainer,
  AdBanner320x50,
  AdBanner468x60,
} from "@/components/Ads";
import { AdBanner300x160 } from "@/components/Banner1";

export function MobileAdsPageClient() {
  const [secondsLeft, setSecondsLeft] = useState(15);
  const [canContinue, setCanContinue] = useState(false);
  const [nextUrl, setNextUrl] = useState<string | null>(null);

  // Read ?next=... only on the client from window.location
  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const url = new URL(window.location.href);
      const next = url.searchParams.get("next");
      if (next) setNextUrl(next);
    } catch {
      // ignore parsing errors
    }
  }, []);

  useEffect(() => {
    let interval: number | undefined;

    if (secondsLeft > 0) {
      interval = window.setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            window.clearInterval(interval);
            setCanContinue(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setCanContinue(true);
    }

    return () => {
      if (interval) window.clearInterval(interval);
    };
  }, [secondsLeft]);

  const handleContinue = () => {
    if (nextUrl) {
      window.location.href = nextUrl;
    } else if (window.history.length > 1) {
      window.history.back();
    }
  };

  return (
    <>
      {/* Popunder / global ad scripts */}
      <GlobalPopunderScripts />

      <main className="min-h-screen w-full bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-slate-50 flex items-stretch justify-center px-3 py-6">
        <div className="w-full max-w-md mx-auto flex flex-col gap-4">
          {/* Small header for branding */}
          <header className="text-center space-y-1">
            <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400">
              Kivy Studio Support
            </p>
            <h1 className="text-xl font-semibold text-slate-50">
              Thanks for Supporting the Project
            </h1>
            <p className="text-[12px] text-slate-400 max-w-xs mx-auto">
              This short screen helps keep Kivy Studio free while we prepare the
              Play Store release.
            </p>
          </header>

          {/* Main ad card */}
          <section className="rounded-2xl bg-slate-900/80 border border-slate-800 shadow-xl px-3 py-4 space-y-4">
            {/* Top responsive container ad */}
            <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-3 flex justify-center">
              <AdBannerContainer />
            </div>

            {/* Stacked mobile banners */}
            <div className="grid gap-3 grid-cols-1">
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-3 flex justify-center">
                <AdBanner320x50 />
              </div>
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-3 flex justify-center">
                <AdBanner300x160 />
              </div>
              <div className="rounded-xl bg-slate-950/70 border border-slate-800 px-2 py-3 flex justify-center">
              <AdBanner320x50 />
              </div>
            </div>

            {/* Info + timer */}
            <div className="mt-1 space-y-2 text-center">
              <p className="text-[12px] text-slate-300">
                Please keep this screen open briefly so the ads can load. This
                directly supports ongoing Kivy Studio development.
              </p>
              <p className="text-[11px] text-slate-500">
                Continue button unlocks in{" "}
                <span className="font-semibold text-slate-200">
                  {secondsLeft}s
                </span>
                .
              </p>
            </div>
          </section>

          {/* Continue button */}
          <section className="mt-1">
            <button
              type="button"
              onClick={handleContinue}
              disabled={!canContinue}
              className="w-full inline-flex items-center justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/40 disabled:bg-emerald-500/40 disabled:shadow-none disabled:cursor-not-allowed transition active:scale-[0.99]"
            >
              {canContinue
                ? "Continue"
                : `Please wait ${secondsLeft}s...`}
            </button>
            <p className="mt-2 text-[10px] text-center text-slate-500">
              After this screen, you&apos;ll return to the app to continue the
              download or go to the next step.
            </p>
          </section>
        </div>
      </main>
    </>
  );
}
