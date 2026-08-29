import React, { useState, useMemo, useRef } from "react";
import {
  Compass,
  Search,
  Sparkles,
  BookOpen,
  Volume2,
  VolumeX,
  Share2,
  Bookmark,
  ChevronRight,
  ChevronLeft,
  ArrowRight,
  ArrowLeft,
  Calculator,
  Grid,
  List,
  Layers,
  Copy,
  Check,
  Send,
  HelpCircle,
  Quote,
  Lightbulb,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Atom,
  Hash,
  Sliders,
  Filter,
  Flame,
  Image as ImageIcon,
  Download
} from "lucide-react";
import { APOSTLE_MATH_LESSONS, ApostleMathLesson } from "../data/apostleMathData";
import { MathView, RichMathContent } from "./MathView";
import { Devotion } from "../types";
import { DevotionPictureModal } from "./DevotionPictureModal";
import { printDevotionOnePageDocument } from "../utils/devotionDocumentExporter";
import { fetchAiWithRetry } from "../utils/aiClient";
import { useSyncedContent } from "../utils/useSyncedContent";

interface ApostleMathTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  isSpeaking: boolean;
  onToggleSpeak: (text: string) => void;
  onNavigateToBible?: (book: string, chapter: number, verse?: number) => void;
}

export const ApostleMathTab: React.FC<ApostleMathTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  isSpeaking,
  onToggleSpeak,
  onNavigateToBible
}) => {
  const { items: allLessons } = useSyncedContent<ApostleMathLesson>("apostle_math", APOSTLE_MATH_LESSONS);
  const [selectedLessonId, setSelectedLessonId] = useState<string>(allLessons[0]?.id || APOSTLE_MATH_LESSONS[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [highlightPulse, setHighlightPulse] = useState(false);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);
  const readerRef = useRef<HTMLDivElement | null>(null);

  const convertApostleMathToDevotion = (lesson: ApostleMathLesson): Devotion => {
    const formulaSection = lesson.mathFormula ? `**Mathematical Formula:**\n$$${lesson.mathFormula}$$\n\n` : "";
    return {
      id: lesson.id,
      edition: "morning",
      editionLabel: `APOSTLEMATH • ${lesson.mathBranch.toUpperCase()}`,
      title: lesson.title,
      keyScripture: lesson.keyScripture.reference,
      passageText: lesson.keyScripture.text,
      introMessage: `${lesson.subtitle} • Principle: ${lesson.mathPrinciple}`,
      reflection: `**${lesson.subtitle}**\n\n${lesson.biblicalTruth}\n\n${formulaSection}**Kingdom Analogy & Illustration:**\n${lesson.mathIllustration}\n\n**Life Connection & Application:**\n${lesson.lifeConnection}`,
      practicalApplication: lesson.mathemaSermon || lesson.subtitle,
      guidedPrayer: lesson.prayer || "Heavenly Father, establish my mind and spirit in Your divine order and sovereign truth. In Jesus' Name, Amen.",
      actionStep: Array.isArray(lesson.practicalApplication) ? lesson.practicalApplication.join(" • ") : lesson.subtitle,
      theme: lesson.mathBranch,
      category: "ApostleMath",
      readTimeMinutes: lesson.readTimeMinutes || 4
    };
  };

  // Interactive Equations Lab State
  const [simEqSum, setSimEqSum] = useState<number>(10);
  const [simEqDiff, setSimEqDiff] = useState<number>(4);
  const [gradientM, setGradientM] = useState<number>(1.5);

  // Simultaneous solution calculation: x + y = S, x - y = D => x = (S+D)/2, y = (S-D)/2
  const simX = (simEqSum + simEqDiff) / 2;
  const simY = (simEqSum - simEqDiff) / 2;

  // AI MathemaSermon generator state
  const [customMathTopic, setCustomMathTopic] = useState("");
  const [customScripture, setCustomScripture] = useState("");
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);
  const [aiGeneratedLesson, setAiGeneratedLesson] = useState<ApostleMathLesson | null>(null);

  // Extract unique categories (math branches)
  const categories = useMemo(() => {
    const set = new Set<string>();
    allLessons.forEach((l) => set.add(l.mathBranch));
    return ["All", ...Array.from(set)];
  }, [allLessons]);

  // Filter lessons
  const filteredLessons = useMemo(() => {
    return allLessons.filter((lesson) => {
      const matchesCategory =
        selectedCategory === "All" || lesson.mathBranch === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      if (!q) return matchesCategory;

      const matchesSearch =
        lesson.title.toLowerCase().includes(q) ||
        lesson.subtitle.toLowerCase().includes(q) ||
        lesson.mathBranch.toLowerCase().includes(q) ||
        lesson.mathPrinciple.toLowerCase().includes(q) ||
        (lesson.mathFormula && lesson.mathFormula.toLowerCase().includes(q)) ||
        lesson.keyScripture.reference.toLowerCase().includes(q) ||
        lesson.keyScripture.text.toLowerCase().includes(q) ||
        lesson.mathemaSermon.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });
  }, [allLessons, searchQuery, selectedCategory]);

  const selectedLesson = useMemo(() => {
    if (aiGeneratedLesson && selectedLessonId === aiGeneratedLesson.id) {
      return aiGeneratedLesson;
    }
    return (
      allLessons.find((l) => l.id === selectedLessonId) ||
      allLessons[0] ||
      APOSTLE_MATH_LESSONS[0]
    );
  }, [selectedLessonId, aiGeneratedLesson, allLessons]);

  const currentIndex = useMemo(() => {
    return allLessons.findIndex((l) => l.id === selectedLesson.id);
  }, [allLessons, selectedLesson.id]);

  const handleSelectLesson = (id: string) => {
    setSelectedLessonId(id);
    setHighlightPulse(true);
    setTimeout(() => setHighlightPulse(false), 2000);

    setTimeout(() => {
      if (readerRef.current) {
        readerRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        readerRef.current.focus({ preventScroll: true });
      } else {
        const el = document.getElementById("apostlemath-reader");
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          el.focus({ preventScroll: true });
        }
      }
    }, 50);
  };

  const handlePrevLesson = () => {
    if (currentIndex > 0) {
      handleSelectLesson(allLessons[currentIndex - 1].id);
    }
  };

  const handleNextLesson = () => {
    if (currentIndex < allLessons.length - 1) {
      handleSelectLesson(allLessons[currentIndex + 1].id);
    }
  };

  const handleCopyText = async (lesson: ApostleMathLesson) => {
    const text = `📐 ${lesson.title.toUpperCase()} (ApostleMath)\n${lesson.subtitle}\n\nMathematical Formula:\n${lesson.mathFormula || ""}\n\nKey Scripture: "${lesson.keyScripture.text}" — ${lesson.keyScripture.reference}\n\n🌟 MATHEMASERMON:\n${lesson.mathemaSermon}\n\n🙏 PRAYER:\n${lesson.prayer}\n\n— The Joy of the Lord | Mathematics & Christian Wisdom by Apostle Bismark Twum`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(lesson.id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // ignore
    }
  };

  const handleGenerateAiMathemaSermon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customMathTopic.trim() && !customScripture.trim()) return;
    setIsGeneratingAi(true);

    try {
      const res = await fetchAiWithRetry<any>(
        "/api/generate-apostlemath",
        {
          mathBranch: customMathTopic || "Vectors & Divine Trajectory",
          spiritualConcept: customScripture || "Kingdom Alignment and Prophetic Velocity"
        },
        {
          maxRetries: 2,
          retryDelayMs: 1500,
          storageKey: "ai_apostlemath_history"
        }
      );

      if (res.success && res.data && res.data.title) {
        const data = res.data;
        const newLesson: ApostleMathLesson = {
          id: data.id || `ai-math-${Date.now()}`,
          title: data.title,
          subtitle: data.subtitle || "Divine Mathematics for Spiritual Mastery",
          mathBranch: data.mathBranch || customMathTopic || "Applied Mathematical Theology",
          mathPrinciple: data.mathPrinciple || "Axiomatic Alignment with Kingdom Truth",
          mathFormula: data.mathFormula || "\\vec{R}_{\\text{faith}} = \\vec{R}_0 + \\int_{0}^{t} \\vec{v}_{\\text{grace}}(\\tau) \\, d\\tau",
          mathIllustration: data.mathIllustration || "In mathematics, precise equations determine outcome.",
          lifeConnection: data.lifeConnection || "Human choices create trajectory angles that define destiny.",
          biblicalTruth: data.biblicalTruth || "The Word of God is living, active, and mathematically immutable.",
          keyScripture: {
            reference: data.keyScripture?.reference || customScripture || "Proverbs 3:5-6",
            text: data.keyScripture?.text || "Trust in the Lord with all thine heart and lean not unto thine own understanding."
          },
          mathemaSermon: data.mathemaSermon || "Align your spiritual vector with the Holy Spirit and accelerate into destiny.",
          practicalApplication: Array.isArray(data.practicalApplication) ? data.practicalApplication : [
            "Audit your life vectors to point in alignment with God's Word.",
            "Pray in the Holy Ghost before making strategic decisions.",
            "Reject counter-directional forces of doubt and hesitation."
          ],
          prayer: data.prayer || "Lord Jesus, calibrate my heart to Your divine order. Amen.",
          tags: Array.isArray(data.tags) ? data.tags : ["ApostleMath", "AI Generated", "Wisdom"],
          readTimeMinutes: data.readTimeMinutes || 4
        };

        setAiGeneratedLesson(newLesson);
        handleSelectLesson(newLesson.id);
      }
    } catch (err) {
      console.warn("Error generating ApostleMath AI lesson:", err);
    } finally {
      setIsGeneratingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-32 animate-in fade-in duration-200 bg-white p-3 sm:p-6 rounded-3xl border border-slate-200 shadow-sm">
      {/* 1. Grand Celestial Banner - Bright, Crisp, Royal Navy & Radiant Gold */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0F172A] text-white shadow-xl border-2 border-[#B48C35] relative overflow-hidden">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#F59E0B] text-xs font-mono font-bold tracking-wider uppercase border border-[#B48C35]/50">
            <Compass className="w-3.5 h-3.5 text-[#F59E0B]" /> Standardized Pedagogical Analogies • 100 KaTeX Lessons
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold tracking-tight text-white drop-shadow-sm">
            ApostleMath (100 Lessons)
          </h1>

          <p className="text-sm text-slate-200 leading-relaxed font-sans font-medium">
            Rigorous mathematical formalisms—systems of linear equations, quadratic curves, limit theories, directional vectors, eigenvalues, matrix transformations, and topological sets—used as <strong className="text-amber-300">standardized pedagogical analogies for eternal Christian truth</strong>.
          </p>

          <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 text-xs text-slate-200 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <span>
              <strong className="text-amber-300">Theological Axiom:</strong> Mathematics serves as an analytical visual aid to illuminate biblical revelation; the inspired, inerrant Word of God is the sole supreme foundation of all doctrine.
            </span>
          </div>
        </div>
      </div>

      {/* 2. Quick Jump & Catalog Search Bar */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 100 ApostleMath messages by title, formula, scripture, or branch..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-[#9333EA] focus:bg-white transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
              >
                ✕ Clear
              </button>
            )}
          </div>

          {/* Quick Jump Dropdown */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-purple-50 border border-purple-200 text-xs font-semibold text-purple-900">
              <Hash className="w-3.5 h-3.5 text-purple-700" />
              <label htmlFor="jump-select" className="shrink-0 text-slate-700">Jump to:</label>
              <select
                id="jump-select"
                value={selectedLesson.id}
                onChange={(e) => handleSelectLesson(e.target.value)}
                aria-label="Jump directly to an ApostleMath lesson"
                className="bg-transparent font-bold text-purple-900 focus:outline-none cursor-pointer max-w-[170px] truncate"
              >
                {APOSTLE_MATH_LESSONS.map((l, i) => (
                  <option key={l.id} value={l.id} className="text-slate-900">
                    #{i + 1}: {l.title.slice(0, 38)}...
                  </option>
                ))}
              </select>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  viewMode === "grid" ? "bg-white text-[#9333EA] shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="Grid View"
              >
                <Grid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg text-xs font-medium cursor-pointer transition-colors ${
                  viewMode === "list" ? "bg-white text-[#9333EA] shadow-xs" : "text-slate-500 hover:text-slate-800"
                }`}
                title="List View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-thin">
          <span className="text-slate-400 font-semibold flex items-center gap-1 shrink-0 mr-1">
            <Filter className="w-3 h-3" /> Branch:
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#9333EA] text-white shadow-xs font-bold"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* 3. Catalog Browser */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-xs font-bold uppercase tracking-widest text-[#16235A] flex items-center gap-2">
            <Layers className="w-4 h-4 text-[#9333EA]" />
            ApostleMath Catalog ({filteredLessons.length} of {APOSTLE_MATH_LESSONS.length} Messages)
          </h2>
          <span className="text-[11px] font-sans text-slate-500">
            Click to study full lesson
          </span>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 max-h-[460px] overflow-y-auto p-1 rounded-2xl border border-slate-200 bg-slate-50/50 scrollbar-thin">
            {filteredLessons.map((lesson) => {
              const fullIdx = APOSTLE_MATH_LESSONS.findIndex((l) => l.id === lesson.id);
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  id={`lesson-card-${lesson.id}`}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`p-4 rounded-2xl text-left transition-all border cursor-pointer relative group flex flex-col justify-between ${
                    isSelected
                      ? "bg-white border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/40"
                      : "bg-white border-slate-200 hover:border-[#9333EA]/60 hover:shadow-xs"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] font-mono text-[#9333EA] font-semibold mb-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-[#FAF5FF] border border-[#E9D5FF] font-bold">
                        #{fullIdx + 1} • {lesson.mathBranch.split("&")[0].trim()}
                      </span>
                      <span className="text-slate-400">{lesson.readTimeMinutes} min</span>
                    </div>
                    <h3 className="text-xs sm:text-sm font-bold font-serif text-[#16235A] line-clamp-2 mb-1 group-hover:text-[#9333EA] transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                      {lesson.subtitle}
                    </p>
                  </div>

                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#2563EB] font-medium pt-2 border-t border-slate-100">
                    <span className="font-mono text-slate-600">{lesson.keyScripture.reference}</span>
                    <span className="flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform font-bold text-[#9333EA]">
                      Open Lesson <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        ) : (
          <div className="space-y-2 max-h-[460px] overflow-y-auto p-1 rounded-2xl border border-slate-200 bg-slate-50/50 scrollbar-thin">
            {filteredLessons.map((lesson) => {
              const fullIdx = APOSTLE_MATH_LESSONS.findIndex((l) => l.id === lesson.id);
              const isSelected = selectedLesson.id === lesson.id;
              return (
                <button
                  key={lesson.id}
                  id={`lesson-row-${lesson.id}`}
                  onClick={() => handleSelectLesson(lesson.id)}
                  className={`w-full p-3.5 rounded-xl text-left transition-all border cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? "bg-white border-[#9333EA] shadow-md ring-2 ring-[#9333EA]/40"
                      : "bg-white border-slate-200 hover:border-[#9333EA]/60 hover:shadow-xs"
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="w-9 h-9 rounded-lg bg-purple-50 text-[#9333EA] font-mono font-bold text-xs flex items-center justify-center shrink-0 border border-purple-200">
                      #{fullIdx + 1}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-xs sm:text-sm font-bold font-serif text-[#16235A] truncate">
                        {lesson.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 truncate">
                        {lesson.mathBranch} • {lesson.keyScripture.reference}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">{lesson.readTimeMinutes} min</span>
                    <ChevronRight className="w-4 h-4 text-purple-600" />
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 4. Main Interactive Lesson Reader */}
      <div
        id="apostlemath-reader"
        ref={readerRef}
        tabIndex={-1}
        className={`bg-white rounded-3xl border border-[#E8E0F0] shadow-sm overflow-hidden transition-all duration-500 outline-none ${
          highlightPulse
            ? "ring-4 ring-[#9333EA]/60 shadow-2xl border-[#9333EA]"
            : "ring-0"
        }`}
      >
        {/* Lesson Navigation Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-[#FAF8FD] via-[#FAF5FF] to-[#EFF6FF] border-b border-[#E8E0F0] space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-lg bg-[#9333EA] text-white text-xs font-mono font-bold">
                Lesson #{currentIndex + 1} of {APOSTLE_MATH_LESSONS.length}
              </span>
              <span className="text-xs font-mono font-bold text-[#9333EA] uppercase tracking-wider">
                {selectedLesson.mathBranch}
              </span>
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-1.5">
              <button
                onClick={handlePrevLesson}
                disabled={currentIndex <= 0}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Previous Lesson"
              >
                <ChevronLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Prev</span>
              </button>

              <button
                onClick={handleNextLesson}
                disabled={currentIndex >= APOSTLE_MATH_LESSONS.length - 1}
                className="p-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 disabled:opacity-30 text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                title="Next Lesson"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif font-bold text-[#16235A]">
                {selectedLesson.title}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 font-sans mt-1">
                {selectedLesson.subtitle}
              </p>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setPictureDevotion(convertApostleMathToDevotion(selectedLesson))}
                className="p-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer hover:scale-105 active:scale-95"
                title="Turn Lesson into Ultra-HD Devotion Picture Card & Download"
              >
                <ImageIcon className="w-4 h-4 text-slate-950" />
                <span className="inline font-bold">Devotion Picture</span>
              </button>

              <button
                onClick={() => printDevotionOnePageDocument(convertApostleMathToDevotion(selectedLesson))}
                className="p-2.5 rounded-xl bg-slate-900 text-amber-300 border border-amber-500/40 hover:bg-slate-800 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs"
                title="Download / Print 1-Page Document"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span className="inline font-bold">1-Page PDF</span>
              </button>

              <button
                onClick={() => handleCopyText(selectedLesson)}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Copy Sermon"
              >
                {copiedId === selectedLesson.id ? (
                  <Check className="w-4 h-4 text-emerald-600" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
                <span className="hidden sm:inline">Copy</span>
              </button>

              <button
                onClick={() => onToggleBookmark({
                  id: selectedLesson.id,
                  type: "devotion",
                  title: selectedLesson.title,
                  reference: selectedLesson.keyScripture.reference,
                  text: selectedLesson.mathemaSermon,
                  theme: selectedLesson.mathBranch
                })}
                className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs"
                title="Save Bookmark"
              >
                <Bookmark className={`w-4 h-4 ${isBookmarked(selectedLesson.id) ? "fill-[#9333EA] text-[#9333EA]" : ""}`} />
                <span className="hidden sm:inline">Bookmark</span>
              </button>

              <button
                onClick={() => onToggleSpeak(
                  `${selectedLesson.title}. ${selectedLesson.subtitle}. Key scripture: ${selectedLesson.keyScripture.text} from ${selectedLesson.keyScripture.reference}. MathemaSermon: ${selectedLesson.mathemaSermon}. Prayer: ${selectedLesson.prayer}`
                )}
                className={`p-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-2xs ${
                  isSpeaking
                    ? "bg-amber-100 text-amber-800 border border-amber-300"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
                title="Listen to Sermon"
              >
                {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[#9333EA]" />}
                <span className="hidden sm:inline">{isSpeaking ? "Stop" : "Listen"}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Lesson Structured Content */}
        <div className="p-6 sm:p-8 space-y-6 text-[#16235A] font-sans">
          {/* STEP 1: MATHEMATICAL PRINCIPLE & FORMULA (Standardized LaTeX, Auto-wrapped) */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#0F172A] tracking-wider">
                <Calculator className="w-4 h-4 text-[#B48C35]" /> 1. Standardized Mathematical Formulation (LaTeX)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-amber-50 border border-amber-200 text-amber-900 font-bold">
                Auto-Responsive Formula
              </span>
            </div>

            <div className="text-sm font-semibold text-[#0F172A]">
              <RichMathContent content={selectedLesson.mathPrinciple} />
            </div>

            {selectedLesson.mathFormula && (
              <div className="p-4 sm:p-6 rounded-2xl bg-[#0F172A] border-2 border-[#B48C35] shadow-md flex items-center justify-center text-center overflow-x-hidden max-w-full">
                <MathView math={selectedLesson.mathFormula} block={true} className="text-base sm:text-xl text-[#FDE68A] font-semibold tracking-wide" />
              </div>
            )}

            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed font-sans bg-[#FDFBF7] p-4 rounded-xl border border-[#E5D5BC]">
              <RichMathContent content={selectedLesson.mathIllustration} />
            </div>
          </div>

          {/* STEP 2: LIFE CONNECTION */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#0F172A] tracking-wider">
              <Lightbulb className="w-4 h-4 text-[#B48C35]" /> 2. The Life Connection
            </div>
            <div className="text-sm sm:text-base text-slate-800 leading-relaxed bg-[#FDFBF7] p-4 rounded-xl border border-[#E5D5BC]">
              <RichMathContent content={selectedLesson.lifeConnection} />
            </div>
          </div>

          {/* STEP 3: BIBLICAL TRUTH */}
          <div className="p-5 rounded-2xl bg-white border border-[#E5D5BC] space-y-3 shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold font-mono uppercase text-[#B48C35] tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> 3. Biblical Truth
              </span>
              {onNavigateToBible && (
                <button
                  onClick={() => onNavigateToBible(
                    selectedLesson.keyScripture.reference.split(" ")[0],
                    parseInt(selectedLesson.keyScripture.reference.split(" ")[1]?.split(":")[0] || "1", 10)
                  )}
                  className="text-xs text-[#B48C35] hover:underline font-bold flex items-center gap-1 cursor-pointer"
                >
                  Open in Bible <ExternalLink className="w-3 h-3" />
                </button>
              )}
            </div>
            <blockquote className="text-base sm:text-lg font-serif italic text-[#0F172A] border-l-4 border-[#B48C35] pl-4 py-1">
              "{selectedLesson.keyScripture.text}"
            </blockquote>
            <p className="text-xs font-bold font-mono text-[#64748B]">
              — {selectedLesson.keyScripture.reference} (Holy Bible)
            </p>
            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed pt-1">
              <RichMathContent content={selectedLesson.biblicalTruth} />
            </div>
          </div>

          {/* STEP 4: MATHEMASERMON */}
          <div className="p-6 rounded-2xl bg-[#F8F4EB] border border-[#DCC398] text-[#0F172A] space-y-3 shadow-xs">
            <div className="flex items-center gap-2 text-xs font-bold font-mono uppercase text-[#B48C35] tracking-wider">
              <Quote className="w-4 h-4 text-[#B48C35]" /> 4. MathemaSermon Exposition
            </div>
            <div className="text-sm sm:text-base leading-relaxed font-serif text-[#0F172A] italic">
              <RichMathContent content={`"${selectedLesson.mathemaSermon}"`} className="text-[#0F172A]" />
            </div>
          </div>

          {/* STEP 5: PRACTICAL APPLICATION */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase text-[#16235A] tracking-wider">
              5. Practical Spiritual Applications
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {selectedLesson.practicalApplication.map((app, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-700 leading-relaxed flex items-start gap-2"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{app}</span>
                </div>
              ))}
            </div>
          </div>

          {/* STEP 6: GUIDED PRAYER */}
          <div className="p-4 rounded-xl bg-amber-50/80 border border-amber-200 text-[#16235A] space-y-1.5">
            <span className="text-xs font-bold font-mono uppercase text-amber-800 tracking-wider">
              6. Concluding Prayer
            </span>
            <p className="text-xs sm:text-sm italic font-serif leading-relaxed text-amber-950">
              "{selectedLesson.prayer}"
            </p>
          </div>

          {/* Bottom Arrow Navigation Bar */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 border border-purple-200/80 flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs">
            <button
              onClick={handlePrevLesson}
              disabled={currentIndex <= 0}
              className={`w-full sm:w-auto px-4 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                currentIndex > 0
                  ? "bg-white hover:bg-purple-100 text-slate-800 hover:text-purple-900 border border-slate-200 shadow-2xs"
                  : "opacity-40 cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200"
              }`}
            >
              <ArrowLeft className="w-4 h-4 text-[#9333EA]" />
              <span className="truncate max-w-[200px]">
                {currentIndex > 0 ? `Previous: ${APOSTLE_MATH_LESSONS[currentIndex - 1].title}` : "Previous Lesson"}
              </span>
            </button>

            <div className="text-center">
              <span className="text-[11px] font-mono font-bold text-purple-900 bg-purple-100/80 px-3 py-1 rounded-full border border-purple-200">
                Lesson {currentIndex + 1} of {APOSTLE_MATH_LESSONS.length}
              </span>
            </div>

            <button
              onClick={handleNextLesson}
              className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#9333EA] hover:brightness-110 text-white text-xs font-bold flex items-center justify-center gap-2 transition-all shadow-md shadow-blue-500/20 cursor-pointer"
            >
              <span className="truncate max-w-[220px]">
                {currentIndex < APOSTLE_MATH_LESSONS.length - 1
                  ? `Next: ${APOSTLE_MATH_LESSONS[currentIndex + 1].title}`
                  : "Next Lesson"}
              </span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 5. Interactive LaTeX Equation Laboratory */}
      <div className="p-6 rounded-3xl bg-white border border-[#E8E0F0] shadow-sm space-y-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-[#9333EA]" />
            <h3 className="text-base font-bold font-serif text-[#16235A]">
              Interactive Mathematical Laboratory (Live Solvers & Simulators)
            </h3>
          </div>
          <span className="text-xs font-mono text-purple-600 font-bold bg-purple-50 px-2.5 py-1 rounded-md">
            KaTeX Powered
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Simultaneous Equation Solver */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase text-[#2563EB]">
              Simultaneous Faith System:
            </h4>
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-center overflow-x-hidden max-w-full">
              <MathView math={`\\begin{cases} x + y = ${simEqSum} \\\\ x - y = ${simEqDiff} \\end{cases}`} block={true} />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-600 mb-1">Sum Parameter (x + y = {simEqSum}):</label>
                <input
                  type="range"
                  min="2"
                  max="30"
                  value={simEqSum}
                  onChange={(e) => setSimEqSum(parseInt(e.target.value, 10))}
                  className="w-full accent-[#2563EB]"
                />
              </div>
              <div>
                <label className="block text-slate-600 mb-1">Diff Parameter (x - y = {simEqDiff}):</label>
                <input
                  type="range"
                  min="0"
                  max="14"
                  value={simEqDiff}
                  onChange={(e) => setSimEqDiff(parseInt(e.target.value, 10))}
                  className="w-full accent-[#2563EB]"
                />
              </div>
            </div>

            <div className="p-3 rounded-lg bg-blue-900 text-white text-xs font-mono text-center space-y-1">
              <p className="text-blue-200">Calculated Solution Coordinates:</p>
              <div className="py-1 flex justify-center overflow-x-hidden max-w-full">
                <MathView math={`\\begin{pmatrix} x \\\\ y \\end{pmatrix} = \\begin{pmatrix} ${simX} \\\\ ${simY} \\end{pmatrix}`} block={false} />
              </div>
              <p className="text-[10px] text-blue-200 pt-1">
                "When two spiritual dimensions combine, what was unknown is fully revealed."
              </p>
            </div>
          </div>

          {/* Gradient Slope Tool */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
            <h4 className="text-xs font-bold font-mono uppercase text-[#9333EA]">
              Spiritual Gradient Trajectory:
            </h4>
            <div className="p-3 bg-white rounded-lg border border-slate-200 flex justify-center overflow-x-hidden max-w-full">
              <MathView math={`y = ${gradientM}x + c \\quad \\Big(m = \\frac{\\Delta y}{\\Delta x} = ${gradientM}\\Big)`} block={true} />
            </div>

            <div>
              <label className="flex justify-between text-xs text-slate-600 mb-1">
                <span>Gradient (m):</span>
                <span className={`font-bold ${gradientM > 0 ? "text-emerald-600" : gradientM < 0 ? "text-red-600" : "text-slate-600"}`}>
                  {gradientM > 0 ? `+${gradientM} (Ascending Growth)` : gradientM < 0 ? `${gradientM} (Declining)` : "0.0 (Stagnant)"}
                </span>
              </label>
              <input
                type="range"
                min="-3"
                max="3"
                step="0.5"
                value={gradientM}
                onChange={(e) => setGradientM(parseFloat(e.target.value))}
                className="w-full accent-[#9333EA]"
              />
            </div>

            <div className={`p-3 rounded-lg text-xs font-mono text-center space-y-1 ${
              gradientM > 0 ? "bg-emerald-900 text-emerald-100" : gradientM < 0 ? "bg-red-950 text-red-100" : "bg-slate-800 text-slate-100"
            }`}>
              <p className="text-xs font-bold">
                {gradientM > 0 ? "✓ Positive Spiritual Gradient (2 Peter 3:18)" : gradientM < 0 ? "⚠️ Negative Gradient — Return to Prayer" : "⚠️ Zero Gradient — Danger of Lukewarm Stagnation"}
              </p>
              <p className="text-[10px] opacity-80">
                "The question is not only where am I, but which direction am I moving?"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 6. AI MathemaSermon Explorer */}
      <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-950 via-[#16235A] to-slate-900 text-white border border-purple-500/40 space-y-4 shadow-xl">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-xl bg-purple-500/20 border border-purple-400/30">
            <Sparkles className="w-5 h-5 text-purple-300" />
          </div>
          <div>
            <h3 className="text-base font-bold font-serif">
              AI MathemaSermon Explorer (Ultra-Fast Response)
            </h3>
            <p className="text-xs text-slate-300">
              Enter any mathematical concept (e.g. Fourier Transform, Navier-Stokes, Complex Roots, Probability) to generate an expository outline.
            </p>
          </div>
        </div>

        <form onSubmit={handleGenerateAiMathemaSermon} className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={customMathTopic}
            onChange={(e) => setCustomMathTopic(e.target.value)}
            placeholder="e.g. Euler's Identity, Bayes' Theorem, Eigenvalues..."
            className="flex-1 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#9333EA]"
          />
          <input
            type="text"
            value={customScripture}
            onChange={(e) => setCustomScripture(e.target.value)}
            placeholder="Anchor Scripture (e.g. John 14:6)"
            className="sm:w-60 px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-none focus:border-[#9333EA]"
          />
          <button
            type="submit"
            disabled={isGeneratingAi || (!customMathTopic.trim() && !customScripture.trim())}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#9333EA] to-[#DB2777] hover:brightness-110 text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer disabled:opacity-50 shadow-md"
          >
            {isGeneratingAi ? (
              <span>Generating...</span>
            ) : (
              <>
                <Send className="w-3.5 h-3.5" />
                <span>Explore</span>
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
