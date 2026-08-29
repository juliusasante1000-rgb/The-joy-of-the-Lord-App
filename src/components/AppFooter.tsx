import React from "react";
import { Heart, Sparkles, User, MapPin } from "lucide-react";
import { AppLogo } from "./AppLogo";
import { CreatorProfile } from "../types";

interface AppFooterProps {
  profile: CreatorProfile;
  onNavigateTab: (tabId: string) => void;
  onOpenAbout: () => void;
  onOpenInstallModal?: () => void;
  isInstalled?: boolean;
}

export const AppFooter: React.FC<AppFooterProps> = ({
  profile,
  onNavigateTab,
  onOpenAbout,
  onOpenInstallModal,
  isInstalled = false
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-12 border-t border-[#E8E0F0] bg-white text-[#16235A] transition-colors pb-24 md:pb-12">
      {/* Triple brand accent gradient bar */}
      <div className="h-1 w-full bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-6">
        {/* Top Tier: Logo & Creator Summary */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pb-6 border-b border-[#E8E0F0]">
          <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
            <AppLogo variant="icon-only" className="w-12 h-12" />
            <div>
              <h3 className="font-brand-impact font-black text-lg text-[#16235A] tracking-wider">
                THE JOY OF THE LORD
              </h3>
              <p className="text-xs text-[#5B6B8A] font-medium">
                Christian Devotion • Prayer • Bible Study • Faith Resources
              </p>
            </div>
          </div>

          {/* Mini Creator Badge */}
          <button
            onClick={onOpenAbout}
            className="flex items-center gap-3 p-2.5 rounded-2xl bg-[#FAF8FD] border border-[#E8E0F0] hover:border-[#9333EA] transition-all text-left group cursor-pointer"
            title="View About the Creator"
          >
            <div className="w-10 h-10 rounded-full p-0.5 bg-gradient-to-tr from-[#2563EB] via-[#9333EA] to-[#DB2777] shrink-0">
              <img
                src={profile.photoUrl}
                alt={profile.name}
                referrerPolicy="no-referrer"
                className="w-full h-full rounded-full object-cover bg-slate-100"
              />
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wider text-[#9333EA]">
                Created by
              </p>
              <p className="text-xs font-bold font-serif text-[#16235A] group-hover:text-[#9333EA] transition-colors">
                {profile.name}
              </p>
              <p className="text-[10px] text-[#5B6B8A]">
                {profile.professionalTitle.split("|")[0]?.trim()}
              </p>
            </div>
          </button>
        </div>

        {/* Middle Tier: Quick Nav Links */}
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">
          <button
            onClick={() => onNavigateTab("home")}
            className="hover:text-[#9333EA] transition-colors cursor-pointer"
          >
            Home
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigateTab("library")}
            className="hover:text-[#9333EA] transition-colors cursor-pointer"
          >
            Library
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigateTab("prayers")}
            className="hover:text-[#9333EA] transition-colors cursor-pointer"
          >
            Prayers
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigateTab("quotes")}
            className="hover:text-[#9333EA] transition-colors cursor-pointer"
          >
            Daily Quotes
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigateTab("bible")}
            className="hover:text-[#9333EA] transition-colors cursor-pointer"
          >
            Holy Bible
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={() => onNavigateTab("doctrines")}
            className="hover:text-[#9333EA] transition-colors cursor-pointer"
          >
            Doctrines
          </button>
          <span className="text-slate-300">•</span>
          <button
            onClick={onOpenAbout}
            className="text-[#9333EA] hover:text-[#DB2777] transition-colors cursor-pointer font-black"
          >
            About the Creator
          </button>
          {onOpenInstallModal && (
            <>
              <span className="text-slate-300">•</span>
              <button
                onClick={onOpenInstallModal}
                className="text-[#B48C35] hover:text-[#996515] transition-colors cursor-pointer font-bold flex items-center gap-1"
              >
                {isInstalled ? "App Installed ✓" : "📲 Install App"}
              </button>
            </>
          )}
        </div>

        {/* Bottom Tier: Copyright & Scripture Anchor */}
        <div className="pt-2 text-center text-xs text-[#5B6B8A] space-y-1">
          <p className="font-serif italic text-slate-600">
            "For the joy of the Lord is your strength" — Nehemiah 8:10
          </p>
          <p className="text-[11px] font-mono opacity-80">
            © {currentYear} {profile.name}. All rights reserved. • Empowering Minds, Transforming Education, Building Tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
};
