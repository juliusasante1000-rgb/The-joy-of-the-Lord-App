import React, { useState } from "react";
import {
  X,
  BookOpen,
  Volume2,
  VolumeX,
  Bookmark,
  Share2,
  CheckCircle2,
  Sparkles,
  HeartHandshake,
  Sunrise,
  Sun,
  Moon,
  Maximize2,
  Minimize2,
  ArrowLeft,
  ArrowRight,
  FileDown,
  Printer,
  Image as ImageIcon,
  Palette
} from "lucide-react";
import { Devotion, CreatorProfile } from "../types";
import { downloadDevotionDocument, printDevotionOnePageDocument } from "../utils/devotionDocumentExporter";
import { DevotionPictureModal } from "./DevotionPictureModal";

interface DevotionDetailModalProps {
  devotion: Devotion | null;
  isOpen: boolean;
  onClose: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onShare: () => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  isCompleted: boolean;
  onComplete: () => void;
  onNextDevotion?: () => void;
  onPrevDevotion?: () => void;
  hasNextDevotion?: boolean;
  hasPrevDevotion?: boolean;
  creatorProfile?: CreatorProfile;
}

export const DevotionDetailModal: React.FC<DevotionDetailModalProps> = ({
  devotion,
  isOpen,
  onClose,
  isBookmarked,
  onToggleBookmark,
  onShare,
  isSpeaking,
  onToggleSpeak,
  isCompleted,
  onComplete,
  onNextDevotion,
  onPrevDevotion,
  hasNextDevotion = false,
  hasPrevDevotion = false,
  creatorProfile
}) => {
  const [isFullOverlap, setIsFullOverlap] = useState(false);
  const [showPictureModal, setShowPictureModal] = useState(false);

  if (!isOpen || !devotion) return null;

  const fullSpeechText = `${devotion.title}. Scripture: ${devotion.keyScripture}. ${devotion.passageText}. Reflection: ${devotion.reflection}. Guided Prayer: ${devotion.guidedPrayer}. Action Step: ${devotion.actionStep}`;

  const getEditionIcon = () => {
    switch (devotion.edition) {
      case "morning":
        return <Sunrise className="w-4 h-4 text-amber-600" />;
      case "afternoon":
        return <Sun className="w-4 h-4 text-amber-500" />;
      case "evening":
        return <Moon className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div
      id="devotion-detail-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isFullOverlap
          ? "p-0 bg-slate-950/98 backdrop-blur-lg"
          : "p-3 sm:p-4 bg-black/70 backdrop-blur-xs"
      } animate-in fade-in`}
    >
      <div
        className={`bg-[#FDFBF7] flex flex-col overflow-hidden transition-all duration-200 ${
          isFullOverlap
            ? "w-screen h-screen max-w-none max-h-none rounded-none border-0"
            : "w-full max-w-3xl rounded-2xl shadow-2xl border-2 border-[#B48C35] max-h-[92vh]"
        }`}
      >
        {/* Sticky Header */}
        <div className="p-4 sm:p-5 border-b border-[#E5D5BC] flex items-center justify-between gap-3 bg-[#0F172A] text-white">
          <div className="flex items-center gap-2 min-w-0">
            <span className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#B48C35] text-white text-[11px] font-bold uppercase tracking-wider">
              {getEditionIcon()}
              <span>{devotion.editionLabel}</span>
            </span>
            <span className="text-xs text-[#DCC398] font-mono hidden sm:inline">
              • {devotion.readTimeMinutes} min read
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {/* Audio Read-aloud button */}
            <button
              onClick={() => onToggleSpeak(fullSpeechText)}
              className={`p-2 rounded transition-colors cursor-pointer ${
                isSpeaking
                  ? "bg-[#B48C35] text-white animate-pulse"
                  : "text-[#DCC398] hover:bg-white/10"
              }`}
              title={isSpeaking ? "Pause Audio" : "Listen to Devotion"}
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Bookmark button */}
            <button
              onClick={onToggleBookmark}
              className={`p-2 rounded transition-colors cursor-pointer ${
                isBookmarked
                  ? "bg-[#B48C35] text-white"
                  : "text-[#DCC398] hover:bg-white/10"
              }`}
              title="Bookmark Devotion"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? "fill-white" : ""}`} />
            </button>

            {/* Share button */}
            <button
              onClick={onShare}
              className="p-2 rounded text-[#DCC398] hover:bg-white/10 transition-colors cursor-pointer"
              title="Share Devotion"
            >
              <Share2 className="w-4 h-4" />
            </button>

            {/* Download Devotion as Picture (PNG) with Themes */}
            <button
              onClick={() => setShowPictureModal(true)}
              className="p-2 rounded bg-gradient-to-r from-[#F59E0B]/20 to-[#B48C35]/20 text-[#FBBF24] hover:bg-white/15 border border-[#F59E0B]/30 transition-all cursor-pointer flex items-center gap-1"
              title="Download Devotion as Picture (Select background theme & author photo)"
              aria-label="Download as Picture"
            >
              <ImageIcon className="w-4 h-4" />
            </button>

            {/* Download 1-Page Paper Document */}
            <button
              onClick={() => printDevotionOnePageDocument(devotion, creatorProfile)}
              className="p-2 rounded text-[#DCC398] hover:bg-white/10 hover:text-white transition-colors cursor-pointer flex items-center gap-1"
              title="Download / Print 1-Page Paper Document with 'The joy of the Lord is my strength' & 'Bismark Twum'"
              aria-label="Download 1-Page Document"
            >
              <FileDown className="w-4 h-4" />
            </button>

            {/* Full page toggle button */}
            <button
              onClick={() => setIsFullOverlap(!isFullOverlap)}
              className={`p-2 rounded transition-colors cursor-pointer ${
                isFullOverlap ? "bg-[#B48C35] text-white" : "text-[#DCC398] hover:bg-white/10"
              }`}
              title={isFullOverlap ? "Exit Full Page" : "Expand to Full Page"}
              aria-label="Toggle Full Page"
            >
              {isFullOverlap ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-[#1A2A44]">
          {/* Title & Theme */}
          <div className="space-y-1.5">
            <span className="text-[11px] uppercase tracking-[0.2em] font-bold text-[#B48C35]">
              {devotion.category} • {devotion.theme}
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#0F172A] leading-tight">
              {devotion.title}
            </h2>
          </div>

          {/* Key Scripture Callout */}
          <div className="p-5 rounded-lg bg-[#F1E6D2] border border-[#DCC398] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-[#0F172A]">
              <span className="flex items-center gap-1.5 uppercase tracking-wider text-[#B48C35]">
                <BookOpen className="w-4 h-4" /> Key Scripture
              </span>
              <span className="font-serif italic font-normal text-[#1A2A44]">King James Version</span>
            </div>
            <blockquote className="text-base sm:text-lg font-serif italic text-[#0F172A] leading-relaxed">
              "{devotion.passageText || devotion.keyScripture}"
            </blockquote>
            <p className="text-xs font-mono font-bold text-[#B48C35] text-right">
              — {devotion.keyScripture.split(" - ")[0]}
            </p>
          </div>

          {/* Practical Reflection */}
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/70 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B48C35]" /> Scriptural Reflection
            </h3>
            <div className="space-y-4 text-base leading-relaxed text-[#334155] font-serif">
              {devotion.reflection.split("\n\n").map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
          </div>

          {/* Practical Application */}
          {devotion.practicalApplication && (
            <div className="p-5 rounded-lg bg-white border border-[#E5D5BC] space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                Practical Christian Walk
              </h4>
              <p className="text-sm leading-relaxed text-[#334155]">
                {devotion.practicalApplication}
              </p>
            </div>
          )}

          {/* Guided Prayer Box */}
          <div className="p-6 rounded-lg bg-white border-2 border-[#B48C35] space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-bold text-[#0F172A] uppercase tracking-wider flex items-center gap-1.5">
                <HeartHandshake className="w-4 h-4 text-[#B48C35]" /> Guided Faith Prayer
              </h4>
              <button
                onClick={() => onToggleSpeak(devotion.guidedPrayer)}
                className="text-xs font-bold uppercase tracking-wider text-[#B48C35] hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Volume2 className="w-3.5 h-3.5" /> Pray Aloud
              </button>
            </div>
            <p className="text-base font-serif italic text-[#0F172A] leading-relaxed">
              "{devotion.guidedPrayer}"
            </p>
          </div>

          {/* Action Step */}
          {devotion.actionStep && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-[#0F172A] text-white text-xs">
              <Sparkles className="w-4 h-4 text-[#DCC398] flex-shrink-0 mt-0.5" />
              <div>
                <strong className="block font-bold uppercase tracking-wider text-[#DCC398] mb-1">Today's Faith Action:</strong>
                <span className="text-slate-200">{devotion.actionStep}</span>
              </div>
            </div>
          )}

          {/* Devotion Picture (PNG) with Themes Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#16235A] via-[#1E293B] to-[#2E1065] text-white border-2 border-[#F59E0B] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-md">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#F59E0B] text-slate-900 text-xs font-bold">
                  <ImageIcon className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#FDE68A]">
                  Save & Share as Picture (PNG)
                </span>
              </div>
              <p className="text-xs text-slate-200">
                Generate high-resolution social graphic with custom background themes and official author seal:
              </p>
              <div className="flex items-center gap-2 pt-0.5">
                <img src="/bis.png" alt="Bismark Twum" className="w-5 h-5 rounded-full object-cover border border-[#F59E0B]" />
                <span className="text-xs font-serif italic text-[#FDE68A]">
                  "The joy of the Lord is my strength" — Bismark Twum
                </span>
              </div>
            </div>

            <button
              onClick={() => setShowPictureModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-gradient-to-r from-[#F59E0B] via-[#D97706] to-[#B45309] hover:brightness-110 text-white font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer"
            >
              <Palette className="w-4 h-4" />
              <span>Choose Theme & Download Picture</span>
            </button>
          </div>

          {/* 1-Page Paper Document Download & Print Banner */}
          <div className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-[#FDFBF7] to-[#F1E6D2] border-2 border-[#B48C35] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-[#B48C35] text-white text-xs">
                  <Printer className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-[#0F172A]">
                  One-Page Printable Paper Document
                </span>
              </div>
              <p className="text-xs text-[#334155]">
                Includes Scripture, Reflection, Guided Prayer, and closing decree:
              </p>
              <div className="text-xs font-serif font-bold italic text-[#B48C35]">
                "The joy of the Lord is my strength" — Bismark Twum
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                onClick={() => printDevotionOnePageDocument(devotion, creatorProfile)}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-lg bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                title="Print or Save as 1-Page PDF"
              >
                <Printer className="w-3.5 h-3.5 text-[#DCC398]" />
                <span>Print / Save PDF</span>
              </button>

              <button
                onClick={() => downloadDevotionDocument(devotion, creatorProfile)}
                className="px-3.5 py-2 rounded-lg bg-white hover:bg-slate-100 text-[#0F172A] border border-[#DCC398] text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                title="Download HTML Document"
              >
                <FileDown className="w-3.5 h-3.5 text-[#B48C35]" />
                <span>Download</span>
              </button>
            </div>
          </div>

          {/* Finished Reading: Next/Prev Navigation */}
          {(onPrevDevotion || onNextDevotion) && (
            <div className="p-4 rounded-xl bg-[#F1E6D2] border border-[#DCC398] flex items-center justify-between gap-3">
              {onPrevDevotion ? (
                <button
                  onClick={onPrevDevotion}
                  disabled={!hasPrevDevotion}
                  className={`px-3.5 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    hasPrevDevotion
                      ? "bg-white text-[#0F172A] border border-[#E5D5BC] hover:bg-slate-50"
                      : "opacity-40 cursor-not-allowed bg-transparent text-slate-400"
                  }`}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Previous Message</span>
                </button>
              ) : <div />}

              <span className="text-xs font-serif italic text-[#B48C35]">
                Finished Reading
              </span>

              {onNextDevotion ? (
                <button
                  onClick={onNextDevotion}
                  disabled={!hasNextDevotion}
                  className={`px-4 py-2 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    hasNextDevotion
                      ? "bg-[#0F172A] text-white hover:bg-[#B48C35]"
                      : "opacity-40 cursor-not-allowed bg-transparent text-slate-400"
                  }`}
                >
                  <span>Next Message</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : <div />}
            </div>
          )}
        </div>

        {/* Sticky Footer with Amen / Complete & Close */}
        <div className="p-4 border-t border-[#E5D5BC] bg-white flex items-center justify-between gap-3">
          <button
            onClick={onClose}
            className="py-2.5 px-5 rounded-lg border border-[#E5D5BC] text-[#1A2A44] text-xs font-bold uppercase tracking-wider hover:bg-[#FDFBF7] transition-colors cursor-pointer"
          >
            Done & Close
          </button>

          <button
            onClick={() => {
              onComplete();
              onClose();
            }}
            className={`flex-1 py-2.5 px-4 rounded-lg text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer ${
              isCompleted
                ? "bg-[#B48C35] text-white"
                : "bg-[#0F172A] hover:bg-[#B48C35] text-white"
            }`}
          >
            <CheckCircle2 className="w-4 h-4 text-[#DCC398]" />
            {isCompleted ? "Completed Devotion! (Amen)" : "Say Amen & Complete Devotion"}
          </button>
        </div>
      </div>

      {/* Picture Download & Custom Background Theme Modal */}
      {showPictureModal && (
        <DevotionPictureModal
          devotion={devotion}
          isOpen={showPictureModal}
          onClose={() => setShowPictureModal(false)}
          creatorProfile={creatorProfile}
        />
      )}
    </div>
  );
};
