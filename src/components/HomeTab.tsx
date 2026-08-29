import React, { useState } from "react";
import {
  Sunrise,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  Sparkles,
  HeartHandshake,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  Clock,
  RefreshCw,
  Send,
  HelpCircle,
  Copy,
  Check,
  Quote,
  GraduationCap,
  Calculator,
  Compass,
  Calendar,
  Layers,
  Flame,
  ArrowRight,
  Lightbulb,
  ExternalLink,
  ChevronDown,
  Printer,
  FileDown,
  Image as ImageIcon,
  Palette,
  AlertCircle,
  Music,
  Mic,
  Zap,
  User
} from "lucide-react";
import { TimeScheduleState, DailyScripture, Devotion, DevotionEdition, CreatorProfile, SpiritualPlace } from "../types";
import { downloadDevotionDocument, printDevotionOnePageDocument } from "../utils/devotionDocumentExporter";
import { DevotionPictureModal } from "./DevotionPictureModal";
import { PERSONAL_QUOTES } from "../data/quotesData";
import { ScheduledVerse, getPreviousVersesHistory } from "../data/dailyVerseData";
import { NavTab } from "./BottomNav";
import { AppLogo } from "./AppLogo";
import { CreatorCard } from "./CreatorCard";
import { SpiritualPlacesSection } from "./SpiritualPlacesSection";
import { fetchAiWithRetry } from "../utils/aiClient";
import { streamAiContent, getIsFastMode, setIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";
import { SpiritualPlaceSanctuaryModal } from "./SpiritualPlaceSanctuaryModal";
import { GodsGeneralsQuotesCard } from "./GodsGeneralsQuotesCard";
import { MathView, RichMathContent } from "./MathView";
import { QuotePictureItem } from "./QuotePictureModal";

interface HomeTabProps {
  scheduleState: TimeScheduleState;
  dailyScripture: DailyScripture;
  scheduledVerse: ScheduledVerse;
  devotion: Devotion;
  onOpenDevotion: (devotion: Devotion) => void;
  onSelectEditionPreview: (edition: DevotionEdition) => void;
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  completedDevotions: string[];
  onCompleteDevotion: (id: string) => void;
  onNavigateTab?: (tab: NavTab) => void;
  onNavigateToBibleChapter?: (book: string, chapter: number, verse?: number) => void;
  profile: CreatorProfile;
  onOpenAbout: () => void;
  onOpenQuotePictureModal?: (item: QuotePictureItem) => void;
}

export const HomeTab: React.FC<HomeTabProps> = ({
  scheduleState,
  dailyScripture,
  scheduledVerse,
  devotion,
  onOpenDevotion,
  onSelectEditionPreview,
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  completedDevotions,
  onCompleteDevotion,
  onNavigateTab,
  onNavigateToBibleChapter,
  profile,
  onOpenAbout,
  onOpenQuotePictureModal
}) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const [showVersePrayer, setShowVersePrayer] = useState(false);
  const [showVerseHistory, setShowVerseHistory] = useState(false);
  const [copiedVerse, setCopiedVerse] = useState(false);
  const [copiedScheduledVerse, setCopiedScheduledVerse] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Selected Daily Verse (defaults to today's active verse)
  const [activeDisplayVerse, setActiveDisplayVerse] = useState<ScheduledVerse>(scheduledVerse);

  // AI Verse Generator Modal / Output State
  const [aiActionType, setAiActionType] = useState<string | null>(null);
  const [aiActionData, setAiActionData] = useState<any | null>(null);
  const [aiActionResult, setAiActionResult] = useState<string | null>(null);
  const [aiActionError, setAiActionError] = useState<string | null>(null);
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [copiedAiResult, setCopiedAiResult] = useState(false);
  const [streamingAiText, setStreamingAiText] = useState("");
  const [streamingProgress, setStreamingProgress] = useState(20);
  const [isFastModeActive, setIsFastModeActive] = useState(() => getIsFastMode());

  // Daily Quote feature state
  const [featuredQuoteIndex, setFeaturedQuoteIndex] = useState(0);
  const currentQuote = PERSONAL_QUOTES[featuredQuoteIndex % PERSONAL_QUOTES.length];

  // Custom AI Devotion Topic Generator State
  const [customTopic, setCustomTopic] = useState("");

  // Spiritual Places Sanctuary Selection State
  const [selectedSpiritualPlace, setSelectedSpiritualPlace] = useState<SpiritualPlace | null>(null);
  const [showDevotionPictureModal, setShowDevotionPictureModal] = useState(false);

  const { activeEdition, activeBadge, nextTransitionText } = scheduleState;
  const isDevotionDone = completedDevotions.includes(devotion.id);

  // Previous verses archive
  const previousVersesList = getPreviousVersesHistory(7);

  const handleCopyScheduledVerse = async () => {
    const text = `"${activeDisplayVerse.text}" — ${activeDisplayVerse.reference} (${activeDisplayVerse.version})\n\nDaily Reflection: ${activeDisplayVerse.reflection}\n\n— The Joy of the Lord | Verse of the Day`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedScheduledVerse(true);
      setTimeout(() => setCopiedScheduledVerse(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyAiResult = async () => {
    let fullText = "";
    if (aiActionData) {
      if (aiActionType === "Create Prayer" || aiActionType === "prayer") {
        fullText = `${aiActionData.title || "Prayer"}\nScripture: ${aiActionData.scriptureAnchor || activeDisplayVerse.reference}\n\nADORATION:\n${aiActionData.adoration || ""}\n\nCONFESSION & SURRENDER:\n${aiActionData.confession || ""}\n\nTHANKSGIVING:\n${aiActionData.thanksgiving || ""}\n\nPETITION:\n${aiActionData.petition || ""}\n\nWARFARE DECLARATION:\n${aiActionData.warfareDeclaration || ""}\n\n${aiActionData.closing || "In Jesus' Name, Amen."}`;
      } else if (aiActionType === "Prayer Points" || aiActionType === "Create Prayer Points" || aiActionType === "prayer_points") {
        const points = (aiActionData.prayerPoints || []).map((p: any) => `${p.pointNumber}. ${p.focus}\nPromise: ${p.scripturePromise}\nDeclaration: ${p.prayerDeclaration}`).join("\n\n");
        fullText = `${aiActionData.title || "Prayer Points"}\nScripture: ${aiActionData.scriptureAnchor || activeDisplayVerse.reference}\n\n${aiActionData.introduction || ""}\n\n${points}\n\nPROPHETIC DECREE:\n${aiActionData.propheticDecree || ""}`;
      } else if (aiActionType === "Explain Verse" || aiActionType === "Explain This Verse" || aiActionType === "explain") {
        const refs = (aiActionData.crossReferences || []).map((r: any) => `• ${r.reference}: ${r.connection}`).join("\n");
        fullText = `${aiActionData.title || "Deep Expository Analysis"}\nScripture: ${aiActionData.scriptureAnchor || activeDisplayVerse.reference}\n\nCONTEXT:\n${aiActionData.historicalContext || ""}\n\nORIGINAL LANGUAGE:\n${aiActionData.originalLanguageInsight || ""}\n\nDOCTRINAL MEANING:\n${aiActionData.doctrinalMeaning || ""}\n\nCROSS REFERENCES:\n${refs}\n\nLIFE TRANSFORMATION:\n${aiActionData.lifeTransformation || ""}`;
      } else if (aiActionType === "MathemaSermon" || aiActionType === "mathemasermon") {
        fullText = `${aiActionData.title || "MathemaSermon"}\nConcept: ${aiActionData.mathematicalConcept || ""}\nFormula: ${aiActionData.formula || ""}\nScripture: ${aiActionData.scriptureAnchor || activeDisplayVerse.reference}\n\nANALOGY:\n${aiActionData.mathematicalAnalogy || ""}\n\nHOMILETIC REVELATION:\n${aiActionData.homileticApplication || ""}\n\nALTAR CALL:\n${aiActionData.altarCallPrayer || ""}`;
      } else {
        fullText = `${aiActionData.title || "Devotion"}\nKey Scripture: ${aiActionData.keyScripture || activeDisplayVerse.reference}\n\n${aiActionData.reflection || ""}\n\nPractical Application: ${aiActionData.practicalApplication || ""}\n\nGuided Prayer: ${aiActionData.guidedPrayer || ""}\n\nAction Step: ${aiActionData.actionStep || ""}`;
      }
    } else {
      fullText = aiActionResult || "";
    }

    try {
      await navigator.clipboard.writeText(fullText);
      setCopiedAiResult(true);
      setTimeout(() => setCopiedAiResult(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleCopyQuote = async () => {
    const text = `"${currentQuote.quote}"\n— Principle: ${currentQuote.keyPrinciple || currentQuote.category}\nScriptural Anchor: ${currentQuote.biblicalAnchor || "Nehemiah 8:10"}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedQuote(true);
      setTimeout(() => setCopiedQuote(false), 2000);
    } catch {
      // ignore
    }
  };

  const handleNextQuote = () => {
    setFeaturedQuoteIndex((prev) => (prev + 1) % PERSONAL_QUOTES.length);
  };

  const handleGenerateVerseAiAction = async (action: string) => {
    console.log("Calling AI for Verse Action:", action);
    // 1. Clear previous state
    setAiActionType(action);
    setAiActionData(null);
    setAiActionResult(null);
    setAiActionError(null);
    setStreamingAiText("");
    setStreamingProgress(15);
    setIsGeneratingAi(true);

    try {
      const res = await streamAiContent<any>({
        actionType: action,
        scriptureReference: activeDisplayVerse.reference,
        scriptureText: activeDisplayVerse.text,
        scriptureTheme: activeDisplayVerse.theme || "Faith & Divine Joy",
        fastMode: getIsFastMode(),
        storageKey: `ai_verse_action_${activeDisplayVerse.id || "today"}_${action}`,
        onProgress: (prog) => {
          setStreamingProgress(prog);
        },
        onChunk: (chunk, accText, partial) => {
          setStreamingAiText(accText);
          if (partial) {
            setAiActionData(partial);
          }
        },
        onComplete: (fullText, data) => {
          setStreamingProgress(100);
          const inner = data || {};
          setAiActionData(inner);

          if (action === "Create Prayer" || action === "prayer") {
            setAiActionResult(
              `${inner.title || "Prayer of Faith"}\n\n${inner.adoration || ""}\n\n${inner.petition || ""}\n\n${inner.warfareDeclaration || ""}\n\n${inner.closing || "In Jesus' Name, Amen."}`
            );
          } else if (action === "Prayer Points" || action === "Create Prayer Points" || action === "prayer_points") {
            setAiActionResult(
              `${inner.title || "Strategic Prayer Points"}\n\n${(inner.prayerPoints || []).map((p: any) => `${p.pointNumber || ""}. ${p.focus || ""}: ${p.prayerDeclaration || ""}`).join("\n\n")}\n\n${inner.propheticDecree || ""}`
            );
          } else if (action === "Explain Verse" || action === "Explain This Verse" || action === "explain") {
            setAiActionResult(
              `${inner.title || "Exposition"}\n\n${inner.historicalContext || ""}\n\n${inner.originalLanguageInsight || ""}\n\n${inner.doctrinalMeaning || ""}\n\n${inner.lifeTransformation || ""}`
            );
          } else if (action === "MathemaSermon" || action === "mathemasermon") {
            setAiActionResult(
              `${inner.title || "MathemaSermon"}\nConcept: ${inner.mathematicalConcept || ""}\nFormula: ${inner.formula || ""}\n\n${inner.mathematicalAnalogy || ""}\n\n${inner.homileticApplication || ""}\n\n${inner.altarCallPrayer || ""}`
            );
          } else {
            setAiActionResult(
              `${inner.title || "Devotion"}\n\n${inner.reflection || ""}\n\nPractical Application: ${inner.practicalApplication || ""}\n\nPrayer: ${inner.guidedPrayer || ""}`
            );
          }
          setIsGeneratingAi(false);
        },
        onError: (err) => {
          setAiActionError(err);
          setIsGeneratingAi(false);
        }
      });

      if (!res.success) {
        setAiActionError(res.error || "Generation failed. Please try again.");
      }
    } catch (err: any) {
      console.error("AI Generation Exception:", err);
      setAiActionError(err?.message || "Generation failed. Please check your connection and try again.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  const handleGenerateAiDevotion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTopic.trim() && !isGeneratingAi) return;

    console.log("Calling AI for Custom Devotion:", customTopic);
    setIsGeneratingAi(true);
    setAiActionError(null);
    setStreamingAiText("");
    setStreamingProgress(20);

    try {
      const res = await streamAiContent<any>({
        topic: customTopic.trim() || "The Joy and Peace of the Lord",
        fastMode: getIsFastMode(),
        storageKey: "ai_custom_devotions_history",
        onProgress: (prog) => {
          setStreamingProgress(prog);
        },
        onChunk: (chunk, accText) => {
          setStreamingAiText(accText);
        },
        onComplete: (fullText, data) => {
          const dev = data?.devotion || data || {};
          onOpenDevotion({
            id: `ai-${Date.now()}`,
            edition: activeEdition,
            editionLabel: `Special AI ${activeBadge.label}`,
            title: dev.title || customTopic,
            keyScripture: dev.keyScripture || "Nehemiah 8:10",
            passageText: dev.passageText || "The joy of the LORD is your strength.",
            reflection: dev.reflection || fullText || "Meditate on the unshakeable peace of Christ.",
            practicalApplication: dev.practicalApplication || "Walk in joyful obedience.",
            guidedPrayer: dev.guidedPrayer || "Lord, let Your joy overflow in my heart.",
            actionStep: dev.actionStep || "Share God's love with someone today.",
            theme: customTopic || "Spiritual Renewal",
            category: "AI Pastoral Guidance",
            readTimeMinutes: 5
          });
          setCustomTopic("");
          setIsGeneratingAi(false);
        },
        onError: (err) => {
          setAiActionError(err);
          setIsGeneratingAi(false);
        }
      });

      if (!res.success) {
        setAiActionError(res.error || "Failed to generate devotion");
      }
    } catch (err: any) {
      console.error("AI Devotion Exception:", err);
      setAiActionError(err?.message || "Generation failed. Please check your connection and try again.");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-200">
      {/* Official Personal Brand Emblem Banner */}
      <AppLogo variant="full-banner" className="mb-2 shadow-lg" />

      {/* ======================================================== */}
      {/* 1. PROMINENT SECTION: VERSE OF THE DAY                   */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-[#16235A] via-[#1A2861] to-[#0F172A] text-white shadow-xl border border-[#B48C35]/30 ring-1 ring-white/10 relative overflow-hidden space-y-5">
        <div className="absolute top-0 right-0 w-72 h-72 bg-[#B48C35]/10 rounded-full pointer-events-none -mr-16 -mt-16" />

        {/* Eyebrow & Midnight Rollover Notice */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3 relative z-10">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#B48C35] text-white">
              <BookOpen className="w-4 h-4" />
            </span>
            <h2 className="text-xs sm:text-sm font-mono font-bold uppercase tracking-widest text-[#DCC398]">
              VERSE OF THE DAY
            </h2>
            <span className="text-xs text-slate-300">
              • {activeDisplayVerse.theme}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] font-mono text-emerald-300 bg-white/10 px-2.5 py-1 rounded-full border border-white/10">
            <Clock className="w-3.5 h-3.5" />
            <span>Automatic Midnight Rollover (12:00 AM)</span>
          </div>
        </div>

        {/* Primary Scripture Text */}
        <div className="space-y-2.5 relative z-10">
          <blockquote className="text-2xl sm:text-3xl md:text-4xl font-serif leading-tight text-white italic">
            "{activeDisplayVerse.text}"
          </blockquote>

          <div className="flex items-center justify-between pt-1">
            <p className="text-sm sm:text-base uppercase tracking-widest font-bold text-[#DCC398] font-mono flex items-center gap-1.5">
              <span>{activeDisplayVerse.reference}</span>
              <span className="text-xs opacity-75 font-normal">({activeDisplayVerse.version})</span>
            </p>

            <span className="text-xs text-slate-300 italic font-serif">
              Anchor: {activeDisplayVerse.dateKey}
            </span>
          </div>
        </div>

        {/* Short Reflection / Encouragement */}
        <div className="p-4 rounded-xl bg-slate-900/60 border border-white/10 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans relative z-10">
          <p className="font-semibold text-[#DCC398] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Daily Reflection & Spiritual Anchor:
          </p>
          <p>{activeDisplayVerse.reflection}</p>
        </div>

        {/* Buttons Toolbar: Read Chapter, Devotion, Prayer, AI Tools, Share */}
        <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10 relative z-10">
          {/* Read Full Chapter in Bible */}
          <button
            onClick={() => {
              if (onNavigateToBibleChapter) {
                onNavigateToBibleChapter(activeDisplayVerse.book, activeDisplayVerse.chapter, activeDisplayVerse.verse);
              } else if (onNavigateTab) {
                onNavigateTab("bible");
              }
            }}
            className="px-4 py-2 rounded-xl bg-[#B48C35] hover:bg-[#996515] text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Read Full Chapter ({activeDisplayVerse.book} {activeDisplayVerse.chapter})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Create Devotion via AI */}
          <button
            onClick={() => handleGenerateVerseAiAction("Create Devotion")}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Create Devotion</span>
          </button>

          {/* Create Prayer via AI */}
          <button
            onClick={() => handleGenerateVerseAiAction("Create Prayer")}
            className="px-3.5 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
          >
            <HeartHandshake className="w-3.5 h-3.5 text-pink-300" />
            <span>Create Prayer</span>
          </button>

          {/* Create Prayer Points */}
          <button
            onClick={() => handleGenerateVerseAiAction("Create Prayer Points")}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Prayer Points</span>
          </button>

          {/* Explain This Verse */}
          <button
            onClick={() => handleGenerateVerseAiAction("Explain This Verse")}
            className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 text-xs font-medium flex items-center gap-1 transition-colors cursor-pointer"
          >
            <span>Explain Verse</span>
          </button>

          {/* Explore with MathemaSermon / ApostleMath */}
          {onNavigateTab && (
            <button
              onClick={() => onNavigateTab("math")}
              className="px-3.5 py-2 rounded-xl bg-purple-600/80 hover:bg-purple-600 text-white text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs border border-purple-400/30"
            >
              <Calculator className="w-3.5 h-3.5 text-amber-300" />
              <span>MathemaSermon</span>
            </button>
          )}

          {/* Listen TTS */}
          <button
            onClick={() => onToggleSpeak(`${activeDisplayVerse.reference}. ${activeDisplayVerse.text}. ${activeDisplayVerse.reflection}`)}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Listen to Verse"
          >
            {isSpeaking ? <VolumeX className="w-4 h-4 text-amber-300" /> : <Volume2 className="w-4 h-4 text-amber-300" />}
            <span className="hidden sm:inline">{isSpeaking ? "Pause" : "Listen"}</span>
          </button>

          {/* Copy */}
          <button
            onClick={handleCopyScheduledVerse}
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Copy Verse"
          >
            {copiedScheduledVerse ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
            <span className="hidden sm:inline">{copiedScheduledVerse ? "Copied" : "Copy"}</span>
          </button>

          {/* Share */}
          <button
            onClick={() =>
              onShareItem(
                `Verse of the Day • ${activeDisplayVerse.reference}`,
                activeDisplayVerse.text,
                activeDisplayVerse.reference,
                activeDisplayVerse.reflection
              )
            }
            className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer"
            title="Share"
          >
            <Share2 className="w-4 h-4 text-[#DCC398]" />
            <span className="hidden sm:inline">Share</span>
          </button>
        </div>

        {/* AI Action Generating State with Live Streaming & Meditating Feedback */}
        {isGeneratingAi && (
          <AiFastLoadingView
            progress={streamingProgress}
            title={`Generating Anointed ${aiActionType || "Revelation"}`}
            actionType={aiActionType || "Devotion"}
            streamingText={streamingAiText}
            isStreaming={true}
            onCancel={() => setIsGeneratingAi(false)}
          />
        )}

        {/* AI Error State with Retry Button */}
        {!isGeneratingAi && aiActionError && (
          <div className="p-5 rounded-2xl bg-slate-900/95 border border-red-500/50 space-y-3 animate-in fade-in shadow-xl relative">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-red-500/20 text-red-400 mt-0.5">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1">
                <h4 className="text-xs font-bold font-mono text-red-300 uppercase tracking-widest">
                  Generation Notice
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {aiActionError}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => handleGenerateVerseAiAction(aiActionType || "Create Prayer")}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#B48C35] to-[#DCC398] text-[#16235A] font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 hover:brightness-110 cursor-pointer shadow-md"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retry Generation</span>
              </button>
              <button
                onClick={() => setAiActionError(null)}
                className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-medium cursor-pointer transition-colors"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        {/* AI Action Result Panel (if generated) */}
        {!isGeneratingAi && (aiActionData || aiActionResult) && (
          <div className="p-5 sm:p-6 rounded-2xl bg-slate-900/95 border border-[#B48C35]/60 space-y-4 animate-in fade-in shadow-2xl relative">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-purple-500/20 border border-purple-400/30 text-amber-300">
                  <Sparkles className="w-4 h-4" />
                </span>
                <div>
                  <span className="text-[11px] font-mono font-bold text-amber-300 uppercase tracking-wider block">
                    ✨ Daily Scripture AI: {aiActionType}
                  </span>
                  <span className="text-xs text-slate-300 font-serif">
                    {activeDisplayVerse.reference} ({activeDisplayVerse.version})
                  </span>
                </div>
              </div>

              {/* Action Buttons Toolbar */}
              <div className="flex items-center gap-1.5">
                {/* TTS */}
                <button
                  onClick={() => {
                    const textToRead = aiActionData
                      ? `${aiActionData.title || ""}. ${aiActionData.reflection || aiActionData.adoration || aiActionData.historicalContext || aiActionResult || ""}`
                      : aiActionResult || "";
                    onToggleSpeak(textToRead);
                  }}
                  className="p-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Listen aloud"
                >
                  {isSpeaking ? <VolumeX className="w-3.5 h-3.5 text-amber-300" /> : <Volume2 className="w-3.5 h-3.5 text-amber-300" />}
                  <span className="hidden sm:inline">{isSpeaking ? "Pause" : "Listen"}</span>
                </button>

                {/* Copy */}
                <button
                  onClick={handleCopyAiResult}
                  className="p-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Copy formatted text"
                >
                  {copiedAiResult ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="hidden sm:inline">{copiedAiResult ? "Copied" : "Copy"}</span>
                </button>

                {/* Bookmark */}
                <button
                  onClick={() => {
                    onToggleBookmark({
                      id: `verse-ai-${Date.now()}`,
                      type: "devotion",
                      title: aiActionData?.title || `${aiActionType} on ${activeDisplayVerse.reference}`,
                      reference: activeDisplayVerse.reference,
                      text: aiActionResult || "",
                      date: new Date().toLocaleDateString()
                    });
                  }}
                  className="p-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                  title="Save to bookmarks"
                >
                  <Bookmark className="w-3.5 h-3.5 text-amber-300" />
                  <span className="hidden sm:inline">Save</span>
                </button>

                {/* Close */}
                <button
                  onClick={() => {
                    setAiActionResult(null);
                    setAiActionData(null);
                    setAiActionType(null);
                  }}
                  className="p-1.5 px-2.5 rounded-lg bg-white/10 hover:bg-rose-500/30 text-slate-300 hover:text-white text-xs transition-colors cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            </div>

            {/* Structured Content Rendering */}
            {aiActionData && (aiActionType === "Create Prayer" || aiActionType === "prayer") ? (
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-100">
                <h4 className="text-base font-serif font-bold text-amber-200">{aiActionData.title}</h4>
                {aiActionData.adoration && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-purple-300 uppercase">🙏 Adoration & Exaltation</span>
                    <p className="text-slate-200 leading-relaxed italic">{aiActionData.adoration}</p>
                  </div>
                )}
                {aiActionData.confession && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-rose-300 uppercase">🕊️ Surrender & Humility</span>
                    <p className="text-slate-200 leading-relaxed italic">{aiActionData.confession}</p>
                  </div>
                )}
                {aiActionData.thanksgiving && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-amber-300 uppercase">✨ Thanksgiving</span>
                    <p className="text-slate-200 leading-relaxed italic">{aiActionData.thanksgiving}</p>
                  </div>
                )}
                {aiActionData.petition && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-emerald-300 uppercase">📜 Word Petitions</span>
                    <p className="text-slate-200 leading-relaxed font-serif">{aiActionData.petition}</p>
                  </div>
                )}
                {aiActionData.warfareDeclaration && (
                  <div className="p-3 bg-purple-900/30 rounded-xl border border-purple-500/40 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-pink-300 uppercase">⚔️ Spiritual Warfare & Victory Decree</span>
                    <p className="text-purple-100 font-semibold leading-relaxed">{aiActionData.warfareDeclaration}</p>
                  </div>
                )}
                {aiActionData.closing && (
                  <p className="text-right text-amber-300 font-bold font-serif italic pt-1">{aiActionData.closing}</p>
                )}
              </div>
            ) : aiActionData && (aiActionType === "Prayer Points" || aiActionType === "Create Prayer Points" || aiActionType === "prayer_points") ? (
              <div className="space-y-3 text-xs sm:text-sm text-slate-100">
                <h4 className="text-base font-serif font-bold text-amber-200">{aiActionData.title}</h4>
                {aiActionData.introduction && (
                  <p className="text-slate-300 italic text-xs leading-relaxed">{aiActionData.introduction}</p>
                )}
                <div className="space-y-2.5">
                  {(aiActionData.prayerPoints || []).map((point: any, idx: number) => (
                    <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <span className="w-5 h-5 rounded-full bg-[#B48C35] text-white flex items-center justify-center text-[10px]">
                            {point.pointNumber || idx + 1}
                          </span>
                          {point.focus}
                        </span>
                        {point.scripturePromise && (
                          <span className="text-[10px] font-mono text-purple-300 bg-purple-900/40 px-2 py-0.5 rounded-md border border-purple-500/30">
                            {point.scripturePromise}
                          </span>
                        )}
                      </div>
                      <p className="text-slate-200 leading-relaxed font-serif pl-6">{point.prayerDeclaration}</p>
                    </div>
                  ))}
                </div>
                {aiActionData.propheticDecree && (
                  <div className="p-3 bg-amber-500/15 rounded-xl border border-amber-400/40 text-amber-200 font-serif leading-relaxed">
                    <strong>Prophetic Decree: </strong> {aiActionData.propheticDecree}
                  </div>
                )}
              </div>
            ) : aiActionData && (aiActionType === "Explain Verse" || aiActionType === "Explain This Verse" || aiActionType === "explain") ? (
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-100">
                <h4 className="text-base font-serif font-bold text-amber-200">{aiActionData.title}</h4>
                {aiActionData.historicalContext && (
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-amber-300 uppercase">🏛️ Historical & Setting Context</span>
                    <p className="text-slate-200 leading-relaxed">{aiActionData.historicalContext}</p>
                  </div>
                )}
                {aiActionData.originalLanguageInsight && (
                  <div className="p-3.5 bg-purple-900/20 rounded-xl border border-purple-400/30 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-purple-300 uppercase">📖 Original Greek / Hebrew Linguistic Insights</span>
                    <div className="text-purple-100 leading-relaxed">
                      <RichMathContent content={aiActionData.originalLanguageInsight} className="text-slate-100" />
                    </div>
                  </div>
                )}
                {aiActionData.doctrinalMeaning && (
                  <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-emerald-300 uppercase">💡 Doctrinal Truth & Revelation</span>
                    <p className="text-slate-200 leading-relaxed font-serif">{aiActionData.doctrinalMeaning}</p>
                  </div>
                )}
                {aiActionData.crossReferences && aiActionData.crossReferences.length > 0 && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-2">
                    <span className="text-[11px] font-bold font-mono text-pink-300 uppercase">🔗 Biblical Cross References</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {aiActionData.crossReferences.map((ref: any, rIdx: number) => (
                        <div key={rIdx} className="p-2 bg-white/5 rounded-lg border border-white/5 text-xs">
                          <span className="font-bold text-amber-300 block">{ref.reference}</span>
                          <span className="text-slate-300 text-[11px]">{ref.connection}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {aiActionData.lifeTransformation && (
                  <div className="p-3.5 bg-emerald-900/20 rounded-xl border border-emerald-400/30 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-emerald-300 uppercase">🌱 Practical Life Transformation</span>
                    <p className="text-emerald-100 leading-relaxed">{aiActionData.lifeTransformation}</p>
                  </div>
                )}
              </div>
            ) : aiActionData && (aiActionType === "MathemaSermon" || aiActionType === "mathemasermon") ? (
              <div className="space-y-3.5 text-xs sm:text-sm text-slate-100">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-base font-serif font-bold text-purple-300">{aiActionData.title}</h4>
                    <p className="text-xs text-amber-200">{aiActionData.subtitle || "The Divine Mathematical Harmony of Scripture"}</p>
                  </div>
                  {aiActionData.mathematicalConcept && (
                    <div className="px-2.5 py-1 rounded-full bg-purple-900/60 border border-purple-400 text-[11px] font-mono text-purple-200">
                      <RichMathContent content={aiActionData.mathematicalConcept} />
                    </div>
                  )}
                </div>

                {aiActionData.formula && (
                  <div className="p-3 bg-slate-950/80 rounded-xl border border-purple-400/40 text-center">
                    <span className="text-[10px] font-mono text-slate-400 block mb-1 uppercase tracking-wider">Governing Mathematical Equation</span>
                    <MathView math={aiActionData.formula} block={true} className="text-amber-300 text-base" />
                  </div>
                )}

                {aiActionData.mathematicalAnalogy && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-amber-300 uppercase">📐 Mathematical Analogy</span>
                    <RichMathContent content={aiActionData.mathematicalAnalogy} className="text-slate-200" />
                  </div>
                )}

                {aiActionData.homileticApplication && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-emerald-300 uppercase">🔥 Homiletic Preaching Revelation</span>
                    <RichMathContent content={aiActionData.homileticApplication} className="text-slate-200" />
                  </div>
                )}

                {aiActionData.altarCallPrayer && (
                  <div className="p-3 bg-purple-900/30 rounded-xl border border-purple-400/40 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-pink-300 uppercase">🙏 Apostolic Altar Call Prayer</span>
                    <p className="text-purple-100 italic leading-relaxed">{aiActionData.altarCallPrayer}</p>
                  </div>
                )}

                {onNavigateTab && (
                  <button
                    onClick={() => onNavigateTab("math")}
                    className="w-full py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md"
                  >
                    <Calculator className="w-4 h-4" />
                    <span>Explore All 100 ApostleMath Lessons & MathemaSermons</span>
                  </button>
                )}
              </div>
            ) : aiActionData && (aiActionData.reflection || aiActionData.guidedPrayer) ? (
              <div className="space-y-3 text-xs sm:text-sm text-slate-100">
                <h4 className="text-base font-serif font-bold text-amber-200">{aiActionData.title}</h4>
                <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                  <span className="text-[11px] font-bold font-mono text-amber-300 uppercase">📖 Reflection</span>
                  <p className="text-slate-200 leading-relaxed font-serif whitespace-pre-line">{aiActionData.reflection}</p>
                </div>
                {aiActionData.practicalApplication && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-emerald-300 uppercase">🌱 Practical Application</span>
                    <p className="text-slate-200 leading-relaxed">{aiActionData.practicalApplication}</p>
                  </div>
                )}
                {aiActionData.guidedPrayer && (
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <span className="text-[11px] font-bold font-mono text-purple-300 uppercase">🙏 Guided Prayer</span>
                    <p className="text-slate-200 leading-relaxed italic">{aiActionData.guidedPrayer}</p>
                  </div>
                )}
                {aiActionData.actionStep && (
                  <div className="p-3 bg-amber-500/15 rounded-xl border border-amber-400/30 text-amber-200">
                    <strong>Action Step: </strong> {aiActionData.actionStep}
                  </div>
                )}
                <button
                  onClick={() => {
                    onOpenDevotion({
                      id: `ai-${Date.now()}`,
                      edition: activeEdition,
                      editionLabel: `Special AI ${activeBadge.label}`,
                      title: aiActionData.title || `Devotion on ${activeDisplayVerse.reference}`,
                      keyScripture: aiActionData.keyScripture || `${activeDisplayVerse.reference} - "${activeDisplayVerse.text}"`,
                      passageText: aiActionData.passageText || activeDisplayVerse.text,
                      reflection: aiActionData.reflection || "",
                      practicalApplication: aiActionData.practicalApplication || "",
                      guidedPrayer: aiActionData.guidedPrayer || "",
                      actionStep: aiActionData.actionStep || "",
                      theme: activeDisplayVerse.theme || "Faith & Victory",
                      time: activeBadge.timeRange,
                      tags: ["AI Devotion", activeDisplayVerse.book, activeBadge.label],
                      reflectionQuestions: [
                        "How does this scripture speak directly to your current spiritual journey?",
                        "What concrete action will you take today to walk in this divine promise?"
                      ]
                    });
                  }}
                  className="w-full py-2.5 rounded-xl bg-[#B48C35] hover:bg-[#996515] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer transition-colors shadow-md mt-2"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Open in Full Devotion Reader</span>
                </button>
              </div>
            ) : (
              <p className="text-xs sm:text-sm text-slate-100 whitespace-pre-line leading-relaxed">
                {aiActionResult}
              </p>
            )}
          </div>
        )}

        {/* Previous Verses Toggle Header */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between">
          <button
            onClick={() => setShowVerseHistory(!showVerseHistory)}
            className="text-xs text-slate-300 hover:text-white flex items-center gap-1.5 font-semibold cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#DCC398]" />
            <span>Previous Verses History ({previousVersesList.length} Days)</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${showVerseHistory ? "rotate-180" : ""}`} />
          </button>

          {activeDisplayVerse.dateKey !== scheduledVerse.dateKey && (
            <button
              onClick={() => setActiveDisplayVerse(scheduledVerse)}
              className="text-[11px] text-amber-300 hover:underline font-semibold"
            >
              ← Return to Today's Verse
            </button>
          )}
        </div>

        {/* Previous Verses History Drawer */}
        {showVerseHistory && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5 pt-2 animate-in fade-in">
            {previousVersesList.map((item) => (
              <button
                key={item.dateKey}
                onClick={() => {
                  setActiveDisplayVerse(item.verse);
                  setShowVerseHistory(false);
                }}
                className={`p-3 rounded-xl text-left transition-all border cursor-pointer ${
                  activeDisplayVerse.dateKey === item.dateKey
                    ? "bg-white text-[#16235A] border-[#B48C35] font-bold"
                    : "bg-white/10 hover:bg-white/20 text-slate-200 border-white/10"
                }`}
              >
                <div className="flex items-center justify-between text-[10px] font-mono opacity-75 mb-1">
                  <span>{item.formattedDate}</span>
                  <span>{item.verse.dateKey}</span>
                </div>
                <div className="text-xs font-bold text-amber-300 line-clamp-1">
                  {item.verse.reference}
                </div>
                <div className="text-[11px] opacity-85 line-clamp-1 italic mt-0.5">
                  "{item.verse.text}"
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ======================================================== */}
      {/* 2. MAJOR EXPLORE HUB: CHRISTIAN JOURNEY & PLATFORM SECTIONS */}
      {/* ======================================================== */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold font-serif text-[#16235A] flex items-center gap-2">
              <Compass className="w-5 h-5 text-[#9333EA]" />
              Explore The Platform
            </h3>
            <p className="text-xs text-slate-500">
              Deepen your spiritual foundation across all distinct modules
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {/* 1. Holy Bible */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("bible")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FAF8FD] to-[#F1E6D2] border border-[#E5D5BC] hover:border-[#B48C35] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#B48C35] text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <BookOpen className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              📖 Holy Bible
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              66 Books (KJV) & Reader
            </p>
          </button>

          {/* 2. Spiritual Places */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("spiritual_places")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FAF8FD] to-[#E0E7FF]/40 border border-[#C7D2FE] hover:border-[#4338CA] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#4338CA] text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Compass className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              🌿 Sanctuaries
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Biblical Encounters & Journeys
            </p>
          </button>

          {/* 3. ApostleMath */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("apostle_math")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FAF5FF] to-[#EFF6FF] border border-[#E9D5FF] hover:border-[#9333EA] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#9333EA] text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Calculator className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              📐 ApostleMath
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              100 Divine Equations & Truths
            </p>
          </button>

          {/* 4. MathemaSermons */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("mathema_sermons")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#F5F3FF] to-[#EDE9FE] border border-[#DDD6FE] hover:border-[#7C3AED] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#7C3AED] text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Mic className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              🎙️ Sermons
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Pulpit Series & Expositions
            </p>
          </button>

          {/* 5. Rhema Word */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("rhema")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FFF1F2] to-[#FFFBEB] border border-rose-200 hover:border-rose-400 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-rose-600 text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Zap className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              ⚡ Rhema Word
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Living Spirit Revelation
            </p>
          </button>

          {/* 6. The Joy of the Lord */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("joy_overcoming")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FFFBEB] to-[#FEF3C7] border border-amber-200 hover:border-amber-400 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-amber-600 text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Flame className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              🔥 Joy of Lord
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Overcoming Trials & Tribulation
            </p>
          </button>

          {/* 7. Hymnals & Spirituals */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("hymnals")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FDF4FF] to-[#FAE8FF] border border-[#F5D0FE] hover:border-[#C026D3] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#C026D3] text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Music className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              🎵 Hymnals
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Spiritual Songs & Devotions
            </p>
          </button>

          {/* 8. Christian Library */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("library")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FAF8FD] to-slate-100 border border-slate-200 hover:border-[#16235A] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-[#16235A] text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Layers className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              📚 Library
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              12 Classics & Publications
            </p>
          </button>

          {/* 9. Prayer Studio */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("prayer")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#F0FDF4] to-[#ECFDF5] border border-emerald-200 hover:border-emerald-400 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-emerald-600 text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              🙏 Prayer Altar
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Intercession & Journal
            </p>
          </button>

          {/* 10. Quotes & Wisdom */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("quotes")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#F5F3FF] to-[#FAF5FF] border border-purple-200 hover:border-purple-400 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-purple-600 text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Quote className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              💬 Quotes
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Wisdom & Picture Maker
            </p>
          </button>

          {/* 11. Doctrinal Pillars */}
          <button
            onClick={() => onNavigateTab && onNavigateTab("doctrines")}
            className="p-4 rounded-xl bg-gradient-to-br from-[#EFF6FF] to-[#DBEAFE] border border-blue-200 hover:border-blue-500 hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-blue-600 text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              🏛️ Doctrines
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Apostolic Foundations
            </p>
          </button>

          {/* 12. Creator Profile */}
          <button
            onClick={onOpenAbout}
            className="p-4 rounded-xl bg-gradient-to-br from-[#FAF8FD] to-slate-100 border border-slate-200 hover:border-[#16235A] hover:shadow-xs transition-all text-left group cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-slate-800 text-white w-fit mb-2 group-hover:scale-105 transition-transform">
              <User className="w-4 h-4" />
            </div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#16235A]">
              👤 Founder
            </h4>
            <p className="text-[11px] text-slate-500 line-clamp-1">
              Bismark Twum & Vision
            </p>
          </button>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. ACTIVE DEVOTION SESSION (Morning/Afternoon/Evening)   */}
      {/* ======================================================== */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-5">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#B48C35]">
              Active Devotion: {activeBadge.label} ({activeBadge.timeRange})
            </span>
          </div>

          <span className="text-xs text-slate-400 font-mono">
            {scheduleState.formattedTime}
          </span>
        </div>

        <h3 className="text-2xl sm:text-3xl font-serif text-[#16235A] leading-tight">
          {devotion.title}
        </h3>

        <div className="prose prose-sm text-[#334155] leading-relaxed italic font-serif border-l-4 border-[#B48C35] pl-4 sm:pl-6 py-2 bg-[#FDFBF7] rounded-r-lg">
          "{devotion.keyScripture}" — {devotion.reflection.slice(0, 200)}...
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <button
            onClick={() => onOpenDevotion(devotion)}
            className="bg-[#16235A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#24357D] transition-colors shadow-md flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-[#DCC398]" />
            <span>Open Full Meditation</span>
            <ChevronRight className="w-4 h-4" />
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDevotionPictureModal(true)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#16235A] text-amber-200 hover:bg-[#24357D] border border-amber-400/30 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
              title="Download Devotion as Picture (PNG) with themes & author signature"
            >
              <ImageIcon className="w-3.5 h-3.5 text-[#F59E0B]" />
              <span>Save as Picture</span>
            </button>

            <button
              onClick={() => printDevotionOnePageDocument(devotion)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#FDFBF7] text-[#16235A] border border-[#B48C35] hover:bg-[#F1E6D2] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print or Save as 1-Page Paper Document with 'The joy of the Lord is my strength' & 'Bismark Twum'"
            >
              <Printer className="w-3.5 h-3.5 text-[#B48C35]" />
              <span className="hidden sm:inline">1-Page Paper</span> Document
            </button>

            <button
              onClick={() => onCompleteDevotion(devotion.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                isDevotionDone
                  ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>{isDevotionDone ? "Completed" : "Mark as Done"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. DAILY PERSONAL QUOTES (Curated by Bismark Twum)       */}
      {/* ======================================================== */}
      <div className="p-6 rounded-2xl bg-white border border-[#E8E0F0] shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-amber-100 text-amber-800">
              <Quote className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#16235A]">
                Daily Personal Wisdom & Quotes
              </h3>
              <p className="text-xs text-slate-500">
                Faith principles by Bismark Twum
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {onOpenQuotePictureModal && (
              <button
                onClick={() =>
                  onOpenQuotePictureModal({
                    quote: currentQuote.quote,
                    author: "Bismark Twum",
                    title: currentQuote.keyPrinciple,
                    reference: currentQuote.biblicalAnchor,
                    principle: currentQuote.keyPrinciple,
                    reflection: currentQuote.reflectionNote,
                    category: currentQuote.category
                  })
                }
                className="p-1.5 px-2.5 rounded-lg bg-purple-50 hover:bg-purple-100 text-purple-700 text-xs font-bold border border-purple-200 transition-colors flex items-center gap-1 cursor-pointer"
                title="Generate HD Quote Picture"
              >
                <ImageIcon className="w-3.5 h-3.5 text-purple-600" />
                <span className="hidden sm:inline">Picture</span>
              </button>
            )}
            <button
              onClick={handleNextQuote}
              className="p-1.5 px-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-[#16235A] text-xs font-semibold transition-colors flex items-center gap-1 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-[#9333EA]" />
              <span className="hidden sm:inline">Next</span>
            </button>
          </div>
        </div>

        <blockquote className="text-base sm:text-lg font-serif italic text-[#16235A] leading-relaxed border-l-4 border-[#9333EA] pl-4 py-1">
          "{currentQuote.quote}"
        </blockquote>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
          <span>Principle: <strong>{currentQuote.keyPrinciple}</strong></span>
          <span className="font-mono text-[#9333EA] font-semibold">{currentQuote.biblicalAnchor}</span>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4B. 1,000 QUOTES OF GOD'S GENERALS & FAMOUS CHRISTIANS    */}
      {/* ======================================================== */}
      <GodsGeneralsQuotesCard
        onToggleBookmark={onToggleBookmark}
        isBookmarked={isBookmarked}
        onShareItem={onShareItem}
        onToggleSpeak={onToggleSpeak}
        isSpeaking={isSpeaking}
        onNavigateToQuotesTab={() => onNavigateTab && onNavigateTab("quotes")}
        onOpenQuotePictureModal={onOpenQuotePictureModal}
      />

      {/* ======================================================== */}
      {/* 5. SPIRITUAL PLACES (Where Scripture Meets Your Journey) */}
      {/* ======================================================== */}
      <SpiritualPlacesSection
        onSelectPlace={(place) => setSelectedSpiritualPlace(place)}
        onNavigateToPlacesTab={() => onNavigateTab && onNavigateTab("spiritual_places")}
      />

      {/* Spiritual Place Sanctuary Modal */}
      <SpiritualPlaceSanctuaryModal
        place={selectedSpiritualPlace}
        isOpen={!!selectedSpiritualPlace}
        onClose={() => setSelectedSpiritualPlace(null)}
        onNavigateToBibleChapter={onNavigateToBibleChapter}
        onOpenDevotion={onOpenDevotion}
        onNavigateTab={onNavigateTab}
        isBookmarked={isBookmarked}
        onToggleBookmark={onToggleBookmark}
        onShareItem={onShareItem}
        isSpeaking={isSpeaking}
        onToggleSpeak={onToggleSpeak}
      />

      {/* ======================================================== */}
      {/* 6. CREATOR CARD SPOTLIGHT                                */}
      {/* ======================================================== */}
      <CreatorCard profile={profile} onOpenAbout={onOpenAbout} />

      {/* Devotion Picture (PNG) with Themes Modal */}
      {showDevotionPictureModal && (
        <DevotionPictureModal
          devotion={devotion}
          isOpen={showDevotionPictureModal}
          onClose={() => setShowDevotionPictureModal(false)}
        />
      )}
    </div>
  );
};
