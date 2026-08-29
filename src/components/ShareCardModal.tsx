import React, { useState, useRef } from "react";
import { X, Copy, Check, Share2, Sparkles, BookOpen, Quote } from "lucide-react";
import { AppLogo } from "./AppLogo";

interface ShareCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  reference?: string;
  text: string;
  subtext?: string;
}

type CardTheme = "royal-joy" | "royal-navy" | "golden-dawn" | "soft-ivory";

export const ShareCardModal: React.FC<ShareCardModalProps> = ({
  isOpen,
  onClose,
  title,
  reference,
  text,
  subtext
}) => {
  const [theme, setTheme] = useState<CardTheme>("royal-joy");
  const [copied, setCopied] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleCopyText = async () => {
    const shareText = `✨ The Joy of the Lord is My Strength ✨\n\n"${text}"\n\n📖 ${reference || title}\n\n${subtext ? `${subtext}\n\n` : ""}— "For the joy of the Lord is your strength" (Nehemiah 8:10)`;
    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // ignore
    }
  };

  const getThemeStyles = () => {
    switch (theme) {
      case "royal-joy":
        return "bg-gradient-to-br from-[#16235A] via-[#1E293B] to-[#24357D] text-white border-[#C026D3] shadow-lg";
      case "royal-navy":
        return "bg-[#0F172A] text-white border-[#B48C35] shadow-md";
      case "golden-dawn":
        return "bg-[#F1E6D2] text-[#0F172A] border-[#DCC398] shadow-md";
      case "soft-ivory":
        return "bg-white text-[#16235A] border-[#E8E0F0] shadow-xs";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-[#FDFBFE] w-full max-w-lg rounded-2xl p-6 sm:p-7 shadow-2xl border-2 border-[#16235A] space-y-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#E8E0F0] pb-3">
          <div className="flex items-center gap-2">
            <AppLogo variant="icon-only" className="w-7 h-7" />
            <h3 className="text-base font-serif font-bold text-[#16235A]">
              Share Scripture & Reflection
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded text-slate-400 hover:text-[#16235A] hover:bg-[#F3ECE0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Theme Picker */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#5B6B8A]">Card Style:</span>
          <div className="flex items-center gap-1.5 overflow-x-auto py-1">
            <button
              onClick={() => setTheme("royal-joy")}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                theme === "royal-joy"
                  ? "bg-gradient-to-r from-[#9333EA] to-[#DB2777] border-[#C026D3] text-white shadow-sm"
                  : "bg-white border-[#E8E0F0] text-[#16235A]"
              }`}
            >
              Royal Joy
            </button>
            <button
              onClick={() => setTheme("royal-navy")}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                theme === "royal-navy"
                  ? "bg-[#16235A] border-[#16235A] text-white shadow-xs"
                  : "bg-white border-[#E8E0F0] text-[#16235A]"
              }`}
            >
              Deep Navy
            </button>
            <button
              onClick={() => setTheme("golden-dawn")}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                theme === "golden-dawn"
                  ? "bg-[#B48C35] border-[#B48C35] text-white shadow-xs"
                  : "bg-white border-[#E8E0F0] text-[#16235A]"
              }`}
            >
              Golden Dawn
            </button>
            <button
              onClick={() => setTheme("soft-ivory")}
              className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider border transition-all ${
                theme === "soft-ivory"
                  ? "bg-white border-[#16235A] text-[#16235A] shadow-xs"
                  : "bg-white border-[#E8E0F0] text-slate-500"
              }`}
            >
              Clean Ivory
            </button>
          </div>
        </div>

        {/* Printable / Shareable Card Preview */}
        <div
          ref={cardRef}
          className={`p-6 sm:p-8 rounded-2xl border shadow-sm relative overflow-hidden transition-all ${getThemeStyles()}`}
        >
          {/* Top Gradient Accent Bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#9333EA] to-[#DB2777]" />

          {/* Subtle watermark background icon */}
          <div className="absolute -right-6 -bottom-6 opacity-10 pointer-events-none">
            <Quote className="w-36 h-36" />
          </div>

          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between text-xs tracking-[0.15em] uppercase font-bold opacity-90">
              <div className="flex items-center gap-1.5">
                <span className="font-script text-base text-[#F472B6] font-bold">The</span>
                <span className="font-brand-impact font-black">JOY OF THE LORD</span>
              </div>
              <span className="text-[10px] opacity-75 font-mono">{reference ? "Holy Scripture" : "Daily Devotion"}</span>
            </div>

            <blockquote className="text-lg sm:text-xl font-serif leading-relaxed italic">
              "{text}"
            </blockquote>

            {reference && (
              <p className="text-sm font-bold font-mono tracking-wide flex items-center gap-1.5 opacity-90 text-[#FBBF24]">
                <BookOpen className="w-4 h-4 text-[#F472B6]" /> — {reference}
              </p>
            )}

            {subtext && (
              <p className="text-xs leading-relaxed opacity-85 pt-2 border-t border-current/20 font-serif italic">
                {subtext}
              </p>
            )}

            <div className="pt-2 flex items-center justify-between text-[11px] opacity-75 font-mono border-t border-current/15">
              <span className="font-bold text-[#F472B6]">IS MY STRENGTH</span>
              <span>Nehemiah 8:10</span>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-2">
          <button
            onClick={handleCopyText}
            className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-[#16235A] to-[#24357D] hover:from-[#24357D] hover:to-[#16235A] text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-[#F472B6]" /> Copied to Clipboard!
              </>
            ) : (
              <>
                <Copy className="w-4 h-4 text-[#F472B6]" /> Copy Formatted Card Text
              </>
            )}
          </button>

          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-xl border border-[#E8E0F0] text-[#16235A] hover:bg-[#FAF8FD] text-xs font-bold uppercase tracking-wider transition-colors cursor-pointer"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
