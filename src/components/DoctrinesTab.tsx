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
  ChevronDown,
  BookMarked,
  SlidersHorizontal,
  Compass,
  Download,
  Printer,
  Image as ImageIcon,
  Copy,
  Check,
  Trash2,
  MessageSquare
} from "lucide-react";
import { CHURCH_TENETS, DOCTRINE_CATEGORIES, DOCTRINE_ARTICLES } from "../data/doctrinalData";
import { SYSTEMATIC_TOPICS_500_CATALOG, ALL_SYSTEMATIC_CATEGORIES } from "../data/systematicTopicsFullCatalog";
import { DoctrineCategory, DoctrineArticle, ChurchTenet, SystematicTopicItem, CreatorProfile, Devotion } from "../types";
import { getCachedAiHistory } from "../utils/aiClient";
import { streamAiContent, getIsFastMode, setIsFastMode } from "../utils/aiStreaming";
import { AiFastLoadingView } from "./AiFastLoadingView";
import { downloadSystematicTopicPicture } from "../utils/sanctuaryPictureExporter";
import { DevotionPictureModal } from "./DevotionPictureModal";

export interface ScholarExchange {
  id: string;
  question: string;
  answer: string;
  timestamp: string;
}

interface DoctrinesTabProps {
  isBookmarked: (targetId: string, type?: string) => boolean;
  onToggleBookmark: (item: any) => void;
  onShareItem: (title: string, text: string, reference?: string, subtext?: string) => void;
  onToggleSpeak: (text: string) => void;
  creatorProfile?: CreatorProfile;
}

export const DoctrinesTab: React.FC<DoctrinesTabProps> = ({
  isBookmarked,
  onToggleBookmark,
  onShareItem,
  onToggleSpeak,
  creatorProfile
}) => {
  const [activeViewMode, setActiveViewMode] = useState<"tenets" | "systematic500" | "pillars" | "askAi">("pillars");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedTopicDivision, setSelectedTopicDivision] = useState<"all" | "part1" | "part2" | "part3" | "part4" | "part5">("all");
  const [activeArticleModal, setActiveArticleModal] = useState<DoctrineArticle | null>(null);
  const [activeTenetModal, setActiveTenetModal] = useState<ChurchTenet | null>(null);
  const [activeTopicModal, setActiveTopicModal] = useState<SystematicTopicItem | null>(null);
  const [expandedTenetId, setExpandedTenetId] = useState<string | null>(null);
  const [expandedTopicId, setExpandedTopicId] = useState<string | null>(null);
  const [topicPage, setTopicPage] = useState<number>(1);
  const [pictureDevotion, setPictureDevotion] = useState<Devotion | null>(null);
  const TOPICS_PER_PAGE = 40;

  const convertTopicToDevotion = (topic: SystematicTopicItem): Devotion => {
    const scripturesList = topic.anchorScriptures.map((s) => s.reference).join("; ");
    const scriptureQuotes = topic.anchorScriptures
      .map((s) => (s.text ? `"${s.text}" (${s.reference})` : s.reference))
      .join("\n\n");
    const insightsList = topic.keyInsights && topic.keyInsights.length > 0
      ? `\n\nKey Insights:\n${topic.keyInsights.map((k) => `• ${k}`).join("\n")}`
      : "";

    return {
      id: `topic-${topic.topicNumber}`,
      edition: "morning",
      editionLabel: `SYSTEMATIC THEOLOGY • ${topic.category.toUpperCase()}`,
      title: `Topic ${topic.topicNumber}: ${topic.title}`,
      keyScripture: scripturesList,
      passageText: scriptureQuotes || topic.title,
      reflection: `${topic.theologicalSummary}${insightsList}\n\nApostolic Significance:\n${topic.practicalApplication || "Sound doctrine anchors the believer in spiritual maturity and fruitfulness."}`,
      practicalApplication: topic.practicalApplication || `Apply ${topic.title} in daily discipleship.`,
      guidedPrayer: `Lord God of All Truth, establish my soul in this sound doctrine. Grant me wisdom and spiritual discernment to walk uprightly in Your Word. Let ${topic.title} bear fruit of righteousness in my life, through Jesus Christ our Lord. Amen.`,
      actionStep: `Meditate upon ${topic.anchorScriptures[0]?.reference || "Scripture"} and apply the truth of ${topic.title} to your daily Christian walk.`,
      theme: topic.category,
      category: "Systematic Theology",
      readTimeMinutes: 3
    };
  };

  // AI Q&A Assistant state
  const [aiQuestion, setAiQuestion] = useState("");
  const [followUpQuestion, setFollowUpQuestion] = useState("");
  const [currentAskingQuestion, setCurrentAskingQuestion] = useState("");
  const [isAskingAi, setIsAskingAi] = useState(false);
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [streamingAiText, setStreamingAiText] = useState("");
  const [streamingProgress, setStreamingProgress] = useState(25);
  const [scholarHistory, setScholarHistory] = useState<ScholarExchange[]>([]);
  const [copiedTurnId, setCopiedTurnId] = useState<string | null>(null);
  const [scholarTheme, setScholarTheme] = useState<"parchment" | "midnight" | "royal" | "morning">("parchment");

  const scholarThemeConfig = {
    parchment: {
      wrapper: "bg-gradient-to-br from-[#FDFBF7] via-[#FAF4EA] to-[#F3E8D4] border-2 border-[#DCC398] text-[#2A1F13] shadow-md",
      headerBorder: "border-[#DCC398]/60",
      titleColor: "text-[#0F172A]",
      subColor: "text-[#64748B]",
      userBubble: "bg-[#0F172A] text-white",
      answerCard: "bg-white/95 border border-[#E5D5BC] border-l-4 border-l-[#B48C35] text-[#1A2A44] shadow-xs",
      answerText: "text-[#1A2A44]",
      badge: "bg-[#F1E6D2] text-[#B48C35] border border-[#DCC398]",
      btn: "hover:bg-[#F1E6D2] text-[#0F172A]",
      icon: "text-[#B48C35]",
      inputBg: "bg-white border-[#E5D5BC] text-[#1A2A44]"
    },
    midnight: {
      wrapper: "bg-gradient-to-br from-[#0B1120] via-[#16235A] to-[#0A102D] border-2 border-[#B48C35]/50 text-slate-100 shadow-2xl",
      headerBorder: "border-white/15",
      titleColor: "text-white",
      subColor: "text-slate-300",
      userBubble: "bg-[#B48C35] text-white",
      answerCard: "bg-[#0F172A]/95 border border-[#B48C35]/40 border-l-4 border-l-[#F59E0B] text-slate-100 shadow-lg",
      answerText: "text-slate-100",
      badge: "bg-[#B48C35]/20 text-[#DCC398] border border-[#B48C35]/40",
      btn: "hover:bg-white/10 text-slate-200",
      icon: "text-[#F59E0B]",
      inputBg: "bg-[#0E1726] border-[#B48C35]/40 text-white placeholder:text-slate-400"
    },
    royal: {
      wrapper: "bg-gradient-to-br from-[#1E1B4B] via-[#2E1065] to-[#172554] border-2 border-amber-400/40 text-amber-50 shadow-2xl",
      headerBorder: "border-amber-400/20",
      titleColor: "text-amber-100",
      subColor: "text-purple-200",
      userBubble: "bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold",
      answerCard: "bg-[#1E1B4B]/95 border border-purple-400/30 border-l-4 border-l-amber-400 text-purple-50 shadow-lg",
      answerText: "text-purple-50",
      badge: "bg-amber-400/20 text-amber-300 border border-amber-400/40",
      btn: "hover:bg-white/10 text-amber-200",
      icon: "text-amber-400",
      inputBg: "bg-[#161338] border-purple-400/40 text-amber-100 placeholder:text-purple-300"
    },
    morning: {
      wrapper: "bg-gradient-to-br from-[#FFFBEB] via-[#FEF3C7] to-[#FDE68A]/40 border-2 border-amber-300 text-[#451A03] shadow-md",
      headerBorder: "border-amber-300/60",
      titleColor: "text-[#451A03]",
      subColor: "text-[#78350F]",
      userBubble: "bg-[#451A03] text-amber-100",
      answerCard: "bg-white/95 border border-amber-200 border-l-4 border-l-amber-600 text-[#451A03] shadow-xs",
      answerText: "text-[#451A03]",
      badge: "bg-amber-100 text-amber-800 border border-amber-300",
      btn: "hover:bg-amber-100 text-[#451A03]",
      icon: "text-amber-700",
      inputBg: "bg-white border-amber-300 text-[#451A03] placeholder:text-amber-600/60"
    }
  };

  useEffect(() => {
    const cached = getCachedAiHistory<{ question: string; answer: string }>("joy_doctrine_ai_history");
    if (cached && cached.length > 0 && scholarHistory.length === 0) {
      const historyList: ScholarExchange[] = cached.slice(0, 10).map((c, i) => ({
        id: `cached-${i}-${Date.now()}`,
        question: c.question || "Theological Inquiry",
        answer: c.answer,
        timestamp: "Saved Inquiry"
      }));
      setScholarHistory(historyList);
      setAiAnswer(cached[0].answer);
    }
  }, []);

  // Reset page on search or category filter change
  useEffect(() => {
    setTopicPage(1);
  }, [searchQuery, selectedCategory, selectedTopicDivision]);

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

  // Filter 500 Systematic Topics
  const filtered500Topics = useMemo(() => {
    return SYSTEMATIC_TOPICS_500_CATALOG.filter((topic) => {
      // Division filter
      if (selectedTopicDivision === "part1" && (topic.topicNumber < 1 || topic.topicNumber > 100)) return false;
      if (selectedTopicDivision === "part2" && (topic.topicNumber < 101 || topic.topicNumber > 200)) return false;
      if (selectedTopicDivision === "part3" && (topic.topicNumber < 201 || topic.topicNumber > 300)) return false;
      if (selectedTopicDivision === "part4" && (topic.topicNumber < 301 || topic.topicNumber > 400)) return false;
      if (selectedTopicDivision === "part5" && (topic.topicNumber < 401 || topic.topicNumber > 500)) return false;

      // Category filter
      if (selectedCategory !== "all" && topic.category !== selectedCategory) return false;

      // Search query
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        topic.title.toLowerCase().includes(q) ||
        topic.category.toLowerCase().includes(q) ||
        topic.theologicalSummary.toLowerCase().includes(q) ||
        topic.topicNumber.toString() === q ||
        topic.anchorScriptures.some((s) => s.reference.toLowerCase().includes(q) || s.text.toLowerCase().includes(q)) ||
        (topic.keyInsights && topic.keyInsights.some((k) => k.toLowerCase().includes(q)))
      );
    });
  }, [selectedTopicDivision, selectedCategory, searchQuery]);

  // Paginated 500 topics
  const paginatedTopics = useMemo(() => {
    const start = (topicPage - 1) * TOPICS_PER_PAGE;
    return filtered500Topics.slice(0, start + TOPICS_PER_PAGE);
  }, [filtered500Topics, topicPage]);

  // Helper to retrieve or synthesize the deep study catalog message article for any systematic topic
  const getArticleForTopic = (topic: SystematicTopicItem): DoctrineArticle => {
    if (topic.deepStudyArticle) return topic.deepStudyArticle;
    const match = DOCTRINE_ARTICLES.find(
      (a) =>
        a.title.toLowerCase().includes(topic.title.toLowerCase()) ||
        topic.title.toLowerCase().includes(a.title.toLowerCase()) ||
        a.categoryId.toLowerCase().includes(topic.category.toLowerCase().split(" ")[0])
    );
    if (match) return match;

    return {
      id: `topic-catalog-message-${topic.id}`,
      categoryId: topic.category,
      categoryTitle: `${topic.division} • Topic #${topic.topicNumber}`,
      title: topic.title,
      subtitle: `Biblical Exegesis and Systematic Confession of Topic #${topic.topicNumber}`,
      theologicalOverview: topic.theologicalSummary,
      keyScriptures: topic.anchorScriptures.map((s) => ({
        ref: s.reference,
        text: s.text || "",
        context: `Anchor Scriptural foundation for ${topic.title}`
      })),
      doctrinalPillars: (topic.keyInsights || [
        "Biblical Foundation: Anchored in the infallible inspiration of Holy Scripture.",
        "Redemptive Reality: Centered on the Gospel of Jesus Christ and His Kingdom.",
        "Living Walk: Walk in faith, holiness, and the overcoming joy of the Lord."
      ]).map((ins, i) => {
        const parts = ins.split(":");
        return {
          title: parts.length > 1 ? parts[0].trim() : `Doctrinal Pillar ${i + 1}`,
          explanation: parts.length > 1 ? parts.slice(1).join(":").trim() : ins,
          scripture: topic.anchorScriptures[i % topic.anchorScriptures.length]?.reference || "Nehemiah 8:10"
        };
      }),
      practicalApplication: [
        topic.practicalApplication ||
          `Apply the living truth of "${topic.title}" in daily discipleship, personal prayer, and loving service to the body of Christ.`,
        "Walk in steadfast obedience to the Holy Spirit, allowing Scripture to shape your worldview.",
        "Confess God's promises daily: 'The joy of the Lord is my strength' (Nehemiah 8:10)."
      ],
      historicalAndConfessionalBasis: `Affirmed across classical apostolic doctrine, orthodox Christian creeds, and biblical systematic theology concerning ${topic.title}.`,
      guidedReflection: `Lord God Almighty, thank You for the truth of ${topic.title}. Write this sacred doctrine upon my heart, grant me spiritual illumination, and lead me in paths of righteousness for Your Name's sake. Amen.`
    };
  };

  // Filter categories and articles
  const filteredCategories = useMemo(() => {
    if (selectedCategory === "all") return DOCTRINE_CATEGORIES;
    return DOCTRINE_CATEGORIES.filter((c) => c.id === selectedCategory);
  }, [selectedCategory]);

  const handleAskDoctrinalAi = async (e?: React.FormEvent, customPrompt?: string) => {
    if (e) e.preventDefault();
    const query = (customPrompt || followUpQuestion || aiQuestion).trim();
    if (!query || isAskingAi) return;

    setCurrentAskingQuestion(query);
    setAiQuestion("");
    setFollowUpQuestion("");
    setIsAskingAi(true);
    setAiError(null);
    setAiAnswer(null);
    setStreamingAiText("");
    setStreamingProgress(25);

    try {
      const res = await streamAiContent<any>({
        actionType: "ask_doctrine",
        question: query,
        prompt: query,
        topic: query,
        category: selectedCategory !== "all" ? selectedCategory : "Christian Orthodoxy",
        fastMode: getIsFastMode(),
        storageKey: "joy_doctrine_ai_history",
        onProgress: (prog) => {
          setStreamingProgress(prog);
        },
        onChunk: (_chunk, accText) => {
          setStreamingAiText(accText);
        },
        onComplete: (fullText, data) => {
          const textToSet = data?.answer || fullText || "Answer received.";
          setAiAnswer(textToSet);
          const newExchange: ScholarExchange = {
            id: `turn-${Date.now()}`,
            question: query,
            answer: textToSet,
            timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
          };
          setScholarHistory((prev) => [...prev, newExchange]);
          setCurrentAskingQuestion("");
          setIsAskingAi(false);
        },
        onError: (err) => {
          setAiError(err);
          setIsAskingAi(false);
        }
      });

      if (!res.success && res.error) {
        setAiError(res.error);
      }
    } catch (err: any) {
      console.error("[DOCTRINE AI ERROR]", err);
      setAiError(err?.message || "An unexpected error occurred during doctrinal query.");
    } finally {
      setIsAskingAi(false);
    }
  };

  const handleClearScholarHistory = () => {
    setScholarHistory([]);
    setAiAnswer(null);
    setAiError(null);
    setStreamingAiText("");
    setCurrentAskingQuestion("");
    setAiQuestion("");
    setFollowUpQuestion("");
    try {
      localStorage.removeItem("joy_doctrine_ai_history");
    } catch {}
  };

  return (
    <div className="space-y-6 pb-24 animate-in fade-in duration-200">
      {/* Hero Header */}
      <div className="p-6 sm:p-7 rounded-2xl bg-[#0F172A] text-white shadow-lg border-b-4 border-[#B48C35] space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-[#B48C35] text-white shrink-0 shadow-md">
              <GraduationCap className="w-7 h-7" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl md:text-3xl font-serif tracking-tight text-white flex items-center gap-2.5 flex-wrap">
                <span>Doctrinal & Systematic Treasury</span>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-[#B48C35]/30 text-[#DCC398] border border-[#B48C35]/60 font-sans font-bold">
                  All Portals Visible
                </span>
              </h2>
              <p className="text-xs sm:text-sm text-[#DCC398] font-serif italic mt-0.5">
                The 13 Apostolic Doctrinal Pillars, 500 Topics Compendium, 11 Core Tenets & AI Scholar
              </p>
            </div>
          </div>
        </div>

        {/* Grand 4-Portal View Switcher: 100% visible at first glance on all screen sizes */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 pt-1">
          <button
            id="doctrine-portal-pillars"
            onClick={() => {
              setActiveViewMode("pillars");
              setSelectedCategory("all");
            }}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
              activeViewMode === "pillars"
                ? "bg-[#B48C35] text-white border-white/40 shadow-md ring-2 ring-amber-300"
                : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/15 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className={`p-1.5 rounded-lg ${activeViewMode === "pillars" ? "bg-black/20 text-white" : "bg-[#B48C35]/30 text-[#DCC398]"}`}>
                <Layers className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                activeViewMode === "pillars" ? "bg-black/30 text-white" : "bg-black/40 text-amber-300"
              }`}>
                {DOCTRINE_CATEGORIES.length} Pillars
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs sm:text-sm leading-tight text-white">
                13 Doctrinal Pillars
              </div>
              <div className={`text-[11px] mt-0.5 leading-tight ${activeViewMode === "pillars" ? "text-white/90" : "text-slate-300"}`}>
                Apostolic theology & commentary
              </div>
            </div>
          </button>

          <button
            id="doctrine-portal-systematic500"
            onClick={() => {
              setActiveViewMode("systematic500");
              setSelectedCategory("all");
            }}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
              activeViewMode === "systematic500"
                ? "bg-[#B48C35] text-white border-white/40 shadow-md ring-2 ring-amber-300"
                : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/15 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className={`p-1.5 rounded-lg ${activeViewMode === "systematic500" ? "bg-black/20 text-white" : "bg-[#B48C35]/30 text-[#DCC398]"}`}>
                <Compass className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                activeViewMode === "systematic500" ? "bg-black/30 text-white" : "bg-black/40 text-amber-300"
              }`}>
                500 Topics
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs sm:text-sm leading-tight text-white">
                500 Topics Catalog
              </div>
              <div className={`text-[11px] mt-0.5 leading-tight ${activeViewMode === "systematic500" ? "text-white/90" : "text-slate-300"}`}>
                Systematic & Christian life
              </div>
            </div>
          </button>

          <button
            id="doctrine-portal-tenets"
            onClick={() => {
              setActiveViewMode("tenets");
              setSelectedCategory("all");
            }}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
              activeViewMode === "tenets"
                ? "bg-[#B48C35] text-white border-white/40 shadow-md ring-2 ring-amber-300"
                : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/15 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className={`p-1.5 rounded-lg ${activeViewMode === "tenets" ? "bg-black/20 text-white" : "bg-[#B48C35]/30 text-[#DCC398]"}`}>
                <Scroll className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                activeViewMode === "tenets" ? "bg-black/30 text-white" : "bg-black/40 text-amber-300"
              }`}>
                {CHURCH_TENETS.length} Tenets
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs sm:text-sm leading-tight text-white">
                11 Church Tenets
              </div>
              <div className={`text-[11px] mt-0.5 leading-tight ${activeViewMode === "tenets" ? "text-white/90" : "text-slate-300"}`}>
                Foundational articles of faith
              </div>
            </div>
          </button>

          <button
            id="doctrine-portal-askAi"
            onClick={() => setActiveViewMode("askAi")}
            className={`p-3 sm:p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between gap-2 cursor-pointer ${
              activeViewMode === "askAi"
                ? "bg-[#B48C35] text-white border-white/40 shadow-md ring-2 ring-amber-300"
                : "bg-white/10 text-slate-200 border-white/15 hover:bg-white/15 hover:text-white"
            }`}
          >
            <div className="flex items-center justify-between gap-2">
              <div className={`p-1.5 rounded-lg ${activeViewMode === "askAi" ? "bg-black/20 text-white" : "bg-[#B48C35]/30 text-[#DCC398]"}`}>
                <Sparkles className="w-4 h-4" />
              </div>
              <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-bold ${
                activeViewMode === "askAi" ? "bg-black/30 text-white" : "bg-black/40 text-amber-300"
              }`}>
                AI Scholar
              </span>
            </div>
            <div>
              <div className="font-serif font-bold text-xs sm:text-sm leading-tight text-white">
                Ask AI Scholar
              </div>
              <div className={`text-[11px] mt-0.5 leading-tight ${activeViewMode === "askAi" ? "text-white/90" : "text-slate-300"}`}>
                Instant theological inquiries
              </div>
            </div>
          </button>
        </div>

        {/* Search Doctrine Input */}
        <div className="relative pt-1">
          <Search className="w-4 h-4 text-[#DCC398] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder={
              activeViewMode === "systematic500"
                ? "Search across 500 topics (e.g. Righteousness, Altars, Blood Covenant, Trinity, Melchizedek, 666, Tithes)..."
                : activeViewMode === "pillars"
                ? "Search 13 Doctrinal Pillars (e.g. Infallibility, Trinity, Justification, Sanctification, Lord's Supper, Divine Healing)..."
                : "Search doctrines (e.g. Trinity, Infallibility, Depravity, Virgin Birth, Baptism of Holy Ghost, Tithes, Second Coming)..."
            }
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#1A2A44] border border-white/15 rounded-xl text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-hidden focus:border-[#B48C35] focus:ring-1 focus:ring-[#B48C35]"
          />
        </div>

        {/* 500 Topics Division Pills: wrapped & visible at first glance */}
        {activeViewMode === "systematic500" && (
          <div className="space-y-2.5 pt-1 border-t border-white/10">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#DCC398] mr-1 shrink-0 flex items-center gap-1">
                <SlidersHorizontal className="w-3 h-3" /> Division:
              </span>
              <button
                onClick={() => setSelectedTopicDivision("all")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTopicDivision === "all"
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                All 500 Topics
              </button>
              <button
                onClick={() => setSelectedTopicDivision("part1")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTopicDivision === "part1"
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                1-100: Core Christian Life
              </button>
              <button
                onClick={() => setSelectedTopicDivision("part2")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTopicDivision === "part2"
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                101-200: Systematic Theology
              </button>
              <button
                onClick={() => setSelectedTopicDivision("part3")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTopicDivision === "part3"
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                201-300: Apostolic & Kingdom
              </button>
              <button
                onClick={() => setSelectedTopicDivision("part4")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTopicDivision === "part4"
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                301-400: Christology & Ethics
              </button>
              <button
                onClick={() => setSelectedTopicDivision("part5")}
                className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedTopicDivision === "part5"
                    ? "bg-[#B48C35] text-white shadow-xs"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                401-500: Eschatology & Glory
              </button>
            </div>

            {/* Category Sub-Filters: wrapped & visible */}
            <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 shrink-0">
                Categories:
              </span>
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-[#DCC398] text-[#0F172A] font-bold"
                    : "bg-black/30 text-slate-300 hover:bg-white/10"
                }`}
              >
                All
              </button>
              {ALL_SYSTEMATIC_CATEGORIES.slice(0, 18).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold transition-all cursor-pointer ${
                    selectedCategory === cat
                      ? "bg-[#DCC398] text-[#0F172A] font-bold"
                      : "bg-black/30 text-slate-300 hover:bg-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Category Pills when in 13 Pillars view: wrapped & visible at first glance */}
        {activeViewMode === "pillars" && (
          <div className="flex items-center gap-2 flex-wrap pt-1 border-t border-white/10">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                selectedCategory === "all"
                  ? "bg-[#B48C35] text-white shadow-xs ring-1 ring-amber-300"
                  : "bg-white/10 text-slate-200 hover:bg-white/20"
              }`}
            >
              All 13 Pillars
            </button>
            {DOCTRINE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? "bg-[#B48C35] text-white shadow-xs ring-1 ring-amber-300"
                    : "bg-white/10 text-slate-200 hover:bg-white/20"
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* VIEW: 500 SYSTEMATIC TOPICS CATALOG */}
      {activeViewMode === "systematic500" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/80 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-[#B48C35]" /> 500 Systematic & Christian Life Topics ({filtered500Topics.length} Results)
            </h3>
            <span className="text-[11px] text-[#64748B] italic">
              Showing {paginatedTopics.length} of {filtered500Topics.length} topics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
            {paginatedTopics.map((topic) => {
              const isExpanded = expandedTopicId === topic.id;
              const bookmarked = isBookmarked(topic.id, "doctrine");

              return (
                <div
                  key={topic.id}
                  className="rounded-lg bg-white border border-[#E5D5BC] shadow-xs hover:border-[#B48C35] transition-all overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-4 space-y-2.5">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-start gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-[#0F172A] text-[#DCC398] font-serif font-bold text-xs flex items-center justify-center shrink-0 border border-[#B48C35]">
                          {topic.topicNumber}
                        </div>
                        <div>
                          <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#F1E6D2] text-[#B48C35] border border-[#DCC398]/60 inline-block mb-1">
                            {topic.category}
                          </span>
                          <h4 className="text-sm sm:text-base font-serif font-bold text-[#0F172A] leading-snug">
                            {topic.title}
                          </h4>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="flex items-center gap-0.5 shrink-0">
                        <button
                          onClick={() =>
                            onToggleSpeak(
                              `Topic ${topic.topicNumber}: ${topic.title}. ${topic.theologicalSummary}. Anchor scripture: ${topic.anchorScriptures[0]?.reference}: ${topic.anchorScriptures[0]?.text}`
                            )
                          }
                          className="p-1.5 rounded text-slate-400 hover:text-[#0F172A] hover:bg-[#FDFBF7]"
                          title="Listen"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            onToggleBookmark({
                              type: "doctrine",
                              title: `Topic ${topic.topicNumber}: ${topic.title}`,
                              reference: topic.anchorScriptures[0]?.reference,
                              snippet: topic.theologicalSummary,
                              targetId: topic.id
                            })
                          }
                          className={`p-1.5 rounded transition-colors ${
                            bookmarked ? "text-[#B48C35] bg-[#F1E6D2]" : "text-slate-400 hover:text-[#B48C35]"
                          }`}
                          title="Bookmark"
                        >
                          <Bookmark className={`w-3.5 h-3.5 ${bookmarked ? "fill-current" : ""}`} />
                        </button>
                        <button
                          onClick={() =>
                            onShareItem(
                              `Topic ${topic.topicNumber}: ${topic.title}`,
                              topic.theologicalSummary,
                              topic.anchorScriptures.map((s) => s.reference).join(", "),
                              topic.category
                            )
                          }
                          className="p-1.5 rounded text-slate-400 hover:text-[#0F172A] hover:bg-[#FDFBF7]"
                          title="Share"
                        >
                          <Share2 className="w-3.5 h-3.5 text-[#B48C35]" />
                        </button>

                        <button
                          onClick={() => setPictureDevotion(convertTopicToDevotion(topic))}
                          className="p-1.5 rounded text-slate-400 hover:text-[#B48C35] hover:bg-[#FDFBF7] cursor-pointer"
                          title="Download Publication-Grade Picture (Parchment & Gold Pattern)"
                        >
                          <ImageIcon className="w-3.5 h-3.5 text-[#B48C35]" />
                        </button>
                      </div>
                    </div>

                    {/* Summary */}
                    <p className="text-xs text-[#334155] leading-relaxed font-serif line-clamp-3">
                      {topic.theologicalSummary}
                    </p>

                    {/* Anchor Scriptures Badges */}
                    <div className="flex flex-wrap items-center gap-1 pt-1">
                      {topic.anchorScriptures.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-[#FDFBF7] text-[#0F172A] text-[10px] font-mono border border-[#E5D5BC] hover:border-[#B48C35] transition-colors"
                          title={s.text}
                        >
                          {s.reference}
                        </span>
                      ))}
                    </div>

                    {/* Expanded view */}
                    {isExpanded && (
                      <div className="pt-3 border-t border-[#E5D5BC] space-y-2.5 animate-in fade-in duration-150">
                        {/* Scripture Texts */}
                        <div className="space-y-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#B48C35] block">
                            Full Scriptural Passages:
                          </span>
                          {topic.anchorScriptures.map((s, idx) => (
                            <div key={idx} className="p-2.5 rounded bg-[#FAF7F2] border border-[#E5D5BC] text-xs">
                              <strong className="text-[11px] font-mono text-[#0F172A] block mb-0.5 text-[#B48C35]">
                                {s.reference}
                              </strong>
                              <p className="italic font-serif text-[#334155] text-[11px] leading-relaxed">
                                "{s.text}"
                              </p>
                            </div>
                          ))}
                        </div>

                        {/* Key Insights */}
                        {topic.keyInsights && (
                          <div className="space-y-1">
                            <span className="text-[10px] font-bold uppercase tracking-wider text-[#0F172A] block">
                              Doctrinal Pillars:
                            </span>
                            <ul className="text-xs text-[#475569] space-y-0.5">
                              {topic.keyInsights.map((insight, i) => (
                                <li key={i} className="flex items-start gap-1.5">
                                  <span className="text-[#B48C35] font-bold">•</span>
                                  <span>{insight}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Practical Walking */}
                        {topic.practicalApplication && (
                          <div className="p-2.5 rounded bg-[#FDFBF7] border border-[#DCC398] text-xs">
                            <span className="font-bold uppercase tracking-wider text-[#0F172A] block text-[10px] mb-0.5">
                              Practical Discipleship:
                            </span>
                            <p className="text-[#475569] font-serif text-[11px] leading-relaxed">
                              {topic.practicalApplication}
                            </p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="px-4 py-2.5 bg-[#FAF7F2] border-t border-[#E5D5BC] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setExpandedTopicId(isExpanded ? null : topic.id)}
                      className="text-xs font-bold text-[#0F172A] hover:text-[#B48C35] flex items-center gap-1 transition-colors"
                    >
                      <span>{isExpanded ? "Collapse" : "Quick View"}</span>
                      <ChevronDown
                        className={`w-3.5 h-3.5 transition-transform duration-200 ${
                          isExpanded ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => downloadSystematicTopicPicture(topic, creatorProfile)}
                        className="py-1 px-2.5 rounded bg-[#FAF7F2] hover:bg-[#B48C35] text-[#0F172A] hover:text-white border border-[#E5D5BC] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                        title="Download Publication-Grade Picture (PNG) with Logo & Subscription"
                      >
                        <ImageIcon className="w-3 h-3 text-[#B48C35]" />
                        <span>Picture (PNG)</span>
                      </button>

                      <button
                        onClick={() => {
                          const art = getArticleForTopic(topic);
                          setActiveArticleModal(art);
                        }}
                        className="py-1 px-2.5 rounded bg-[#FAF7F2] hover:bg-[#0F172A] text-[#0F172A] hover:text-white border border-[#E5D5BC] text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors cursor-pointer"
                        title="Read Deep Study Catalog Message"
                      >
                        <BookOpen className="w-3 h-3 text-[#B48C35]" />
                        <span>Catalog Message</span>
                      </button>

                      <button
                        onClick={() => {
                          setAiQuestion(`Explain the biblical doctrine of "${topic.title}" (${topic.anchorScriptures.map(s => s.reference).join(', ')}) according to orthodox Christian theology.`);
                          setActiveViewMode("askAi");
                          handleAskDoctrinalAi(undefined, `Explain the biblical doctrine of "${topic.title}" (${topic.anchorScriptures.map(s => s.reference).join(', ')}) according to orthodox Christian theology.`);
                        }}
                        className="py-1 px-2.5 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                        title="Ask AI about this topic"
                      >
                        <Sparkles className="w-3 h-3 text-[#DCC398]" />
                        <span>AI Study</span>
                      </button>

                      <button
                        onClick={() => setActiveTopicModal(topic)}
                        className="py-1 px-2.5 rounded bg-[#B48C35] hover:bg-[#967226] text-white text-[10px] font-bold uppercase tracking-wider flex items-center gap-1 transition-colors"
                      >
                        <span>Deep Study</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Load More Pagination */}
          {paginatedTopics.length < filtered500Topics.length && (
            <div className="pt-4 flex justify-center">
              <button
                onClick={() => setTopicPage((p) => p + 1)}
                className="py-2.5 px-8 rounded-lg bg-[#0F172A] hover:bg-[#B48C35] text-white font-bold uppercase tracking-widest text-xs transition-all shadow-md flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#DCC398]" />
                <span>Load More Topics (Showing {paginatedTopics.length} of {filtered500Topics.length})</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* VIEW: CORE TENETS OF FAITH (11) */}
      {activeViewMode === "tenets" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#0F172A]/80 flex items-center gap-2">
              <Scroll className="w-4 h-4 text-[#B48C35]" /> Official Articles & 11 Tenets of Faith ({filteredTenets.length})
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

                      {/* Action buttons */}
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#E5D5BC]">
                        <button
                          onClick={() => {
                            const matchedArt =
                              DOCTRINE_ARTICLES.find(
                                (a) =>
                                  a.categoryId === tenet.category ||
                                  a.id.includes(tenet.id.replace("tenet-", "")) ||
                                  a.categoryId.toLowerCase().includes(tenet.category.toLowerCase().split("-")[0])
                              ) ||
                              DOCTRINE_ARTICLES[Math.min(tenet.number - 1, DOCTRINE_ARTICLES.length - 1)];
                            setActiveArticleModal(matchedArt);
                          }}
                          className="py-1.5 px-3 rounded bg-[#B48C35] hover:bg-[#967226] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-2xs"
                          title="Explore Deep Study Article"
                        >
                          <BookOpen className="w-3.5 h-3.5" />
                          <span>Explore Deep Study</span>
                        </button>

                        <button
                          onClick={() => setActiveTenetModal(tenet)}
                          className="py-1.5 px-3 rounded bg-[#0F172A] hover:bg-[#1E293B] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shadow-xs"
                        >
                          <span>Full Tenet View</span>
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

      {/* VIEW: 13 SYSTEMATIC DOCTRINAL PILLARS */}
      {activeViewMode === "pillars" && (
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

      {/* VIEW: DEDICATED AI DOCTRINAL ASSISTANT */}
      {(activeViewMode === "askAi" || aiAnswer || scholarHistory.length > 0 || isAskingAi) && (
        <div className={`p-5 sm:p-6 rounded-2xl transition-all duration-300 space-y-5 ${scholarThemeConfig[scholarTheme].wrapper}`}>
          {/* Header & Theme Switcher */}
          <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b ${scholarThemeConfig[scholarTheme].headerBorder}`}>
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-xl border ${scholarThemeConfig[scholarTheme].badge}`}>
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${scholarThemeConfig[scholarTheme].titleColor}`}>
                  <span>Doctrinal & Theological Scholar</span>
                  {scholarHistory.length > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold lowercase">
                      {scholarHistory.length} {scholarHistory.length === 1 ? "inquiry" : "inquiries"}
                    </span>
                  )}
                </h3>
                <p className={`text-xs ${scholarThemeConfig[scholarTheme].subColor}`}>
                  Interactive theological dialogue grounded in Holy Scripture, 500 Systematic Topics, and orthodox theology
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start sm:self-auto flex-wrap">
              {/* Theme Switcher Bar */}
              <div className="flex items-center gap-1 bg-black/10 backdrop-blur-xs p-1 rounded-xl border border-black/10">
                {(["parchment", "midnight", "royal", "morning"] as const).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setScholarTheme(t)}
                    className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all cursor-pointer ${
                      scholarTheme === t
                        ? "bg-[#B48C35] text-white shadow-xs"
                        : "text-slate-500 hover:text-black dark:text-slate-300"
                    }`}
                  >
                    {t === "parchment" ? "📜 Parchment" : t === "midnight" ? "🌌 Midnight" : t === "royal" ? "👑 Royal" : "☀️ Morning"}
                  </button>
                ))}
              </div>

              {scholarHistory.length > 0 && (
                <button
                  type="button"
                  onClick={handleClearScholarHistory}
                  className="px-3 py-1.5 rounded-lg border border-slate-300/40 hover:border-red-400 hover:bg-red-500/10 text-slate-500 hover:text-red-500 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                  title="Clear thread and start fresh"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>New Topic</span>
                </button>
              )}
            </div>
          </div>

          {/* If no history yet and not asking: Initial prominent inquiry form */}
          {scholarHistory.length === 0 && !isAskingAi && (
            <div className="space-y-3">
              <form onSubmit={handleAskDoctrinalAi} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Ask a theological or doctrinal question (e.g. 'Explain the Blood Covenant', 'What are spiritual altars?', 'Trinity vs modalism')..."
                  value={aiQuestion}
                  onChange={(e) => setAiQuestion(e.target.value)}
                  className={`flex-1 px-3.5 py-3 rounded-xl text-xs sm:text-sm border focus:outline-hidden focus:border-[#B48C35] shadow-xs ${scholarThemeConfig[scholarTheme].inputBg}`}
                />
                <button
                  type="submit"
                  disabled={isAskingAi || !aiQuestion.trim()}
                  className="py-3 px-6 rounded-xl bg-[#0F172A] hover:bg-[#B48C35] disabled:opacity-50 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#DCC398]" />
                  <span>Ask Scholar</span>
                </button>
              </form>

              {/* Prompt suggestions */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs pt-1">
                <span className={`text-[11px] font-bold uppercase ${scholarThemeConfig[scholarTheme].subColor}`}>Quick Topics:</span>
                {[
                  "Explain the Mystery of the Blood Covenant",
                  "What are spiritual altars and how to break ungodly altars?",
                  "Explain the Trinity and unity of God",
                  "What does the Bible teach about falling from grace?",
                  "What are the 9 gifts of the Holy Spirit?",
                  "Why are tithes and offerings obligatory?"
                ].map((topic, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setAiQuestion(topic);
                      handleAskDoctrinalAi(undefined, topic);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer border ${scholarThemeConfig[scholarTheme].badge} hover:opacity-80`}
                  >
                    {topic}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Dialogue Conversation Thread */}
          {scholarHistory.length > 0 && (
            <div className="space-y-5">
              {scholarHistory.map((item, idx) => (
                <div key={item.id || idx} className="space-y-3">
                  {/* User Question */}
                  <div className="flex items-start justify-end gap-2.5">
                    <div className={`max-w-[85%] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-xs space-y-1 ${scholarThemeConfig[scholarTheme].userBubble}`}>
                      <div className="flex items-center justify-between gap-3 text-[10px] text-amber-200 font-bold uppercase tracking-widest">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="w-3 h-3 text-[#DCC398]" /> Question #{idx + 1}
                        </span>
                        <span className="opacity-70 font-normal">{item.timestamp}</span>
                      </div>
                      <p className="text-xs sm:text-sm font-medium leading-relaxed">
                        {item.question}
                      </p>
                    </div>
                  </div>

                  {/* Scholar Answer */}
                  <div className="flex items-start gap-2.5">
                    <div className={`w-full rounded-2xl rounded-tl-xs p-4 sm:p-5 space-y-3 shadow-xs ${scholarThemeConfig[scholarTheme].answerCard}`}>
                      <div className={`flex items-center justify-between gap-2 border-b pb-2 ${scholarThemeConfig[scholarTheme].headerBorder}`}>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35] flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-[#B48C35]" /> Doctrinal Exposition & Scriptural Basis
                        </span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => onToggleSpeak(item.answer)}
                            className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${scholarThemeConfig[scholarTheme].btn}`}
                            title="Read Aloud"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${scholarThemeConfig[scholarTheme].icon}`} />
                            <span className="hidden sm:inline">Listen</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              navigator.clipboard.writeText(`Question: ${item.question}\n\nScholar Response:\n${item.answer}`);
                              setCopiedTurnId(item.id);
                              setTimeout(() => setCopiedTurnId(null), 2000);
                            }}
                            className={`px-2 py-1 rounded text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${scholarThemeConfig[scholarTheme].btn}`}
                            title="Copy Answer"
                          >
                            {copiedTurnId === item.id ? (
                              <>
                                <Check className="w-3.5 h-3.5 text-emerald-600" />
                                <span className="text-emerald-700 hidden sm:inline">Copied</span>
                              </>
                            ) : (
                              <>
                                <Copy className={`w-3.5 h-3.5 ${scholarThemeConfig[scholarTheme].icon}`} />
                                <span className="hidden sm:inline">Copy</span>
                              </>
                            )}
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              onShareItem(
                                `Theological Study: ${item.question}`,
                                item.answer,
                                "Orthodox Doctrine & Biblical Theology",
                                "The Joy of the Lord Doctrinal Scholar"
                              )
                            }
                            className={`p-1 rounded transition-colors cursor-pointer ${scholarThemeConfig[scholarTheme].btn}`}
                            title="Share"
                          >
                            <Share2 className={`w-3.5 h-3.5 ${scholarThemeConfig[scholarTheme].icon}`} />
                          </button>
                        </div>
                      </div>

                      <div className={`text-xs sm:text-sm leading-relaxed whitespace-pre-line font-serif ${scholarThemeConfig[scholarTheme].answerText}`}>
                        {item.answer}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Active Streaming In-Progress */}
          {isAskingAi && (
            <div className="space-y-3 pt-2">
              {currentAskingQuestion && (
                <div className="flex items-start justify-end gap-2.5">
                  <div className={`max-w-[85%] rounded-2xl rounded-tr-xs p-3.5 sm:p-4 shadow-xs space-y-1 ${scholarThemeConfig[scholarTheme].userBubble}`}>
                    <div className="text-[10px] text-amber-200 font-bold uppercase tracking-widest flex items-center gap-1">
                      <MessageSquare className="w-3 h-3 text-[#DCC398]" /> Question #{scholarHistory.length + 1}
                    </div>
                    <p className="text-xs sm:text-sm font-medium leading-relaxed">
                      {currentAskingQuestion}
                    </p>
                  </div>
                </div>
              )}

              <AiFastLoadingView
                progress={streamingProgress}
                title="Consulting Doctrinal & Theological Scholar"
                actionType="Scriptural Orthodoxy Engine"
                streamingText={streamingAiText}
                isStreaming={true}
                onCancel={() => setIsAskingAi(false)}
              />
            </div>
          )}

          {/* AI Error Alert */}
          {aiError && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-start justify-between gap-3 animate-in fade-in duration-150">
              <div className="flex items-start gap-2 flex-1">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Doctrinal Scholar Notice</p>
                  <p className="leading-relaxed">{aiError}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => handleAskDoctrinalAi(e)}
                  className="px-2.5 py-1 rounded-lg bg-red-600 hover:bg-red-700 text-white font-semibold text-xs transition-colors cursor-pointer"
                >
                  Retry
                </button>
                <button
                  type="button"
                  onClick={() => setAiError(null)}
                  className="text-red-500 hover:text-red-800 font-bold px-1.5 py-0.5 cursor-pointer"
                  title="Dismiss"
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* FOLLOW-UP QUESTION FORM (ALWAYS ACTIVE AND ACCESSIBLE) */}
          {(scholarHistory.length > 0 || aiAnswer) && !isAskingAi && (
            <div className={`pt-3 border-t space-y-3 ${scholarThemeConfig[scholarTheme].headerBorder}`}>
              <div className="flex items-center justify-between">
                <span className={`text-[11px] font-bold uppercase tracking-widest flex items-center gap-1.5 ${scholarThemeConfig[scholarTheme].titleColor}`}>
                  <MessageSquare className="w-3.5 h-3.5 text-[#B48C35]" /> Ask a Follow-up Question
                </span>
                <span className={`text-[11px] ${scholarThemeConfig[scholarTheme].subColor}`}>Continue this study seamlessly</span>
              </div>

              <form onSubmit={handleAskDoctrinalAi} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="Ask a follow-up (e.g. 'Can you provide scriptural cross-references?', 'How do I apply this in prayer?')..."
                  value={followUpQuestion}
                  onChange={(e) => setFollowUpQuestion(e.target.value)}
                  className={`flex-1 px-3.5 py-3 rounded-xl text-xs sm:text-sm border focus:outline-hidden focus:border-[#B48C35] shadow-xs ${scholarThemeConfig[scholarTheme].inputBg}`}
                />
                <button
                  type="submit"
                  disabled={isAskingAi || !followUpQuestion.trim()}
                  className="py-3 px-6 rounded-xl bg-[#0F172A] hover:bg-[#B48C35] disabled:opacity-50 text-white font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-1.5 transition-all shrink-0 shadow-xs cursor-pointer"
                >
                  <Send className="w-4 h-4 text-[#DCC398]" />
                  <span>Send Follow-Up</span>
                </button>
              </form>

              {/* Follow-up prompt quick chips */}
              <div className="flex flex-wrap items-center gap-1.5 text-xs">
                <span className={`text-[11px] font-bold uppercase ${scholarThemeConfig[scholarTheme].subColor}`}>Follow-up Suggestions:</span>
                {[
                  "Provide scriptural cross-references",
                  "How does this apply practically in daily prayer and warfare?",
                  "What did the early church fathers teach on this?",
                  "What are common theological misconceptions or heresies about this?"
                ].map((sugg, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setFollowUpQuestion(sugg);
                      handleAskDoctrinalAi(undefined, sugg);
                    }}
                    className={`px-2.5 py-1 rounded-lg text-[11px] transition-colors cursor-pointer border ${scholarThemeConfig[scholarTheme].badge} hover:opacity-80`}
                  >
                    {sugg}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* TOPIC DEEP DIVE MODAL */}
      {activeTopicModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FDFBF7] w-full max-w-2xl rounded-xl shadow-2xl border-2 border-[#B48C35] max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-[#E5D5BC] flex items-center justify-between bg-[#0F172A] text-white">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#DCC398]">
                  Topic #{activeTopicModal.topicNumber} • {activeTopicModal.category}
                </span>
                <h3 className="text-lg sm:text-xl font-serif text-white font-bold">
                  {activeTopicModal.title}
                </h3>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={() =>
                    onToggleSpeak(
                      `Topic ${activeTopicModal.topicNumber}: ${activeTopicModal.title}. ${activeTopicModal.theologicalSummary}`
                    )
                  }
                  className="p-2 rounded text-[#DCC398] hover:bg-white/10 transition-colors"
                  title="Listen"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveTopicModal(null)}
                  className="p-2 rounded text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 text-[#1A2A44]">
              {/* Theological Summary */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Theological & Biblical Summary
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-[#0F172A] font-serif bg-white p-4 rounded-lg border-l-4 border-[#B48C35] border border-[#E5D5BC]">
                  {activeTopicModal.theologicalSummary}
                </p>
              </div>

              {/* Scriptural Anchor Passages */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                  Scriptural Anchor Passages
                </h4>
                <div className="space-y-2">
                  {activeTopicModal.anchorScriptures.map((s, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-lg bg-[#F1E6D2] border border-[#DCC398] text-xs space-y-1"
                    >
                      <span className="font-bold text-[#0F172A] block font-mono text-[#B48C35]">
                        {s.reference}
                      </span>
                      <p className="italic font-serif text-[#1A2A44] leading-relaxed">
                        "{s.text}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Doctrinal Insights */}
              {activeTopicModal.keyInsights && activeTopicModal.keyInsights.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#B48C35]">
                    Core Theological Pillars & Insights
                  </h4>
                  <div className="space-y-2">
                    {activeTopicModal.keyInsights.map((insight, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-lg bg-white border border-[#E5D5BC] text-xs text-[#334155] flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#B48C35] shrink-0 mt-0.5" />
                        <span>{insight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Practical Discipleship */}
              {activeTopicModal.practicalApplication && (
                <div className="p-4 rounded-lg bg-white border border-[#E5D5BC] text-xs space-y-1">
                  <span className="font-bold uppercase tracking-wider text-[#0F172A] block text-[11px]">
                    Practical Discipleship Walking:
                  </span>
                  <p className="text-[#475569] leading-relaxed font-serif">
                    {activeTopicModal.practicalApplication}
                  </p>
                </div>
              )}

              {/* Deep Study Catalog Message Option */}
              <div className="p-4 rounded-lg bg-gradient-to-r from-[#F1E6D2] via-[#FAF7F2] to-white border border-[#DCC398] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs">
                <div className="space-y-1">
                  <div className="flex items-center gap-1.5">
                    <BookOpen className="w-4 h-4 text-[#B48C35]" />
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#B48C35]">
                      Deep Study Catalog Message & Exposition
                    </span>
                  </div>
                  <p className="text-xs text-[#0F172A] font-serif leading-relaxed">
                    Read the comprehensive systematic theology discourse, historical and confessional basis, and guided apostolic reflection for this topic.
                  </p>
                </div>
                <button
                  onClick={() => {
                    const art = getArticleForTopic(activeTopicModal);
                    setActiveTopicModal(null);
                    setActiveArticleModal(art);
                  }}
                  className="py-2 px-3.5 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white text-xs font-bold uppercase tracking-widest flex items-center gap-1.5 transition-colors shrink-0 cursor-pointer shadow-xs"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#DCC398]" />
                  <span>Read Catalog Message</span>
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[#E5D5BC] flex flex-wrap justify-between items-center bg-white gap-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => downloadSystematicTopicPicture(activeTopicModal, creatorProfile)}
                  className="py-2 px-3.5 rounded bg-[#FAF7F2] hover:bg-[#B48C35] text-[#0F172A] hover:text-white border border-[#E5D5BC] font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Download Publication-Grade Picture (PNG) with Logo & Subscription"
                >
                  <ImageIcon className="w-3.5 h-3.5 text-[#B48C35]" />
                  <span>Download Picture (PNG)</span>
                </button>

                <button
                  onClick={() => {
                    const art = getArticleForTopic(activeTopicModal);
                    setActiveTopicModal(null);
                    setActiveArticleModal(art);
                  }}
                  className="py-2 px-3 rounded bg-[#0F172A] hover:bg-[#B48C35] text-white font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
                  title="Read Deep Study Catalog Message"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#DCC398]" />
                  <span>Catalog Message</span>
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const topic = activeTopicModal;
                    setActiveTopicModal(null);
                    setAiQuestion(`Provide a detailed theological exposition of "${topic.title}" (${topic.anchorScriptures.map(s => s.reference).join(', ')}) with historic Christian context and practical life application.`);
                    setActiveViewMode("askAi");
                    handleAskDoctrinalAi(undefined, `Provide a detailed theological exposition of "${topic.title}" (${topic.anchorScriptures.map(s => s.reference).join(', ')}) with historic Christian context and practical life application.`);
                  }}
                  className="py-2 px-3.5 rounded bg-white hover:bg-slate-100 text-[#0F172A] border border-[#E5D5BC] font-bold uppercase tracking-widest text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#B48C35]" />
                  <span>Ask AI Scholar</span>
                </button>

                <button
                  onClick={() => setActiveTopicModal(null)}
                  className="py-2 px-5 rounded bg-[#B48C35] hover:bg-[#967226] text-white font-bold uppercase tracking-widest text-xs transition-colors cursor-pointer"
                >
                  Done Reading
                </button>
              </div>
            </div>
          </div>
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

      {/* Systematic Theology Picture Studio Modal (Exact Parchment & Gold Style) */}
      <DevotionPictureModal
        devotion={pictureDevotion}
        isOpen={Boolean(pictureDevotion)}
        onClose={() => setPictureDevotion(null)}
        activeProfile={creatorProfile}
      />
    </div>
  );
};

