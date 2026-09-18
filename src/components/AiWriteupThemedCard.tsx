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
  CheckCircle2,
  X,
  ExternalLink
} from "lucide-react";
import { MathView, RichMathContent } from "./MathView";

export type AiWriteupTheme = "parchment" | "midnight" | "royal" | "morning";

export interface AiWriteupThemedCardProps {
  actionType: string;
  scriptureReference: string;
  verseText: string;
  version?: string;
  content: string;
  title?: string;
  structuredData?: any;
  onSaveToNotes?: (noteContent: string) => void;
  onToggleSpeak?: (text: string) => void;
  onShare?: (title: string, text: string) => void;
  onOpenPictureStudio?: () => void;
  onDownloadPng?: () => void;
  onOpenDevotionReader?: () => void;
  onDismiss?: () => void;
}

export const AiWriteupThemedCard: React.FC<AiWriteupThemedCardProps> = ({
  actionType,
  scriptureReference,
  verseText,
  version = "KJV",
  content,
  title,
  structuredData,
  onSaveToNotes,
  onToggleSpeak,
  onShare,
  onOpenPictureStudio,
  onDownloadPng,
  onOpenDevotionReader,
  onDismiss
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
    if (onSaveToNotes) {
      onSaveToNotes(`[AI ${actionType}]\n\n${content}`);
    } else {
      try {
        const key = "sir_bismark_bible_notes";
        const existing = JSON.parse(localStorage.getItem(key) || "{}");
        const vKey = `${scriptureReference}_${Date.now()}`;
        existing[vKey] = {
          verseKey: scriptureReference,
          note: `[AI ${actionType}]\n\n${content}`,
          updatedAt: new Date().toLocaleDateString()
        };
        localStorage.setItem(key, JSON.stringify(existing));
      } catch {}
    }
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
      buttonHover: "hover:bg-[#B48C35]/15 text-[#6D4C13]",
      quoteBlock: "bg-[#B48C35]/10 border-l-4 border-[#B48C35] text-[#3D2C1B]"
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
      buttonHover: "hover:bg-white/10 text-amber-200",
      quoteBlock: "bg-amber-500/10 border-l-4 border-amber-400 text-amber-100"
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
      buttonHover: "hover:bg-purple-800/40 text-purple-200",
      quoteBlock: "bg-purple-500/15 border-l-4 border-amber-400 text-amber-100"
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
      buttonHover: "hover:bg-slate-100 text-slate-700",
      quoteBlock: "bg-amber-500/10 border-l-4 border-amber-600 text-slate-900"
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
  const parseSections = (text: string, data?: any) => {
    // Attempt to extract structured object from text if data is not supplied
    let effectiveData = data;
    if (!effectiveData && text && typeof text === "string") {
      const trimmed = text.trim();
      if (trimmed.startsWith("{") || trimmed.includes("```json") || trimmed.includes("```")) {
        try {
          const cleaned = trimmed.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
          effectiveData = JSON.parse(cleaned);
        } catch {
          // not JSON, continue with text parsing
        }
      }
    }

    // 1. Structured JSON extraction if available
    if (effectiveData && typeof effectiveData === "object") {
      const d = effectiveData.devotion || effectiveData.prayer || effectiveData;
      const customSections: { title: string; body: string; isConclusion: boolean }[] = [];

      // Prayer schema
      const adoration = d.adoration || d.sections?.adoration;
      const confession = d.confession || d.confessionAndSurrender || d.sections?.confessionAndSurrender || d.sections?.confession;
      const thanksgiving = d.thanksgiving || d.sections?.thanksgiving;
      const scripturePromise = d.scripturePromise || d.scriptureAnchor || d.sections?.scripturePromise;
      const petition = d.petition || d.sections?.petition;
      const warfare = d.warfareDeclaration || d.spiritualWarfare || d.sections?.spiritualWarfare || d.sections?.warfareDeclaration;
      const closing = d.closing || d.declarationInJesusName || d.sections?.declarationInJesusName || d.sections?.closing;

      if (adoration || petition || warfare || confession) {
        if (adoration) customSections.push({ title: "Adoration & Supreme Holiness", body: adoration, isConclusion: false });
        if (confession) customSections.push({ title: "Surrender & Alignment", body: confession, isConclusion: false });
        if (thanksgiving) customSections.push({ title: "Thanksgiving & Covenant Praise", body: thanksgiving, isConclusion: false });
        if (scripturePromise) customSections.push({ title: "Standing on God's Infallible Promise", body: scripturePromise, isConclusion: false });
        if (petition) customSections.push({ title: "Targeted Faith Petitions", body: petition, isConclusion: false });
        if (warfare) customSections.push({ title: "Apostolic Warfare Authority", body: warfare, isConclusion: false });
        if (closing) customSections.push({ title: "Sealing Benediction in Jesus' Name", body: closing, isConclusion: true });
        if (customSections.length > 0) return customSections;
      }

      // Devotion schema (supporting both reflection and theologicalReflection)
      const reflection = d.theologicalReflection || d.reflection || d.theologicalExposition || d.body || d.content;
      const guidedPrayer = d.guidedPrayer || d.prayer || d.deliverancePrayer || d.altarCallPrayer;
      const practical = d.practicalApplication || d.lifeTransformation;
      const hist = d.historicalContext;
      const decree = d.apostolicDecree || d.propheticDecree;
      const action = d.actionStep;
      const hope = d.hopeEncouragementConclusion || d.hopeAndEncouragementConclusion || d.conclusion;

      if (reflection || guidedPrayer || practical) {
        if (hist) customSections.push({ title: "Historical & Spiritual Setting", body: hist, isConclusion: false });
        if (reflection) customSections.push({ title: "Theological Exegesis & Revelation", body: reflection, isConclusion: false });
        if (practical) customSections.push({ title: "Practical Christian Application", body: practical, isConclusion: false });
        if (action) customSections.push({ title: "Action Step of Faith", body: action, isConclusion: false });
        if (guidedPrayer) customSections.push({ title: "Guided Covenant Prayer", body: guidedPrayer, isConclusion: false });
        if (decree) customSections.push({ title: "Apostolic Faith Decree", body: decree, isConclusion: false });
        if (hope) customSections.push({ title: "Triumphant Hope & Joy Conclusion", body: hope, isConclusion: true });
        if (customSections.length > 0) return customSections;
      }

      // MathemaSermon schema
      const mathConcept = d.mathematicalConcept || d.concept;
      const mathFormula = d.formula || d.mathematicalFormula || d.equation;
      const mathAnalogy = d.mathematicalAnalogy || d.conceptualAnalogy || d.analogy;
      const homiletic = d.homileticApplication || d.theologicalExposition || d.exposition;
      const hopeConclusion = d.hopeAndEncouragementConclusion || d.hopeConclusion || d.lifeTransformation || d.conclusion;
      const altarPrayer = d.altarCallPrayer || d.prayer;

      if (mathConcept || mathFormula || mathAnalogy || homiletic) {
        if (mathConcept || mathFormula) {
          const formulaBlock = mathFormula ? `\n\n$$\n${mathFormula}\n$$` : "";
          customSections.push({
            title: "Divine Mathematical Principle & Law",
            body: mathConcept ? `**${mathConcept}**${formulaBlock}` : (mathFormula ? `$$\n${mathFormula}\n$$` : ""),
            isConclusion: false
          });
        }
        if (mathAnalogy) customSections.push({ title: "Spiritual Conceptual Analogy", body: mathAnalogy, isConclusion: false });
        if (homiletic) customSections.push({ title: "Apostolic Homiletic Application", body: homiletic, isConclusion: false });
        if (hopeConclusion) customSections.push({ title: "Triumphant Covenant Hope & Strength", body: hopeConclusion, isConclusion: false });
        if (altarPrayer) customSections.push({ title: "Altar Call Prayer & Surrender", body: altarPrayer, isConclusion: true });
        if (customSections.length > 0) return customSections;
      }

      // Joy of the Lord Overcoming schema
      if (d.rootDeception || d.scripturalTruth || d.joyStrategySteps || d.fortressDeclaration) {
        if (d.rootDeception) customSections.push({ title: "Exposing the Enemy's Deception", body: d.rootDeception, isConclusion: false });
        if (d.scripturalTruth) customSections.push({ title: "Covenant Scriptural Truth", body: d.scripturalTruth, isConclusion: false });
        if (d.joyStrategySteps) {
          const stepsBody = Array.isArray(d.joyStrategySteps)
            ? d.joyStrategySteps.map((s: any, idx: number) => `**Step ${idx + 1}: ${s.step || s.title || ""}**\n${s.action || s.description || ""}`).join("\n\n")
            : String(d.joyStrategySteps);
          customSections.push({ title: "Joy Fortress Strategic Steps", body: stepsBody, isConclusion: false });
        }
        if (d.fortressDeclaration) customSections.push({ title: "Supernatural Fortress Declaration", body: d.fortressDeclaration, isConclusion: false });
        if (d.deliverancePrayer) customSections.push({ title: "Deliverance Prayer in Jesus' Name", body: d.deliverancePrayer, isConclusion: true });
        if (customSections.length > 0) return customSections;
      }

      // Prayer points schema
      const pPoints = d.prayerPoints || d.points;
      if (Array.isArray(pPoints) && pPoints.length > 0) {
        pPoints.forEach((p: any) => {
          customSections.push({
            title: `Point ${p.pointNumber || ""}: ${p.focus || "Strategic Decree"}`,
            body: `${p.scripturePromise ? `> Promise: ${p.scripturePromise}\n\n` : ""}${p.prayerDeclaration || ""}`,
            isConclusion: false
          });
        });
        if (d.propheticDecree) customSections.push({ title: "Prophetic Decree & Victory Seal", body: d.propheticDecree, isConclusion: true });
        if (customSections.length > 0) return customSections;
      }

      // Exposition schema
      if (d.originalLanguageInsight || d.doctrinalMeaning || d.expositoryBreakdown) {
        if (d.historicalContext) customSections.push({ title: "Historical & Contextual Setting", body: d.historicalContext, isConclusion: false });
        if (d.originalLanguageInsight) customSections.push({ title: "Original Hebrew/Greek Linguistic Insights", body: d.originalLanguageInsight, isConclusion: false });
        if (d.expositoryBreakdown) customSections.push({ title: "Verse Expository Breakdown", body: d.expositoryBreakdown, isConclusion: false });
        if (d.doctrinalMeaning) customSections.push({ title: "Covenant Doctrine & Truth", body: d.doctrinalMeaning, isConclusion: false });
        if (d.crossReferences && Array.isArray(d.crossReferences)) {
          const crText = d.crossReferences.map((c: any) => `• **${c.reference}**: ${c.connection}`).join("\n");
          customSections.push({ title: "Scriptural Cross-References", body: crText, isConclusion: false });
        }
        if (d.lifeTransformation) customSections.push({ title: "Life Transformation", body: d.lifeTransformation, isConclusion: false });
        if (d.apostolicBlessing) customSections.push({ title: "Apostolic Blessing & Decree", body: d.apostolicBlessing, isConclusion: true });
        if (customSections.length > 0) return customSections;
      }
    }

    if (!text) return [];

    // 2. Parse text with markdown headers (### Header) or uppercase markers
    const lines = text.split("\n");
    const sections: { title: string; body: string; isConclusion: boolean }[] = [];
    let currentSecTitle = "";
    let currentBodyLines: string[] = [];

    const flushSec = () => {
      if (currentSecTitle || currentBodyLines.length > 0) {
        const body = currentBodyLines.join("\n").trim();
        if (body || currentSecTitle) {
          const lower = currentSecTitle.toLowerCase();
          const isConclusion = lower.includes("conclusion") || lower.includes("hope") || lower.includes("decree") || lower.includes("closing") || lower.includes("amen");
          sections.push({ title: currentSecTitle, body, isConclusion });
        }
      }
      currentSecTitle = "";
      currentBodyLines = [];
    };

    for (const rawLine of lines) {
      const line = rawLine.trim();
      const mdMatch = line.match(/^#{1,4}\s+(.+)$/);
      const colonMatch = line.match(/^([A-Za-z\s&🌟—]{4,50}):$/);

      if (mdMatch) {
        flushSec();
        currentSecTitle = mdMatch[1].replace(/[:🌟]/g, "").trim();
      } else if (colonMatch) {
        flushSec();
        currentSecTitle = colonMatch[1].replace(/[:🌟]/g, "").trim();
      } else {
        currentBodyLines.push(rawLine);
      }
    }
    flushSec();

    // Deduplicate any sections that have identical titles or bodies
    const seenTitles = new Set<string>();
    const seenBodies = new Set<string>();
    const uniqueSections: { title: string; body: string; isConclusion: boolean }[] = [];

    const sourceSections = sections.length > 0 ? sections : [{ title: "", body: text, isConclusion: false }];
    for (const sec of sourceSections) {
      const cleanTitle = sec.title.trim().toLowerCase();
      const cleanBody = sec.body.trim().toLowerCase();
      if (!cleanBody && !cleanTitle) continue;
      if (cleanTitle && seenTitles.has(cleanTitle) && seenBodies.has(cleanBody.slice(0, 50))) {
        continue;
      }
      if (cleanTitle) seenTitles.add(cleanTitle);
      if (cleanBody) seenBodies.add(cleanBody.slice(0, 50));
      uniqueSections.push(sec);
    }

    if (uniqueSections.length > 0) return uniqueSections;
    return [{ title: "", body: text, isConclusion: false }];
  };

  const parsedSections = parseSections(content, structuredData);
  const displayTitle = title || structuredData?.title || `${actionType}: ${scriptureReference}`;

  // Helper for inline markdown bold, italic, code, and standardized math
  const renderInlineContent = (text: string): React.ReactNode => {
    if (!text) return null;

    // Tokenize by display math $$...$$, inline math $...$, \(...\), \[...\], bold **...**, italic *...*, code `...`
    const tokenRegex = /(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\$[^\$\n]+?\$|\\\([\s\S]*?\\\)|\*\*.*?\*\*|\*.*?\*|`[^`\n]+?`)/g;
    const parts = text.split(tokenRegex);

    return parts.map((part, pIdx) => {
      if (!part) return null;

      // Display math $$...$$ or \[...\]
      if ((part.startsWith("$$") && part.endsWith("$$")) || (part.startsWith("\\[") && part.endsWith("\\]"))) {
        const mathContent = part.startsWith("$$") ? part.slice(2, -2) : part.slice(2, -2);
        return (
          <span key={pIdx} className="block my-2 text-center overflow-x-hidden">
            <MathView math={mathContent} block={true} className="text-sm sm:text-base font-semibold" />
          </span>
        );
      }

      // Inline math $...$ or \(...\)
      if ((part.startsWith("$") && part.endsWith("$") && part.length > 2) || (part.startsWith("\\(") && part.endsWith("\\)"))) {
        const mathContent = part.startsWith("$") ? part.slice(1, -1) : part.slice(2, -2);
        return <MathView key={pIdx} math={mathContent} block={false} className="text-xs sm:text-sm font-semibold" />;
      }

      // Bold **...**
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={pIdx} className="font-bold opacity-100">
            {renderInlineContent(part.slice(2, -2))}
          </strong>
        );
      }

      // Italic *...*
      if (part.startsWith("*") && part.endsWith("*")) {
        return (
          <em key={pIdx} className="italic opacity-90">
            {renderInlineContent(part.slice(1, -1))}
          </em>
        );
      }

      // Backticks `...`: if it looks like math, render via MathView; otherwise code tag
      if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
        const inner = part.slice(1, -1).trim();
        const isMathFormula =
          /(=|<|>|\\le|\\ge|\\ne|\\approx|\^|_|\\frac|\\sum|\\int|\\lim|\\cdot|\\times|\\sqrt|\\alpha|\\beta|\\gamma|\\theta|\\vec|\\lVert|\\partial|\\to|\\iff|\\implies|\+|-|\*|\/)/.test(
            inner
          ) && !/\b(import|export|const|let|var|function|return|console|null|undefined)\b/.test(inner);

        if (isMathFormula) {
          return (
            <MathView
              key={pIdx}
              math={inner}
              block={false}
              className="text-xs sm:text-sm font-semibold px-1 py-0.5 rounded bg-purple-900/20"
            />
          );
        }
        return (
          <code key={pIdx} className="font-mono text-xs px-1.5 py-0.5 rounded bg-black/20 font-semibold">
            {inner}
          </code>
        );
      }

      return part;
    });
  };

  // Helper for formatting blockquotes, lists, math environments, and paragraphs in each section
  const renderFormattedBody = (rawText: string) => {
    if (!rawText) return null;

    // If the text contains multi-line LaTeX environments, pass through RichMathContent
    const hasComplexLatex = /\\begin\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\}/.test(rawText);
    if (hasComplexLatex) {
      return (
        <div className="space-y-3 font-serif leading-relaxed">
          <RichMathContent content={rawText} className="text-xs sm:text-sm" />
        </div>
      );
    }

    const blocks = rawText.split(/\n{2,}/);
    return (
      <div className="space-y-3">
        {blocks.map((block, bIdx) => {
          const trimmed = block.trim();
          if (!trimmed) return null;

          // Block display math
          if ((trimmed.startsWith("$$") && trimmed.endsWith("$$")) || (trimmed.startsWith("\\[") && trimmed.endsWith("\\]"))) {
            const mathContent = trimmed.startsWith("$$") ? trimmed.slice(2, -2) : trimmed.slice(2, -2);
            return (
              <div key={bIdx} className="my-2.5 p-3.5 bg-black/20 rounded-xl border border-white/15 text-center overflow-x-hidden">
                <MathView math={mathContent} block={true} className="text-sm sm:text-base font-semibold text-white" />
              </div>
            );
          }

          // Blockquote / Scripture Callout
          if (trimmed.startsWith(">")) {
            const quoteLines = trimmed
              .split("\n")
              .map((l) => l.replace(/^>\s*/, "").trim())
              .join(" ");
            return (
              <div
                key={bIdx}
                className={`p-3.5 my-2 rounded-xl italic text-xs sm:text-sm font-serif leading-relaxed shadow-xs ${currentTheme.quoteBlock}`}
              >
                {renderInlineContent(quoteLines)}
              </div>
            );
          }

          // Bullet or numbered list
          if (
            trimmed.includes("\n- ") ||
            trimmed.startsWith("- ") ||
            trimmed.startsWith("* ") ||
            trimmed.startsWith("• ") ||
            /^\d+[\.\)]\s/.test(trimmed)
          ) {
            const items = trimmed.split(/\n[-*•\d+[\.\)]]\s+/).filter(Boolean);
            return (
              <ul key={bIdx} className="space-y-1.5 pl-4 list-disc text-xs sm:text-sm">
                {items.map((it, itIdx) => (
                  <li key={itIdx} className="leading-relaxed">
                    {renderInlineContent(it.replace(/^[-*•]\s+/, ""))}
                  </li>
                ))}
              </ul>
            );
          }

          return (
            <p key={bIdx} className="font-serif text-xs sm:text-sm leading-relaxed whitespace-pre-line opacity-95">
              {renderInlineContent(trimmed)}
            </p>
          );
        })}
      </div>
    );
  };

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
          {onToggleSpeak && (
            <button
              onClick={() => onToggleSpeak(content)}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
              title="Listen to Read Aloud"
            >
              <Volume2 className="w-4 h-4" />
            </button>
          )}

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
          {onShare && (
            <button
              onClick={() => onShare(`${actionType} • ${scriptureReference}`, content)}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
              title="Share"
            >
              <Share2 className="w-4 h-4" />
            </button>
          )}

          {/* Picture Studio */}
          {onOpenPictureStudio && (
            <button
              onClick={onOpenPictureStudio}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
              title="Open in Picture Studio"
            >
              <ImageIcon className="w-4 h-4" />
            </button>
          )}

          {/* Direct PNG */}
          {onDownloadPng && (
            <button
              onClick={onDownloadPng}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
              title="Download PNG Picture"
            >
              <Download className="w-4 h-4" />
            </button>
          )}

          {/* Open in Devotion Reader */}
          {onOpenDevotionReader && (
            <button
              onClick={onOpenDevotionReader}
              className={`px-2 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 cursor-pointer transition-colors ${currentTheme.buttonHover}`}
              title="Open in Full Devotion Reader"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reader</span>
            </button>
          )}

          {/* Dismiss */}
          {onDismiss && (
            <button
              onClick={onDismiss}
              className={`p-1.5 rounded-lg cursor-pointer transition-colors ${currentTheme.buttonHover}`}
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* 2. SCRIPTURE ANCHOR BANNER */}
      <div className="p-4 sm:p-5 space-y-4">
        {displayTitle && (
          <h3 className={`text-base sm:text-lg font-serif font-bold ${currentTheme.titleText}`}>
            {displayTitle}
          </h3>
        )}

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
                  {renderFormattedBody(sec.body)}
                </div>
              );
            }

            return (
              <div
                key={idx}
                className={`p-4 rounded-xl border space-y-2 transition-all ${currentTheme.sectionCard}`}
              >
                {sec.title && (
                  <h6 className={`text-xs uppercase tracking-wider flex items-center gap-1.5 ${currentTheme.sectionHeader}`}>
                    <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
                    <span>{sec.title}</span>
                  </h6>
                )}
                {renderFormattedBody(sec.body)}
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
