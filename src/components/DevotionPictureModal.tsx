import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  Image as ImageIcon,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  Smartphone,
  FileText,
  Square,
  ZoomIn
} from "lucide-react";
import { Devotion, CreatorProfile } from "../types";
import { loadCreatorProfile } from "../data/creatorData";
import { standardizeMathString } from "./MathView";

interface DevotionPictureModalProps {
  devotion: Devotion | null;
  isOpen: boolean;
  onClose: () => void;
  creatorProfile?: CreatorProfile;
}

export type PageFormatId = "full-page" | "story-wallpaper" | "social-square";

interface PageFormatConfig {
  id: PageFormatId;
  name: string;
  sublabel: string;
  width: number;
  height: number;
  icon: typeof FileText;
}

const PAGE_FORMATS: PageFormatConfig[] = [
  {
    id: "full-page",
    name: "Standard Full Page (PDF Style)",
    sublabel: "A4 / Letter HD Page (2400 × 3300 px)",
    width: 2400,
    height: 3300,
    icon: FileText
  },
  {
    id: "story-wallpaper",
    name: "Mobile Story / Wallpaper",
    sublabel: "Phone Screen HD (2160 × 3840 px)",
    width: 2160,
    height: 3840,
    icon: Smartphone
  },
  {
    id: "social-square",
    name: "Sanctuary Square",
    sublabel: "Social Media Square (2400 × 2400 px)",
    width: 2400,
    height: 2400,
    icon: Square
  }
];

export const DevotionPictureModal: React.FC<DevotionPictureModalProps> = ({
  devotion,
  isOpen,
  onClose,
  creatorProfile
}) => {
  const [selectedFormatId, setSelectedFormatId] = useState<PageFormatId>("full-page");
  const [isGenerating, setIsGenerating] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [copiedSuccess, setCopiedSuccess] = useState(false);
  const [zoomPreview, setZoomPreview] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const activeFormat = PAGE_FORMATS.find((f) => f.id === selectedFormatId) || PAGE_FORMATS[0];
  const activeProfile = creatorProfile || loadCreatorProfile();

  useEffect(() => {
    if (isOpen && devotion) {
      setTimeout(() => {
        drawPictureCanvas();
      }, 100);
    }
  }, [isOpen, devotion, selectedFormatId, activeProfile]);

  if (!isOpen || !devotion) return null;

  // Helper for line wrapping on canvas
  const wrapText = (ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] => {
    if (!text) return [];
    const words = text.split(/\s+/);
    const lines: string[] = [];
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const width = ctx.measureText(currentLine + " " + word).width;
      if (width < maxWidth) {
        currentLine += " " + word;
      } else {
        lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) {
      lines.push(currentLine);
    }
    return lines;
  };

  /**
   * Converts raw LaTeX expressions and mathematical notation into crystal-clear,
   * standardized Unicode typography formatted for 2D Canvas rendering and image export.
   */
  const formatMathForCanvasDisplay = (text: string): string => {
    if (!text) return "";
    let clean = text;

    // First pass through comprehensive math standardizer
    clean = standardizeMathString(clean);

    // Remove LaTeX math delimiters $$, $, \[, \], \(, \)
    clean = clean.replace(/\$\$([\s\S]*?)\$\$/g, "$1");
    clean = clean.replace(/\$([^\$\n]+?)\$/g, "$1");
    clean = clean.replace(/\\\[([\s\S]*?)\\\]/g, "$1");
    clean = clean.replace(/\\\(([\s\S]*?)\\\)/g, "$1");

    // Standardize LaTeX environments (cases, matrices, aligned)
    clean = clean.replace(/\\begin\{cases\}([\s\S]*?)\\end\{cases\}/g, (match, body) => {
      const parts = body.split(/\\\\/).map((p: string) => p.replace(/&/g, "  →  ").trim()).filter(Boolean);
      return ` { ` + parts.join(` ; `) + ` } `;
    });

    clean = clean.replace(/\\begin\{aligned\}([\s\S]*?)\\end\{aligned\}/g, (match, body) => {
      return body.replace(/\\\\/g, "\n").replace(/&/g, " ");
    });

    clean = clean.replace(/\\begin\{(?:matrix|pmatrix|bmatrix)\}([\s\S]*?)\\end\{(?:matrix|pmatrix|bmatrix)\}/g, (match, body) => {
      const rows = body.split(/\\\\/).map((r: string) => "[" + r.replace(/&/g, ", ").trim() + "]").filter(Boolean);
      return rows.join(" × ");
    });

    // Fractions: \frac{a}{b} -> (a / b)
    clean = clean.replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)");
    clean = clean.replace(/\\dfrac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)");
    clean = clean.replace(/\\tfrac\{([^}]+)\}\{([^}]+)\}/g, "($1 / $2)");

    // Square roots: \sqrt{x} -> √(x), \sqrt[n]{x} -> ⁿ√(x)
    clean = clean.replace(/\\sqrt\[([^\]]+)\]\{([^}]+)\}/g, "$1√($2)");
    clean = clean.replace(/\\sqrt\{([^}]+)\}/g, "√($1)");

    // Vectors, norms, inner products & Fonts
    clean = clean.replace(/\\vec\{([a-zA-Z0-9]+)\}/g, "$1⃗");
    clean = clean.replace(/\\mathbf\{([^}]+)\}/g, "$1");
    clean = clean.replace(/\\mathbb\{R\}/g, "ℝ");
    clean = clean.replace(/\\mathbb\{C\}/g, "ℂ");
    clean = clean.replace(/\\mathbb\{N\}/g, "ℕ");
    clean = clean.replace(/\\mathbb\{Z\}/g, "ℤ");
    clean = clean.replace(/\\mathbb\{Q\}/g, "ℚ");
    clean = clean.replace(/\\mathbb\{P\}/g, "ℙ");
    clean = clean.replace(/\\lVert\s*([^\\|]+?)\s*\\rVert/g, "‖$1‖");
    clean = clean.replace(/\\langle\s*([^,>]+?)\s*,\s*([^>]+?)\s*\\rangle/g, "⟨$1, $2⟩");

    // Text formatting inside equations
    clean = clean.replace(/\\text\{([^}]+)\}/g, "$1");
    clean = clean.replace(/\\mathrm\{([^}]+)\}/g, "$1");
    clean = clean.replace(/\\operatorname\{([^}]+)\}/g, "$1");
    clean = clean.replace(/\\mathit\{([^}]+)\}/g, "$1");

    // Integrals & Summations
    clean = clean.replace(/\\int_\{([^}]+)\}\^\{([^}]+)\}/g, "∫($1..$2)");
    clean = clean.replace(/\\int_\{([^}]+)\}/g, "∫($1)");
    clean = clean.replace(/\\int/g, "∫");
    clean = clean.replace(/\\iint/g, "∬");
    clean = clean.replace(/\\iiint/g, "∭");
    clean = clean.replace(/\\oint/g, "∮");
    clean = clean.replace(/\\sum_\{([^}]+)\}\^\{([^}]+)\}/g, "∑($1..$2)");
    clean = clean.replace(/\\sum_\{([^}]+)\}/g, "∑($1)");
    clean = clean.replace(/\\sum/g, "∑");
    clean = clean.replace(/\\prod_\{([^}]+)\}\^\{([^}]+)\}/g, "∏($1..$2)");
    clean = clean.replace(/\\prod/g, "∏");
    clean = clean.replace(/\\lim_\{([^}]+)\}/g, "lim($1)");

    // Common symbols & operators
    clean = clean.replace(/\\hbar/g, "ħ");
    clean = clean.replace(/\\cdot/g, " · ");
    clean = clean.replace(/\\times/g, " × ");
    clean = clean.replace(/\\div/g, " ÷ ");
    clean = clean.replace(/\\pm/g, "±");
    clean = clean.replace(/\\mp/g, "∓");
    clean = clean.replace(/\\approx/g, " ≈ ");
    clean = clean.replace(/\\neq/g, " ≠ ");
    clean = clean.replace(/\\equiv/g, " ≡ ");
    clean = clean.replace(/\\propto/g, " ∝ ");
    clean = clean.replace(/\\le|\\leq/g, " ≤ ");
    clean = clean.replace(/\\ge|\\geq/g, " ≥ ");
    clean = clean.replace(/\\to|\\rightarrow/g, " → ");
    clean = clean.replace(/\\Leftarrow/g, " ⇐ ");
    clean = clean.replace(/\\Rightarrow/g, " ⇒ ");
    clean = clean.replace(/\\implies/g, " ⟹ ");
    clean = clean.replace(/\\iff/g, " ⟺ ");
    clean = clean.replace(/\\Leftrightarrow/g, " ⇔ ");
    clean = clean.replace(/\\infty/g, "∞");
    clean = clean.replace(/\\partial/g, "∂");
    clean = clean.replace(/\\nabla/g, "∇");
    clean = clean.replace(/\\Delta/g, "Δ");
    clean = clean.replace(/\\alpha/g, "α");
    clean = clean.replace(/\\beta/g, "β");
    clean = clean.replace(/\\gamma/g, "γ");
    clean = clean.replace(/\\Gamma/g, "Γ");
    clean = clean.replace(/\\delta/g, "δ");
    clean = clean.replace(/\\epsilon|\\varepsilon/g, "ε");
    clean = clean.replace(/\\theta/g, "θ");
    clean = clean.replace(/\\lambda/g, "λ");
    clean = clean.replace(/\\Lambda/g, "Λ");
    clean = clean.replace(/\\mu/g, "μ");
    clean = clean.replace(/\\pi/g, "π");
    clean = clean.replace(/\\rho/g, "ρ");
    clean = clean.replace(/\\sigma/g, "σ");
    clean = clean.replace(/\\tau/g, "τ");
    clean = clean.replace(/\\phi/g, "φ");
    clean = clean.replace(/\\Phi/g, "Φ");
    clean = clean.replace(/\\omega/g, "ω");
    clean = clean.replace(/\\Omega/g, "Ω");
    clean = clean.replace(/\\Sigma/g, "Σ");
    clean = clean.replace(/\\therefore/g, "∴");
    clean = clean.replace(/\\because/g, "∵");
    clean = clean.replace(/\\forall/g, "∀");
    clean = clean.replace(/\\exists/g, "∃");
    clean = clean.replace(/\\in/g, " ∈ ");
    clean = clean.replace(/\\notin/g, " ∉ ");
    clean = clean.replace(/\\subset/g, " ⊂ ");
    clean = clean.replace(/\\subseteq/g, " ⊆ ");
    clean = clean.replace(/\\cup/g, " ∪ ");
    clean = clean.replace(/\\cap/g, " ∩ ");
    clean = clean.replace(/\\emptyset/g, "∅");

    // Standardize unicode exponents & subscripts for pristine canvas readability
    clean = clean
      .replace(/\^0/g, "⁰")
      .replace(/\^1/g, "¹")
      .replace(/\^2/g, "²")
      .replace(/\^3/g, "³")
      .replace(/\^4/g, "⁴")
      .replace(/\^5/g, "⁵")
      .replace(/\^6/g, "⁶")
      .replace(/\^7/g, "⁷")
      .replace(/\^8/g, "⁸")
      .replace(/\^9/g, "⁹")
      .replace(/\^n/g, "ⁿ")
      .replace(/\^t/g, "ᵗ")
      .replace(/\^x/g, "ˣ")
      .replace(/\^y/g, "ʸ")
      .replace(/\^\+/g, "⁺")
      .replace(/\^\-/g, "⁻")
      .replace(/_0/g, "₀")
      .replace(/_1/g, "₁")
      .replace(/_2/g, "₂")
      .replace(/_3/g, "₃")
      .replace(/_4/g, "₄")
      .replace(/_5/g, "₅")
      .replace(/_6/g, "₆")
      .replace(/_7/g, "₇")
      .replace(/_8/g, "₈")
      .replace(/_9/g, "₉")
      .replace(/_i/g, "ᵢ")
      .replace(/_j/g, "ⱼ")
      .replace(/_k/g, "ₖ")
      .replace(/_n/g, "ₙ")
      .replace(/_t/g, "ₜ");

    // Subscripts & Superscripts cleanup
    clean = clean.replace(/_\{([^}]+)\}/g, "_$1");
    clean = clean.replace(/\^\{([^}]+)\}/g, "^$1");
    clean = clean.replace(/\\quad|\\qquad|\\,/g, " ");

    // Clean up Markdown bold / italic
    clean = clean.replace(/\*\*([^*]+)\*\*/g, "$1");
    clean = clean.replace(/\*([^*]+)\*/g, "$1");

    // Remove any leftover LaTeX command slashes or isolated braces
    clean = clean.replace(/\\[a-zA-Z]+/g, "");
    clean = clean.replace(/[{}]/g, "");

    return clean.trim();
  };

  // Helper to draw rounded rectangle
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    r: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + w - r, y);
    ctx.quadraticCurveTo(x + w, y, x + w, y + r);
    ctx.lineTo(x + w, y + h - r);
    ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
    ctx.lineTo(x + r, y + h);
    ctx.quadraticCurveTo(x, y + h, x, y + h - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
  };

  /**
   * Draw the picture using the exact PDF parchment/ivory gold-bordered format
   * with high-DPI razor-sharp typography, content-aware auto-fitting, and full-page filling.
   */
  const drawPictureCanvas = async (): Promise<string | null> => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return null;

    if (typeof document !== "undefined" && document.fonts) {
      await document.fonts.ready;
    }

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return null;

    const W = activeFormat.width;
    const H = activeFormat.height;
    canvas.width = W;
    canvas.height = H;

    // High quality raster settings
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    // 1. Pristine Warm Parchment Background (#FDFBF7 with subtle warm depth)
    ctx.fillStyle = "#FDFBF7";
    ctx.fillRect(0, 0, W, H);

    const subtleGrad = ctx.createLinearGradient(0, 0, 0, H);
    subtleGrad.addColorStop(0, "#FFFFFF");
    subtleGrad.addColorStop(0.3, "#FDFBF7");
    subtleGrad.addColorStop(0.7, "#FAF5EB");
    subtleGrad.addColorStop(1, "#F6EFE0");
    ctx.fillStyle = subtleGrad;
    ctx.fillRect(0, 0, W, H);

    // 2. DOUBLE GILDED GOLD BORDERS & CORNER ORNAMENTS
    const baseScale = W / 2400; // Normalization scale based on 2400px width
    const margin = Math.round(52 * baseScale);
    const innerMargin = Math.round(76 * baseScale);

    // Outer 24k Gold Frame (6px solid #B48C35)
    ctx.strokeStyle = "#B48C35";
    ctx.lineWidth = Math.round(6 * baseScale);
    ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

    // Inner Delicate Gold Border (2.5px solid #DCC398)
    ctx.strokeStyle = "#DCC398";
    ctx.lineWidth = Math.round(2.5 * baseScale);
    ctx.strokeRect(innerMargin, innerMargin, W - innerMargin * 2, H - innerMargin * 2);

    // 4 Corner Gold Filigree Accents
    const cornerL = Math.round(70 * baseScale);
    ctx.lineWidth = Math.round(8 * baseScale);
    ctx.strokeStyle = "#B48C35";

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(margin - 4, margin + cornerL);
    ctx.lineTo(margin - 4, margin - 4);
    ctx.lineTo(margin + cornerL, margin - 4);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(W - margin + 4 - cornerL, margin - 4);
    ctx.lineTo(W - margin + 4, margin - 4);
    ctx.lineTo(W - margin + 4, margin + cornerL);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(margin - 4, H - margin + 4 - cornerL);
    ctx.lineTo(margin - 4, H - margin + 4);
    ctx.lineTo(margin + cornerL, H - margin + 4);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(W - margin + 4 - cornerL, H - margin + 4);
    ctx.lineTo(W - margin + 4, H - margin + 4);
    ctx.lineTo(W - margin + 4, H - margin + 4 - cornerL);
    ctx.stroke();

    // 3. HEADER SECTION
    let currentY = innerMargin + Math.round(60 * baseScale);

    // Brand Label: "THE JOY OF THE LORD • DAILY DEVOTIONAL"
    ctx.fillStyle = "#B48C35";
    ctx.font = `bold ${Math.round(40 * baseScale)}px 'Plus Jakarta Sans', -apple-system, sans-serif`;
    ctx.letterSpacing = "6px";
    ctx.textAlign = "center";
    ctx.fillText("THE JOY OF THE LORD • DAILY DEVOTIONAL", W / 2, currentY);

    currentY += Math.round(48 * baseScale);
    ctx.font = `italic bold ${Math.round(30 * baseScale)}px 'Georgia', serif`;
    ctx.fillStyle = "#475569"; // Crisper slate text
    ctx.letterSpacing = "2px";
    const dateStr = new Date().toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric"
    });
    ctx.fillText(
      `${(devotion.editionLabel || "Morning Manna").toUpperCase()} • ${dateStr}`,
      W / 2,
      currentY
    );

    // Header Gold Underline Divider
    currentY += Math.round(32 * baseScale);
    ctx.strokeStyle = "#B48C35";
    ctx.lineWidth = Math.round(3.5 * baseScale);
    ctx.beginPath();
    ctx.moveTo(W / 2 - Math.round(400 * baseScale), currentY);
    ctx.lineTo(W / 2 + Math.round(400 * baseScale), currentY);
    ctx.stroke();

    // 4. MAIN DEVOTION TITLE
    currentY += Math.round(65 * baseScale);
    ctx.fillStyle = "#0A0F1D"; // High-contrast deep dark ink
    ctx.font = `bold ${Math.round(72 * baseScale)}px 'Georgia', 'Source Serif 4', serif`;
    ctx.textAlign = "center";
    ctx.letterSpacing = "0.5px";

    const titleLines = wrapText(ctx, formatMathForCanvasDisplay(devotion.title), W - Math.round(360 * baseScale));
    const titleLineH = Math.round(86 * baseScale);
    titleLines.forEach((line) => {
      ctx.fillText(line, W / 2, currentY);
      currentY += titleLineH;
    });

    currentY += Math.round(15 * baseScale);

    // 5. CONTENT SECTIONS DATA PREPARATION
    const scriptureText = devotion.passageText || devotion.keyScripture || "";
    const cleanReference = devotion.keyScripture && devotion.keyScripture.length < 90
      ? devotion.keyScripture
      : devotion.subtitle || "Holy Scripture";

    const hasIntro = Boolean(devotion.introMessage && devotion.introMessage.trim());
    const hasPrayer = Boolean(devotion.guidedPrayer);
    const hasAction = Boolean(devotion.actionStep || devotion.practicalApplication);

    // Footer Height reservation
    const footerHeight = Math.round(230 * baseScale);
    const footerStartY = H - innerMargin - footerHeight;
    const availableVerticalSpace = footerStartY - currentY - Math.round(30 * baseScale);

    // Content length calculation to dynamically scale typography so it lavishly fills the page
    const introContent = formatMathForCanvasDisplay((devotion.introMessage || "").trim());
    const fullReflectText = formatMathForCanvasDisplay(devotion.reflection.replace(/\n\n/g, " ").trim());
    const actionContent = formatMathForCanvasDisplay((devotion.actionStep || devotion.practicalApplication || "").trim());
    const prayerContent = formatMathForCanvasDisplay((devotion.guidedPrayer || "").trim());

    const totalCharCount =
      scriptureText.length +
      (hasIntro ? introContent.length : 0) +
      fullReflectText.length +
      (hasAction ? actionContent.length : 0) +
      (hasPrayer ? prayerContent.length : 0);

    // Dynamic scale factor based on content length & canvas aspect ratio
    // If text is brief, significantly increase font scale so it is large, crystal clear and fills the canvas!
    let dynamicTextScale = 1.15;
    if (totalCharCount < 500) {
      dynamicTextScale = 1.45;
    } else if (totalCharCount < 850) {
      dynamicTextScale = 1.30;
    } else if (totalCharCount < 1200) {
      dynamicTextScale = 1.18;
    } else if (totalCharCount < 1600) {
      dynamicTextScale = 1.05;
    } else if (totalCharCount > 2000) {
      dynamicTextScale = 0.92;
    }

    // Adapt for square or story aspect ratios
    if (activeFormat.id === "social-square") {
      dynamicTextScale *= 0.88;
    } else if (activeFormat.id === "story-wallpaper") {
      dynamicTextScale *= 1.08;
    }

    const cardX = Math.round(120 * baseScale);
    const cardW = W - cardX * 2;
    const innerTextW = cardW - Math.round(80 * baseScale);

    // Font Sizes for Sections (in pixels scaled to canvas)
    const scripFontSize = Math.round(54 * baseScale * dynamicTextScale);
    const scripLineH = Math.round(scripFontSize * 1.48);

    const introFontSize = Math.round(48 * baseScale * dynamicTextScale);
    const introLineH = Math.round(introFontSize * 1.50);

    const expoFontSize = Math.round(48 * baseScale * dynamicTextScale);
    const expoLineH = Math.round(expoFontSize * 1.52);

    const actionFontSize = Math.round(44 * baseScale * dynamicTextScale);
    const actionLineH = Math.round(actionFontSize * 1.48);

    const prayerFontSize = Math.round(46 * baseScale * dynamicTextScale);
    const prayerLineH = Math.round(prayerFontSize * 1.50);

    const badgeFontSize = Math.round(30 * baseScale);

    const twoColBottom = (activeFormat.id === "full-page" || activeFormat.id === "social-square") && hasAction && hasPrayer;
    const colGap = Math.round(24 * baseScale);
    const bottomColW = twoColBottom ? Math.round((cardW - colGap) / 2) : cardW;
    const bottomInnerW = bottomColW - Math.round(70 * baseScale);

    // Measure text lines
    ctx.font = `italic bold ${scripFontSize}px 'Georgia', serif`;
    const scripLines = wrapText(ctx, `"${scriptureText}"`, innerTextW);

    ctx.font = `500 ${introFontSize}px 'Georgia', serif`;
    const introLines = hasIntro ? wrapText(ctx, introContent, innerTextW) : [];

    // Prepare and wrap Exposition paragraphs & mathematical formulas
    const rawExpoParas = devotion.reflection.split(/\n\n+/).filter(Boolean);
    ctx.font = `600 ${expoFontSize}px 'Georgia', serif`;
    const expoParaBlocks: { lines: string[]; isFormula: boolean; isHeading: boolean }[] = [];
    rawExpoParas.forEach((p) => {
      const trimmedP = p.trim();
      if (!trimmedP) return;
      const isHeading = /^(?:[A-Z0-9\s&]{4,}:|✦|\d+\.\s+[A-Z])/.test(trimmedP) && trimmedP.length < 80;
      const isFormula = /^(?:Mathematical\s+Analogy|Formula|Equation|Law|Calculus\s+Model):/i.test(trimmedP) ||
        (/^[a-zA-Z0-9_\(\)\s\+\-\*\/\^\=\\·\times\{\}\[\]]{3,}$/.test(trimmedP) && trimmedP.includes("="));
      const formatted = formatMathForCanvasDisplay(trimmedP);
      const lines = wrapText(ctx, formatted, innerTextW);
      if (lines.length > 0) {
        expoParaBlocks.push({ lines, isFormula, isHeading });
      }
    });

    const totalExpoLinesCount = expoParaBlocks.reduce((acc, b) => acc + b.lines.length, 0);
    const expoParaGap = Math.round(14 * baseScale);

    ctx.font = `600 ${actionFontSize}px 'Georgia', serif`;
    const actionLines = hasAction ? wrapText(ctx, actionContent, twoColBottom ? bottomInnerW : innerTextW) : [];

    ctx.font = `italic 600 ${prayerFontSize}px 'Georgia', serif`;
    const prayerLines = hasPrayer ? wrapText(ctx, `"${prayerContent}"`, twoColBottom ? bottomInnerW : innerTextW) : [];

    // Calculate natural content heights with generous inner padding
    const basePaddingTop = Math.round(80 * baseScale);
    const basePaddingBottom = Math.round(40 * baseScale);

    const scripNaturalH =
      basePaddingTop +
      scripLines.length * scripLineH +
      Math.round(45 * baseScale) + // reference line
      basePaddingBottom;

    const introNaturalH = hasIntro
      ? basePaddingTop + introLines.length * introLineH + basePaddingBottom
      : 0;

    const expoNaturalH =
      basePaddingTop +
      totalExpoLinesCount * expoLineH +
      Math.max(0, expoParaBlocks.length - 1) * expoParaGap +
      basePaddingBottom;

    const actionNaturalH = hasAction
      ? basePaddingTop + actionLines.length * actionLineH + basePaddingBottom
      : 0;

    const prayerNaturalH = hasPrayer
      ? basePaddingTop + prayerLines.length * prayerLineH + basePaddingBottom
      : 0;

    const bottomRowNaturalH = twoColBottom
      ? Math.max(actionNaturalH, prayerNaturalH)
      : actionNaturalH + prayerNaturalH;

    const totalNaturalContentH = scripNaturalH + introNaturalH + expoNaturalH + bottomRowNaturalH;
    const numSections = 2 + (hasIntro ? 1 : 0) + (twoColBottom ? 1 : ((hasAction ? 1 : 0) + (hasPrayer ? 1 : 0)));

    // Distribute leftover space evenly so that:
    // 1. Boxes expand proportionately with balanced padding
    // 2. Inter-box gaps expand gracefully
    // 3. NO GIANT EMPTY WHITE VOID IS LEFT!
    const baseGap = Math.round(30 * baseScale);
    const totalBaseGaps = (numSections - 1) * baseGap;
    const extraSpace = availableVerticalSpace - (totalNaturalContentH + totalBaseGaps);

    let sectionGap = baseGap;
    let scripBoxH = scripNaturalH;
    let introBoxH = introNaturalH;
    let expoBoxH = expoNaturalH;
    let actionBoxH = actionNaturalH;
    let prayerBoxH = prayerNaturalH;

    if (extraSpace > 0) {
      // Allocate 40% of extra space to inter-card gaps, 60% distributed across cards
      const gapExtra = Math.min(extraSpace * 0.4, (numSections - 1) * Math.round(28 * baseScale));
      sectionGap = baseGap + Math.round(gapExtra / Math.max(1, numSections - 1));

      const cardExtraSpace = extraSpace - gapExtra;
      // Proportional expansion for each card
      scripBoxH += Math.round(cardExtraSpace * (hasIntro ? 0.20 : 0.25));
      if (hasIntro) {
        introBoxH += Math.round(cardExtraSpace * 0.25);
      }
      expoBoxH += Math.round(cardExtraSpace * (hasIntro ? 0.35 : 0.50));
      if (twoColBottom) {
        const bottomAdd = Math.round(cardExtraSpace * (hasIntro ? 0.20 : 0.25));
        actionBoxH = Math.max(actionBoxH, prayerBoxH) + bottomAdd;
        prayerBoxH = actionBoxH;
      } else if (hasAction && hasPrayer) {
        actionBoxH += Math.round(cardExtraSpace * (hasIntro ? 0.10 : 0.12));
        prayerBoxH += Math.round(cardExtraSpace * (hasIntro ? 0.10 : 0.13));
      } else if (hasAction) {
        actionBoxH += Math.round(cardExtraSpace * (hasIntro ? 0.20 : 0.25));
      } else if (hasPrayer) {
        prayerBoxH += Math.round(cardExtraSpace * (hasIntro ? 0.20 : 0.25));
      }
    } else if (extraSpace < 0) {
      // If slight overflow, compress gaps and padding
      sectionGap = Math.max(Math.round(16 * baseScale), baseGap + Math.round(extraSpace / (numSections * 2)));
    }

    // 6. DRAW KEY SCRIPTURE BOX
    const scripBoxY = currentY;
    ctx.fillStyle = "#FAF6EE"; // Warm parchment card
    ctx.strokeStyle = "#DCC398";
    ctx.lineWidth = Math.round(2.5 * baseScale);
    roundRect(ctx, cardX, scripBoxY, cardW, scripBoxH, Math.round(18 * baseScale));
    ctx.fill();
    ctx.stroke();

    // Solid Gold 8px Left Accent Bar
    ctx.fillStyle = "#B48C35";
    ctx.fillRect(cardX, scripBoxY, Math.round(10 * baseScale), scripBoxH);

    // Label: "✦ KEY SCRIPTURE"
    ctx.fillStyle = "#B48C35";
    ctx.font = `bold ${badgeFontSize}px 'Plus Jakarta Sans', sans-serif`;
    ctx.letterSpacing = "2.5px";
    ctx.textAlign = "left";
    ctx.fillText("✦ KEY SCRIPTURE", cardX + Math.round(40 * baseScale), scripBoxY + Math.round(52 * baseScale));

    // Scripture Passage Text (High-contrast, razor-sharp dark navy/black)
    ctx.fillStyle = "#0A0F1D";
    ctx.font = `italic bold ${scripFontSize}px 'Georgia', serif`;
    ctx.letterSpacing = "0.2px";
    let sY = scripBoxY + Math.round(112 * baseScale);
    scripLines.forEach((line) => {
      ctx.fillText(line, cardX + Math.round(40 * baseScale), sY);
      sY += scripLineH;
    });

    // Scripture Reference (Right Aligned)
    ctx.fillStyle = "#B48C35";
    ctx.font = `bold ${Math.round(36 * baseScale)}px 'Georgia', serif`;
    ctx.textAlign = "right";
    ctx.fillText(`— ${cleanReference}`, cardX + cardW - Math.round(40 * baseScale), scripBoxY + scripBoxH - Math.round(32 * baseScale));

    currentY = scripBoxY + scripBoxH + sectionGap;

    // 6.5 DRAW INTRO & CENTRAL MESSAGE (If present)
    if (hasIntro && introBoxH > 0) {
      const inBoxY = currentY;
      ctx.fillStyle = "#FCF9F2"; // Warm highlighted intro card
      ctx.strokeStyle = "#C99E47";
      ctx.lineWidth = Math.round(2 * baseScale);
      roundRect(ctx, cardX, inBoxY, cardW, introBoxH, Math.round(18 * baseScale));
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#996515";
      ctx.fillRect(cardX, inBoxY, Math.round(8 * baseScale), introBoxH);

      ctx.fillStyle = "#996515";
      ctx.font = `bold ${badgeFontSize}px 'Plus Jakarta Sans', sans-serif`;
      ctx.letterSpacing = "2.5px";
      ctx.textAlign = "left";
      ctx.fillText("✦ CENTRAL THEME & SPIRITUAL SIGNIFICANCE", cardX + Math.round(40 * baseScale), inBoxY + Math.round(52 * baseScale));

      ctx.fillStyle = "#0F172A";
      ctx.font = `500 ${introFontSize}px 'Georgia', serif`;
      ctx.letterSpacing = "0.2px";
      let iY = inBoxY + Math.round(112 * baseScale);
      introLines.forEach((line) => {
        ctx.fillText(line, cardX + Math.round(40 * baseScale), iY);
        iY += introLineH;
      });

      currentY = inBoxY + introBoxH + sectionGap;
    }

    // 7. DRAW SCRIPTURAL EXPOSITION & SACRED MEDITATION SECTION
    const expoBoxY = currentY;
    ctx.fillStyle = "#FFFFFF"; // Clean contrast card
    ctx.strokeStyle = "#DCC398";
    ctx.lineWidth = Math.round(2 * baseScale);
    roundRect(ctx, cardX, expoBoxY, cardW, expoBoxH, Math.round(18 * baseScale));
    ctx.fill();
    ctx.stroke();

    // Gold Left Accent Bar
    ctx.fillStyle = "#B48C35";
    ctx.fillRect(cardX, expoBoxY, Math.round(8 * baseScale), expoBoxH);

    // Label: "✦ EXPOSITION & SACRED MEDITATION"
    ctx.fillStyle = "#B48C35";
    ctx.font = `bold ${badgeFontSize}px 'Plus Jakarta Sans', sans-serif`;
    ctx.letterSpacing = "2.5px";
    ctx.textAlign = "left";
    ctx.fillText("✦ EXPOSITION & SACRED MEDITATION", cardX + Math.round(40 * baseScale), expoBoxY + Math.round(52 * baseScale));

    // Reflection Body Text (High-contrast readable ink, formatted paragraph by paragraph)
    let eY = expoBoxY + Math.round(112 * baseScale);
    expoParaBlocks.forEach((block, bIdx) => {
      if (block.isFormula) {
        // Distinct, elegant amber/gold styling for mathematical equations & laws
        ctx.fillStyle = "#854D0E";
        ctx.font = `bold ${expoFontSize}px 'Georgia', serif`;
      } else if (block.isHeading) {
        ctx.fillStyle = "#926F28";
        ctx.font = `bold ${Math.round(expoFontSize * 0.95)}px 'Plus Jakarta Sans', sans-serif`;
      } else {
        ctx.fillStyle = "#0F172A";
        ctx.font = `500 ${expoFontSize}px 'Georgia', serif`;
      }
      ctx.letterSpacing = "0.2px";
      block.lines.forEach((line) => {
        ctx.fillText(line, cardX + Math.round(40 * baseScale), eY);
        eY += expoLineH;
      });
      if (bIdx < expoParaBlocks.length - 1) {
        eY += expoParaGap;
      }
    });

    currentY = expoBoxY + expoBoxH + sectionGap;

    // 8. DRAW PRACTICAL APPLICATION & GUIDED PRAYER
    if (twoColBottom) {
      // Neat side-by-side 2-column layout matching the PDF document format
      const bottomRowY = currentY;
      const bottomRowH = Math.max(prayerBoxH, actionBoxH);

      // Left Column: Guided Prayer of Faith
      const prayerCardX = cardX;
      ctx.fillStyle = "#FCFAF5";
      ctx.strokeStyle = "#DCC398";
      ctx.lineWidth = Math.round(2 * baseScale);
      roundRect(ctx, prayerCardX, bottomRowY, bottomColW, bottomRowH, Math.round(18 * baseScale));
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#B48C35";
      ctx.fillRect(prayerCardX, bottomRowY, Math.round(8 * baseScale), bottomRowH);

      ctx.fillStyle = "#B48C35";
      ctx.font = `bold ${Math.round(26 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.letterSpacing = "2px";
      ctx.textAlign = "left";
      ctx.fillText("✦ GUIDED FAITH PRAYER", prayerCardX + Math.round(32 * baseScale), bottomRowY + Math.round(48 * baseScale));

      ctx.fillStyle = "#0F172A";
      ctx.font = `italic ${prayerFontSize}px 'Georgia', serif`;
      let pY = bottomRowY + Math.round(100 * baseScale);
      prayerLines.forEach((line) => {
        ctx.fillText(line, prayerCardX + Math.round(32 * baseScale), pY);
        pY += prayerLineH;
      });

      // Right Column: Today's Faith Walk & Theme Decree
      const actionCardX = cardX + bottomColW + colGap;
      ctx.fillStyle = "#FAF7F0";
      ctx.strokeStyle = "#DCC398";
      ctx.lineWidth = Math.round(2 * baseScale);
      roundRect(ctx, actionCardX, bottomRowY, bottomColW, bottomRowH, Math.round(18 * baseScale));
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = "#B48C35";
      ctx.fillRect(actionCardX, bottomRowY, Math.round(8 * baseScale), bottomRowH);

      ctx.fillStyle = "#B48C35";
      ctx.font = `bold ${Math.round(26 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
      ctx.letterSpacing = "2px";
      ctx.textAlign = "left";
      ctx.fillText("✦ TODAY'S FAITH WALK & DECREE", actionCardX + Math.round(32 * baseScale), bottomRowY + Math.round(48 * baseScale));

      ctx.fillStyle = "#0F172A";
      ctx.font = `500 ${actionFontSize}px 'Georgia', serif`;
      let aY = bottomRowY + Math.round(100 * baseScale);
      actionLines.forEach((line) => {
        ctx.fillText(line, actionCardX + Math.round(32 * baseScale), aY);
        aY += actionLineH;
      });

      currentY = bottomRowY + bottomRowH + sectionGap;
    } else {
      // Stacked single column layout
      if (hasAction && actionBoxH > 0) {
        const actBoxY = currentY;
        ctx.fillStyle = "#FAF7F0";
        ctx.strokeStyle = "#DCC398";
        ctx.lineWidth = Math.round(2 * baseScale);
        roundRect(ctx, cardX, actBoxY, cardW, actionBoxH, Math.round(18 * baseScale));
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#B48C35";
        ctx.fillRect(cardX, actBoxY, Math.round(8 * baseScale), actionBoxH);

        ctx.fillStyle = "#B48C35";
        ctx.font = `bold ${Math.round(26 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
        ctx.letterSpacing = "2px";
        ctx.textAlign = "left";
        ctx.fillText("✦ TODAY'S FAITH WALK & DECREE", cardX + Math.round(40 * baseScale), actBoxY + Math.round(48 * baseScale));

        ctx.fillStyle = "#0F172A";
        ctx.font = `500 ${actionFontSize}px 'Georgia', serif`;
        let aY = actBoxY + Math.round(102 * baseScale);
        actionLines.forEach((line) => {
          ctx.fillText(line, cardX + Math.round(40 * baseScale), aY);
          aY += actionLineH;
        });

        currentY = actBoxY + actionBoxH + sectionGap;
      }

      if (hasPrayer && prayerBoxH > 0) {
        const prayerBoxY = currentY;
        ctx.fillStyle = "#FCFAF5";
        ctx.strokeStyle = "#DCC398";
        ctx.lineWidth = Math.round(2 * baseScale);
        roundRect(ctx, cardX, prayerBoxY, cardW, prayerBoxH, Math.round(18 * baseScale));
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#B48C35";
        ctx.fillRect(cardX, prayerBoxY, Math.round(8 * baseScale), prayerBoxH);

        ctx.fillStyle = "#B48C35";
        ctx.font = `bold ${Math.round(26 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
        ctx.letterSpacing = "2px";
        ctx.textAlign = "left";
        ctx.fillText("✦ GUIDED FAITH PRAYER", cardX + Math.round(40 * baseScale), prayerBoxY + Math.round(48 * baseScale));

        ctx.fillStyle = "#0F172A";
        ctx.font = `italic ${prayerFontSize}px 'Georgia', serif`;
        let pY = prayerBoxY + Math.round(102 * baseScale);
        prayerLines.forEach((line) => {
          ctx.fillText(line, cardX + Math.round(40 * baseScale), pY);
          pY += prayerLineH;
        });

        currentY = prayerBoxY + prayerBoxH + sectionGap;
      }
    }

    // 10. MANDATORY CLOSING SIGNATURE & AUTHOR BANNER
    const footerY = H - innerMargin - Math.round(210 * baseScale);

    // Gold Divider Line
    ctx.strokeStyle = "#B48C35";
    ctx.lineWidth = Math.round(2.5 * baseScale);
    ctx.beginPath();
    ctx.moveTo(cardX, footerY);
    ctx.lineTo(W - cardX, footerY);
    ctx.stroke();

    // Author Picture
    const portraitX = cardX + Math.round(20 * baseScale);
    const portraitY = footerY + Math.round(26 * baseScale);
    const portraitSize = Math.round(155 * baseScale);

    try {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = activeProfile.photoUrl && activeProfile.photoUrl.trim() ? activeProfile.photoUrl : "/bis.png";

      await new Promise<void>((resolve) => {
        img.onload = () => {
          ctx.save();
          ctx.beginPath();
          ctx.arc(
            portraitX + portraitSize / 2,
            portraitY + portraitSize / 2,
            portraitSize / 2,
            0,
            Math.PI * 2
          );
          ctx.closePath();
          ctx.clip();
          ctx.drawImage(img, portraitX, portraitY, portraitSize, portraitSize);
          ctx.restore();

          // Gold border ring around author photo
          ctx.strokeStyle = "#B48C35";
          ctx.lineWidth = Math.round(4.5 * baseScale);
          ctx.beginPath();
          ctx.arc(
            portraitX + portraitSize / 2,
            portraitY + portraitSize / 2,
            portraitSize / 2 + 2,
            0,
            Math.PI * 2
          );
          ctx.stroke();
          resolve();
        };
        img.onerror = () => {
          resolve();
        };
      });
    } catch {
      // ignore
    }

    // Left Author Details
    const textLeftX = portraitX + portraitSize + Math.round(30 * baseScale);
    ctx.textAlign = "left";
    ctx.fillStyle = "#0A0F1D";
    ctx.font = `bold ${Math.round(40 * baseScale)}px 'Georgia', serif`;
    ctx.fillText(activeProfile.name || "Bismark Twum", textLeftX, footerY + Math.round(74 * baseScale));

    ctx.fillStyle = "#475569";
    ctx.font = `500 ${Math.round(24 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(
      (activeProfile.professionalTitle || "Author & Mathematics Educator").substring(0, 80),
      textLeftX,
      footerY + Math.round(116 * baseScale)
    );

    ctx.fillStyle = "#B48C35";
    ctx.font = `bold ${Math.round(22 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.letterSpacing = "2px";
    ctx.fillText("THE JOY OF THE LORD DAILY DEVOTIONAL", textLeftX, footerY + Math.round(154 * baseScale));

    // Right Sacred Closing Decree
    const textRightX = W - cardX - Math.round(20 * baseScale);
    ctx.textAlign = "right";
    ctx.fillStyle = "#B48C35";
    ctx.font = `italic bold ${Math.round(36 * baseScale)}px 'Georgia', serif`;
    ctx.fillText('"The joy of the Lord is my strength"', textRightX, footerY + Math.round(76 * baseScale));

    ctx.fillStyle = "#475569";
    ctx.font = `bold ${Math.round(24 * baseScale)}px 'Georgia', serif`;
    ctx.fillText("Nehemiah 8:10", textRightX, footerY + Math.round(116 * baseScale));

    ctx.fillStyle = "#64748B";
    ctx.font = `bold ${Math.round(22 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText("Daily Apostolic Walk", textRightX, footerY + Math.round(154 * baseScale));

    return canvas.toDataURL("image/png");
  };

  const handleDownloadPicture = async (format: "png" | "jpeg" = "png") => {
    setIsGenerating(true);
    try {
      const dataUrl = await drawPictureCanvas();
      if (!dataUrl) return;

      const link = document.createElement("a");
      const safeTitle = devotion.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
      const mime = format === "jpeg" ? "image/jpeg" : "image/png";
      const ext = format === "jpeg" ? "jpg" : "png";

      link.download = `joy-of-the-lord-${safeTitle}-${selectedFormatId}.${ext}`;
      link.href = previewCanvasRef.current?.toDataURL(mime, 0.98) || dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setDownloadSuccess(true);
      setTimeout(() => setDownloadSuccess(false), 3000);
    } catch (err) {
      console.error("Error exporting devotion picture:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyImageToClipboard = async () => {
    try {
      const canvas = previewCanvasRef.current;
      if (!canvas) return;
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        // @ts-ignore
        if (navigator.clipboard && navigator.clipboard.write) {
          // @ts-ignore
          await navigator.clipboard.write([
            new ClipboardItem({
              "image/png": blob
            })
          ]);
          setCopiedSuccess(true);
          setTimeout(() => setCopiedSuccess(false), 2500);
        }
      }, "image/png");
    } catch (err) {
      console.error("Clipboard copy error:", err);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl w-full max-w-5xl max-h-[96vh] flex flex-col shadow-2xl overflow-hidden text-slate-100 my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold font-serif text-amber-400">
                Save Devotion Picture (PDF Format Match)
              </h2>
              <p className="text-xs text-slate-400">
                High-resolution export with standard ivory parchment & 24k Gold frame
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Canvas Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/60 p-4 rounded-2xl border border-slate-800">
            <div className="w-full flex items-center justify-between mb-3 text-xs text-slate-400">
              <span className="font-mono flex items-center gap-1.5 text-amber-400">
                <Sparkles className="w-3.5 h-3.5" /> High-DPI Canvas Rendering
              </span>
              <button
                onClick={() => setZoomPreview(!zoomPreview)}
                className="flex items-center gap-1 text-slate-300 hover:text-white cursor-pointer"
              >
                <ZoomIn className="w-3.5 h-3.5" />
                <span>{zoomPreview ? "Fit View" : "Zoom View"}</span>
              </button>
            </div>

            <div
              className={`w-full overflow-auto rounded-xl border border-amber-500/30 shadow-2xl flex justify-center bg-black/40 p-2 ${
                zoomPreview ? "max-h-[70vh]" : "max-h-[58vh]"
              }`}
            >
              <canvas
                ref={previewCanvasRef}
                className="max-w-full h-auto rounded shadow-lg transition-transform duration-300"
                style={{
                  maxHeight: zoomPreview ? "900px" : "480px",
                  objectFit: "contain"
                }}
              />
            </div>
          </div>

          {/* Right Controls & Export Actions */}
          <div className="lg:col-span-5 space-y-5">
            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono uppercase text-amber-400 tracking-wider block">
                1. Select Page Format
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PAGE_FORMATS.map((fmt) => {
                  const Icon = fmt.icon;
                  const isSelected = selectedFormatId === fmt.id;
                  return (
                    <button
                      key={fmt.id}
                      onClick={() => setSelectedFormatId(fmt.id)}
                      className={`p-3 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                        isSelected
                          ? "bg-amber-500/15 border-amber-500 text-amber-300 shadow-xs ring-1 ring-amber-500/40"
                          : "bg-slate-800/40 border-slate-700 text-slate-300 hover:bg-slate-800"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${isSelected ? "bg-amber-500 text-slate-950 font-bold" : "bg-slate-700 text-slate-300"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold">{fmt.name}</div>
                          <div className="text-[11px] opacity-75">{fmt.sublabel}</div>
                        </div>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-amber-400" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Devotional Summary Details */}
            <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700/80 space-y-2 text-xs">
              <div className="text-[11px] font-mono text-amber-400 font-bold uppercase">
                ✦ Standard PDF Alignment
              </div>
              <p className="text-slate-300 leading-relaxed">
                The image is automatically formatted with the exact same parchment background, double gold borders, Nehemiah 8:10 declaration, and creator signature as the PDF exporter.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                onClick={() => handleDownloadPicture("png")}
                disabled={isGenerating}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg cursor-pointer hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <>
                    <Check className="w-4 h-4 text-slate-950" />
                    <span>Downloaded Successfully!</span>
                  </>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-slate-950" />
                    <span>Download High-Res PNG Picture</span>
                  </>
                )}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDownloadPicture("jpeg")}
                  disabled={isGenerating}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5 text-amber-400" />
                  <span>Save as JPEG</span>
                </button>

                <button
                  onClick={handleCopyImageToClipboard}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  {copiedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-300">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-amber-400" />
                      <span>Copy Image</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
