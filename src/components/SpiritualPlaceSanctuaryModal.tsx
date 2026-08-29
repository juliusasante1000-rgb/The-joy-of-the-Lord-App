import React, { useState, useEffect } from "react";
import {
  X,
  Sparkles,
  RefreshCw,
  BookOpen,
  HeartHandshake,
  Bookmark,
  Share2,
  Volume2,
  VolumeX,
  Check,
  Copy,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Flame,
  Shield,
  Layers,
  Info,
  ExternalLink,
  Compass,
  Maximize2,
  Minimize2,
  Image as ImageIcon,
  Download,
  FileText
} from "lucide-react";
import { SpiritualPlace, PlaceScripture, Devotion } from "../types";
import {
  getRandomScriptureForPlace,
  getScripturesForPlace
} from "../data/spiritualPlacesData";
import { DevotionPictureModal } from "./DevotionPictureModal";
import { printScripturalPlaceDocument, downloadScripturalPlaceDocument } from "../utils/devotionDocumentExporter";
import { fetchAiWithRetry, getCachedAiHistory } from "../utils/aiClient";

interface SpiritualPlaceSanctuaryModalProps {
  place: SpiritualPlace | null;
  isOpen: boolean;
  onClose: () => void;
  onNavigateToBibleChapter?: (book: string, chapter: number, verse?: number) => void;
  onOpenDevotion?: (devotion: Devotion) => void;
  onNavigateTab?: (tab: string) => void;
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onSelectNextPlace?: () => void;
  onSelectPrevPlace?: () => void;
  hasNextPlace?: boolean;
  hasPrevPlace?: boolean;
}

export const SpiritualPlaceSanctuaryModal: React.FC<SpiritualPlaceSanctuaryModalProps> = ({
  place,
  isOpen,
  onClose,
  onNavigateToBibleChapter,
  onOpenDevotion,
  onNavigateTab,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onSelectNextPlace,
  onSelectPrevPlace,
  hasNextPlace = false,
  hasPrevPlace = false
}) => {
  const [currentScripture, setCurrentScripture] = useState<PlaceScripture | null>(null);
  const [sessionSeenIds, setSessionSeenIds] = useState<string[]>([]);
  const [isRotating, setIsRotating] = useState(false);
  const [activeTab, setActiveTab] = useState<"sanctuary" | "vault" | "prayer" | "flow">("sanctuary");
  const [copiedScripture, setCopiedScripture] = useState(false);
  const [searchVaultQuery, setSearchVaultQuery] = useState("");
  const [isFullOverlap, setIsFullOverlap] = useState(false);
  const [customPrayerExpanded, setCustomPrayerExpanded] = useState(false);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);

  // Biblical Historian Exegesis State
  const [historyData, setHistoryData] = useState<{
    historicalAccount: string;
    biblicalReference?: string;
    keyFigures?: string[];
    historicalOutcome?: string;
  } | null>(null);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [historyError, setHistoryError] = useState<string | null>(null);

  const getPlaceDevotion = (): Devotion => {
    const scrip = currentScripture || {
      id: "scrip_1",
      reference: place.biblicalReference || "Holy Scripture",
      text: "The Joy of the Lord is your strength.",
      theme: place.themes?.[0] || "Spiritual Atmosphere",
      devotionalReflection: place.description || place.spiritualMeaning,
      guidedPrayerPrompt: `Lord God of ${place.name}, let the divine revelation and grace of this spiritual altar manifest in my life today. In Jesus' Name, Amen.`
    };
    return {
      id: `dev-place-${place.id}-${scrip.id}`,
      edition: "morning",
      editionLabel: `SCRIPTURAL PLACE • ${place.name.toUpperCase()}`,
      title: `${place.name}: ${place.subtitle || scrip.theme}`,
      keyScripture: scrip.reference,
      passageText: scrip.text,
      introMessage: `${place.description}${place.spiritualMeaning ? ` — ${place.spiritualMeaning}` : ""}`,
      reflection: `SACRED EXPOSITION & DEVOTIONAL REFLECTION:\n${scrip.devotionalReflection}${place.historicalContext ? `\n\nBiblical Background: ${place.historicalContext}` : ""}`,
      practicalApplication: `Atmosphere of ${place.name}: Live in ${place.themes?.join(", ") || "divine presence and authority"} today.`,
      guidedPrayer: scrip.guidedPrayerPrompt || `Lord Jesus, let the power and atmosphere of ${place.name} rest upon my soul. Amen.`,
      actionStep: `Spiritual Pillars: ${place.themes?.join(" • ") || place.name}`,
      theme: `${place.name} • ${scrip.theme}`,
      category: "Scriptural Places",
      readTimeMinutes: 4
    };
  };

  // Initialize or update when place changes
  useEffect(() => {
    if (place && isOpen) {
      const initial = getRandomScriptureForPlace(place.id, []);
      setCurrentScripture(initial);
      setSessionSeenIds([initial.id]);
      setActiveTab("sanctuary");
      setCustomPrayerExpanded(false);

      // Load cached history or seed fallback
      const cachedList = getCachedAiHistory(`place_history_${place.id}`);
      if (cachedList && cachedList.length > 0) {
        setHistoryData(cachedList[0]);
      } else {
        setHistoryData(null);
      }
    }
  }, [place, isOpen]);

  const handleFetchPlaceHistory = async () => {
    if (!place) return;
    setIsLoadingHistory(true);
    setHistoryError(null);

    const res = await fetchAiWithRetry<{
      place: string;
      historicalAccount: string;
      biblicalReference?: string;
      keyFigures?: string[];
      historicalOutcome?: string;
    }>(
      "/api/scriptural-place-history",
      {
        placeName: place.name,
        biblicalReference: place.biblicalReference,
        context: place.historicalContext || place.description
      },
      {
        maxRetries: 2,
        retryDelayMs: 2000,
        storageKey: `place_history_${place.id}`
      }
    );

    if (res.success && res.data) {
      setHistoryData(res.data);
    } else {
      setHistoryError(res.error || "Failed to load historical biblical account.");
    }
    setIsLoadingHistory(false);
  };

  if (!isOpen || !place) return null;

  const handleFetchAnotherVerse = () => {
    setIsRotating(true);
    setTimeout(() => {
      const next = getRandomScriptureForPlace(place.id, sessionSeenIds);
      setCurrentScripture(next);
      setSessionSeenIds((prev) => [...prev, next.id]);
      setIsRotating(false);
    }, 200);
  };

  const handleCopy = () => {
    if (!currentScripture) return;
    const textToCopy = `"${currentScripture.text}"\n— ${currentScripture.reference} (${place.name}: ${place.subtitle})\n\nReflection: ${currentScripture.devotionalReflection}`;
    navigator.clipboard.writeText(textToCopy);
    setCopiedScripture(true);
    setTimeout(() => setCopiedScripture(false), 2000);
  };

  const handleReadChapter = () => {
    if (!currentScripture || !onNavigateToBibleChapter) return;
    onClose();
    onNavigateToBibleChapter(
      currentScripture.book,
      currentScripture.chapter,
      currentScripture.verse
    );
  };

  const handleCreateDevotion = () => {
    if (!currentScripture) return;
    onClose();
    if (onOpenDevotion) {
      const syntheticDevotion: Devotion = {
        id: `dev-place-${place.id}-${Date.now()}`,
        edition: "morning",
        editionLabel: `Spiritual Place: ${place.name}`,
        title: `${place.name}: ${currentScripture.theme}`,
        keyScripture: currentScripture.reference,
        passageText: currentScripture.text,
        reflection: currentScripture.devotionalReflection,
        practicalApplication: `Walk in the spiritual atmosphere of ${place.name} today. Let God's promise in ${currentScripture.reference} anchor your faith through every circumstance.`,
        guidedPrayer: currentScripture.guidedPrayerPrompt || `Lord, let the revelation of ${place.name} and ${currentScripture.reference} transform my journey today. In Jesus' Name, Amen.`,
        actionStep: `Memorize and meditate on ${currentScripture.reference} throughout this day.`,
        theme: currentScripture.theme,
        category: place.name,
        readTimeMinutes: 4
      };
      onOpenDevotion(syntheticDevotion);
    } else if (onNavigateTab) {
      onNavigateTab("home");
    }
  };

  const allPlaceScriptures = getScripturesForPlace(place.id);
  const filteredVaultScriptures = allPlaceScriptures.filter(
    (s) =>
      s.reference.toLowerCase().includes(searchVaultQuery.toLowerCase()) ||
      s.text.toLowerCase().includes(searchVaultQuery.toLowerCase()) ||
      s.theme.toLowerCase().includes(searchVaultQuery.toLowerCase())
  );

  return (
    <div
      id="spiritual-place-modal"
      className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-200 ${
        isFullOverlap
          ? "p-0 bg-slate-950/98 backdrop-blur-lg"
          : "p-3 sm:p-5 bg-black/80 backdrop-blur-md"
      } animate-in fade-in`}
    >
      <div
        className={`bg-slate-900 text-slate-100 flex flex-col overflow-hidden transition-all duration-200 ${
          isFullOverlap
            ? "w-screen h-screen max-w-none max-h-none rounded-none border-0"
            : "w-full max-w-4xl max-h-[92vh] rounded-3xl shadow-2xl border border-amber-500/30"
        }`}
      >
        {/* Header with Place Gradient */}
        <div
          className={`p-4 sm:p-6 bg-gradient-to-r ${
            place.colorGradient || "from-indigo-950 via-slate-900 to-[#16235A]"
          } border-b border-white/10 relative overflow-hidden`}
        >
          {/* Subtle Ambient Background glow */}
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-amber-400/10 blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between gap-4 relative z-10">
            <div className="flex items-start gap-3.5 min-w-0">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-2xl sm:text-3xl shadow-inner shrink-0">
                {place.icon}
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[11px] font-bold tracking-wider uppercase border border-amber-400/30">
                    {place.badgeText || "Spiritual Sanctuary"}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-400/20 text-blue-300 text-[11px] font-medium border border-blue-400/30">
                    {place.scriptureCountDisplay}
                  </span>
                  <span className="text-xs text-slate-300 font-serif italic hidden sm:inline">
                    Anchor: {place.biblicalReference}
                  </span>
                </div>
                <h2 className="text-xl sm:text-3xl font-serif font-bold text-white tracking-tight truncate">
                  {place.name}
                </h2>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium truncate">
                  {place.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              {/* Full page overlap toggle */}
              <button
                onClick={() => setIsFullOverlap(!isFullOverlap)}
                className={`p-2 rounded-xl transition-colors cursor-pointer ${
                  isFullOverlap ? "bg-amber-600 text-white" : "bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white"
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

          {/* Meaning & Theological Distinction Guard */}
          <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-300">
            <p className="italic text-slate-200">
              "{place.spiritualMeaning}"
            </p>
            <div className="flex items-center gap-1.5 shrink-0 text-[11px] text-amber-300/80 bg-black/30 px-2.5 py-1 rounded-lg border border-amber-400/20">
              <Info className="w-3.5 h-3.5" />
              <span>Devotional Biblical Reflection</span>
            </div>
          </div>

          {/* Sanctuary Navigation Tabs */}
          <div className="mt-4 flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
            <button
              onClick={() => setActiveTab("sanctuary")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "sanctuary"
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Today's Word of Revelation
            </button>

            <button
              onClick={() => setActiveTab("vault")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "vault"
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Place Scripture Vault ({allPlaceScriptures.length}+)
            </button>

            <button
              onClick={() => setActiveTab("prayer")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "prayer"
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <HeartHandshake className="w-3.5 h-3.5" />
              Sanctuary Prayer
            </button>

            <button
              onClick={() => setActiveTab("flow")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === "flow"
                  ? "bg-amber-500 text-slate-950 shadow-md font-extrabold"
                  : "bg-white/10 text-slate-300 hover:bg-white/15"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              Pillars Flow
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-slate-950/60">
          {activeTab === "sanctuary" && currentScripture && (
            <div className="space-y-5 animate-in fade-in duration-150">
              {/* Complete Sanctuary Theme Word & Narrative Message */}
              <div className="bg-gradient-to-r from-[#16235A]/80 via-slate-900 to-indigo-950/80 border border-amber-500/30 rounded-2xl p-5 sm:p-6 shadow-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold uppercase tracking-wider border border-amber-400/30 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      Theme Word & Narrative: {place.name}
                    </span>
                    <span className="text-xs text-slate-400 font-serif italic hidden sm:inline">
                      {place.biblicalReference}
                    </span>
                  </div>

                  <button
                    onClick={() =>
                      onToggleSpeak(
                        `${place.name}. ${place.subtitle}. ${place.description}. Spiritual Meaning: ${place.spiritualMeaning}`
                      )
                    }
                    className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      isSpeaking
                        ? "bg-amber-500 text-slate-950"
                        : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                    }`}
                    title={isSpeaking ? "Mute Voice" : "Listen to Sanctuary Narrative"}
                  >
                    {isSpeaking ? (
                      <VolumeX className="w-4 h-4" />
                    ) : (
                      <Volume2 className="w-4 h-4" />
                    )}
                  </button>
                </div>

                <h3 className="text-base sm:text-lg font-serif font-bold text-amber-300">
                  {place.subtitle}
                </h3>

                <p className="text-sm sm:text-base text-slate-200 leading-relaxed font-serif">
                  {place.description}
                </p>

                {place.historicalContext && (
                  <div className="text-xs text-slate-400 pt-2 border-t border-white/10 flex items-start gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                    <span><strong>Biblical Setting:</strong> {place.historicalContext}</span>
                  </div>
                )}
              </div>

              {/* Dedicated Biblical Historian Record Card */}
              <div className="bg-slate-900/90 border border-indigo-500/30 rounded-2xl p-5 shadow-lg space-y-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-amber-400" />
                    <h4 className="text-sm font-bold text-amber-300 uppercase tracking-wider">
                      Biblical Historical Record ({place.name})
                    </h4>
                  </div>
                  <button
                    onClick={handleFetchPlaceHistory}
                    disabled={isLoadingHistory}
                    className="px-2.5 py-1 rounded-lg bg-indigo-900/50 hover:bg-indigo-800/60 border border-indigo-400/30 text-indigo-200 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer disabled:opacity-50"
                    title="Generate live factual biblical exegesis without motivational filler"
                  >
                    <Sparkles className={`w-3.5 h-3.5 text-indigo-300 ${isLoadingHistory ? "animate-spin" : ""}`} />
                    <span>{isLoadingHistory ? "Historian Analyzing..." : "Live Historian Exegesis"}</span>
                  </button>
                </div>

                {historyError && (
                  <div className="p-2.5 rounded-lg bg-red-950/50 border border-red-500/40 text-xs text-red-200">
                    {historyError}
                  </div>
                )}

                <div className="text-sm text-slate-200 leading-relaxed space-y-2">
                  {historyData ? (
                    <>
                      <p className="font-serif">{historyData.historicalAccount}</p>
                      {historyData.historicalOutcome && (
                        <p className="text-xs text-emerald-300 pt-1 border-t border-white/10 font-medium">
                          <strong>Biblical Outcome:</strong> {historyData.historicalOutcome}
                        </p>
                      )}
                      {historyData.keyFigures && historyData.keyFigures.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {historyData.keyFigures.map((fig, idx) => (
                            <span key={idx} className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px] border border-slate-700">
                              {fig}
                            </span>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="font-serif text-slate-300">
                      {place.historicalContext || `At ${place.name}, significant biblical events transpired according to Scripture (${place.biblicalReference}).`}
                    </p>
                  )}
                </div>
              </div>

              {/* Scripture Display Card */}
              <div className="bg-slate-900/90 border-2 border-amber-500/40 rounded-2xl p-5 sm:p-6 shadow-xl relative">
                <div className="flex items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-lg bg-amber-500/20 text-amber-300 text-xs font-bold border border-amber-500/30">
                      {currentScripture.theme}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300 text-[11px]">
                      {currentScripture.testament}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        onToggleSpeak(
                          `${currentScripture.reference}. ${currentScripture.text}. Reflection: ${currentScripture.devotionalReflection}`
                        )
                      }
                      className={`p-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                        isSpeaking
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                      title={isSpeaking ? "Mute Voice" : "Voice Recite"}
                    >
                      {isSpeaking ? (
                        <VolumeX className="w-4 h-4" />
                      ) : (
                        <Volume2 className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={handleCopy}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs transition-colors cursor-pointer"
                      title="Copy Scripture & Reflection"
                    >
                      {copiedScripture ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() =>
                        onToggleBookmark({
                          id: currentScripture.id,
                          type: "scripture",
                          title: `${place.name}: ${currentScripture.reference}`,
                          subtitle: currentScripture.theme,
                          text: currentScripture.text,
                          reference: currentScripture.reference
                        })
                      }
                      className={`p-2 rounded-lg text-xs transition-colors cursor-pointer ${
                        isBookmarked(currentScripture.id, "scripture")
                          ? "bg-amber-500 text-slate-950"
                          : "bg-slate-800 hover:bg-slate-700 text-slate-200"
                      }`}
                      title="Save Bookmark"
                    >
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* The Scripture Text */}
                <blockquote className="text-lg sm:text-xl md:text-2xl font-serif text-slate-100 leading-relaxed italic border-l-4 border-amber-400 pl-4 py-1">
                  "{currentScripture.text}"
                </blockquote>

                <div className="mt-4 flex items-center justify-between text-right">
                  <span className="text-xs text-slate-400">
                    Relevance Alignment:{" "}
                    <strong className="text-amber-300">
                      {currentScripture.relevanceScore}%
                    </strong>
                  </span>
                  <p className="text-base sm:text-lg font-serif font-bold text-amber-400">
                    — {currentScripture.reference}
                  </p>
                </div>
              </div>

              {/* Devotional Reflection Card */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-2">
                <div className="flex items-center gap-2 text-amber-300 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <h4>Spiritual Reflection for {place.name}</h4>
                </div>
                <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                  {currentScripture.devotionalReflection}
                </p>
              </div>

              {/* Guided Prayer Box */}
              {currentScripture.guidedPrayerPrompt && (
                <div className="bg-gradient-to-r from-purple-950/40 to-indigo-950/40 border border-purple-500/30 rounded-2xl p-4 sm:p-5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-purple-300 font-bold text-sm">
                      <HeartHandshake className="w-4 h-4" />
                      <h4>Guided Sanctuary Prayer</h4>
                    </div>
                    <button
                      onClick={() =>
                        onToggleSpeak(currentScripture.guidedPrayerPrompt || "")
                      }
                      className="text-xs text-purple-300 hover:text-purple-100 flex items-center gap-1 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Listen
                    </button>
                  </div>
                  <p className="text-sm text-purple-100 italic leading-relaxed">
                    "{currentScripture.guidedPrayerPrompt}"
                  </p>
                </div>
              )}

              {/* Primary Interactive Action Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-2">
                <button
                  onClick={handleFetchAnotherVerse}
                  disabled={isRotating}
                  className="px-3 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 shadow-lg transition-all cursor-pointer"
                >
                  <RefreshCw
                    className={`w-4 h-4 ${isRotating ? "animate-spin" : ""}`}
                  />
                  <span>Another Verse</span>
                </button>

                <button
                  onClick={() => setPictureDevotion(getPlaceDevotion())}
                  className="px-3 py-2.5 rounded-xl bg-amber-600/90 hover:bg-amber-500 active:scale-95 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-amber-400/40 transition-all cursor-pointer shadow-md"
                  title="Download Picture Image"
                >
                  <ImageIcon className="w-4 h-4 text-amber-300" />
                  <span>Download Picture</span>
                </button>

                <button
                  onClick={() => printScripturalPlaceDocument(place, currentScripture || undefined)}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                  title="Download / Print 1-Page Document with Theme Narrative"
                >
                  <FileText className="w-4 h-4 text-amber-400" />
                  <span>1-Page PDF</span>
                </button>

                <button
                  onClick={handleReadChapter}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                >
                  <BookOpen className="w-4 h-4 text-blue-400" />
                  <span>Read Chapter</span>
                </button>

                <button
                  onClick={handleCreateDevotion}
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-purple-400" />
                  <span>Devotion Flow</span>
                </button>

                <button
                  onClick={() =>
                    onShareItem(
                      `${place.name} — Word for Your Journey`,
                      `"${currentScripture.text}"\n— ${currentScripture.reference}\n\nTheme: ${place.description}\n\nReflection: ${currentScripture.devotionalReflection}`,
                      currentScripture.reference,
                      place.spiritualMeaning
                    )
                  }
                  className="px-3 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-white font-medium text-xs sm:text-sm flex items-center justify-center gap-1.5 border border-slate-700 transition-all cursor-pointer"
                >
                  <Share2 className="w-4 h-4 text-emerald-400" />
                  <span>Share Word</span>
                </button>
              </div>
            </div>
          )}

          {/* Place Scripture Vault Tab */}
          {activeTab === "vault" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-3 bg-slate-900 p-3 rounded-xl border border-slate-800">
                <input
                  type="text"
                  placeholder={`Search ${place.name} scriptures by keyword or book...`}
                  value={searchVaultQuery}
                  onChange={(e) => setSearchVaultQuery(e.target.value)}
                  className="bg-transparent border-none outline-hidden text-sm text-slate-100 placeholder:text-slate-500 w-full"
                />
                <span className="text-xs text-slate-400 shrink-0">
                  {filteredVaultScriptures.length} matching
                </span>
              </div>

              <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-1">
                {filteredVaultScriptures.map((sc, i) => (
                  <div
                    key={sc.id || i}
                    onClick={() => {
                      setCurrentScripture(sc);
                      setActiveTab("sanctuary");
                    }}
                    className="p-4 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-400/40 transition-all cursor-pointer space-y-1.5 group"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-serif font-bold text-amber-300">
                        {sc.reference}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 group-hover:text-amber-200">
                        {sc.theme}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-2 italic">
                      "{sc.text}"
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-400">
                      <span>{sc.testament}</span>
                      <span className="text-amber-400 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        Select this verse <ChevronRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Place Guided Prayer Tab */}
          {activeTab === "prayer" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="p-5 rounded-2xl bg-gradient-to-br from-indigo-950/70 via-slate-900 to-purple-950/70 border border-indigo-500/30 space-y-4">
                <div className="flex items-center gap-2 text-amber-300 font-serif text-lg font-bold">
                  <HeartHandshake className="w-5 h-5 text-purple-400" />
                  <h3>Consecration Prayer for {place.name}</h3>
                </div>

                <div className="text-sm text-slate-200 space-y-3 font-serif leading-relaxed italic">
                  <p>
                    "Heavenly Father, I enter the spiritual sanctuary of{" "}
                    <strong>{place.name}</strong> today. I come before Your presence
                    seeking {place.themes.slice(0, 3).join(", ")}, trusting in Your
                    unfailing covenant."
                  </p>
                  <p>
                    "Where I am weak, sustain me. Where I am hurried, teach me holy
                    rest. Where I am in warfare, release Your breakthrough fire. Let
                    the living truth of {place.biblicalReference} become real in my
                    experience."
                  </p>
                  <p>
                    "In the precious Name of our Lord Jesus Christ, Amen."
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <button
                    onClick={() =>
                      onToggleSpeak(
                        `Consecration Prayer for ${place.name}. Heavenly Father, I enter the spiritual sanctuary of ${place.name} today. I come before Your presence seeking ${place.themes.slice(0, 3).join(", ")}, trusting in Your unfailing covenant. In Jesus Name, Amen.`
                      )
                    }
                    className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Pray Aloud with Voice</span>
                  </button>

                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(
                        `Consecration Prayer for ${place.name}\n\nHeavenly Father, I enter the spiritual sanctuary of ${place.name} today. I come before Your presence seeking ${place.themes.slice(0, 3).join(", ")}, trusting in Your unfailing covenant.\n\nIn the precious Name of Jesus Christ, Amen.`
                      );
                      setCopiedScripture(true);
                      setTimeout(() => setCopiedScripture(false), 2000);
                    }}
                    className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium flex items-center gap-2 cursor-pointer transition-colors"
                  >
                    {copiedScripture ? (
                      <Check className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                    <span>Copy Prayer</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Flow into Four Signature Pillars Tab */}
          {activeTab === "flow" && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="text-xs text-slate-400 pb-1">
                Flow this Scripture from <strong>{place.name}</strong> into the core
                pillars of the application:
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateTab) onNavigateTab("rhema");
                  }}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-500/40 text-left transition-all cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-400" />
                      Rhema Prophetic Word
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Prophetic declarations and now-word activations matching this season.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateTab) onNavigateTab("joy_overcoming");
                  }}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-500/40 text-left transition-all cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <HeartHandshake className="w-4 h-4 text-rose-400" />
                      The Joy of the Lord
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Overcoming blueprints, joy strategies, and fortress declarations.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateTab) onNavigateTab("mathema_sermons");
                  }}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-500/40 text-left transition-all cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <BookOpen className="w-4 h-4 text-blue-400" />
                      MathemaSermon
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Full homiletic manuscripts, exegesis, and pulpit illustrations.
                  </p>
                </button>

                <button
                  onClick={() => {
                    onClose();
                    if (onNavigateTab) onNavigateTab("apostle_math");
                  }}
                  className="p-4 rounded-xl bg-slate-900 hover:bg-indigo-950 border border-slate-800 hover:border-indigo-500/40 text-left transition-all cursor-pointer group space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-amber-300 flex items-center gap-1.5">
                      <Layers className="w-4 h-4 text-purple-400" />
                      ApostleMath
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-500 group-hover:translate-x-1 transition-transform" />
                  </div>
                  <p className="text-xs text-slate-300">
                    Mathematical theological models, LaTeX proofs, and divine equations.
                  </p>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 bg-slate-900 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Themes:</span>
            <div className="flex flex-wrap gap-1">
              {place.themes.slice(0, 4).map((t, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 rounded-md bg-slate-800 text-amber-200/80 text-[11px]"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 ml-auto">
            {(onSelectPrevPlace || onSelectNextPlace) && (
              <div className="flex items-center gap-1.5">
                {onSelectPrevPlace && (
                  <button
                    onClick={onSelectPrevPlace}
                    disabled={!hasPrevPlace}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      hasPrevPlace
                        ? "bg-white/10 hover:bg-white/20 text-white"
                        : "opacity-40 cursor-not-allowed bg-white/5 text-slate-500"
                    }`}
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Prev Place</span>
                  </button>
                )}
                {onSelectNextPlace && (
                  <button
                    onClick={onSelectNextPlace}
                    disabled={!hasNextPlace}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                      hasNextPlace
                        ? "bg-amber-600 hover:bg-amber-500 text-white"
                        : "opacity-40 cursor-not-allowed bg-white/5 text-slate-500"
                    }`}
                  >
                    <span>Next Place</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            <button
              onClick={onClose}
              className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold cursor-pointer transition-colors border border-white/10"
            >
              Done & Close
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
