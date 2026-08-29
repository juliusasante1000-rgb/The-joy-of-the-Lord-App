import React from "react";
import { Download, Smartphone, X, Sparkles, CheckCircle2 } from "lucide-react";
import { PlatformType } from "../hooks/usePWAInstall";

interface InstallAppBannerProps {
  isInstalled: boolean;
  isInstallable: boolean;
  platform: PlatformType;
  isDismissed: boolean;
  onOpenModal: () => void;
  onPromptInstall: () => Promise<boolean>;
  onDismiss: () => void;
}

export const InstallAppBanner: React.FC<InstallAppBannerProps> = ({
  isInstalled,
  isInstallable,
  platform,
  isDismissed,
  onOpenModal,
  onPromptInstall,
  onDismiss
}) => {
  // If already installed or dismissed by user, do not render floating banner
  if (isInstalled || isDismissed) {
    return null;
  }

  const handleAction = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInstallable) {
      const success = await onPromptInstall();
      if (!success) {
        onOpenModal();
      }
    } else {
      onOpenModal();
    }
  };

  return (
    <div className="fixed bottom-16 md:bottom-6 right-3 md:right-6 z-30 max-w-sm w-[calc(100vw-1.5rem)] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-[#16235A] text-white p-3.5 rounded-2xl shadow-2xl border border-[#B48C35]/50 flex items-center justify-between gap-3 relative overflow-hidden backdrop-blur-md">
        {/* Subtle Gold Flare in background */}
        <div className="absolute -right-8 -top-8 w-24 h-24 bg-[#B48C35]/20 rounded-full blur-xl pointer-events-none" />

        <div
          onClick={onOpenModal}
          className="flex items-center gap-3 cursor-pointer min-w-0 flex-1"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#B48C35] to-[#DCC398] flex items-center justify-center text-[#16235A] font-serif font-black text-base shadow-md shrink-0">
            ✝
          </div>

          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="text-xs font-serif font-bold text-white truncate">
                Install "The Joy of the Lord"
              </p>
              <span className="px-1.5 py-0.2 rounded-full bg-[#B48C35]/30 text-[#DCC398] text-[9px] font-mono uppercase font-bold shrink-0">
                Free PWA
              </span>
            </div>
            <p className="text-[10px] text-slate-300 truncate">
              {platform === "ios"
                ? "Tap to add to your iPhone/iPad Home Screen"
                : platform === "android"
                ? "Install for instant offline Christian access"
                : "Install app for desktop & quick launch"}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          <button
            onClick={handleAction}
            className="py-1.5 px-3 rounded-xl bg-gradient-to-r from-[#B48C35] to-[#996515] hover:from-[#996515] hover:to-[#B48C35] text-white font-bold text-xs shadow-sm transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Install</span>
          </button>

          <button
            onClick={onDismiss}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Dismiss banner"
            title="Dismiss banner"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
