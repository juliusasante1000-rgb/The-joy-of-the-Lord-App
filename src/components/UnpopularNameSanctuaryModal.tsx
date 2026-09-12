import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Printer,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Layers,
  HeartHandshake,
  Compass,
  ExternalLink,
  Info,
  Shield,
  Check,
  Zap,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { UnpopularBiblicalName, Devotion } from "../types";
import { getUnpopularNameFullProfile, UnpopularNameFullProfile } from "../utils/unpopularNameExpositionHelper";
import { printUnpopularNameDocument } from "../utils/devotionDocumentExporter";
import { streamAiContent } from "../utils/aiStreaming";
import { DevotionPictureModal } from "./DevotionPictureModal";

interface UnpopularNameSanctuaryModalProps {
  item: UnpopularBiblicalName;
  onClose: () => void;
  onOpenScripture?: (ref: string) => void;
  onCreateDevotion?: (devotion: Devotion) => void;
  onOpenPictureStudio?: (options: {
    reference: string;
    text: string;
    theme: string;
    category?: string;
  }) => void;
  onDownloadDirectImage?: (options: {
    reference: string;
    text: string;
    theme: string;
    category?: string;
  }) => void;
  onToggleSpeak?: (text: string) => void;
  isSpeaking?: boolean;
  onPreviousName?: () => void;
  onNextName?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
  currentIndex?: number;
  totalCount?: number;
}

export const UnpopularNameSanctuaryModal: React.FC<UnpopularNameSanctuaryModalProps> = ({
  item,
  onClose,
  onOpenScripture,
  onCreateDevotion,
  onOpenPictureStudio,
  onDownloadDirectImage,
  onToggleSpeak,
  isSpeaking = false,
  onPreviousName,
  onNextName,
  hasPrevious = false,
  hasNext = false,
  currentIndex = 0,
  totalCount = 500
}) => {
  const [profile, setProfile] = useState<UnpopularNameFullProfile>(() => getUnpopularNameFullProfile(item));
  const [activeTab, setActiveTab] = useState<"revelation" | "vault" | "prayer" | "historian">("revelation");
  const [isFullOverlap, setIsFullOverlap] = useState(false);
  const [copiedNotification, setCopiedNotification] = useState(false);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);

  // Dynamic AI Historian streaming state
  const [aiStreamingText, setAiStreamingText] = useState<string>("");
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiGeneratedSuccess, setAiGeneratedSuccess] = useState<boolean>(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [fastMode, setFastMode] = useState<boolean>(false);

  useEffect(() => {
    setProfile(getUnpopularNameFullProfile(item));
    setAiStreamingText("");
    setAiGeneratedSuccess(false);
    setAiError(null);
    setIsAiLoading(false);
  }, [item]);

  const handleCopyBlessing = () => {
    const textToCopy = `✨ ${item.name} (${item.originalScript}) — ${item.meaning}\n` +
      `Biblical Assignment: ${item.personType} — ${item.historicalRole}\n` +
      `Scripture Anchor: ${item.scriptureReference}\n\n` +
      `PROPHETIC BLESSING APPLICATION:\n"${profile.blessingDeclaration}"\n\n` +
      `THEOLOGICAL EXPOSITION:\n${profile.theologicalExposition}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedNotification(true);
    setTimeout(() => setCopiedNotification(false), 2500);
  };

  const handleDeepenHistorianExegesis = async () => {
    setIsAiLoading(true);
    setAiStreamingText("");
    setAiError(null);

    await streamAiContent<{ exegesis: string }>({
      actionType: "unpopular_name_exegesis",
      scriptureReference: item.scriptureReference,
      scriptureText: `Unpopular Biblical Figure: ${item.name} (${item.originalScript} / ${item.transliteration}). Meaning: ${item.meaning}. Person Type: ${item.personType}. Historical Role: ${item.historicalRole}.`,
      scriptureTheme: item.category || "Hidden Faithfulness & Sacred Legacy",
      fastMode,
      onChunk: (_chunk, accumulated) => {
        setAiStreamingText(accumulated);
      },
      onComplete: (fullText, data) => {
        setIsAiLoading(false);
        setAiGeneratedSuccess(true);
        if (data?.exegesis) {
          setAiStreamingText(data.exegesis);
        } else if (fullText) {
          setAiStreamingText(fullText);
        }
      },
      onError: (err) => {
        setIsAiLoading(false);
        setAiError(err || "AI generation could not be completed right now. Please try again.");
      }
    });
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Unpopular Biblical Figure Sanctuary: ${item.name}`}
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        className={`relative w-full bg-slate-900 border border-indigo-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden text-slate-100 transition-all duration-300 ${
          isFullOverlap
            ? "fixed inset-0 rounded-none border-none h-full max-h-screen z-50"
            : "max-w-4xl max-h-[92vh] h-[90vh]"
        }`}
      >
        {/* Modal Header */}
        <div className="relative p-5 sm:p-6 bg-gradient-to-r from-indigo-950/60 via-slate-900 to-amber-950/60 border-b border-indigo-500/20 shrink-0">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-indigo-600/30 border border-indigo-400/40 flex items-center justify-center shrink-0 shadow-inner">
                <Shield className="w-6 h-6 text-indigo-300" />
              </div>

              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-widest bg-indigo-400/20 text-indigo-300 border border-indigo-400/30">
                    Figure #{item.id}
                  </span>
                  <span className="text-xs text-amber-300/90 font-serif italic">
                    {item.personType}
                  </span>
                  {totalCount && (
                    <span className="text-[11px] text-slate-400">
                      ({currentIndex + 1} of {totalCount})
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2.5 mt-0.5">
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-wide truncate">
                    {item.name}
                  </h2>
                  <span className="text-lg sm:text-xl font-serif text-amber-300 font-bold" dir="rtl">
                    {item.originalScript}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-indigo-200/90 font-medium truncate">
                  "{item.meaning}" • <span className="font-mono text-slate-300">{item.transliteration}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={() => setIsFullOverlap(!isFullOverlap)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isFullOverlap ? "bg-indigo-600 text-white" : "bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
                }`}
                title={isFullOverlap ? "Exit Full Page" : "Expand to Full Page"}
                aria-label="Toggle Full Page"
              >
                {isFullOverlap ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
              </button>

              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer shrink-0"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scripture Anchor & Role Bar */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
            <p className="italic text-slate-200 flex items-center gap-1.5 truncate">
              <BookOpen className="w-3.5 h-3.5 text-indigo-400 shrink-0" />
              <span>Scripture: <strong>{item.scriptureReference}</strong> — {item.historicalRole}</span>
            </p>
            <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-indigo-300/90 bg-black/30 px-2.5 py-1 rounded-lg border border-indigo-400/20">
              <Info className="w-3.5 h-3.5" />
              <span>Sanctuary Historical Profile</span>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setActiveTab("revelation")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "revelation"
                  ? "bg-indigo-500 text-white shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Sacred Exposition & Calling
            </button>

            <button
              onClick={() => setActiveTab("vault")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "vault"
                  ? "bg-indigo-500 text-white shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              Scripture Vault ({profile.scriptureVault.length})
            </button>

            <button
              onClick={() => setActiveTab("prayer")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "prayer"
                  ? "bg-indigo-500 text-white shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Prophetic Altar & Apostolic Prayer
            </button>

            <button
              onClick={() => setActiveTab("historian")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "historian"
                  ? "bg-indigo-500 text-white shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Biblical Historian Exegesis
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-950/60">
          {/* TAB 1: SACRED EXPOSITION & CALLING */}
          {activeTab === "revelation" && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Primary Narrative & Theological Exegesis Card */}
              <div className="bg-gradient-to-r from-indigo-950/80 via-slate-900 to-slate-900 border border-indigo-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-indigo-400/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-400/30 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                      Biblical Character & Calling
                    </span>
                    <span className="text-xs text-slate-400 font-serif italic hidden sm:inline">
                      {profile.biblicalEra}
                    </span>
                  </div>

                  {onToggleSpeak && (
                    <button
                      onClick={() =>
                        onToggleSpeak(
                          `${item.name}. Script: ${item.originalScript}. Transliteration: ${item.transliteration}. Meaning: ${item.meaning}. Role: ${item.historicalRole}. ${profile.theologicalExposition}`
                        )
                      }
                      className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSpeaking
                          ? "bg-indigo-500 text-white"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                      title={isSpeaking ? "Mute Voice" : "Listen to Sacred Exposition"}
                    >
                      {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                  {item.name} ({item.originalScript}): {item.meaning}
                </h3>

                <p className="text-xs text-amber-200/90 font-medium">
                  <strong>Sacred Assignment:</strong> {item.personType} — {item.historicalRole}
                </p>

                <div className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif space-y-3 whitespace-pre-line">
                  {profile.theologicalExposition}
                </div>

                <div className="text-xs text-slate-400 pt-3 border-t border-white/10 flex items-start gap-1.5">
                  <Info className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                  <span><strong>Historical Setting:</strong> {profile.historicalAccount}</span>
                </div>
              </div>

              {/* Prophetic Blessing Application Card */}
              <div className="bg-gradient-to-br from-indigo-950/40 via-slate-900 to-amber-950/20 border border-indigo-500/40 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                    <Shield className="w-4 h-4 text-indigo-400" />
                    Prophetic Blessing & Legacy Impartation
                  </span>
                  <button
                    onClick={handleCopyBlessing}
                    className="text-xs text-indigo-300 hover:text-indigo-200 flex items-center gap-1 cursor-pointer font-medium"
                  >
                    {copiedNotification ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                    <span>{copiedNotification ? "Copied!" : "Copy Blessing"}</span>
                  </button>
                </div>

                <blockquote className="text-base sm:text-lg font-serif font-semibold text-amber-100 italic border-l-4 border-indigo-400 pl-4 py-1 leading-relaxed">
                  "{profile.blessingDeclaration}"
                </blockquote>

                <p className="text-xs text-slate-300 pt-2 border-t border-white/10 leading-relaxed">
                  <strong>Practical Application:</strong> {profile.practicalApplication}
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                {onCreateDevotion && (
                  <button
                    onClick={() => {
                      onCreateDevotion(profile.syntheticDevotion);
                      onClose();
                    }}
                    className="p-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Create Devotion
                  </button>
                )}

                {onOpenScripture && (
                  <button
                    onClick={() => {
                      onOpenScripture(item.scriptureReference);
                      onClose();
                    }}
                    className="p-3 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    Read in Bible
                  </button>
                )}

                <button
                  onClick={() => {
                    if (onOpenPictureStudio) {
                      onOpenPictureStudio({
                        reference: item.scriptureReference,
                        text: `"${profile.blessingDeclaration}"`,
                        theme: `${item.name} (${item.originalScript}) — ${item.meaning}`,
                        category: item.category
                      });
                    } else {
                      setPictureDevotion(profile.syntheticDevotion);
                    }
                  }}
                  className="p-3 bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Picture Studio
                </button>

                <button
                  onClick={() => printUnpopularNameDocument(item)}
                  className="p-3 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <Printer className="w-3.5 h-3.5" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: SCRIPTURE VAULT */}
          {activeTab === "vault" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-400" />
                    Scripture Vault for {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Canonical scriptures witnessing the faithful legacy of {item.name}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold">
                  {profile.scriptureVault.length} Scriptures
                </span>
              </div>

              <div className="space-y-3">
                {profile.scriptureVault.map((scrip, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 hover:border-indigo-500/30 transition-all space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                        {scrip.theme}
                      </span>
                      {onOpenScripture && (
                        <button
                          onClick={() => {
                            onOpenScripture(scrip.reference);
                            onClose();
                          }}
                          className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer font-medium"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>{scrip.reference}</span>
                        </button>
                      )}
                    </div>

                    <p className="text-sm font-serif italic text-slate-200">
                      "{scrip.text}"
                    </p>

                    <p className="text-xs text-slate-400 pt-1 border-t border-white/5">
                      <strong>Theological Note:</strong> {scrip.reflection}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: PROPHETIC ALTAR & APOSTOLIC PRAYER */}
          {activeTab === "prayer" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                    <HeartHandshake className="w-4 h-4 text-indigo-400" />
                    Prophetic Altar: {item.name} ({item.originalScript})
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Structured 5-fold prayer of hidden faithfulness, endurance & divine reward
                  </p>
                </div>
                <button
                  onClick={() => {
                    const fullPrayer = `APOSTOLIC PRAYER OF FAITHFULNESS: ${item.name}\n\n` +
                      `✦ ADORATION:\n${profile.apostolicPrayer.adoration}\n\n` +
                      `✦ CONSECRATION:\n${profile.apostolicPrayer.consecrationAndSurrender}\n\n` +
                      `✦ THANKSGIVING:\n${profile.apostolicPrayer.thanksgiving}\n\n` +
                      `✦ PETITION:\n${profile.apostolicPrayer.petition}\n\n` +
                      `✦ WARFARE DECREE:\n${profile.apostolicPrayer.warfareDeclaration}\n\n` +
                      `✦ PROPHETIC SEAL:\n${profile.apostolicPrayer.propheticSeal}`;
                    navigator.clipboard.writeText(fullPrayer);
                    setCopiedNotification(true);
                    setTimeout(() => setCopiedNotification(false), 2000);
                  }}
                  className="px-3 py-1.5 bg-indigo-500/20 hover:bg-indigo-500/30 text-indigo-300 border border-indigo-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                >
                  {copiedNotification ? <Check className="w-3.5 h-3.5" /> : <Share2 className="w-3.5 h-3.5" />}
                  <span>{copiedNotification ? "Copied!" : "Copy Full Prayer"}</span>
                </button>
              </div>

              <div className="space-y-3">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    1. Adoration & Reverence
                  </span>
                  <p className="text-sm font-serif text-slate-200 leading-relaxed">
                    {profile.apostolicPrayer.adoration}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    2. Consecration & Hidden Humility
                  </span>
                  <p className="text-sm font-serif text-slate-200 leading-relaxed">
                    {profile.apostolicPrayer.consecrationAndSurrender}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    3. Covenant Thanksgiving
                  </span>
                  <p className="text-sm font-serif text-slate-200 leading-relaxed">
                    {profile.apostolicPrayer.thanksgiving}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    4. Strategic Petitions for Kingdom Fruitfulness
                  </span>
                  <p className="text-sm font-serif text-slate-200 leading-relaxed">
                    {profile.apostolicPrayer.petition}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-indigo-950/40 via-slate-900 to-amber-950/40 border border-indigo-500/30 space-y-1.5">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5" />
                    5. Spiritual Warfare Authority & Prophetic Seal
                  </span>
                  <p className="text-sm font-serif text-slate-200 leading-relaxed">
                    {profile.apostolicPrayer.warfareDeclaration}
                  </p>
                  <p className="text-xs font-serif font-bold text-amber-300 pt-2 border-t border-white/10">
                    {profile.apostolicPrayer.propheticSeal}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BIBLICAL HISTORIAN EXEGESIS */}
          {activeTab === "historian" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-4 rounded-2xl bg-indigo-950/40 border border-indigo-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h4 className="text-sm font-bold text-indigo-200 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-indigo-400" />
                    Biblical Historian Exegesis: {item.name}
                  </h4>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Historical record, contemporaries, virtues, and live AI deep study
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setFastMode(!fastMode)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors flex items-center gap-1 cursor-pointer ${
                      fastMode
                        ? "bg-indigo-500/20 text-indigo-300 border border-indigo-500/40"
                        : "bg-slate-800 text-slate-400 border border-white/10"
                    }`}
                    title="Toggle Fast / Deep AI Mode"
                  >
                    <Zap className="w-3 h-3" />
                    <span>{fastMode ? "Fast" : "Standard"}</span>
                  </button>

                  <button
                    onClick={handleDeepenHistorianExegesis}
                    disabled={isAiLoading}
                    className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-900/50 text-white rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md shrink-0"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>{isAiLoading ? "Streaming..." : "Deepen with AI"}</span>
                  </button>
                </div>
              </div>

              {/* AI Error Notice with Retry */}
              {aiError && !isAiLoading && (
                <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-200 text-xs flex items-center justify-between gap-3 animate-in fade-in">
                  <div className="space-y-1">
                    <div className="font-bold font-mono uppercase tracking-wider text-red-300">Generation Notice</div>
                    <p className="leading-relaxed">{aiError}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleDeepenHistorianExegesis}
                      className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                    >
                      Retry
                    </button>
                    <button
                      type="button"
                      onClick={() => setAiError(null)}
                      className="text-red-400 hover:text-red-200 font-bold px-1.5 py-0.5 cursor-pointer"
                      title="Dismiss"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}

              {/* Streaming Output Card if AI is active */}
              {(isAiLoading || aiStreamingText) && (
                <div className="p-5 rounded-2xl bg-slate-900 border border-indigo-500/40 shadow-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
                      Dynamic Historian Exegesis
                    </span>
                    {isAiLoading && (
                      <span className="text-[11px] text-amber-300 font-mono animate-pulse">
                        Streaming exegesis...
                      </span>
                    )}
                  </div>
                  <div className="text-sm font-serif text-slate-200 leading-relaxed whitespace-pre-line">
                    {aiStreamingText}
                  </div>
                </div>
              )}

              {/* Core Built-in Exegesis Profile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400">
                    Biblical Era & Setting
                  </span>
                  <p className="text-sm font-serif text-slate-200">
                    {profile.biblicalEra}
                  </p>
                  <p className="text-xs text-slate-400 pt-1 border-t border-white/5">
                    {profile.historicalAccount}
                  </p>
                </div>

                <div className="p-4 rounded-2xl bg-slate-900/90 border border-white/10 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                    Biblical Contemporaries
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.keyFiguresConnected.map((fig, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-lg bg-indigo-500/20 text-indigo-300 text-xs font-medium border border-indigo-500/30"
                      >
                        {fig}
                      </span>
                    ))}
                  </div>
                  <div className="pt-2 border-t border-white/5">
                    <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                      Spiritual Virtues:
                    </span>
                    <p className="text-xs text-amber-200/90 mt-0.5">
                      {profile.spiritualVirtues.join(" • ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer with Previous / Next Navigation */}
        <div className="p-4 bg-slate-900/90 border-t border-white/10 shrink-0 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={onPreviousName}
              disabled={!hasPrevious}
              className="px-3 py-2 bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-slate-300"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            <button
              onClick={onNextName}
              disabled={!hasNext}
              className="px-3 py-2 bg-white/10 hover:bg-white/15 disabled:opacity-30 disabled:pointer-events-none rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 text-slate-300"
            >
              <span>Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {onDownloadDirectImage ? (
              <button
                onClick={() =>
                  onDownloadDirectImage({
                    reference: item.scriptureReference,
                    text: `"${profile.blessingDeclaration}"`,
                    theme: `${item.name} (${item.originalScript}) — ${item.meaning}`,
                    category: item.category
                  })
                }
                className="p-2 sm:px-3 sm:py-2 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Download Verse Picture (PNG)"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PNG Image</span>
              </button>
            ) : (
              <button
                onClick={() => setPictureDevotion(profile.syntheticDevotion)}
                className="p-2 sm:px-3 sm:py-2 bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 border border-emerald-500/40 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                title="Download Verse Picture (PNG)"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">PNG Image</span>
              </button>
            )}

            <button
              onClick={() => printUnpopularNameDocument(item)}
              className="p-2 sm:px-3 sm:py-2 bg-indigo-500 hover:bg-indigo-400 text-white font-extrabold rounded-xl text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print Document</span>
            </button>
          </div>
        </div>
      </div>

      {pictureDevotion && (
        <DevotionPictureModal
          devotion={pictureDevotion}
          isOpen={Boolean(pictureDevotion)}
          onClose={() => setPictureDevotion(null)}
        />
      )}
    </div>
  );
};
