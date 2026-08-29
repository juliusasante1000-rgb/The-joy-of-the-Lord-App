import React, { useState, useMemo, useEffect } from "react";
import {
  GraduationCap,
  Search,
  BookOpen,
  Cross,
  Flame,
  Shield,
  Sparkles,
  HeartHandshake,
  Sun,
  ChevronRight,
  Bookmark,
  Share2,
  X,
  Send,
  RefreshCw,
  Volume2,
  CheckCircle2,
  AlertCircle,
  Crown,
  Scroll,
  Layers,
  ChevronDown
} from "lucide-react";
import { CHURCH_TENETS, DOCTRINE_CATEGORIES, DOCTRINE_ARTICLES } from "../data/doctrinalData";
import { DoctrineCategory, DoctrineArticle, ChurchTenet } from "../types";
import { fetchAiWithRetry, getCachedAiHistory } from "../utils/aiClient";

interface DoctrinesTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak: (text: string) => void;
}

export const DoctrinesTab: React.FC<DoctrinesTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  onToggleSpeak
}) => {
  const [activeViewMode, setActiveViewMode] = useState<"tenets" | "systematic" | "askAi">("tenets");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeArticleModal, setActiveArticleModal] = useState<DoctrineArticle | null>(null);
  const [activeTenetModal, setActiveTenetModal] = useState<ChurchTenet | null>(null);
  const [expandedTenetId, setExpandedTenetId] = useState<string | null>(null);

  // AI Q&A Assistant state
  const [aiQuestion, setAiQuestion] = useState("");
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);

  useEffect(() => {
    const cached = getCachedAiHistory<{ question: string; answer: string }>("joy_doctrine_ai_history");
    if (cached && cached.length > 0 && !aiAnswer) {
      setAiAnswer(cached[0].answer);
      setAiQuestion(cached[0].question || "");
    }
  }, []);

  // Icon mapping
  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Cross":
        return <Cross className="w-5 h-5 text-amber-600" />;
      case "Flame":
        return <Flame className="w-5 h-5 text-amber-500" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-indigo-600" />;
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-yellow-500" />;
      case "HeartHandshake":
        return <HeartHandshake className="w-5 h-5 text-rose-600" />;
      case "Sun":
        return <Sun className="w-5 h-5 text-amber-500" />;
      case "Crown":
        return <Crown className="w-5 h-5 text-amber-600" />;
      default:
        return <BookOpen className="w-5 h-5 text-amber-600" />;
    }
  };

  // Filter Church Tenets
  const filteredTenets = useMemo(() => {
    return CHURCH_TENETS.filter((tenet) => {
      const matchesSearch =
        !searchQuery ||
        tenet.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenet.statement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenet.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tenet.scripturalReferences.some((r) => r.reference.toLowerCase().includes(searchQuery.toLowerCase()));
      return matchesSearch;
    });
  }, [searchQuery]);

  // Filter categories and articles
  const filteredCategories = useMemo(() => {
    if (selectedCategory === "all") return DOCTRINE_CATEGORIES;
    return DOCTRINE_CATEGORIES.filter((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  const filteredArticles = useMemo(() => {
    return DOCTRINE_ARTICLES.filter((art) => {
      const matchesCat = selectedCategory === "all" || art.categoryId === selectedCategory;
      const matchesQuery =
        !searchQuery ||
        art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.theologicalOverview.toLowerCase().includes(searchQuery.toLowerCase()) ||
        art.subtitle.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesQuery;
    });
  }, [selectedCategory, searchQuery]);

  const handleAskDoctrinalAi = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || isAskingAi) return;

    setAiAnswer("");
    setIsAskingAi(true);
    setAiError(null);

    try {
      const res = await fetchAiWithRetry<{ answer: string; scriptures?: string[]; keyTakeaway?: string }>(
        "/api/ask-doctrine",
        {
          question: aiQuestion.trim(),
          category: selectedCategory !== "all" ? selectedCategory : "Christian Orthodoxy"
        },
        {
          maxRetries: 2,
          retryDelayMs: 2000,
          storageKey: "joy_doctrine_ai_history"
        }
      );

      if (res.success && res.data && res.data.answer) {
        setAiAnswer(res.data.answer);
      } else {
        setAiError(res.error || "Unable to retrieve doctrinal answer at this time.");
      }
    } catch (err: any) {
      console.error("[DOCTRINE AI ERROR]", err);
      setAiError(err?.message || "An unexpected error occurred during doctrinal query.");
    } finally {
      setIsAskingAi(false);
    }
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="p-6 rounded-lg bg-[#0F172A] text-white shadow-md border-b-4 border-[#B48C35] space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-full bg-[#B48C35] text-white shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-serif tracking-tight text-white">
                Doctrines of the Church
              </h2>
              <p className="text-xs sm:text-sm text-[#DCC398] font-serif italic">
                Articles of Faith, foundational theology & systematic biblical truth
              </p>
            </div>
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1.5 p-1 bg-white/10 rounded-lg border border-white/15 shrink-0 overflow-x-auto">
            <button
              onClick={() => setActiveViewMode("tenets")}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeViewMode === "tenets"
                  ? "bg-[#B48C35] text-white shadow-xs"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Scroll className="w-3.5 h-3.5" />
              <span>Core Tenets of Faith</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                {CHURCH_TENETS.length}
              </span>
            </button>
            <button
              onClick={() => setActiveViewMode("systematic")}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeViewMode === "systematic"
                  ? "bg-[#B48C35] text-white shadow-xs"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Systematic Pillars</span>
              <span className="ml-1 px-1.5 py-0.2 rounded-full bg-black/30 text-[10px]">
                {DOCTRINE_CATEGORIES.length}
              </span>
            </button>
            <button
              onClick={() => setActiveViewMode("askAi")}
              className={`px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all whitespace-nowrap ${
                activeViewMode === "askAi"
                  ? "bg-[#B48C35] text-white shadow-xs"
                  : "text-slate-200 hover:text-white hover:bg-white/10"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ask AI Scholar</span>
            </button>
          </div>
        </div>

        {/* Search Doctrine Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-[#DCC398] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search doctrines (e.g. Trinity, Infallibility, Depravity, Virgin Birth, Baptism of Holy Ghost, Tithes, Second Coming)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1A2A44] border border-white/10 rounded text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#B48C35]"
          />
        </div>

        {/* Category Pills when in Systematic view */}
        {activeViewMode === "systematic" && (
          <div className="flex items-center gap-2 overflow-x-auto pt-1 pb-1 scrollbar-none">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                selectedCategory === "all"
                  ? "bg-[#B48C35] text-white shadow-xs"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              All Pillars ({DOCTRINE_CATEGORIES.length})
            </button>
            {DOCTRINE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedCategory === cat.id
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW 1: CORE TENETS OF FAITH */}
      {activeViewMode === "tenets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/80 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#B48C35]" /> Official Articles & Tenets of Faith ({filteredTenets.length})
            </h3>
            <span className="text-[11px] text-[#64748B] italic">
              De-duplicated, comprehensive orthodox Christian confession
            </span>
          </div>

          <div className="space-y-3.5">
            {filteredTenets.map((tenet) => {
              const isExpanded = expandedTenetId === tenet.id;
              const bookmarked = isBookmarked(tenet.id, "doctrine");

              return (
                <div
                  key={tenet.id}
                  className="rounded-lg bg-white border border-[#E5D5BC] shadow-xs hover:border-[#B48C35] transition-all overflow-hidden"
                >
                  {/* Header Row */}
                  <div className="p-4 sm:p-5 flex items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      <div className="w-8 h-8 rounded-full bg-[#0F172A] text-[#DCC398] font-serif font-bold text-sm flex items-center justify-center shrink-0 border border-[#B48C35]">
                        {tenet.number}
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F1E6D2] text-[#B48C35] border border-[#DCC398]/60 inline-block">
                          {tenet.category}
                        </span>
                        <h4 className="text-base sm:text-lg font-serif font-bold text-[#0F172A]">
                          {tenet.title}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>
                          onToggleSpeak(
                            `Tenet ${tenet.number}: ${tenet.title}. Statement: ${tenet.statement}`
                          )
                        }
                        className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors"
                        title="Listen to Tenet"
                      >
                        <Volume2 className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() =>
                          onToggleBookmark({
                            type: "doctrine",
                            title: `Tenet ${tenet.number}: ${tenet.title}`,
                            reference: tenet.category,
                            snippet: tenet.statement,
                            targetId: tenet.id
                          })
                        }
                        className={`p-2 rounded transition-colors ${
                          bookmarked
                            ? "text-[#B48C35] bg-[#F1E6D2]"
                            : "text-slate-400 hover:text-[#B48C35] hover:bg-[#FDFBF7]"
                        }`}
                        title="Bookmark Tenet"
                      >
                        <Bookmark className={`w-4 h-4 ${bookmarked ? "fill-current" : ""}`} />
                      </button>

                      <button
                        onClick={() =>
                          onShareItem(
                            `Church Tenet ${tenet.number}: ${tenet.title}`,
                            tenet.statement,
                            tenet.scripturalReferences[0]?.reference,
                            tenet.category
                          )
                        }
                        className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors"
                        title="Share Tenet"
                      >
                        <Share2 className="w-4 h-4 text-[#B48C35]" />
                      </button>

                      <button
                        onClick={() => setExpandedTenetId(isExpanded ? null : tenet.id)}
                        className="p-2 rounded text-[#0F172A] hover:bg-[#F1E6D2] transition-colors"
                        title={isExpanded ? "Collapse" : "Expand Breakdown"}
                      >
                        <ChevronDown
                          className={`w-5 h-5 text-[#B48C35] transition-transform duration-200 ${
                            isExpanded ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Confessional Statement */}
                  <div className="px-4 sm:px-5 pb-4">
                    <p className="text-xs sm:text-sm font-serif leading-relaxed text-[#1A2A44] bg-[#FDFBF7] p-3.5 rounded-md border-l-3 border-[#B48C35] border border-[#E5D5BC]">
                      "{tenet.statement}"
                    </p>
                  </div>

                  {/* Scriptural Proofs Badges */}
                  <div className="px-4 sm:px-5 pb-4 flex flex-wrap items-center gap-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C35] mr-1">
                      Scripture Proofs:
                    </span>
                    {tenet.scripturalReferences.map((ref, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-0.5 rounded bg-white text-[#0F172A] text-[11px] font-mono border border-[#E5D5BC] shadow-2xs hover:border-[#B48C35] transition-colors cursor-help"
                        title={ref.text}
                      >
                        {ref.reference}
                      </span>
                    ))}
                  </div>

                  {/* Expandable Deep Breakdown */}
                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-3 border-t border-[#E5D5BC] bg-[#FAF7F2] space-y-3.5 animate-in fade-in duration-200">
                      <div className="space-y-1.5">
                        <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#B48C35]" /> Doctrinal Pillars & Theological Breakdown:
                        </h5>
                        <ul className="space-y-1 text-xs text-[#334155] pl-1">
                          {tenet.theologicalBreakdown.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-[#B48C35] font-bold shrink-0">•</span>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Full Scripture Passages Accordion */}
                      <div className="space-y-1.5">
                        <h5 className="text-[11px] font-bold uppercase tracking-wider text-[#0F172A] flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" /> Scripture Passages in Full:
                        </h5>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {tenet.scripturalReferences.map((ref, i) => (
                            <div
                              key={i}
                              className="p-2.5 rounded bg-white border border-[#E5D5BC] text-xs space-y-1"
                            >
                              <span className="font-bold text-[#0F172A] font-mono text-[11px] block text-[#B48C35]">
                                {ref.reference}
                              </span>
                              <p className="italic font-serif text-[#334155] text-[11px] leading-relaxed">
                                "{ref.text}"
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Practical Application */}
                      <div className="p-3 rounded bg-white border border-[#DCC398] text-xs space-y-1">
                        <span className="font-bold uppercase tracking-wider text-[#0F172A] block text-[11px]">
                          Practical Discipleship Walking:
                        </span>
                        <p className="text-[#475569] leading-relaxed font-serif">
                          {tenet.practicalApplication}
                        </p>
                      </div>

                      <div className="flex justify-end pt-1">
                        <button
                          onClick={() => setActiveTenetModal(tenet)}
                          className="py-1.5 px-4 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>Full Tenet Study Modal</span>
                          <ChevronRight className="w-3.5 h-3.5 text-[#DCC398]" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* VIEW 2: SYSTEMATIC DOCTRINAL PILLARS */}
      {activeViewMode === "systematic" && (
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/80 flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-[#B48C35]" /> Core Systematic Heads of Doctrine ({filteredCategories.length})
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="p-6 rounded-lg bg-white border border-[#E5D5BC] shadow-xs hover:border-[#B48C35] transition-all space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded bg-[#F1E6D2] border border-[#DCC398]">
                        {getCategoryIcon(category.icon)}
                      </div>
                      <div>
                        <h4 className="text-lg font-serif text-[#0F172A] font-bold">
                          {category.title}
                        </h4>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-[#B48C35]">
                          {category.doctrinalFocus}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() =>
                        onToggleBookmark({
                          type: "doctrine",
                          title: category.title,
                          reference: category.doctrinalFocus,
                          snippet: category.shortDesc,
                          targetId: category.id
                        })
                      }
                      className={`p-2 rounded transition-colors ${
                        isBookmarked(category.id, "doctrine")
                          ? "text-[#B48C35] bg-[#F1E6D2]"
                          : "text-slate-400 hover:text-[#B48C35] hover:bg-[#FDFBF7]"
                      }`}
                      title="Bookmark Doctrine"
                    >
                      <Bookmark className={`w-4 h-4 ${isBookmarked(category.id, "doctrine") ? "fill-current" : ""}`} />
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm text-[#334155] leading-relaxed">
                    {category.shortDesc}
                  </p>

                  {/* Key Scriptures Preview */}
                  <div className="p-3.5 rounded-lg bg-[#FDFBF7] border border-[#E5D5BC] space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#B48C35] block">
                      Scriptural Anchor Passages:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {category.keyScriptures.slice(0, 3).map((ks, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-0.5 rounded bg-white text-[#1A2A44] text-[11px] font-mono border border-[#E5D5BC]"
                          title={ks.text}
                        >
                          {ks.reference}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Foundational Insights Bullet points */}
                  <div className="space-y-1 text-xs text-[#475569]">
                    {category.foundationalDocumentInsights.map((insight, idx) => (
                      <p key={idx} className="flex items-start gap-1.5">
                        <span className="text-[#B48C35] font-bold">•</span>
                        <span>{insight}</span>
                      </p>
                    ))}
                  </div>
                </div>

                {/* Read deep article button */}
                <div className="pt-3 border-t border-[#E5D5BC] flex items-center justify-between">
                  <button
                    onClick={() => {
                      const matchedArt =
                        DOCTRINE_ARTICLES.find((a) => a.categoryId === category.id) ||
                        DOCTRINE_ARTICLES[0];
                      setActiveArticleModal(matchedArt);
                    }}
                    className="py-2 px-4 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <span>Explore Deep Study</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#DCC398]" />
                  </button>

                  <button
                    onClick={() =>
                      onShareItem(
                        category.title,
                        category.theologicalSummary,
                        category.keyScriptures[0]?.reference,
                        category.shortDesc
                      )
                    }
                    className="p-2 rounded text-slate-500 hover:text-[#0F172A] hover:bg-[#FDFBF7] transition-colors"
                    title="Share Doctrine Summary"
                  >
                    <Share2 className="w-4 h-4 text-[#B48C35]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 3 / DEDICATED AI DOCTRINAL ASSISTANT */}
      {(activeViewMode === "askAi" || aiAnswer) && (
        <div className="p-6 rounded-lg bg-white border border-[#E5D5BC] shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded bg-[#F1E6D2] text-[#B48C35] border border-[#DCC398]">
                <Sparkles className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F172A]">
                  Ask the Doctrinal & Theological Scholar
                </h3>
                <p className="text-xs text-[#64748B]">
                  Grounded in Holy Scripture, Church Tenets, and historic orthodox theology
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleAskDoctrinalAi} className="flex flex-col sm:flex-row gap-2">
            <input
              type="text"
              placeholder="Ask a theological or doctrinal question (e.g. 'Explain the Trinity vs modalism', 'Why is tithing obligatory?', 'What are the 9 gifts of the Spirit?')..."
              value={aiQuestion}
              onChange={(e) => setAiQuestion(e.target.value)}
              className="flex-1 px-3.5 py-2.5 bg-[#FDFBF7] border border-[#E5D5BC] rounded text-xs sm:text-sm text-[#1A2A44] placeholder:text-slate-400 focus:outline-hidden focus:border-[#B48C35]"
            />
            <button
              type="submit"
              disabled={isAskingAi || !aiQuestion.trim()}
              className="py-2.5 px-6 rounded bg-[#0F172A] hover:bg-[#B48C35] disabled:opacity-50 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs"
            >
              {isAskingAi ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Researching...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 text-[#DCC398]" />
                  <span>Ask Scholar</span>
                </>
              )}
            </button>
          </form>

          {/* Prompt suggestions */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-[#64748B] text-[11px] font-bold uppercase">Quick Topics:</span>
            {[
              "Explain the Trinity and unity of God",
              "What does the Bible teach about falling from grace?",
              "What are the 9 gifts of the Holy Spirit?",
              "Why are tithes and offerings obligatory?",
              "What is the biblical basis for baptism by immersion?"
            ].map((topic, i) => (
              <button
                key={i}
                onClick={() => setAiQuestion(topic)}
                className="px-2.5 py-1 rounded bg-[#FDFBF7] text-[#0F172A] hover:bg-[#F1E6D2] border border-[#E5D5BC] text-[11px] transition-colors"
              >
                {topic}
              </button>
            ))}
          </div>

          {/* AI Error Alert */}
          {aiError && (
            <div className="p-3.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 flex items-start gap-2 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Doctrinal Scholar Notice</p>
                <p>{aiError}</p>
              </div>
            </div>
          )}

          {/* AI Answer Card */}
          {aiAnswer && (
            <div className="p-5 rounded-lg bg-[#FDFBF7] border-l-4 border-[#B48C35] border border-[#E5D5BC] space-y-2.5 animate-in fade-in duration-200">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" /> Grounded Biblical & Theological Insight:
                </span>
                <button
                  onClick={() => onToggleSpeak(aiAnswer)}
                  className="text-xs text-[#0F172A] hover:underline font-bold uppercase tracking-widest flex items-center gap-1"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#B48C35]" /> Read Aloud
                </button>
              </div>
              <div className="text-xs sm:text-sm leading-relaxed text-[#1A2A44] whitespace-pre-line font-serif">
                {aiAnswer}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tenet Study Modal */}
      {activeTenetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-xl shadow-2xl border-2 border-[#B48C35] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5D5BC] flex items-center justify-between bg-[#0F172A] text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DCC398]">
                  Article of Faith #{activeTenetModal.number} • {activeTenetModal.category}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white font-bold">
                  {activeTenetModal.title}
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    onToggleSpeak(
                      `Tenet ${activeTenetModal.number}: ${activeTenetModal.title}. ${activeTenetModal.statement}`
                    )
                  }
                  className="p-2 rounded text-[#DCC398] hover:bg-white/10 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTenetModal(null)}
                  className="p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1A2A44]">
              {/* Statement */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Official Confessional Statement
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#0F172A] font-serif bg-white p-4 rounded-lg border-l-4 border-[#B48C35] border border-[#E5D5BC]">
                  "{activeTenetModal.statement}"
                </p>
              </div>

              {/* Breakdown */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Theological Pillars & Breakdown
                </h4>
                <div className="space-y-2">
                  {activeTenetModal.theologicalBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-white border border-[#E5D5BC] text-xs text-[#334155] flex items-start gap-2"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#B48C35] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scriptural Proofs */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Scriptural Prooftexts
                </h4>
                <div className="space-y-2">
                  {activeTenetModal.scripturalReferences.map((ref, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#F1E6D2] border border-[#DCC398] text-xs space-y-1"
                    >
                      <span className="font-bold text-[#0F172A] block font-mono text-[#B48C35]">
                        {ref.reference}
                      </span>
                      <p className="italic font-serif text-[#1A2A44]">
                        "{ref.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Application */}
              <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider text-[#0F172A] block">
                  Practical Discipleship Walking:
                </span>
                <p className="text-[#475569] leading-relaxed font-serif">
                  {activeTenetModal.practicalApplication}
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E5D5BC] flex justify-end gap-2 bg-white">
              <button
                onClick={() => setActiveTenetModal(null)}
                className="py-2 px-6 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white font-bold uppercase tracking-widest text-xs transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Systematic Article Deep-Dive Study Modal */}
      {activeArticleModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-xl shadow-2xl border-2 border-[#B48C35] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5D5BC] flex items-center justify-between bg-[#0F172A] text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DCC398]">
                  {activeArticleModal.categoryTitle}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white font-bold">
                  {activeArticleModal.title}
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    onToggleSpeak(
                      `${activeArticleModal.title}. ${activeArticleModal.theologicalOverview}. Confessional Basis: ${activeArticleModal.historicalAndConfessionalBasis}`
                    )
                  }
                  className="p-2 rounded text-[#DCC398] hover:bg-white/10 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveArticleModal(null)}
                  className="p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1A2A44]">
              <p className="text-xs sm:text-sm italic font-serif text-[#0F172A] border-l-4 border-[#B48C35] pl-4 py-1 bg-white rounded-r">
                {activeArticleModal.subtitle}
              </p>

              {/* Theological Overview */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Theological Overview
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#334155] font-serif">
                  {activeArticleModal.theologicalOverview}
                </p>
              </div>

              {/* Doctrinal Pillars */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Core Biblical Pillars
                </h4>
                <div className="space-y-2">
                  {activeArticleModal.doctrinalPillars.map((p, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-white border border-[#E5D5BC] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <strong className="text-xs font-bold text-[#0F172A]">
                          {p.title}
                        </strong>
                        <span className="text-[11px] font-mono font-semibold text-[#B48C35]">
                          {p.scripture}
                        </span>
                      </div>
                      <p className="text-xs text-[#334155]">
                        {p.explanation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Cross-Referenced Scriptures */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Scriptural Prooftexts
                </h4>
                <div className="space-y-2">
                  {activeArticleModal.keyScriptures.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#F1E6D2] border border-[#DCC398] text-xs space-y-1"
                    >
                      <span className="font-bold text-[#0F172A] block font-mono">
                        {s.ref}
                      </span>
                      <p className="italic font-serif text-[#1A2A44]">
                        "{s.text}"
                      </p>
                      <p className="text-[11px] text-[#64748B]">
                        Context: {s.context}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Practical Application */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Practical Discipleship Application
                </h4>
                <ul className="space-y-1.5 text-xs text-[#334155] list-disc list-inside">
                  {activeArticleModal.practicalApplication.map((app, idx) => (
                    <li key={idx}>{app}</li>
                  ))}
                </ul>
              </div>

              {/* Confessional Basis */}
              <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] text-xs space-y-1">
                <span className="font-bold uppercase tracking-wider text-[#0F172A] block">
                  Historical & Confessional Foundation:
                </span>
                <p className="text-[#475569] leading-relaxed">
                  {activeArticleModal.historicalAndConfessionalBasis}
                </p>
              </div>

              {/* Guided Reflection */}
              <div className="p-5 rounded-lg bg-[#F1E6D2] border-l-4 border-[#B48C35] border border-[#DCC398] text-xs space-y-1.5">
                <span className="font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#B48C35]" /> Prayerful Reflection:
                </span>
                <p className="italic font-serif text-[#0F172A] leading-relaxed">
                  "{activeArticleModal.guidedReflection}"
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E5D5BC] flex justify-end gap-2 bg-white">
              <button
                onClick={() => setActiveArticleModal(null)}
                className="py-2 px-6 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white font-bold uppercase tracking-widest text-xs transition-colors"
              >
                Done Reading
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
