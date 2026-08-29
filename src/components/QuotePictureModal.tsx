import React, { useState, useRef, useEffect } from "react";
import {
  X,
  Download,
  Share2,
  Copy,
  Check,
  Sparkles,
  Layout,
  Maximize2,
  Image as ImageIcon,
  Palette,
  Eye,
  BookOpen,
  Quote
} from "lucide-react";
import { CreatorProfile } from "../types";
import { AppLogo } from "./AppLogo";

export interface QuotePictureItem {
  quote: string;
  author: string;
  title?: string;
  reference?: string;
  principle?: string;
  reflection?: string;
  category?: string;
}

interface QuotePictureModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: QuotePictureItem | null;
  activeProfile?: CreatorProfile;
}

type PictureTheme = "parchment-gold" | "royal-navy" | "midnight-obsidian" | "sunset-crimson" | "emerald-sanctuary";

interface PictureFormat {
  id: "social-square" | "story-wallpaper" | "landscape-banner";
  name: string;
  aspect: string;
  width: number;
  height: number;
  subtext: string;
}

const PICTURE_FORMATS: PictureFormat[] = [
  {
    id: "social-square",
    name: "Social Square (1:1)",
    aspect: "1:1",
    width: 2000,
    height: 2000,
    subtext: "WhatsApp, Instagram & Facebook Posts"
  },
  {
    id: "story-wallpaper",
    name: "Story & Mobile Wallpaper (9:16)",
    aspect: "9:16",
    width: 1440,
    height: 2560,
    subtext: "WhatsApp Status, Instagram Story & Lockscreen"
  },
  {
    id: "landscape-banner",
    name: "Landscape Banner (16:9)",
    aspect: "16:9",
    width: 2560,
    height: 1440,
    subtext: "Presentation, Desktop Wallpaper & Headers"
  }
];

export const QuotePictureModal: React.FC<QuotePictureModalProps> = ({
  isOpen,
  onClose,
  item,
  activeProfile
}) => {
  const [selectedFormat, setSelectedFormat] = useState<PictureFormat>(PICTURE_FORMATS[0]);
  const [selectedTheme, setSelectedTheme] = useState<PictureTheme>("parchment-gold");
  const [previewDataUrl, setPreviewDataUrl] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (isOpen && item) {
      setTimeout(() => {
        generatePreview();
      }, 50);
    }
  }, [isOpen, item, selectedFormat, selectedTheme]);

  if (!isOpen || !item) return null;

  // Helper to wrap text cleanly in canvas
  const wrapText = (
    ctx: CanvasRenderingContext2D,
    text: string,
    maxWidth: number
  ): string[] => {
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
    if (currentLine) lines.push(currentLine);
    return lines;
  };

  // Helper for drawing rounded rectangle
  const roundRect = (
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
  ) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  const drawCanvas = async (): Promise<string | null> => {
    const canvas = previewCanvasRef.current;
    if (!canvas) return null;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const W = selectedFormat.width;
    const H = selectedFormat.height;
    canvas.width = W;
    canvas.height = H;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const baseScale = W / 2000;

    // 1. Background Theme Setup
    if (selectedTheme === "parchment-gold") {
      ctx.fillStyle = "#FDFBF7";
      ctx.fillRect(0, 0, W, H);
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#FFFFFF");
      grad.addColorStop(0.3, "#FDFBF7");
      grad.addColorStop(0.7, "#FAF4E8");
      grad.addColorStop(1, "#F5ECD8");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (selectedTheme === "royal-navy") {
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#0B1329");
      grad.addColorStop(0.5, "#141E3C");
      grad.addColorStop(1, "#1E2A4A");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (selectedTheme === "midnight-obsidian") {
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#090A0F");
      grad.addColorStop(0.5, "#12131A");
      grad.addColorStop(1, "#1A1C24");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else if (selectedTheme === "sunset-crimson") {
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#2D0A14");
      grad.addColorStop(0.5, "#4C1D24");
      grad.addColorStop(1, "#6B1D28");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    } else {
      // Emerald sanctuary
      const grad = ctx.createLinearGradient(0, 0, 0, H);
      grad.addColorStop(0, "#062016");
      grad.addColorStop(0.5, "#0D3325");
      grad.addColorStop(1, "#134232");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);
    }

    const isDark = selectedTheme !== "parchment-gold";
    const goldColor = isDark ? "#FBBF24" : "#B48C35";
    const goldSubColor = isDark ? "#E2B857" : "#DCC398";
    const textColor = isDark ? "#FFFFFF" : "#0A0F1D";
    const secondaryTextColor = isDark ? "#E2E8F0" : "#334155";
    const boxBg = isDark ? "rgba(255, 255, 255, 0.05)" : "#FAF6EE";
    const boxBorder = isDark ? "rgba(251, 191, 36, 0.4)" : "#DCC398";

    // 2. DOUBLE GILDED GOLD BORDER & CORNER FILIGREES
    const margin = Math.round(50 * baseScale);
    const innerMargin = Math.round(72 * baseScale);

    ctx.strokeStyle = goldColor;
    ctx.lineWidth = Math.round(6 * baseScale);
    ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

    ctx.strokeStyle = goldSubColor;
    ctx.lineWidth = Math.round(2.5 * baseScale);
    ctx.strokeRect(innerMargin, innerMargin, W - innerMargin * 2, H - innerMargin * 2);

    // 4 Corner Gold Filigree Accents
    const cornerL = Math.round(65 * baseScale);
    ctx.lineWidth = Math.round(8 * baseScale);
    ctx.strokeStyle = goldColor;

    // Top-Left
    ctx.beginPath();
    ctx.moveTo(margin - 4, margin + cornerL);
    ctx.lineTo(margin - 4, margin - 4);
    ctx.lineTo(margin + cornerL, margin - 4);
    ctx.stroke();

    // Top-Right
    ctx.beginPath();
    ctx.moveTo(W - margin - cornerL, margin - 4);
    ctx.lineTo(W - margin + 4, margin - 4);
    ctx.lineTo(W - margin + 4, margin + cornerL);
    ctx.stroke();

    // Bottom-Left
    ctx.beginPath();
    ctx.moveTo(margin - 4, H - margin - cornerL);
    ctx.lineTo(margin - 4, H - margin + 4);
    ctx.lineTo(margin + cornerL, H - margin + 4);
    ctx.stroke();

    // Bottom-Right
    ctx.beginPath();
    ctx.moveTo(W - margin - cornerL, H - margin + 4);
    ctx.lineTo(W - margin + 4, H - margin + 4);
    ctx.lineTo(W - margin + 4, H - margin + 4 - cornerL);
    ctx.stroke();

    // 3. HEADER SECTION
    let currentY = innerMargin + Math.round(70 * baseScale);

    ctx.fillStyle = goldColor;
    ctx.font = `bold ${Math.round(36 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.letterSpacing = "5px";
    ctx.textAlign = "center";
    ctx.fillText("THE JOY OF THE LORD • SACRED WISDOM & SCRIPTURE", W / 2, currentY);

    currentY += Math.round(42 * baseScale);
    ctx.font = `italic bold ${Math.round(26 * baseScale)}px 'Georgia', serif`;
    ctx.fillStyle = secondaryTextColor;
    ctx.letterSpacing = "2px";
    ctx.fillText(item.category || "FAITH • PURPOSE • DESTINY • VICTORY", W / 2, currentY);

    // Header Underline Divider
    currentY += Math.round(30 * baseScale);
    ctx.strokeStyle = goldColor;
    ctx.lineWidth = Math.round(3 * baseScale);
    ctx.beginPath();
    ctx.moveTo(W / 2 - Math.round(350 * baseScale), currentY);
    ctx.lineTo(W / 2 + Math.round(350 * baseScale), currentY);
    ctx.stroke();

    // 4. USABLE VERTICAL SPACE
    const footerHeight = Math.round(200 * baseScale);
    const footerStartY = H - innerMargin - footerHeight;
    const availableSpace = footerStartY - currentY - Math.round(40 * baseScale);

    currentY += Math.round(30 * baseScale);

    const cardX = Math.round(120 * baseScale);
    const cardW = W - cardX * 2;
    const innerTextW = cardW - Math.round(100 * baseScale);

    // Calculate content dynamic sizing
    const quoteText = item.quote.trim();
    const hasPrinciple = Boolean(item.principle);
    const hasReflection = Boolean(item.reflection);
    const hasReference = Boolean(item.reference);

    // Dynamic Font Scaling
    let quoteFontSize = Math.round(56 * baseScale);
    if (quoteText.length > 250) {
      quoteFontSize = Math.round(44 * baseScale);
    } else if (quoteText.length > 150) {
      quoteFontSize = Math.round(50 * baseScale);
    } else if (quoteText.length < 80) {
      quoteFontSize = Math.round(66 * baseScale);
    }

    if (selectedFormat.id === "story-wallpaper") {
      quoteFontSize = Math.round(quoteFontSize * 1.05);
    }

    const quoteLineH = Math.round(quoteFontSize * 1.5);
    ctx.font = `italic bold ${quoteFontSize}px 'Georgia', serif`;
    const quoteLines = wrapText(ctx, `“${quoteText}”`, innerTextW);

    const principleFontSize = Math.round(38 * baseScale);
    const principleLineH = Math.round(principleFontSize * 1.45);
    ctx.font = `bold ${principleFontSize}px 'Plus Jakarta Sans', sans-serif`;
    const principleLines = hasPrinciple ? wrapText(ctx, item.principle!, innerTextW) : [];

    const reflectFontSize = Math.round(36 * baseScale);
    const reflectLineH = Math.round(reflectFontSize * 1.48);
    ctx.font = `500 ${reflectFontSize}px 'Georgia', serif`;
    const reflectLines = hasReflection ? wrapText(ctx, item.reflection!, innerTextW) : [];

    // Calculate Box Heights
    const quoteBoxNaturalH =
      Math.round(80 * baseScale) +
      quoteLines.length * quoteLineH +
      Math.round(40 * baseScale);

    const extraBoxNaturalH =
      (hasPrinciple || hasReflection)
        ? Math.round(70 * baseScale) +
          (hasPrinciple ? principleLines.length * principleLineH + Math.round(20 * baseScale) : 0) +
          (hasReflection ? reflectLines.length * reflectLineH : 0) +
          Math.round(40 * baseScale)
        : 0;

    const totalNaturalH = quoteBoxNaturalH + extraBoxNaturalH;
    const remainingSpace = availableSpace - totalNaturalH;

    let quoteBoxH = quoteBoxNaturalH;
    let extraBoxH = extraBoxNaturalH;
    let gap = Math.round(30 * baseScale);

    if (remainingSpace > 0) {
      quoteBoxH += Math.round(remainingSpace * 0.6);
      if (extraBoxH > 0) {
        extraBoxH += Math.round(remainingSpace * 0.4);
      }
      gap += Math.round(20 * baseScale);
    }

    // 5. DRAW MAIN QUOTE CARD
    const quoteBoxY = currentY;
    ctx.fillStyle = boxBg;
    ctx.strokeStyle = boxBorder;
    ctx.lineWidth = Math.round(2.5 * baseScale);
    roundRect(ctx, cardX, quoteBoxY, cardW, quoteBoxH, Math.round(18 * baseScale));
    ctx.fill();
    ctx.stroke();

    // Solid Gold Left Accent Bar
    ctx.fillStyle = goldColor;
    ctx.fillRect(cardX, quoteBoxY, Math.round(10 * baseScale), quoteBoxH);

    // Decorative Quote Mark Icon Watermark
    ctx.fillStyle = isDark ? "rgba(251, 191, 36, 0.08)" : "rgba(180, 140, 53, 0.08)";
    ctx.font = `bold ${Math.round(180 * baseScale)}px 'Georgia', serif`;
    ctx.textAlign = "right";
    ctx.fillText("“", cardX + cardW - Math.round(40 * baseScale), quoteBoxY + Math.round(160 * baseScale));

    // Quote Body Text
    ctx.fillStyle = textColor;
    ctx.font = `italic bold ${quoteFontSize}px 'Georgia', serif`;
    ctx.letterSpacing = "0.3px";
    ctx.textAlign = "left";
    let qY = quoteBoxY + Math.round(90 * baseScale);
    quoteLines.forEach((line) => {
      ctx.fillText(line, cardX + Math.round(50 * baseScale), qY);
      qY += quoteLineH;
    });

    // Author / Scripture Reference line
    const attribution = item.author
      ? `— ${item.author}${item.title ? ` (${item.title})` : ""}`
      : item.reference
      ? `— ${item.reference}`
      : "— The Joy of the Lord";

    ctx.fillStyle = goldColor;
    ctx.font = `bold ${Math.round(38 * baseScale)}px 'Georgia', serif`;
    ctx.textAlign = "right";
    ctx.fillText(attribution, cardX + cardW - Math.round(50 * baseScale), quoteBoxY + quoteBoxH - Math.round(32 * baseScale));

    currentY = quoteBoxY + quoteBoxH + gap;

    // 6. DRAW PRINCIPLE / REFLECTION CARD (If present)
    if (extraBoxH > 0) {
      const extraBoxY = currentY;
      ctx.fillStyle = boxBg;
      ctx.strokeStyle = boxBorder;
      ctx.lineWidth = Math.round(2 * baseScale);
      roundRect(ctx, cardX, extraBoxY, cardW, extraBoxH, Math.round(18 * baseScale));
      ctx.fill();
      ctx.stroke();

      ctx.fillStyle = goldColor;
      ctx.fillRect(cardX, extraBoxY, Math.round(8 * baseScale), extraBoxH);

      let eY = extraBoxY + Math.round(52 * baseScale);

      if (hasPrinciple) {
        ctx.fillStyle = goldColor;
        ctx.font = `bold ${Math.round(28 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
        ctx.letterSpacing = "2px";
        ctx.textAlign = "left";
        ctx.fillText("✦ KEY PRINCIPLE & BIBLICAL ANCHOR", cardX + Math.round(45 * baseScale), eY);
        eY += Math.round(44 * baseScale);

        ctx.fillStyle = textColor;
        ctx.font = `bold ${principleFontSize}px 'Georgia', serif`;
        principleLines.forEach((line) => {
          ctx.fillText(line, cardX + Math.round(45 * baseScale), eY);
          eY += principleLineH;
        });

        if (hasReference && !item.author) {
          ctx.fillStyle = goldColor;
          ctx.font = `italic bold ${Math.round(32 * baseScale)}px 'Georgia', serif`;
          ctx.fillText(`Scripture Anchor: ${item.reference}`, cardX + Math.round(45 * baseScale), eY + Math.round(10 * baseScale));
          eY += Math.round(42 * baseScale);
        }
      }

      if (hasReflection) {
        eY += Math.round(15 * baseScale);
        ctx.fillStyle = secondaryTextColor;
        ctx.font = `500 ${reflectFontSize}px 'Georgia', serif`;
        reflectLines.forEach((line) => {
          ctx.fillText(line, cardX + Math.round(45 * baseScale), eY);
          eY += reflectLineH;
        });
      }
    }

    // 7. FOOTER BANNER
    const footerY = H - innerMargin - Math.round(180 * baseScale);

    ctx.strokeStyle = goldColor;
    ctx.lineWidth = Math.round(2.5 * baseScale);
    ctx.beginPath();
    ctx.moveTo(cardX, footerY);
    ctx.lineTo(W - cardX, footerY);
    ctx.stroke();

    // Footer Left Detail
    const footerTextX = cardX + Math.round(20 * baseScale);
    ctx.textAlign = "left";
    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round(36 * baseScale)}px 'Georgia', serif`;
    ctx.fillText(activeProfile?.name || "Bismark Twum", footerTextX, footerY + Math.round(65 * baseScale));

    ctx.fillStyle = secondaryTextColor;
    ctx.font = `500 ${Math.round(22 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.fillText(
      activeProfile?.professionalTitle || "Christian | Mathematics Educator | Researcher | Writer",
      footerTextX,
      footerY + Math.round(105 * baseScale)
    );

    ctx.fillStyle = goldColor;
    ctx.font = `bold ${Math.round(20 * baseScale)}px 'Plus Jakarta Sans', sans-serif`;
    ctx.letterSpacing = "2px";
    ctx.fillText("THE JOY OF THE LORD DAILY DEVOTIONAL & WISDOM", footerTextX, footerY + Math.round(140 * baseScale));

    // Footer Right Decree
    const footerRightX = W - cardX - Math.round(20 * baseScale);
    ctx.textAlign = "right";
    ctx.fillStyle = goldColor;
    ctx.font = `italic bold ${Math.round(32 * baseScale)}px 'Georgia', serif`;
    ctx.fillText('"The joy of the Lord is my strength"', footerRightX, footerY + Math.round(68 * baseScale));

    ctx.fillStyle = secondaryTextColor;
    ctx.font = `bold ${Math.round(22 * baseScale)}px 'Georgia', serif`;
    ctx.fillText("Nehemiah 8:10", footerRightX, footerY + Math.round(105 * baseScale));

    ctx.fillStyle = textColor;
    ctx.font = `bold ${Math.round(28 * baseScale)}px 'Georgia', serif`;
    ctx.fillText("Bismark Twum", footerRightX, footerY + Math.round(140 * baseScale));

    return canvas.toDataURL("image/png");
  };

  const generatePreview = async () => {
    setIsGenerating(true);
    try {
      const url = await drawCanvas();
      setPreviewDataUrl(url);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = async (format: "png" | "jpeg" = "png") => {
    setIsGenerating(true);
    try {
      const dataUrl = await drawCanvas();
      if (!dataUrl) return;

      const filename = `joy-of-the-lord-quote--${(item.author || item.reference || "scripture")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")}-${selectedFormat.id}.${format}`;

      const link = document.createElement("a");
      link.download = filename;
      link.href = dataUrl;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = async () => {
    const text = `"${item.quote}"\n\n— ${item.author || item.reference || "Sacred Scripture"}${
      item.title ? ` (${item.title})` : ""
    }${item.principle ? `\nKey Principle: ${item.principle}` : ""}\n\nFrom "The Joy of the Lord"`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-[#111827] text-white w-full max-w-5xl rounded-2xl shadow-2xl border-2 border-[#B48C35] flex flex-col max-h-[95vh] overflow-hidden">
        {/* Top Header */}
        <div className="px-5 py-3.5 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] border-b border-[#B48C35]/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-amber-500 to-[#B48C35] text-white shadow-xs">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-white flex items-center gap-2">
                <span>Visual Scripture & Quote Picture Studio</span>
                <span className="px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 text-[10px] font-mono font-bold">
                  HD RENDER
                </span>
              </h3>
              <p className="text-xs text-slate-300">
                Generate, customize and download razor-sharp gold-bordered pictures of this quote
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body (2 Columns on Desktop) */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-5 p-5 overflow-y-auto">
          {/* Left Column: Format & Theme Controls */}
          <div className="lg:col-span-5 space-y-5">
            {/* Format Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Layout className="w-4 h-4" /> 1. Select Picture Aspect Ratio
              </label>
              <div className="grid grid-cols-1 gap-2">
                {PICTURE_FORMATS.map((fmt) => (
                  <button
                    key={fmt.id}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedFormat.id === fmt.id
                        ? "bg-amber-500/20 border-amber-400 text-white shadow-sm ring-1 ring-amber-400"
                        : "bg-slate-800/60 border-slate-700 text-slate-300 hover:bg-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-sm">{fmt.name}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-amber-300">
                        {fmt.width} × {fmt.height}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">{fmt.subtext}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Theme Selection */}
            <div className="space-y-2">
              <label className="text-xs font-bold font-mono uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Palette className="w-4 h-4" /> 2. Select Aesthetic Color Theme
              </label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => setSelectedTheme("parchment-gold")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedTheme === "parchment-gold"
                      ? "bg-amber-100 text-slate-900 border-amber-500 font-bold ring-2 ring-amber-400"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#FDFBF7] border border-amber-600 mb-1" />
                  <span>24k Gold Parchment</span>
                </button>

                <button
                  onClick={() => setSelectedTheme("royal-navy")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedTheme === "royal-navy"
                      ? "bg-blue-950 text-white border-blue-400 font-bold ring-2 ring-blue-400"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#0B1329] border border-blue-400 mb-1" />
                  <span>Deep Royal Navy</span>
                </button>

                <button
                  onClick={() => setSelectedTheme("midnight-obsidian")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedTheme === "midnight-obsidian"
                      ? "bg-slate-900 text-white border-amber-400 font-bold ring-2 ring-amber-400"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#090A0F] border border-amber-400 mb-1" />
                  <span>Midnight Obsidian</span>
                </button>

                <button
                  onClick={() => setSelectedTheme("sunset-crimson")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                    selectedTheme === "sunset-crimson"
                      ? "bg-rose-950 text-white border-rose-400 font-bold ring-2 ring-rose-400"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#2D0A14] border border-rose-400 mb-1" />
                  <span>Sunset Crimson</span>
                </button>

                <button
                  onClick={() => setSelectedTheme("emerald-sanctuary")}
                  className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer col-span-2 ${
                    selectedTheme === "emerald-sanctuary"
                      ? "bg-emerald-950 text-white border-emerald-400 font-bold ring-2 ring-emerald-400"
                      : "bg-slate-800 border-slate-700 text-slate-300"
                  }`}
                >
                  <div className="w-4 h-4 rounded-full bg-[#062016] border border-emerald-400 mb-1" />
                  <span>Emerald Spiritual Sanctuary</span>
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => handleDownload("png")}
                disabled={isGenerating}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-[#B48C35] hover:from-amber-400 hover:to-[#C2963B] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.01] active:scale-[0.99]"
              >
                <Download className="w-4 h-4" />
                <span>Download Ultra-HD Picture (PNG)</span>
              </button>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => handleDownload("jpeg")}
                  disabled={isGenerating}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JPEG Format</span>
                </button>

                <button
                  onClick={handleCopy}
                  className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-700"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-amber-400" />}
                  <span>{copied ? "Copied" : "Copy Quote"}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Live High-Resolution Visual Preview */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center bg-slate-950/70 p-4 rounded-2xl border border-slate-800">
            <div className="w-full flex items-center justify-between pb-2 text-xs text-slate-400 border-b border-slate-800 mb-3">
              <span className="flex items-center gap-1 font-mono">
                <Eye className="w-3.5 h-3.5 text-amber-400" /> Live Canvas Render
              </span>
              <span className="text-[11px] font-mono text-amber-400">
                {selectedFormat.width} × {selectedFormat.height} px
              </span>
            </div>

            {/* Hidden Offscreen Canvas for Razor-Sharp Rendering */}
            <canvas ref={previewCanvasRef} className="hidden" />

            {/* Rendered Preview Image */}
            <div className="max-h-[60vh] max-w-full flex items-center justify-center overflow-hidden rounded-xl shadow-2xl border border-slate-700/80 bg-black">
              {previewDataUrl ? (
                <img
                  src={previewDataUrl}
                  alt="Quote Picture Preview"
                  className="max-h-[58vh] w-auto object-contain rounded-lg"
                />
              ) : (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center gap-2">
                  <Sparkles className="w-8 h-8 text-amber-400 animate-spin" />
                  <p className="text-xs">Generating High-DPI Picture...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
