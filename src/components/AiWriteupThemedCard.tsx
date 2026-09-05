import React, { useState } from "react";
import {
  Sparkles,
  Volume2,
  Copy,
  Check,
  Share2,
  Edit3,
  ImageIcon,
  Download,
  Flame,
  HeartHandshake,
  BookOpen,
  HelpCircle,
  Calculator,
  Palette,
  CheckCircle2
} from "lucide-react";

export type AiWriteupTheme = "parchment" | "midnight" | "royal" | "morning";

interface AiWriteupThemedCardProps {
  actionType: string;
  scriptureReference: string;
  verseText: string;
  version: string;
  content: string;
  onSaveToNotes: (noteContent: string) => void;
  onToggleSpeak: (text: string) => void;
  onShare: (title: string, text: string) => void;
  onOpenPictureStudio: () => void;
  onDownloadPng: () => void;
}

export const AiWriteupThemedCard: React.FC<AiWriteupThemedCardProps> = ({
  actionType,
  scriptureReference,
  verseText,
  version,
  content,
  onSaveToNotes,
  onToggleSpeak,
  onShare,
  onOpenPictureStudio,
  onDownloadPng
}) => {
  const [theme, setTheme] = useState<AiWriteupTheme>("parchment");
  const [copied, setCopied] = useState(false);
  const [savedNotes, setSavedNotes] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSaveNotes = () => {
    onSaveToNotes(`[AI ${actionType}]\n\n${content}`);
    setSavedNotes(true);
    setTimeout(() => setSavedNotes(false), 2000);
  };

  // Theme styling configurations
  const themeStyles = {
    parchment: {
      wrapper: "bg-gradient-to-b from-[#FDFBF7] via-[#F8F4EC] to-[#EFE7D8] text-[#2A1F13] border-2 border-[#DCC398] shadow-2xl",
      innerFrame: "border border-[#C8AF7E]/40 bg-white/70 backdrop-blur-xs",
      headerBg: "bg-gradient-to-r from-[#8A6518]/15 via-[#B48C35]/20 to-[#8A6518]/15 border-b border-[#DCC398]",
      titleText: "text-[#8A6518]",
      verseCard: "bg-[#F4ECE1] border border-[#D5C2A5] text-[#3D2C1B]",
      sectionCard: "bg-[#FFFDF9]/90 border border-[#E2D4BF] text-[#2C2114] shadow-xs",
      sectionHeader: "text-[#996515] font-serif font-bold",
      conclusionCard: "bg-gradient-to-r from-[#B48C35]/15 via-[#FAF6ED] to-[#B48C35]/20 border-2 border-[#B48C35] text-[#2B1E0C] shadow-md",
      iconColor: "text-[#B48C35]",
      badge: "bg-[#B48C35] text-white",
      buttonHover: "hover:bg-[#B48C35]/15 text-[#6D4C13]"
    },
    midnight: {
      wrapper: "bg-gradient-to-b from-[#0A1128] via-[#0F1C3F] to-[#080D21] text-[#F1F5F9] border-2 border-[#B48C35]/60 shadow-2xl ring-1 ring-amber-400/20",
      innerFrame: "border border-amber-500/20 bg-slate-950/60 backdrop-blur-xs",
      headerBg: "bg-gradient-to-r from-[#16235A] via-[#1E293B] to-[#16235A] border-b border-amber-500/30",
      titleText: "text-[#F6E05E]",
      verseCard: "bg-slate-900/90 border border-amber-500/30 text-amber-100",
      sectionCard: "bg-slate-900/80 border border-slate-700/80 text-slate-100 shadow-md",
      sectionHeader: "text-[#F6E05E] font-serif font-bold",
      conclusionCard: "bg-gradient-to-r from-amber-950/60 via-slate-900 to-amber-950/60 border-2 border-amber-400 text-amber-100 shadow-lg",
      iconColor: "text-amber-400",
      badge: "bg-amber-500 text-slate-950 font-bold",
      buttonHover: "hover:bg-white/10 text-amber-200"
    },
    royal: {
      wrapper: "bg-gradient-to-b from-[#2E0854] via-[#3B0764] to-[#1E0538] text-[#FAF5FF] border-2 border-[#EAB308]/60 shadow-2xl ring-1 ring-purple-400/20",
      innerFrame: "border border-purple-400/25 bg-purple-950/60 backdrop-blur-xs",
      headerBg: "bg-gradient-to-r from-[#4C1D95] via-[#581C87] to-[#4C1D95] border-b border-amber-400/30",
      titleText: "text-[#FDE047]",
      verseCard: "bg-purple-900/60 border border-purple-500/30 text-purple-100",
      sectionCard: "bg-purple-950/80 border border-purple-800/60 text-purple-50 shadow-md",
      sectionHeader: "text-[#FDE047] font-serif font-bold",
      conclusionCard: "bg-gradient-to-r from-amber-950/70 via-purple-950 to-amber-950/70 border-2 border-amber-400 text-amber-100 shadow-lg",
      iconColor: "text-amber-300",
      badge: "bg-gradient-to-r from-amber-500 to-yellow-400 text-purple-950 font-bold",
      buttonHover: "hover:bg-purple-800/40 text-purple-200"
    },
    morning: {
      wrapper: "bg-gradient-to-b from-[#FFFFFF] via-[#FDFDF7] to-[#F7F6EE] text-[#1E293B] border-2 border-[#CBD5E1] shadow-2xl",
      innerFrame: "border border-slate-200 bg-white/90 backdrop-blur-xs",
      headerBg: "bg-gradient-to-r from-amber-50 via-sky-50 to-amber-50 border-b border-slate-200",
      titleText: "text-[#B48C35]",
      verseCard: "bg-slate-50 border border-slate-200 text-slate-800",
      sectionCard: "bg-white border border-slate-200 text-slate-800 shadow-xs",
      sectionHeader: "text-[#0F172A] font-serif font-bold",
      conclusionCard: "bg-gradient-to-r from-amber-50 via-white to-amber-50 border-2 border-[#B48C35] text-slate-900 shadow-md",
      iconColor: "text-[#B48C35]",
      badge: "bg-[#16235A] text-white",
      buttonHover: "hover:bg-slate-100 text-slate-700"
    }
  };

  const currentTheme = themeStyles[theme];

  // Action Icon Helper
  const getActionIcon = () => {
    const act = (actionType || "").toLowerCase();
    if (act.includes("prayer")) return <HeartHandshake className="w-4 h-4" />;
    if (act.includes("joy")) return <Flame className="w-4 h-4" />;
    if (act.includes("math")) return <Calculator className="w-4 h-4" />;
    if (act.includes("context") || act.includes("history")) return <BookOpen className="w-4 h-4" />;
    if (act.includes("explain")) return <HelpCircle className="w-4 h-4" />;
    return <Sparkles className="w-4 h-4" />;
  };

  // Structured Content Parser
  const parseSections = (text: string) => {
    if (!text) return [];
    
    // Split by major structural markers
    const regex = /(ADORATION:|CONFESSION & SURRENDER:|THANKSGIVING:|PETITION:|WARFARE AUTHORITY:|WARFARE & DELIVERANCE:|CLOSING DECLARATION:|PROPHETIC DECREE:|PROPHETIC DECREES:|THEOLOGICAL REFLECTION:|THE JOY EXPOSITION:|HOMILETIC REVELATION:|HISTORICAL CONTEXT:|CULTURAL & ARCHAEOLOGICAL SETTING:|ORIGINAL LANGUAGE INSIGHT:|DOCTRINAL MEANING & THEOLOGY:|PRACTICAL APPLICATION:|ACTION STEP:|GUIDED PRAYER:|EMPOWERMENT PRAYER:|ALTAR CALL PRAYER:|🌟 CONCLUSION — HOPE & ENCOURAGEMENT:|🌟 CONCLUSION — LIFE TRANSFORMATION & HOPE:|🌟 CONCLUSION — UNSHAKEABLE HOPE & ENCOURAGEMENT:|ANALOGY & EXEGESIS:|CROSS REFERENCES:)/gi;

    const parts = text.split(regex);
    if (parts.length <= 1) {
      return [{ title: "", body: text, isConclusion: false }];
    }

    const sections: { title: string; body: string; isConclusion: boolean }[] = [];
    
    // Intro part if exists
    if (parts[0] && parts[0].trim().length > 0) {
      sections.push({ title: "", body: parts[0].trim(), isConclusion: false });
    }

    for (let i = 1; i < parts.length; i += 2) {
      const header = parts[i]?.trim() || "";
      const body = parts[i + 1]?.trim() || "";
      const isConclusion = header.toLowerCase().includes("conclusion") || header.toLowerCase().includes("hope");
      sections.push({
        title: header.replace(/[:🌟]/g, "").trim(),
        body,
        isConclusion
      });
    }

    return sections;
  };

  const parsedSections = parseSections(content);

  return (
    <div className={`rounded-2xl overflow-hidden transition-all duration-300 animate-in fade-in ${currentTheme.wrapper}`}>
      {/* 1. TOP THEME TOOLBAR & ACTIONS */}
      <div className={`p-3.5 flex flex-wrap items-center justify-between gap-2.5 ${currentTheme.headerBg}`}>
        <div className="flex items-center gap-2 flex-wrap">
          <span className={`px-2.5 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-xs ${currentTheme.badge}`}>
            {getActionIcon()}
            <span>{actionType}</span>
          </span>
          <span className="text-xs font-mono opacity-80">
            {scriptureReference} ({version})
          </span>
        </div>

        {/* Theme Picker & Action Controls */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {/* Theme Selector Pills */}
          <div className="flex items-center gap-1 bg-black/10 dark:bg-white/10 p-0.5 rounded-lg mr-1">
            <button
              onClick={() => setTheme("parchment")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                theme === "parchment" ? "bg-[#B48C35] text-white shadow-xs" : "opacity-70 hover:opacity-100"
              }`}
              title="Sacred Parchment Theme"
            >
              Parchment
            </button>
            <button
              onClick={() => setTheme("midnight")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                theme === "midnight" ? "bg-[#1E293B] text-amber-300 shadow-xs" : "opacity-70 hover:opacity-100"
              }`}
              title="Midnight Sanctuary Theme"
            >
              Midnight
            </button>
            <button
              onClick={() => setTheme("royal")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                theme === "royal" ? "bg-[#4C1D95] text-amber-200 shadow-xs" : "opacity-70 hover:opacity-100"
              }`}
              title="Royal Velvet Theme"
            >
              Royal
            </button>
            <button
              onClick={() => setTheme("morning")}
              className={`px-2 py-0.5 rounded text-[11px] font-semibold transition-all cursor-pointer ${
                theme === "morning" ? "bg-white text-slate-800 shadow-xs" : "opacity-70 hover:opacity-100"
              }`}
              title="Morning Mercy Theme"
            >
              Alabaster
            </button>
          </div>

          {/* Audio Speak */}
          <button
            onClick={() => onToggleSpeak(content)}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
            title="Listen to Read Aloud"
          >
            <Volume2 className="w-4 h-4" />
          </button>

          {/* Save to Notes */}
          <button
            onClick={handleSaveNotes}
            className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${currentTheme.buttonHover}`}
            title="Save to Personal Notes"
          >
            {savedNotes ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{savedNotes ? "Saved!" : "Notes"}</span>
          </button>

          {/* Copy Text */}
          <button
            onClick={handleCopy}
            className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${currentTheme.buttonHover}`}
            title="Copy Text"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          {/* Share */}
          <button
            onClick={() => onShare(`${actionType} • ${scriptureReference}`, content)}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
            title="Share"
          >
            <Share2 className="w-4 h-4" />
          </button>

          {/* Picture Studio */}
          <button
            onClick={onOpenPictureStudio}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
            title="Open in Parchment & Gold Picture Studio"
          >
            <ImageIcon className="w-4 h-4" />
          </button>

          {/* Direct PNG */}
          <button
            onClick={onDownloadPng}
            className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
            title="Download PNG Picture"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. SCRIPTURE ANCHOR BANNER */}
      <div className="p-4 sm:p-5 space-y-4">
        <div className={`p-4 rounded-xl border space-y-1.5 shadow-xs ${currentTheme.verseCard}`}>
          <div className="flex items-center justify-between">
            <span className="font-mono font-bold text-xs uppercase tracking-wider opacity-90">
              Scripture Anchor: {scriptureReference} ({version})
            </span>
            <span className="text-[11px] font-serif italic opacity-75">
              Authorized Word
            </span>
          </div>
          <p className="font-serif text-sm sm:text-base italic leading-relaxed">
            "{verseText}"
          </p>
        </div>

        {/* 3. PARSED THEMATIC SECTIONS */}
        <div className="space-y-3.5">
          {parsedSections.map((sec, idx) => {
            if (sec.isConclusion) {
              return (
                <div
                  key={idx}
                  className={`p-4 sm:p-5 rounded-2xl border-2 space-y-2 transition-all ${currentTheme.conclusionCard}`}
                >
                  <div className="flex items-center gap-2">
                    <Flame className="w-5 h-5 text-amber-500 animate-pulse" />
                    <h5 className="font-serif font-bold text-sm sm:text-base tracking-wide uppercase">
                      {sec.title || "Conclusion — Unshakeable Hope & Encouragement"}
                    </h5>
                  </div>
                  <p className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-line">
                    {sec.body}
                  </p>
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-1.5 transition-all ${currentTheme.sectionCard}`}
              >
                {sec.title && (
                  <h6 className={`text-xs uppercase tracking-wider flex items-center gap-1.5 ${currentTheme.sectionHeader}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{sec.title}</span>
                  </h6>
                )}
                <p className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-line opacity-95">
                  {sec.body}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom Publication Seal */}
        <div className="pt-2 flex items-center justify-between text-[11px] opacity-70 border-t border-current/10 flex-wrap gap-2">
          <span>Sanctuary Apostolic Exegesis & Theological Engine</span>
          <span className="font-serif italic">"The Joy of the LORD is your strength" (Nehemiah 8:10)</span>
        </div>
      </div>
    </div>
  );
};
