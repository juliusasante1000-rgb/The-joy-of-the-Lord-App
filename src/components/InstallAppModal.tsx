import React, { useState } from "react";
import {
  X,
  Download,
  Smartphone,
  Monitor,
  Share,
  PlusSquare,
  CheckCircle2,
  Sparkles,
  WifiOff,
  RefreshCw,
  Layers,
  ArrowRight,
  ShieldCheck,
  Zap,
  Globe
} from "lucide-react";
import { PlatformType } from "../hooks/usePWAInstall";

interface InstallAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  isInstalled: boolean;
  isInstallable: boolean;
  platform: PlatformType;
  onPromptInstall: () => Promise<boolean>;
}

export const InstallAppModal: React.FC<InstallAppModalProps> = ({
  isOpen,
  onClose,
  isInstalled,
  isInstallable,
  platform,
  onPromptInstall
}) => {
  const [selectedPlatformTab, setSelectedPlatformTab] = useState<PlatformType>(
    platform !== "other" ? platform : "android"
  );
  const [installSuccess, setInstallSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDirectInstall = async () => {
    const success = await onPromptInstall();
    if (success) {
      setInstallSuccess(true);
      setTimeout(() => {
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#E8E0F0] overflow-hidden z-10 flex flex-col max-h-[92vh]">
        {/* Header with Royal Navy Gradient */}
        <div className="bg-gradient-to-r from-[#16235A] via-[#1E293B] to-[#16235A] text-white p-5 relative shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B48C35] to-[#DCC398] flex items-center justify-center text-[#16235A] font-serif font-black text-xl shadow-md shrink-0">
                ✝
              </div>
              <div>
                <h2 className="font-serif font-bold text-lg text-white leading-tight">
                  Install "The Joy of the Lord"
                </h2>
                <p className="text-xs text-[#DCC398] font-mono tracking-wide">
                  Cross-Platform Christian Companion
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {isInstalled && (
            <div className="mt-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Installed Application Active on this Device</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-slate-200">
          {/* Key Advantages Grid */}
          <div className="grid grid-cols-2 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800 shrink-0 mt-0.5">
                <Zap className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#16235A]">Instant Access</h4>
                <p className="text-[10px] text-slate-600 leading-tight">Launch in 1-tap from Home Screen or Dock</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-indigo-100 text-indigo-800 shrink-0 mt-0.5">
                <RefreshCw className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#16235A]">Always Synced</h4>
                <p className="text-[10px] text-slate-600 leading-tight">Live sync with central backend & Founder Portal</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                <WifiOff className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#16235A]">Offline Ready</h4>
                <p className="text-[10px] text-slate-600 leading-tight">Read Bible, sermons & devotionals anytime</p>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 flex items-start gap-2">
              <div className="p-1.5 rounded-lg bg-blue-100 text-blue-800 shrink-0 mt-0.5">
                <ShieldCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#16235A]">No App Store Login</h4>
                <p className="text-[10px] text-slate-600 leading-tight">Zero account friction or disk bloat</p>
              </div>
            </div>
          </div>

          {/* 1-Click Native Install Action (if browser supports beforeinstallprompt) */}
          {isInstallable && !isInstalled && (
            <div className="p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200/80 shadow-xs text-center space-y-2">
              <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-[#16235A]">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>1-Click Installation Available on Your Browser</span>
              </div>
              <button
                onClick={handleDirectInstall}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-[#B48C35] to-[#996515] hover:from-[#996515] hover:to-[#B48C35] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Download className="w-4 h-4" />
                <span>Install "The Joy of the Lord" App</span>
              </button>
            </div>
          )}

          {installSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Installation initiated successfully! Check your home screen.</span>
            </div>
          )}

          {/* Platform-Specific Step-by-Step Instructions */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 font-mono">
                Select Your Device / Platform
              </h3>
            </div>

            {/* Platform Selector Tabs */}
            <div className="grid grid-cols-4 gap-1 p-1 bg-slate-100 rounded-xl">
              <button
                onClick={() => setSelectedPlatformTab("android")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  selectedPlatformTab === "android"
                    ? "bg-white text-[#16235A] shadow-xs"
                    : "text-slate-600 hover:text-[#16235A]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Android</span>
              </button>
              <button
                onClick={() => setSelectedPlatformTab("ios")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  selectedPlatformTab === "ios"
                    ? "bg-white text-[#16235A] shadow-xs"
                    : "text-slate-600 hover:text-[#16235A]"
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>iOS / iPad</span>
              </button>
              <button
                onClick={() => setSelectedPlatformTab("windows")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  selectedPlatformTab === "windows"
                    ? "bg-white text-[#16235A] shadow-xs"
                    : "text-slate-600 hover:text-[#16235A]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Windows</span>
              </button>
              <button
                onClick={() => setSelectedPlatformTab("macos")}
                className={`py-1.5 px-2 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                  selectedPlatformTab === "macos"
                    ? "bg-white text-[#16235A] shadow-xs"
                    : "text-slate-600 hover:text-[#16235A]"
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>macOS</span>
              </button>
            </div>

            {/* Platform Guidance Content */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs space-y-3">
              {selectedPlatformTab === "android" && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-[#16235A] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#B48C35]" />
                    <span>Android (Chrome, Samsung Internet, Edge, Brave)</span>
                  </h4>
                  <ol className="space-y-2 text-slate-700 list-decimal list-inside">
                    <li>
                      Tap the <strong>three dots menu (⋮)</strong> in the top right corner of your browser.
                    </li>
                    <li>
                      Select <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
                    </li>
                    <li>
                      Confirm by tapping <strong>"Install"</strong>. The app will be placed directly onto your home screen and app drawer.
                    </li>
                  </ol>
                </div>
              )}

              {selectedPlatformTab === "ios" && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-[#16235A] flex items-center gap-1.5">
                    <Smartphone className="w-4 h-4 text-[#B48C35]" />
                    <span>iPhone & iPad (Safari)</span>
                  </h4>
                  <ol className="space-y-2.5 text-slate-700">
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#16235A] shrink-0">1.</span>
                      <span>
                        Tap the <strong>Share</strong> button{" "}
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px] font-semibold">
                          <Share className="w-3 h-3 inline mr-0.5" /> Share
                        </span>{" "}
                        at the bottom (or top) of Safari.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#16235A] shrink-0">2.</span>
                      <span>
                        Scroll down and tap{" "}
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded-md bg-slate-200 text-slate-800 text-[10px] font-semibold">
                          <PlusSquare className="w-3 h-3 inline mr-0.5" /> Add to Home Screen
                        </span>
                        .
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="font-bold text-[#16235A] shrink-0">3.</span>
                      <span>
                        Tap <strong>"Add"</strong> in the top-right corner. The app will launch in full screen with no browser bars!
                      </span>
                    </li>
                  </ol>
                </div>
              )}

              {selectedPlatformTab === "windows" && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-[#16235A] flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-[#B48C35]" />
                    <span>Windows PC (Microsoft Edge or Google Chrome)</span>
                  </h4>
                  <ol className="space-y-2 text-slate-700 list-decimal list-inside">
                    <li>
                      Look for the <strong>Install icon (⊞ or ⬇)</strong> on the right side of the address bar.
                    </li>
                    <li>
                      Alternatively, click the <strong>three dots menu (⋯)</strong> &gt; <strong>Apps</strong> &gt; <strong>"Install The Joy of the Lord"</strong>.
                    </li>
                    <li>
                      Click <strong>"Install"</strong> to pin the app to your Start Menu, Taskbar, and Desktop with full windowed mode.
                    </li>
                  </ol>
                </div>
              )}

              {selectedPlatformTab === "macos" && (
                <div className="space-y-2.5">
                  <h4 className="font-bold text-[#16235A] flex items-center gap-1.5">
                    <Monitor className="w-4 h-4 text-[#B48C35]" />
                    <span>macOS (Safari or Google Chrome)</span>
                  </h4>
                  <ol className="space-y-2 text-slate-700 list-decimal list-inside">
                    <li>
                      <strong>Safari (macOS Sonoma+)</strong>: Click <strong>File</strong> in the top menu bar &gt; <strong>"Add to Dock..."</strong>.
                    </li>
                    <li>
                      <strong>Chrome / Edge</strong>: Click the <strong>Install</strong> icon in the address bar or <strong>Menu &gt; Save and Share &gt; Install Page as App</strong>.
                    </li>
                    <li>
                      The app launches as a standalone Mac application in your Dock and Launchpad.
                    </li>
                  </ol>
                </div>
              )}
            </div>
          </div>

          {/* Single Source of Truth Guarantee */}
          <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 flex items-start gap-2.5 text-slate-700 text-xs">
            <Globe className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-[#16235A]">Single Central Synchronization: </span>
              Both the web browser and installed app use the same authoritative central backend. Any books, sermons, verses, or Founder profile updates instantly reflect everywhere.
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <p className="text-[11px] text-slate-500 italic">
            "The Joy of the LORD is your strength." — Nehemiah 8:10
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-[#16235A] hover:bg-[#1E293B] text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
