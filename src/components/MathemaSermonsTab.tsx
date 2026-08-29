import React, { useState, useMemo } from "react";
import {
  BookOpen,
  Sparkles,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Compass,
  Layers,
  Copy,
  Check,
  Send,
  HelpCircle,
  Quote,
  Lightbulb,
  FileText,
  Mic,
  Calendar,
  Tag,
  ExternalLink,
  Clock,
  Search,
  Sliders,
  Flame,
  CheckCircle2,
  Atom,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { MATHEMASERMONS_CATALOG, MATHEMASERMONS_SERIES } from "../data/mathemaSermonsData";
import { MathemaSermonItem, Devotion } from "../types";
import { MathView, RichMathContent } from "./MathView";
import { DevotionPictureModal } from "./DevotionPictureModal";
import { printDevotionOnePageDocument } from "../utils/devotionDocumentExporter";
import { fetchAiWithRetry, getCachedAiHistory } from "../utils/aiClient";
import { streamAiContent, getIsFastMode, setIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";
import { useSyncedContent } from "../utils/useSyncedContent";

interface MathemaSermonsTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
  onExploreApostleMath?: (mathTopic?: string) => void;
}

export const MathemaSermonsTab: React.FC<MathemaSermonsTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onNavigateToBible,
  onExploreApostleMath
}) => {
  const { items: allSermons } = useSyncedContent<MathemaSermonItem>("mathema_sermons", MATHEMASERMONS_CATALOG);
  const [selectedSermonId, setSelectedSermonId] = useState<string>(allSermons[0]?.id || MATHEMASERMONS_CATALOG[0].id);
  const [selectedSeries, setSelectedSeries] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightPulse, setHighlightPulse] = useState<boolean>(false);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);

  const convertMathemaSermonToDevotion = (sermon: MathemaSermonItem): Devotion => {
    const outlineText = sermon.sermonOutline?.map((pt, i) => `**Point ${i + 1}: ${pt.title}**\n${pt.biblicalExegesis}\n*Spiritual Application:* ${pt.mathApplication}\n*Illustration:* ${pt.illustration}`).join("\n\n") || "";
    return {
      id: sermon.id,
      edition: "morning",
      editionLabel: `MATHEMASERMON • ${sermon.sermonSeries.toUpperCase()}`,
      title: sermon.title,
      keyScripture: sermon.keyScripture?.reference || "Colossians 2:3",
      passageText: sermon.keyScripture?.text || "In whom are hid all the treasures of wisdom and knowledge.",
      introMessage: `${sermon.subtitle} • ${sermon.sermonSeries}`,
      reflection: `**${sermon.subtitle}**\n\n**Mathematical Principle & Physical Law:**\n$$${sermon.formula}$$\n\n${outlineText}\n\n**Homiletic Summary:**\n${sermon.fullManuscript.substring(0, 480)}...`,
      practicalApplication: sermon.homileticPillars?.join(" • ") || sermon.subtitle,
      guidedPrayer: sermon.altarCallPrayer || "Lord Jesus, establish Your eternal kingdom within my soul and make my life a living testimony of Your truth. Amen.",
      actionStep: `Ministry & Altar Call: ${sermon.altarCallPrayer}`,
      theme: sermon.sermonSeries,
      category: "MathemaSermons",
      readTimeMinutes: sermon.estimatedPreachTimeMinutes || 15
    };
  };

  // Interactive parameter state for the Faith Equation Simulator
  const [simGraceFactor, setSimGraceFactor] = useState<number>(7);
  const [simFaithPower, setSimFaithPower] = useState<number>(8);

  // AI Sermon Builder
  const [aiTopic, setAiTopic] = useState("");
  const [aiMathAnalogy, setAiMathAnalogy] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [aiSermon, setAiSermon] = useState<MathemaSermonItem | null>(null);
  const [streamingAiText, setStreamingAiText] = useState("");
  const [streamingProgress, setStreamingProgress] = useState(20);

  const handleSelectSermon = (id: string) => {
    setSelectedSermonId(id);
    setHighlightPulse(true);
    setTimeout(() => setHighlightPulse(false), 2200);

    setTimeout(() => {
      const el = document.getElementById("mathemasermon-reader");
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        el.focus({ preventScroll: true });
      }
    }, 50);
  };

  const activeSermon = useMemo(() => {
    if (aiSermon && selectedSermonId === aiSermon.id) return aiSermon;
    return allSermons.find((s) => s.id === selectedSermonId) || allSermons[0] || MATHEMASERMONS_CATALOG[0];
  }, [selectedSermonId, aiSermon, allSermons]);

  const seriesList = useMemo(() => {
    const seriesSet = new Set<string>();
    allSermons.forEach((s) => seriesSet.add(s.sermonSeries));
    return ["All", ...Array.from(seriesSet)];
  }, [allSermons]);

  const filteredSermons = useMemo(() => {
    return allSermons.filter((s) => {
      const matchesSeries = selectedSeries === "All" || s.sermonSeries === selectedSeries;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesSeries;
      const matchesTitle = s.title.toLowerCase().includes(q);
      const matchesSubtitle = s.subtitle.toLowerCase().includes(q);
      const matchesConcept = s.mathematicalConcept.toLowerCase().includes(q);
      const matchesScripture = s.keyScripture.reference.toLowerCase().includes(q) || s.keyScripture.text.toLowerCase().includes(q);
      return matchesSeries && (matchesTitle || matchesSubtitle || matchesConcept || matchesScripture);
    });
  }, [allSermons, selectedSeries, searchQuery]);

  const currentCatalogIndex = useMemo(() => {
    return filteredSermons.findIndex((s) => s.id === activeSermon.id);
  }, [filteredSermons, activeSermon.id]);

  const hasPrevSermon = currentCatalogIndex > 0;
  const hasNextSermon = currentCatalogIndex >= 0 && currentCatalogIndex < filteredSermons.length - 1;

  const prevSermon = hasPrevSermon ? filteredSermons[currentCatalogIndex - 1] : null;
  const nextSermon = hasNextSermon
    ? filteredSermons[currentCatalogIndex + 1]
    : filteredSermons.length > 1
    ? filteredSermons[0]
    : null;

  const handlePrevSermon = () => {
    if (prevSermon) {
      handleSelectSermon(prevSermon.id);
    }
  };

  const handleNextSermon = () => {
    if (nextSermon) {
      handleSelectSermon(nextSermon.id);
    }
  };

  const isSaved = isBookmarked(activeSermon.id, "sermon");

  const handleCopySermon = async (sermon: MathemaSermonItem) => {
    const text = `📜 MATHEMASERMON: ${sermon.title.toUpperCase()}\n${sermon.subtitle}\n\nMathematical Concept: ${sermon.mathematicalConcept}\nFormula: ${sermon.formula}\n\nKey Scripture: "${sermon.keyScripture.text}" — ${sermon.keyScripture.reference}\n\nHomiletic Outline:\n${sermon.sermonOutline.map((pt) => `${pt.pointNumber}. ${pt.title}\n   • Math: ${pt.mathApplication}\n   • Exegesis: ${pt.biblicalExegesis}`).join("\n\n")}\n\nAltar Call / Prayer:\n${sermon.altarCallPrayer}\n\n— MathemaSermons Homiletics Series | Bismark Twum`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(sermon.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleGenerateAiSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiTopic.trim() && !aiMathAnalogy.trim()) return;
    setIsGeneratingAi(true);
    setAiError(null);
    setStreamingAiText("");
    setStreamingProgress(15);

    try {
      const res = await streamAiContent<any>({
        actionType: "MathemaSermon",
        scriptureReference: "Colossians 2:3",
        scriptureText: aiTopic || "The Divine Calculus of Faith",
        mathematicalConcept: aiMathAnalogy || "Coordinate Geometry & Vectors",
        fastMode: getIsFastMode(),
        storageKey: `joy_custom_mathemasermons_${aiTopic}_${aiMathAnalogy}`,
        onProgress: (prog) => {
          setStreamingProgress(prog);
        },
        onChunk: (chunk, accText) => {
          setStreamingAiText(accText);
        },
        onComplete: (fullText, data) => {
          setStreamingProgress(100);
          const generated: MathemaSermonItem = {
            id: data?.id || `ai-sermon-${Date.now()}`,
            title: data?.title || aiTopic || "The Divine Calculus of Faith",
            subtitle: data?.subtitle || "Expository Homiletics Integrating Eternal Scripture with Divine Mathematics",
            mathematicalConcept: data?.mathematicalConcept || aiMathAnalogy || "Coordinate geometry and directional vectors",
            formula: data?.formula || "R_{\\text{destiny}} = \\text{Origin}_{\\text{Christ}} + \\sum_{i=1}^{n} (\\vec{v}_{\\text{grace}} \\cdot \\Delta t)",
            keyScripture: {
              reference: data?.keyScripture?.reference || "Hebrews 12:1-2",
              text: data?.keyScripture?.text || "Looking unto Jesus the author and finisher of our faith."
            },
            sermonSeries: data?.sermonSeries || "exponential-grace",
            estimatedPreachTimeMinutes: data?.estimatedPreachTimeMinutes || 30,
            sermonOutline: Array.isArray(data?.sermonOutline) && data.sermonOutline.length > 0 ? data.sermonOutline : [
              {
                pointNumber: 1,
                title: "The Divine Origin: Christ as Foundation",
                mathApplication: "Establishing the coordinate origin (0,0) from which all spiritual trajectories derive direction and magnitude.",
                biblicalExegesis: "In Him all things hold together (Colossians 1:17).",
                illustration: "A navigation instrument calibrated to true celestial north."
              },
              {
                pointNumber: 2,
                title: "The Vector Velocity of Grace",
                mathApplication: "Instantaneous supernatural acceleration surpassing linear human friction.",
                biblicalExegesis: "Elijah outrunning the chariot of Ahab by the hand of the Lord (1 Kings 18:46).",
                illustration: "A celestial jet piercing through atmospheric resistance."
              },
              {
                pointNumber: 3,
                title: "The Infinite Convergence of Glory",
                mathApplication: "Continuous progress towards the infinite likeness of Christ.",
                biblicalExegesis: "We are being transformed into His image with ever-increasing glory (2 Corinthians 3:18).",
                illustration: "Coherent light converging into laser precision."
              }
            ],
            fullManuscript: data?.fullManuscript || data?.reflection || fullText || "When we subject human impossibility to the divine calculus of the cross, grace multiplies exponentially over time.",
            homileticPillars: data?.homileticPillars || ["Christological Foundation", "Mathematical Precision", "Spiritual Acceleration"],
            altarCallPrayer: data?.altarCallPrayer || "Father, in Jesus' Name, I align my life's trajectory with Your eternal purpose. Calibrate my heart to Your Word today. Amen.",
            tags: data?.tags || ["MathemaSermons", "Pulpit", "Faith"]
          };

          setAiSermon(generated);
          handleSelectSermon(generated.id);
          setIsGeneratingAi(false);
        },
        onError: (err) => {
          setAiError(err);
          setIsGeneratingAi(false);
        }
      });

      if (!res.success) {
        setAiError(res.error || "Unable to complete sermon generation. Please try again.");
      }
    } catch (err: any) {
      console.error("[MATHEMASERMON AI ERROR]", err);
      setAiError(err?.message || "Error generating sermon");
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-28 animate-in fade-in duration-150 bg-gradient-to-b from-slate-900/5 via-purple-950/5 to-slate-900/10 p-2 sm:p-4 rounded-3xl">
      {/* 1. Grand Celestial Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B132B] via-[#1C2541] to-[#3A0CA3] p-6 sm:p-8 text-white shadow-2xl border-2 border-[#B48C35]/60">
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 rounded-full bg-gradient-to-br from-[#F59E0B]/20 via-[#9333EA]/25 to-transparent blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 rounded-full bg-[#B48C35]/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-amber-400/40 text-amber-200 text-xs font-mono font-bold tracking-wider uppercase">
              <Mic className="w-3.5 h-3.5 text-amber-300" /> Standardized Homiletic Expositions • KaTeX Mathematical Models
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">
              MathemaSermons (Pulpit Series)
            </h1>

            <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-sans">
              Rigorous pulpit messages, structural homiletic outlines, and theological expositions that harmonize <strong>inspired Scripture</strong> with <strong>mathematical clarity</strong> without compromise.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="px-3 py-1 rounded-xl bg-purple-950/90 border border-purple-400/40 text-[11px] font-mono text-purple-200 flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-pink-400" /> {MATHEMASERMONS_CATALOG.length} Cataloged Homilies
              </span>
              <span className="px-3 py-1 rounded-xl bg-amber-950/90 border border-amber-400/50 text-[11px] font-mono text-amber-200 flex items-center gap-1.5">
                <Flame className="w-3.5 h-3.5 text-amber-400" /> Expository Pulpit Outlines
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 shrink-0">
            <button
              onClick={() =>
                onToggleSpeak(
                  `MathemaSermon: ${activeSermon.title}. Subtitle: ${activeSermon.subtitle}. Mathematical Concept: ${activeSermon.mathematicalConcept}. Key Scripture: ${activeSermon.keyScripture.text}. Outline points: ${activeSermon.sermonOutline.map((p) => p.title).join(". ")}`
                )
              }
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 hover:brightness-105 text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-lg cursor-pointer"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4 text-rose-800" /> : <Volume2 className="w-4 h-4 text-slate-950" />}
              <span>{isSpeaking ? "Stop Voice" : "Listen Sermon"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Series Filter & Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sermons by title, math concept, scripture, or keyword..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9333EA] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕ Clear
              </button>
            )}
          </div>

          <div className="text-xs font-mono text-slate-500 shrink-0 px-1">
            {filteredSermons.length} Sermons Found
          </div>
        </div>

        {/* Series Horizontal Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
          {seriesList.map((sId) => {
            const seriesObj = MATHEMASERMONS_SERIES.find((s) => s.id === sId);
            const label = seriesObj ? seriesObj.name : "All Series";
            const isSel = selectedSeries === sId;
            return (
              <button
                key={sId}
                onClick={() => setSelectedSeries(sId)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSel
                    ? "bg-[#16235A] text-white shadow-xs font-bold"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Catalog Grid */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-bold uppercase tracking-widest text-[#16235A]">
            Cataloged Messages ({filteredSermons.length})
          </span>
          <span className="text-[11px] font-mono text-slate-500">
            Click any sermon to read full manuscript
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filteredSermons.map((sermon) => {
            const isCurrent = activeSermon.id === sermon.id;
            return (
              <button
                key={sermon.id}
                onClick={() => handleSelectSermon(sermon.id)}
                className={`p-4 rounded-2xl text-left transition-all border flex flex-col justify-between space-y-3 cursor-pointer group ${
                  isCurrent
                    ? "bg-gradient-to-br from-[#16235A] to-[#24357D] text-white border-[#16235A] shadow-md ring-2 ring-[#9333EA]"
                    : "bg-white text-slate-800 border-slate-200 hover:border-[#9333EA] hover:shadow-xs"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono uppercase mb-1.5">
                    <span className={isCurrent ? "text-purple-300 font-bold" : "text-[#9333EA] font-bold"}>
                      {sermon.sermonSeries}
                    </span>
                    <span className="opacity-75 flex items-center gap-1">
                      <Clock className="w-3 h-3" /> {sermon.estimatedPreachTimeMinutes} min
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-sm leading-snug line-clamp-2">
                    {sermon.title}
                  </h4>
                  <p className={`text-xs mt-1 line-clamp-2 ${isCurrent ? "text-slate-200" : "text-slate-500"}`}>
                    {sermon.subtitle}
                  </p>
                </div>

                <div className="pt-2 border-t border-current/10 flex items-center justify-between text-[11px] font-semibold">
                  <span className="flex items-center gap-1">
                    <Layers className="w-3.5 h-3.5 text-[#9333EA]" /> {sermon.sermonOutline.length} Movements
                  </span>
                  <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform font-bold text-xs">
                    Read Outline <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Sermon Pulpit & Manuscript Stage */}
      <div
        id="mathemasermon-reader"
        tabIndex={-1}
        className={`p-6 sm:p-8 rounded-3xl bg-white border border-[#E8E0F0] shadow-sm space-y-6 transition-all duration-500 outline-none ${
          highlightPulse ? "ring-4 ring-[#9333EA]/60 shadow-2xl border-[#9333EA]" : ""
        }`}
      >
        {/* Header Control Bar */}
        <div className="space-y-3 border-b border-slate-100 pb-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#16235A] text-purple-200 text-xs font-mono font-bold uppercase tracking-wider">
                {activeSermon.sermonSeries}
              </span>
              <span className="px-3 py-1 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs font-mono font-bold">
                ⏱ {activeSermon.estimatedPreachTimeMinutes} Min Preach Time
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => setPictureDevotion(convertMathemaSermonToDevotion(activeSermon))}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                title="Turn Sermon into Ultra-HD Devotion Picture Card & Download"
              >
                <ImageIcon className="w-4 h-4 text-slate-950" />
                <span className="inline font-bold">Devotion Picture</span>
              </button>

              <button
                onClick={() => printDevotionOnePageDocument(convertMathemaSermonToDevotion(activeSermon))}
                className="p-2.5 rounded-xl bg-slate-900 text-amber-300 border border-amber-500/40 hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Download / Print 1-Page Document"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span className="inline font-bold">1-Page PDF</span>
              </button>

              <button
                onClick={() => handleCopySermon(activeSermon)}
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Copy Full Sermon Outline"
              >
                {copiedId === activeSermon.id ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span className="hidden sm:inline">{copiedId === activeSermon.id ? "Copied" : "Copy Outline"}</span>
              </button>

              <button
                onClick={() =>
                  onShareItem(
                    activeSermon.title,
                    `${activeSermon.subtitle}\n\nFormula: ${activeSermon.formula}\n\nKey Scripture: ${activeSermon.keyScripture.text} (${activeSermon.keyScripture.reference})\n\nAltar Call: ${activeSermon.altarCallPrayer}`,
                    activeSermon.keyScripture.reference
                  )
                }
                className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors"
                title="Share"
              >
                <Share2 className="w-4 h-4" />
                <span className="hidden sm:inline">Share</span>
              </button>

              <button
                onClick={() =>
                  onToggleBookmark({
                    type: "sermon",
                    title: activeSermon.title,
                    reference: activeSermon.keyScripture.reference,
                    snippet: activeSermon.subtitle,
                    targetId: activeSermon.id
                  })
                }
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors ${
                  isSaved
                    ? "bg-[#9333EA] text-white shadow-xs"
                    : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                }`}
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
                <span className="hidden sm:inline">{isSaved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          <div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#16235A] tracking-tight">
              {activeSermon.title}
            </h2>
            <p className="text-sm font-serif italic text-slate-600 mt-1">
              {activeSermon.subtitle}
            </p>
          </div>
        </div>

        {/* Standardized LaTeX Formula Sanctuary & Biblical Exegesis */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
          {/* Left Formula Card */}
          <div className="lg:col-span-7 p-5 rounded-2xl bg-gradient-to-br from-purple-50/90 via-white to-slate-50 border border-purple-200/90 space-y-3 shadow-2xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono text-[#9333EA] uppercase tracking-wider flex items-center gap-1.5">
                <Calculator className="w-4 h-4" /> 1. Standardized LaTeX Formula
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-purple-100 text-purple-800 font-bold">
                KaTeX Rendered
              </span>
            </div>

            <div className="text-xs font-bold text-[#16235A]">
              <RichMathContent content={activeSermon.mathematicalConcept} />
            </div>

            {/* Formula Presentation Box: Standardized KaTeX Chalkboard */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#111827] to-[#1E1B4B] border-2 border-[#B48C35]/50 shadow-inner flex items-center justify-center text-center overflow-x-hidden max-w-full">
              <MathView math={activeSermon.formula} block={true} className="text-base sm:text-xl text-[#FDE68A] font-semibold tracking-wide" />
            </div>

            {/* Interactive Faith Equation Simulator */}
            <div className="p-3 rounded-xl bg-purple-100/60 border border-purple-200 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-mono font-bold text-purple-900">
                <span className="flex items-center gap-1">
                  <Sliders className="w-3.5 h-3.5 text-[#9333EA]" /> Faith Dynamics Parameter:
                </span>
                <span>Grace Factor: {simGraceFactor}x | Faith: {simFaithPower}</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={simGraceFactor}
                    onChange={(e) => setSimGraceFactor(parseInt(e.target.value, 10))}
                    className="w-full accent-[#9333EA] cursor-pointer"
                  />
                </div>
                <div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={simFaithPower}
                    onChange={(e) => setSimFaithPower(parseInt(e.target.value, 10))}
                    className="w-full accent-[#DB2777] cursor-pointer"
                  />
                </div>
              </div>
              <p className="text-[11px] text-purple-950 italic">
                Simulated Output: Total Kingdom Velocity $V = {simGraceFactor} \times {simFaithPower}^2 = {simGraceFactor * simFaithPower * simFaithPower}$ units of spiritual momentum.
              </p>
            </div>
          </div>

          {/* Right Scripture Anchor Card */}
          <div className="lg:col-span-5 p-5 rounded-2xl bg-gradient-to-br from-[#FAF8FD] to-blue-50/50 border border-[#E8E0F0] space-y-3 flex flex-col justify-between">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold font-mono text-[#16235A] uppercase tracking-wider flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#9333EA]" /> 2. Key Scripture Anchor
                </span>
                {onNavigateToBible && (
                  <button
                    onClick={() => {
                      const parts = activeSermon.keyScripture.reference.split(" ");
                      const book = parts.slice(0, -1).join(" ") || parts[0];
                      const ch = parseInt(parts[parts.length - 1]?.split(":")[0] || "1", 10);
                      onNavigateToBible(book, ch);
                    }}
                    className="text-xs text-[#2563EB] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                  >
                    Bible View <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>

              <blockquote className="text-sm font-serif italic text-slate-800 border-l-3 border-[#9333EA] pl-3 py-1 leading-relaxed bg-white/80 rounded-r-xl">
                "{activeSermon.keyScripture.text}"
              </blockquote>
            </div>

            <p className="text-xs font-bold font-mono text-[#5B6B8A] pt-2 border-t border-slate-200/80">
              — {activeSermon.keyScripture.reference} (Holy Scripture)
            </p>
          </div>
        </div>

        {/* 5. Homiletic Movements (Point by Point) */}
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-xs font-bold font-mono uppercase text-[#16235A] tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#9333EA]" />
              Homiletic Movement Breakdown ({activeSermon.sermonOutline.length} Points)
            </h3>
            <span className="text-[11px] font-sans text-slate-500">Pulpit-Ready Transitions</span>
          </div>

          <div className="space-y-4">
            {activeSermon.sermonOutline.map((pt) => (
              <div
                key={pt.pointNumber}
                className="p-5 rounded-2xl bg-slate-50/80 border border-slate-200/90 space-y-3 shadow-2xs hover:bg-slate-50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-xl bg-[#16235A] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0 shadow-xs">
                    {pt.pointNumber}
                  </span>
                  <h4 className="font-serif font-bold text-sm sm:text-base text-[#16235A]">
                    {pt.title}
                  </h4>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div className="p-3.5 rounded-xl bg-white border border-purple-100 shadow-2xs">
                    <span className="text-[10px] font-bold font-mono uppercase text-[#9333EA] block mb-1.5 flex items-center gap-1">
                      <Calculator className="w-3 h-3" /> Mathematical Formulation:
                    </span>
                    <RichMathContent content={pt.mathApplication} className="text-slate-800 leading-relaxed text-xs" />
                  </div>

                  <div className="p-3.5 rounded-xl bg-white border border-blue-100 shadow-2xs">
                    <span className="text-[10px] font-bold font-mono uppercase text-[#2563EB] block mb-1.5 flex items-center gap-1">
                      <BookOpen className="w-3 h-3" /> Biblical Exegesis & Theology:
                    </span>
                    <RichMathContent content={pt.biblicalExegesis} className="text-slate-800 leading-relaxed text-xs" />
                  </div>
                </div>

                {pt.illustration && (
                  <div className="text-xs text-slate-700 bg-amber-50/90 p-3 rounded-xl border border-amber-200 flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-amber-950 font-semibold">Pulpit Illustration:</strong>{" "}
                      <RichMathContent content={pt.illustration} className="inline font-sans not-italic text-xs text-amber-900" />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* 6. Full Manuscript Excerpt & Altar Call */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
          <div className="p-5 rounded-2xl bg-[#FAF8FD] border border-[#E8E0F0] space-y-2">
            <h4 className="text-xs font-bold font-mono text-[#16235A] uppercase flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-[#9333EA]" /> Full Expository Manuscript Insight
            </h4>
            <div className="text-xs sm:text-sm text-slate-700 leading-relaxed font-serif">
              <RichMathContent content={activeSermon.fullManuscript} />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-gradient-to-br from-[#16235A] to-[#24357D] text-white space-y-2 shadow-md">
            <h4 className="text-xs font-bold font-mono text-purple-200 uppercase flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-purple-300" /> Altar Call & Pastoral Benediction
            </h4>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed italic font-serif">
              "{activeSermon.altarCallPrayer}"
            </p>
          </div>
        </div>

        {/* 7. Bottom Navigation Arrow Bar */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-purple-50 via-slate-50 to-blue-50 border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
          <button
            onClick={handlePrevSermon}
            disabled={!hasPrevSermon}
            className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
              hasPrevSermon
                ? "bg-white hover:bg-purple-100 text-slate-800 hover:text-purple-900 border border-slate-200 shadow-2xs"
                : "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200"
            }`}
          >
            <ArrowLeft className="w-4 h-4 text-[#9333EA]" />
            <span className="truncate max-w-[200px]">
              {prevSermon ? `Previous: ${prevSermon.title}` : "Previous Sermon"}
            </span>
          </button>

          <div className="text-center">
            <span className="text-[11px] font-mono font-bold text-purple-900 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200">
              Message {currentCatalogIndex + 1} of {filteredSermons.length}
            </span>
          </div>

          <button
            onClick={handleNextSermon}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#2563EB] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-purple-500/20 cursor-pointer"
          >
            <span className="truncate max-w-[220px]">
              {nextSermon ? `Next: ${nextSermon.title}` : "Next Sermon"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 8. AI Interactive Sermon Architect */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-slate-950 via-[#16235A] to-slate-900 text-white border border-purple-500/40 shadow-xl space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30">
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif">
              Spirit-Led MathemaSermon Architect (Interactive AI)
            </h3>
            <p className="text-xs text-slate-300">
              Synthesize a custom homiletic message combining any biblical passage with a mathematical formalism.
            </p>
          </div>
        </div>

        {/* Streaming Loading Indicator */}
        {isGeneratingAi && (
          <AiFastLoadingView
            progress={streamingProgress}
            title="Formulating MathemaSermon & KaTeX Equations"
            actionType="MathemaSermon"
            streamingText={streamingAiText}
            isStreaming={true}
            onCancel={() => setIsGeneratingAi(false)}
          />
        )}

        <form onSubmit={handleGenerateAiSermon} className="space-y-3">
          {aiError && (
            <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-400/40 text-amber-200 text-xs flex items-center justify-between">
              <span>{aiError}</span>
              <button
                type="button"
                onClick={() => setAiError(null)}
                className="text-amber-200 hover:text-white font-bold ml-2 cursor-pointer"
              >
                ✕
              </button>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input
              type="text"
              value={aiTopic}
              onChange={(e) => setAiTopic(e.target.value)}
              placeholder="Sermon Topic (e.g. The Covenant of Multiplying Bread)"
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#9333EA]"
            />
            <input
              type="text"
              value={aiMathAnalogy}
              onChange={(e) => setAiMathAnalogy(e.target.value)}
              placeholder="Math Analogy (e.g. Geometric Progression & Logarithms)"
              className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-slate-400 text-xs focus:outline-none focus:border-[#9333EA]"
            />
          </div>

          <button
            type="submit"
            disabled={isGeneratingAi || (!aiTopic.trim() && !aiMathAnalogy.trim())}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#DB2777] text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 hover:brightness-110 transition-all cursor-pointer disabled:opacity-50 shadow-md"
          >
            {isGeneratingAi ? (
              <span>Generating...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Build Expository Sermon</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Devotion Picture Export Modal */}
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
