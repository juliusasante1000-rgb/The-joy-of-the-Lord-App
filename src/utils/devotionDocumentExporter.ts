import { Devotion, CreatorProfile, SpiritualPlace, PlaceScripture, MathemaSermonItem, RhemaWordItem, StructuredPrayer, SystematicTopicItem } from "../types";
import { ApostleMathLesson } from "../data/apostleMathData";
import { loadCreatorProfile } from "../data/creatorData";
import { SYSTEMATIC_TOPICS_500_CATALOG } from "../data/systematicTopicsFullCatalog";
import { getCommentaryForVerse } from "../data/bibleCommentaryData";
import katex from "katex";
import { standardizeMathString } from "../components/MathView";

/**
 * Intelligent KaTeX renderer for printable & downloadable Devotional documents.
 * Converts LaTeX formulas, display equations, inline math, matrices, summations,
 * integrals, and vectors into crisp, publication-grade mathematical typography.
 */
export function renderDevotionalInlineMathHTML(text: string): string {
  if (!text) return "";
  let clean = text;

  // 1. Explicit inline math $...$ and \(...\)
  clean = clean.replace(/\$([^\$\n]+?)\$|\\\(([^\)]+?)\\\)/g, (match, p1, p2) => {
    const formula = (p1 || p2 || "").trim();
    if (!formula) return match;
    try {
      const sanitized = standardizeMathString(formula);
      return `<span class="katex-inline-box">${katex.renderToString(sanitized, {
        displayMode: false,
        throwOnError: false,
        output: "htmlAndMathml"
      })}</span>`;
    } catch {
      return escapeHTML(match);
    }
  });

  // 2. Inline parenthesized LaTeX equations containing backslash commands: (\vec{F} = m\vec{a})
  clean = clean.replace(/\(([^()\n]*?\\[a-zA-Z]+[^()\n]*?)\)/g, (match, inner) => {
    // Ensure it's not a normal parenthetical citation or sentence
    if (inner.includes("=") || inner.includes("\\vec") || inner.includes("\\frac") || inner.includes("\\sum") || inner.includes("\\Delta") || inner.includes("^")) {
      try {
        const sanitized = standardizeMathString(inner);
        return `(${katex.renderToString(sanitized, {
          displayMode: false,
          throwOnError: false,
          output: "htmlAndMathml"
        })})`;
      } catch {
        return match;
      }
    }
    return match;
  });

  return clean;
}

export function renderDevotionalTextToKaTeXHTML(content: string): string {
  if (!content) return "";

  const paragraphs = content.split(/\n\n+/);

  return paragraphs
    .map((p) => {
      const trimmed = p.trim();
      if (!trimmed) return "";

      // 1. Check if the block is purely a display math equation: $$...$$ or \[...\] or \begin{...}...\end{...}
      const explicitDisplayMath = trimmed.match(/^(\$\$[\s\S]*?\$\$|\\\[[\s\S]*?\\\]|\\begin\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\}[\s\S]*?\\end\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\})$/);
      if (explicitDisplayMath) {
        try {
          const rawMath = explicitDisplayMath[1];
          const clean = standardizeMathString(rawMath);
          const rendered = katex.renderToString(clean, {
            displayMode: true,
            throwOnError: false,
            output: "htmlAndMathml"
          });
          return `<div class="katex-display-box">${rendered}</div>`;
        } catch {
          return `<div class="math-fallback-box">${escapeHTML(trimmed)}</div>`;
        }
      }

      // 2. Check for labeled formula block: e.g. "Mathematical Principle & Physical Law:\n$$\sum ...$$" or "Mathematical Formula:\n\vec{F} = m\vec{a}"
      const labeledFormulaBlock = trimmed.match(/^((?:Mathematical\s+(?:Principle|Analogy|Law|Formula)|Formula|Equation|Physical\s+Law|Calculus\s+Model|Theorem)[^:\n]*:)\s*([\s\S]+)$/i);
      if (labeledFormulaBlock) {
        const label = labeledFormulaBlock[1].trim();
        const formulaBody = labeledFormulaBlock[2].trim();
        
        // If the body is a math equation (has LaTeX, =, \frac, etc.)
        if (formulaBody.startsWith("$$") || formulaBody.startsWith("\\[") || (formulaBody.includes("=") && /\\[a-zA-Z]+|[+\-*/^]/.test(formulaBody))) {
          try {
            const clean = standardizeMathString(formulaBody);
            const rendered = katex.renderToString(clean, {
              displayMode: true,
              throwOnError: false,
              output: "htmlAndMathml"
            });
            const cleanLabel = escapeHTML(label.replace(/\*\*/g, "").replace(/:\s*$/, ""));
            return `<div class="katex-display-box"><div class="math-label">✦ ${cleanLabel}</div>${rendered}</div>`;
          } catch {
            // fall through to standard rendering
          }
        }
      }

      // 3. Process markdown headings
      if (trimmed.startsWith("### ")) {
        return `<h3 class="doc-h3">✦ ${escapeHTML(trimmed.replace(/^###\s*/, ""))}</h3>`;
      }
      if (trimmed.startsWith("## ")) {
        return `<h2 class="doc-h2">✦ ${escapeHTML(trimmed.replace(/^##\s*/, ""))}</h2>`;
      }

      // 4. Parse display math blocks embedded inside the paragraph: $$...$$
      let html = trimmed.replace(/\$\$([\s\S]*?)\$\$/g, (match, inner) => {
        try {
          const clean = standardizeMathString(inner);
          return `<div class="katex-display-box">${katex.renderToString(clean, {
            displayMode: true,
            throwOnError: false,
            output: "htmlAndMathml"
          })}</div>`;
        } catch {
          return escapeHTML(match);
        }
      });

      // 5. Parse LaTeX environments: \begin{...} ... \end{...}
      html = html.replace(/(\\begin\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\}[\s\S]*?\\end\{(?:cases|matrix|pmatrix|bmatrix|aligned|array|align|gather)\})/g, (match) => {
        try {
          const clean = standardizeMathString(match);
          return `<div class="katex-display-box">${katex.renderToString(clean, {
            displayMode: true,
            throwOnError: false,
            output: "htmlAndMathml"
          })}</div>`;
        } catch {
          return escapeHTML(match);
        }
      });

      // 6. Parse inline math $...$ and \(...\)
      html = html.replace(/\$([^\$\n]+?)\$|\\\(([^\)]+?)\\\)/g, (match, p1, p2) => {
        const formula = (p1 || p2 || "").trim();
        if (!formula) return match;
        try {
          const clean = standardizeMathString(formula);
          return `<span class="katex-inline-box">${katex.renderToString(clean, {
            displayMode: false,
            throwOnError: false,
            output: "htmlAndMathml"
          })}</span>`;
        } catch {
          return escapeHTML(match);
        }
      });

      // 7. Parse inline parenthesized formulas with LaTeX commands: (\vec{F} = m\vec{a})
      html = html.replace(/\(([^()\n]*?\\[a-zA-Z]+[^()\n]*?)\)/g, (match, inner) => {
        if (inner.includes("=") || inner.includes("\\vec") || inner.includes("\\frac") || inner.includes("\\sum") || inner.includes("\\implies") || inner.includes("^")) {
          try {
            const clean = standardizeMathString(inner);
            return `(${katex.renderToString(clean, {
              displayMode: false,
              throwOnError: false,
              output: "htmlAndMathml"
            })})`;
          } catch {
            return match;
          }
        }
        return match;
      });

      // 8. Highlight section titles & headings
      html = html.replace(
        /^(THEME NARRATIVE & SPIRITUAL SIGNIFICANCE|SPIRITUAL MEANING & REVELATION|BIBLICAL SETTING & HISTORY|DEVOTIONAL REFLECTION|MATHEMATICAL ANALOGY & LAW|HOMILETIC SUMMARY|HOMILETIC EXEGESIS|HOMILY ON [^:\n]+):/gim,
        '<strong class="section-subheading">✦ $1:</strong>'
      );

      // Markdown bold & italic formatting
      html = html
        .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold">$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em class="italic text-slate-700">$1</em>');

      // Replace single newlines with breaks
      html = html.replace(/\n/g, "<br />");

      return `<p class="paragraph-block">${html}</p>`;
    })
    .filter(Boolean)
    .join("");
}

/**
 * Generates and downloads or prints a pristine 1-page paper document for any devotion,
 * scriptural place, sermon, rhema, prayer, or apostolic lesson,
 * featuring standard 1-page layout, elegant large typography, KaTeX equation rendering,
 * and the required closing:
 * "The joy of the Lord is my strength"
 * "Bismark Twum"
 */
export function generateDevotionDocumentHTML(devotion: Devotion, creatorProfile?: CreatorProfile): string {
  const profile = creatorProfile || loadCreatorProfile();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const photoSrc = (profile.photoUrl && profile.photoUrl.trim() && profile.photoUrl !== "/bis.png") ? profile.photoUrl : "/icon.svg";

  const titleText = devotion.title || "";
  const scriptText = devotion.passageText || devotion.keyScripture || "";
  const refText = devotion.reflection || "";
  const prayerText = devotion.guidedPrayer || "";
  const actionText = devotion.actionStep || devotion.practicalApplication || "";
  const totalLength = titleText.length + scriptText.length + refText.length + prayerText.length + actionText.length;

  let baseFontSize = "16.5px";
  let titleFontSize = "30px";
  let scriptureFontSize = "19px";
  let reflectionFontSize = "16px";
  let prayerFontSize = "15.5px";
  let actionFontSize = "15px";
  let sectionMargin = "16px";
  let containerPadding = "24px 28px";
  let scripturePadding = "16px 20px";

  if (totalLength < 550) {
    baseFontSize = "19px";
    titleFontSize = "35px";
    scriptureFontSize = "22px";
    reflectionFontSize = "18.5px";
    prayerFontSize = "17.5px";
    actionFontSize = "17px";
    sectionMargin = "22px";
    containerPadding = "30px 34px";
    scripturePadding = "20px 24px";
  } else if (totalLength < 950) {
    baseFontSize = "17.5px";
    titleFontSize = "31px";
    scriptureFontSize = "20px";
    reflectionFontSize = "17px";
    prayerFontSize = "16.5px";
    actionFontSize = "16px";
    sectionMargin = "18px";
    containerPadding = "26px 30px";
    scripturePadding = "17px 22px";
  } else if (totalLength > 1500) {
    baseFontSize = "14.5px";
    titleFontSize = "25px";
    scriptureFontSize = "16.5px";
    reflectionFontSize = "14.5px";
    prayerFontSize = "14px";
    actionFontSize = "13.5px";
    sectionMargin = "12px";
    containerPadding = "18px 22px";
    scripturePadding = "12px 16px";
  }

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${escapeHTML(devotion.title)} - Devotional Document</title>
  <!-- KaTeX Math Stylesheet for publication-grade mathematical equation rendering -->
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css">
  <style>
    @page {
      size: letter portrait;
      margin: 6mm 8mm 6mm 8mm;
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    html, body {
      height: 100%;
    }
    body {
      font-family: "Georgia", "Garamond", "Times New Roman", serif;
      color: #0f172a;
      background-color: #ffffff;
      line-height: 1.6;
      font-size: ${baseFontSize};
      padding: 0;
    }
    .page-container {
      width: 100%;
      max-width: 860px;
      min-height: 100%;
      margin: 0 auto;
      border: 3px solid #b48c35;
      padding: ${containerPadding};
      background: #fdfbf7;
      box-shadow: 0 4px 14px rgba(0,0,0,0.06);
      position: relative;
      display: flex;
      flex-direction: column;
    }
    .inner-border {
      border: 1.5px solid #dcc398;
      padding: ${containerPadding};
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .corner-decor {
      position: absolute;
      width: 18px;
      height: 18px;
      border-color: #b48c35;
    }
    .top-left { top: -2px; left: -2px; border-top: 4px solid #b48c35; border-left: 4px solid #b48c35; }
    .top-right { top: -2px; right: -2px; border-top: 4px solid #b48c35; border-right: 4px solid #b48c35; }
    .bottom-left { bottom: -2px; left: -2px; border-bottom: 4px solid #b48c35; border-left: 4px solid #b48c35; }
    .bottom-right { bottom: -2px; right: -2px; border-bottom: 4px solid #b48c35; border-right: 4px solid #b48c35; }

    /* Header */
    .doc-header {
      text-align: center;
      margin-bottom: ${sectionMargin};
      border-bottom: 2.5px solid #b48c35;
      padding-bottom: 14px;
    }
    .doc-brand {
      font-size: 13px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      letter-spacing: 3.5px;
      color: #b48c35;
      font-weight: 800;
      margin-bottom: 5px;
    }
    .doc-title {
      font-size: ${titleFontSize};
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
      margin-bottom: 6px;
    }
    .doc-meta {
      font-size: 13px;
      color: #475569;
      font-style: italic;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    /* Key Scripture Callout */
    .scripture-box {
      background: #f8f4eb;
      border-left: 5px solid #b48c35;
      border-right: 1px solid #e2d3b8;
      border-top: 1px solid #e2d3b8;
      border-bottom: 1px solid #e2d3b8;
      padding: ${scripturePadding};
      margin-bottom: ${sectionMargin};
      border-radius: 8px;
    }
    .scripture-label {
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #b48c35;
      margin-bottom: 5px;
    }
    .scripture-text {
      font-size: ${scriptureFontSize};
      font-style: italic;
      font-weight: 600;
      color: #0f172a;
      line-height: 1.52;
    }
    .scripture-ref {
      font-size: 13.5px;
      font-weight: bold;
      text-align: right;
      color: #b48c35;
      margin-top: 5px;
    }

    /* Content Sections */
    .section {
      margin-bottom: ${sectionMargin};
    }
    .section-heading {
      font-size: 12.5px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      letter-spacing: 2px;
      font-weight: 800;
      color: #0f172a;
      margin-bottom: 6px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .section-subheading {
      color: #926f28;
      font-size: 12.5px;
      letter-spacing: 1px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      display: inline-block;
      margin-top: 6px;
      margin-bottom: 3px;
    }
    .reflection-text {
      font-size: ${reflectionFontSize};
      color: #1e293b;
      line-height: 1.6;
      text-align: justify;
    }
    .reflection-text p {
      margin-bottom: 8px;
    }

    .paragraph-block {
      margin-bottom: 9px;
      line-height: 1.62;
    }
    .doc-h2 {
      font-size: 15.5px;
      font-weight: 800;
      color: #926f28;
      margin: 12px 0 6px 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      letter-spacing: 1.5px;
    }
    .doc-h3 {
      font-size: 14px;
      font-weight: 700;
      color: #0f172a;
      margin: 10px 0 4px 0;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
    .font-bold {
      font-weight: 700;
      color: #0f172a;
    }

    /* KaTeX Mathematical Formulas Styling in Exported Document */
    .katex-display-box {
      margin: 10px 0;
      padding: 10px 14px;
      background: #f4efe2;
      border: 1px solid #dcc398;
      border-left: 4px solid #b48c35;
      border-radius: 6px;
      text-align: center;
      overflow-x: auto;
    }
    .math-label {
      font-size: 11px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #926f28;
      margin-bottom: 6px;
      text-align: center;
    }
    .katex-inline-box {
      display: inline-block;
      vertical-align: middle;
      margin: 0 3px;
      padding: 1px 4px;
      background: #faf6ed;
      border-radius: 4px;
    }
    .katex {
      font-size: 1.15em !important;
      color: #0f172a !important;
    }
    .katex-display {
      margin: 2px 0 !important;
    }
    .katex-error {
      color: #926f28 !important;
      font-style: italic;
      border: none !important;
    }

    /* Grid for prayer and action */
    .grid-row {
      display: grid;
      grid-template-columns: 1.15fr 0.85fr;
      gap: 16px;
      margin-bottom: ${sectionMargin};
    }
    .prayer-card {
      background: #ffffff;
      border: 1.5px solid #dcc398;
      padding: 14px 18px;
      border-radius: 8px;
    }
    .prayer-text {
      font-size: ${prayerFontSize};
      font-style: italic;
      color: #0f172a;
      line-height: 1.55;
    }
    .action-card {
      background: #0f172a;
      color: #ffffff;
      padding: 14px 18px;
      border-radius: 8px;
    }
    .action-label {
      font-size: 11.5px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #dcc398;
      margin-bottom: 5px;
    }
    .action-text {
      font-size: ${actionFontSize};
      color: #f8fafc;
      line-height: 1.5;
    }

    /* Bottom Closing Mandatory Signature Block */
    .closing-block {
      margin-top: auto;
      padding-top: 14px;
      border-top: 2.5px solid #b48c35;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 18px;
    }
    .closing-portrait {
      width: 62px;
      height: 62px;
      border-radius: 50%;
      border: 2.5px solid #b48c35;
      object-fit: cover;
      box-shadow: 0 3px 8px rgba(0,0,0,0.18);
    }
    .closing-text-wrap {
      text-align: left;
    }
    .closing-quote {
      font-size: 17px;
      font-weight: 800;
      font-style: italic;
      color: #0f172a;
      letter-spacing: 0.5px;
      margin-bottom: 3px;
    }
    .closing-author {
      font-size: 14px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      font-weight: 800;
      color: #b48c35;
    }
    .closing-sub {
      font-size: 11.5px;
      color: #64748b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }

    @media print {
      body {
        background: none;
        padding: 0;
      }
      .page-container {
        box-shadow: none;
        border-width: 2px;
        max-width: 100%;
        height: 100%;
        page-break-after: avoid;
        page-break-inside: avoid;
      }
      .no-print {
        display: none !important;
      }
    }
  </style>
</head>
<body>
  <div class="page-container" id="printableDoc">
    <div class="inner-border" id="innerBorder">
      <div class="corner-decor top-left"></div>
      <div class="corner-decor top-right"></div>
      <div class="corner-decor bottom-left"></div>
      <div class="corner-decor bottom-right"></div>

      <!-- Header -->
      <div class="doc-header">
        <div class="doc-brand">The Joy of the Lord • Christian Devotional Sanctuary • ${escapeHTML(devotion.editionLabel || "Daily Manna")}</div>
        <h1 class="doc-title">${escapeHTML(devotion.title)}</h1>
        <div class="doc-meta">
          Category: ${escapeHTML(devotion.category || "Faith Walk")} • Theme: ${escapeHTML(devotion.theme || "Divine Grace")} • Date: ${currentDate}
        </div>
      </div>

      <!-- Scripture -->
      <div class="scripture-box">
        <div class="scripture-label">✦ Anchor Scripture (Holy Bible)</div>
        <div class="scripture-text">"${renderDevotionalInlineMathHTML(devotion.passageText || devotion.keyScripture)}"</div>
        <div class="scripture-ref">— ${escapeHTML(devotion.keyScripture.split(" - ")[0])}</div>
      </div>

      <!-- Scriptural Reflection with KaTeX Equations -->
      <div class="section">
        <div class="section-heading">✦ Biblical Reflection & Exposition</div>
        <div class="reflection-text">
          ${renderDevotionalTextToKaTeXHTML(devotion.reflection)}
        </div>
      </div>

      <!-- Practical & Guided Prayer -->
      <div class="grid-row">
        <div class="prayer-card">
          <div class="section-heading" style="color: #b48c35; margin-bottom: 4px;">✦ Guided Faith Prayer</div>
          <div class="prayer-text">"${renderDevotionalInlineMathHTML(devotion.guidedPrayer)}"</div>
        </div>
        <div class="action-card">
          <div class="action-label">✦ Today's Faith Walk & Theme Decree</div>
          <div class="action-text">${renderDevotionalInlineMathHTML(devotion.actionStep || devotion.practicalApplication || "Walk boldly in divine joy and trust God in all circumstances today.")}</div>
        </div>
      </div>

      <!-- Required Closing Signature Block with App Logo -->
      <div class="closing-block">
        <img class="closing-portrait" src="${escapeHTML(photoSrc)}" alt="${escapeHTML(profile.name || 'The Joy of the Lord')}" onerror="this.src='/icon.svg'" />
        <div class="closing-text-wrap">
          <div class="closing-quote">"${escapeHTML(profile.tagline || 'The joy of the Lord is my strength')}"</div>
          <div class="closing-author">${escapeHTML(profile.name || 'Bismark Twum')}</div>
        </div>
      </div>
    </div>
  </div>

  <script>
    window.onload = function() {
      // Dynamic full-page layout fit optimizer
      try {
        var page = document.getElementById("printableDoc");
        var inner = document.getElementById("innerBorder");
        if (page && inner) {
          var targetH = window.innerHeight > 700 ? window.innerHeight - 20 : 1050;
          var curH = page.scrollHeight;
          if (curH < targetH * 0.90) {
            var ratio = Math.min(1.22, (targetH / curH) * 0.95);
            inner.style.transformOrigin = "top center";
            inner.style.transform = "scale(" + ratio + ")";
          }
        }
      } catch (e) {}

      setTimeout(function() {
        window.print();
      }, 450);
    };
  </script>
</body>
</html>`;
}

/**
 * Universal HTML generator for Scriptural Places that explicitly includes the Theme Message,
 * Historical Setting, Spiritual Meaning, Anchor Scripture, and Guided Prayer!
 */
export function generateScripturalPlaceDocumentHTML(
  place: SpiritualPlace,
  scripture?: PlaceScripture,
  creatorProfile?: CreatorProfile
): string {
  const scrip: PlaceScripture = scripture || {
    id: `scrip_${place.id}`,
    placeIds: [place.id],
    book: "Bible",
    chapter: 1,
    verse: 1,
    reference: place.biblicalReference || "Holy Scripture",
    text: "The Joy of the Lord is your strength.",
    testament: "New Testament",
    theme: place.themes?.[0] || "Spiritual Atmosphere",
    keywords: place.themes || [],
    relevanceScore: 100,
    devotionalReflection: place.description || place.spiritualMeaning,
    guidedPrayerPrompt: `Lord God of ${place.name}, let the divine revelation and grace of this spiritual altar manifest in my life today. In Jesus' Name, Amen.`
  };

  const syntheticDevotion: Devotion = {
    id: `dev-place-${place.id}`,
    edition: "morning",
    editionLabel: `SCRIPTURAL PLACE • ${place.name.toUpperCase()}`,
    title: `${place.name}: ${place.subtitle || scrip.theme}`,
    keyScripture: scrip.reference,
    passageText: scrip.text,
    reflection: `THEME NARRATIVE & SPIRITUAL SIGNIFICANCE:\n${place.description}\n\nSPIRITUAL MEANING & REVELATION:\n${place.spiritualMeaning}${place.historicalContext ? `\n\nBIBLICAL SETTING & HISTORY:\n${place.historicalContext}` : ""}\n\nDEVOTIONAL REFLECTION:\n${scrip.devotionalReflection}`,
    practicalApplication: `Spiritual Atmosphere of ${place.name}: Live in ${place.themes?.join(", ") || "divine presence"} today.`,
    guidedPrayer: scrip.guidedPrayerPrompt || `Lord Jesus, let the power and atmosphere of ${place.name} rest upon my soul. Amen.`,
    actionStep: `Spiritual Pillars: ${place.themes?.join(" • ") || place.name}`,
    theme: `${place.name} • ${scrip.theme}`,
    category: "Scriptural Places",
    readTimeMinutes: 4
  };

  return generateDevotionDocumentHTML(syntheticDevotion, creatorProfile);
}

function escapeHTML(str: string): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

/**
 * Opens printable one-page paper document window and triggers print/save as PDF
 */
export function printDevotionOnePageDocument(devotion: Devotion, creatorProfile?: CreatorProfile) {
  const html = generateDevotionDocumentHTML(devotion, creatorProfile);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    downloadDevotionDocument(devotion, creatorProfile);
  }
}

/**
 * Downloads a high-quality standalone HTML one-page printable paper document
 */
export function downloadDevotionDocument(devotion: Devotion, creatorProfile?: CreatorProfile) {
  const html = generateDevotionDocumentHTML(devotion, creatorProfile);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filename = `${devotion.title.toLowerCase().replace(/[^a-z0-9]/g, "-")}-1page-devotion.html`;
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Universal print/save for Scriptural Places
 */
export function printScripturalPlaceDocument(place: SpiritualPlace, scripture?: PlaceScripture, creatorProfile?: CreatorProfile) {
  const html = generateScripturalPlaceDocumentHTML(place, scripture, creatorProfile);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    downloadScripturalPlaceDocument(place, scripture, creatorProfile);
  }
}

export function downloadScripturalPlaceDocument(place: SpiritualPlace, scripture?: PlaceScripture, creatorProfile?: CreatorProfile) {
  const html = generateScripturalPlaceDocumentHTML(place, scripture, creatorProfile);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filename = `${place.name.toLowerCase().replace(/[^a-z0-9]/g, "-")}-theme-devotion.html`;
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export interface QuoteExportItem {
  quote: string;
  author: string;
  title?: string;
  reference?: string;
  principle?: string;
  reflection?: string;
  category?: string;
}

/**
 * Universal HTML generator for Quotes and Wisdom Insights that formats the quote
 * using the exact same standard 1-page paper document layout, typography,
 * double gold borders, and signature closing with app logo and creator name.
 */
export function generateQuoteDocumentHTML(
  item: QuoteExportItem,
  creatorProfile?: CreatorProfile
): string {
  const authorName = item.author || "God's General";
  const titleText = item.title || (item.author ? `${item.author} Spiritual Wisdom` : "Sacred Spiritual Quote");
  const scriptureRef = item.reference || "Holy Scripture";
  const cat = item.category || "Divine Wisdom & Faith";

  let reflectionContent = "";
  if (item.principle && item.reflection) {
    reflectionContent = `✦ SPIRITUAL PRINCIPLE & REVELATION:\n${item.principle}\n\n✦ EXPOSITION & BIBLICAL MEDITATION:\n${item.reflection}`;
  } else if (item.principle) {
    reflectionContent = `✦ SPIRITUAL PRINCIPLE & REVELATION:\n${item.principle}`;
  } else if (item.reflection) {
    reflectionContent = `✦ SPIRITUAL EXPOSITION & WISDOM:\n${item.reflection}`;
  } else {
    reflectionContent = `✦ SPIRITUAL REVELATION:\nMeditate upon this sacred wisdom and truth. Let the power of God's Word renew your mind, establish your steps, and fill your spirit with divine peace and strength today.`;
  }

  const syntheticDevotion: Devotion = {
    id: `quote-${Date.now()}`,
    edition: "morning",
    editionLabel: `SPIRITUAL WISDOM • ${authorName.toUpperCase()}`,
    title: titleText,
    keyScripture: scriptureRef,
    passageText: item.quote,
    reflection: reflectionContent,
    practicalApplication: item.principle ? `Live out this truth: ${item.principle}` : `Walk in the light of this divine wisdom today. Trust the Lord with all your heart.`,
    guidedPrayer: `Lord God Almighty, thank You for the truth revealed in Your Word and the wisdom passed down through Your servants. Anchor this revelation deep within my spirit today. In Jesus' mighty Name, Amen.`,
    actionStep: `Faith Decree: "The joy of the Lord is my strength" (Nehemiah 8:10)`,
    theme: `${authorName} • ${cat}`,
    category: cat,
    readTimeMinutes: 3
  };

  return generateDevotionDocumentHTML(syntheticDevotion, creatorProfile);
}

/**
 * Universal print/save as 1-Page PDF for Quotes and Wisdom Insights
 */
export function printQuoteOnePageDocument(
  item: QuoteExportItem,
  creatorProfile?: CreatorProfile
) {
  const html = generateQuoteDocumentHTML(item, creatorProfile);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    downloadQuoteDocument(item, creatorProfile);
  }
}

/**
 * Downloads a high-quality standalone HTML one-page printable paper document for a Quote
 */
export function downloadQuoteDocument(
  item: QuoteExportItem,
  creatorProfile?: CreatorProfile
) {
  const html = generateQuoteDocumentHTML(item, creatorProfile);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const authorClean = (item.author || "quote").toLowerCase().replace(/[^a-z0-9]/g, "-");
  const filename = `joy-of-the-lord-${authorClean}-1page-document.html`;
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// ============================================================================
// BIBLE VERSE DOWNLOAD & 1-PAGE DOCUMENT EXPORTER
// ============================================================================

export interface BibleVerseExportItem {
  book: string;
  chapter: number;
  verse: number;
  text: string;
  version?: string;
  testament?: string;
  group?: string;
  historicalContext?: string;
  reflection?: string;
  commentary?: {
    matthewHenry?: string;
    spurgeon?: string;
    apostolicRhema?: string;
  };
  wordStudy?: {
    originalWord?: string;
    strongsNumber?: string;
    transliteration?: string;
    shortDef?: string;
    theologicalInsight?: string;
  };
  guidedPrayer?: string;
  faithDecree?: string;
  crossReferences?: string[];
}

/**
 * Generates an elegant, publication-grade 1-page printable paper document HTML for any Bible verse,
 * complete with double gold borders, corner ornaments, expository reflection, commentary, prayer,
 * and the mandatory closing signature block with app logo and subscription ("The joy of the Lord is my strength" — Bismark Twum).
 */
export function generateBibleVerseDocumentHTML(
  item: BibleVerseExportItem,
  creatorProfile?: CreatorProfile
): string {
  const versionStr = item.version || "King James Version (KJV)";
  const bookRef = `${item.book} ${item.chapter}:${item.verse}`;
  const commentaryData = item.commentary || getCommentaryForVerse(item.book, item.chapter, item.verse, item.text);

  let expositionParts: string[] = [];

  // Historical Setting & Context
  if (item.historicalContext && item.historicalContext.trim()) {
    expositionParts.push(`✦ HISTORICAL & COVENANT MILIEU:\n${item.historicalContext.trim()}`);
  }

  // Biblical Reflection & Exposition
  if (item.reflection && item.reflection.trim()) {
    expositionParts.push(`✦ EXEGESIS & SPIRITUAL REVELATION:\n${item.reflection.trim()}`);
  } else {
    expositionParts.push(
      `✦ EXEGESIS & SPIRITUAL REVELATION:\nMeditate deeply upon this sacred truth from ${bookRef}. As the inspired Word of God, it delivers divine counsel, supernatural strength, and eternal perspective. Set your heart to receive the transforming work of the Holy Spirit through this scripture.`
    );
  }

  // Classic & Apostolic Commentaries
  const commList: string[] = [];
  if (commentaryData.matthewHenry) {
    commList.push(`• Matthew Henry: ${commentaryData.matthewHenry}`);
  }
  if (commentaryData.spurgeon) {
    commList.push(`• Charles Spurgeon: "${commentaryData.spurgeon}"`);
  }
  if (commentaryData.apostolicRhema) {
    commList.push(`• Apostolic Rhema: ${commentaryData.apostolicRhema}`);
  }
  if (commList.length > 0) {
    expositionParts.push(`✦ HISTORIC COMMENTARY & APOSTOLIC INSIGHTS:\n${commList.join("\n\n")}`);
  }

  // Interlinear / Word Study if available
  if (item.wordStudy) {
    const ws = item.wordStudy;
    expositionParts.push(
      `✦ HEBREW / GREEK WORD STUDY:\nOriginal Word: ${ws.originalWord || ""} (${ws.strongsNumber || ""}) — Transliteration: ${ws.transliteration || ""}\nDefinition: ${ws.shortDef || ""}\nInsight: ${ws.theologicalInsight || ""}`
    );
  }

  // Cross references if present
  if (item.crossReferences && item.crossReferences.length > 0) {
    expositionParts.push(`✦ SCRIPTURAL CROSS-REFERENCES:\n${item.crossReferences.join(" • ")}`);
  }

  const defaultPrayer = `Heavenly Father, thank You for the living, active truth of ${bookRef}. Let this holy scripture take deep root in my heart today. Grant me spiritual wisdom, divine understanding, and grace to walk faithfully in obedience to Your eternal Word. In Jesus' mighty Name, Amen.`;
  const defaultAction = `Faith Decree: "The joy of the Lord is my strength" (Nehemiah 8:10) — I declare that the living truth of ${bookRef} is working mightily in my life today!`;

  const syntheticDevotion: Devotion = {
    id: `verse-${item.book}-${item.chapter}-${item.verse}-${Date.now()}`,
    edition: "morning",
    editionLabel: `HOLY SCRIPTURE SANCTUARY • ${item.book.toUpperCase()} ${item.chapter}:${item.verse}`,
    title: `${item.book} ${item.chapter}:${item.verse}`,
    keyScripture: `${bookRef} (${versionStr})`,
    passageText: item.text,
    reflection: expositionParts.join("\n\n"),
    guidedPrayer: item.guidedPrayer || defaultPrayer,
    actionStep: item.faithDecree || defaultAction,
    theme: `${item.book} • ${item.testament || "Canonical Scripture"}`,
    category: item.group || "Holy Scripture",
    readTimeMinutes: 3
  };

  return generateDevotionDocumentHTML(syntheticDevotion, creatorProfile);
}

/**
 * Downloads a standalone 1-page printable paper document HTML for any Bible verse
 */
export function downloadBibleVerseDocument(
  item: BibleVerseExportItem,
  creatorProfile?: CreatorProfile
): void {
  const html = generateBibleVerseDocumentHTML(item, creatorProfile);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const cleanRef = `${item.book}-${item.chapter}-${item.verse}`.toLowerCase().replace(/[^a-z0-9]/g, "-");
  link.href = url;
  link.download = `joy-of-the-lord-${cleanRef}-scripture-document.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Opens print dialog for a 1-page paper document for any Bible verse
 */
export function printBibleVerseDocument(
  item: BibleVerseExportItem,
  creatorProfile?: CreatorProfile
): void {
  const html = generateBibleVerseDocumentHTML(item, creatorProfile);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    downloadBibleVerseDocument(item, creatorProfile);
  }
}

// ============================================================================
// 500 SYSTEMATIC TOPICS COMPENDIUM & INDIVIDUAL TOPIC EXPORTER
// ============================================================================

/**
 * Generates an elegant 1-page printable paper document for an individual Systematic Topic out of the 500 catalog
 */
export function generateSystematicTopicDocumentHTML(
  topic: SystematicTopicItem,
  creatorProfile?: CreatorProfile
): string {
  const anchorText = topic.anchorScriptures && topic.anchorScriptures.length > 0
    ? topic.anchorScriptures.map(s => `"${s.text || ''}" — ${s.reference}`).join("\n\n")
    : "Holy Scripture";
  const primaryRef = topic.anchorScriptures?.[0]?.reference || "Systematic Scripture";

  const reflectionSections: string[] = [];

  // 1. Theological Summary
  reflectionSections.push(`✦ THEOLOGICAL SUMMARY & FOUNDATIONAL ORTHODOXY:\n${topic.theologicalSummary}`);

  // 2. Doctrinal Pillars
  if (topic.keyInsights && topic.keyInsights.length > 0) {
    const pillars = topic.keyInsights.map(k => `• ${k}`).join("\n");
    reflectionSections.push(`✦ DOCTRINAL PILLARS & KEY BIBLICAL INSIGHTS:\n${pillars}`);
  }

  // 3. Practical Discipleship
  if (topic.practicalApplication) {
    reflectionSections.push(`✦ PRACTICAL DISCIPLESHIP & CHRISTIAN WALK:\n${topic.practicalApplication}`);
  }

  // 4. All Anchor References
  if (topic.anchorScriptures && topic.anchorScriptures.length > 1) {
    const refs = topic.anchorScriptures.map(s => s.reference).join(" • ");
    reflectionSections.push(`✦ SUPPORTING SCRIPTURAL PASSAGES:\n${refs}`);
  }

  const syntheticDevotion: Devotion = {
    id: `systematic-topic-${topic.topicNumber}-${Date.now()}`,
    edition: "morning",
    editionLabel: `500 SYSTEMATIC THEOLOGY COMPENDIUM • TOPIC #${topic.topicNumber}`,
    title: `Topic #${topic.topicNumber}: ${topic.title}`,
    keyScripture: primaryRef,
    passageText: anchorText,
    reflection: reflectionSections.join("\n\n"),
    guidedPrayer: `Lord God of Truth, thank You for the revelation of Your Word concerning "${topic.title}". Anchor this foundational doctrine firmly in my heart, establish my faith against false doctrines, and empower me to walk in the fullness of Your kingdom truth. In Jesus' mighty Name, Amen.`,
    actionStep: `Faith Decree: "The joy of the Lord is my strength" (Nehemiah 8:10) — I stand firm on the biblical pillar of ${topic.title} and confess God's everlasting truth over my life!`,
    theme: `${topic.division} • ${topic.category}`,
    category: topic.category,
    readTimeMinutes: 4
  };

  return generateDevotionDocumentHTML(syntheticDevotion, creatorProfile);
}

/**
 * Downloads a standalone 1-page printable paper document for an individual Systematic Topic
 */
export function downloadSystematicTopicDocument(
  topic: SystematicTopicItem,
  creatorProfile?: CreatorProfile
): void {
  const html = generateSystematicTopicDocumentHTML(topic, creatorProfile);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const cleanTitle = topic.title.toLowerCase().replace(/[^a-z0-9]/g, "-");
  link.href = url;
  link.download = `joy-of-the-lord-topic-${topic.topicNumber}-${cleanTitle}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Opens print dialog for an individual Systematic Topic 1-page document
 */
export function printSystematicTopicDocument(
  topic: SystematicTopicItem,
  creatorProfile?: CreatorProfile
): void {
  const html = generateSystematicTopicDocumentHTML(topic, creatorProfile);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    downloadSystematicTopicDocument(topic, creatorProfile);
  }
}

/**
 * Generates the Complete 500 Systematic Topics Master Compendium Document HTML,
 * including all 500 topics categorized across the 5 divisions, anchor scriptures,
 * theological summaries, doctrinal pillars, and the mandatory closing signature block with app logo and subscription.
 */
export function generate500TopicsCatalogCompendiumHTML(
  divisionFilter?: string,
  creatorProfile?: CreatorProfile
): string {
  const profile = creatorProfile || loadCreatorProfile();
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
  const photoSrc = (profile.photoUrl && profile.photoUrl.trim() && profile.photoUrl !== "/bis.png") ? profile.photoUrl : "/icon.svg";

  // Filter topics if specified
  let topics = SYSTEMATIC_TOPICS_500_CATALOG;
  let catalogSubheading = "Complete Master Compendium Covering All 500 Systematic Theology & Christian Life Topics";

  if (divisionFilter === "part1") {
    topics = topics.filter(t => t.topicNumber >= 1 && t.topicNumber <= 100);
    catalogSubheading = "Division 1: Core Christian Life Topics (Topics 1 to 100)";
  } else if (divisionFilter === "part2") {
    topics = topics.filter(t => t.topicNumber >= 101 && t.topicNumber <= 200);
    catalogSubheading = "Division 2: Systematic Theology Classic Tenets & Doctrines (Topics 101 to 200)";
  } else if (divisionFilter === "part3") {
    topics = topics.filter(t => t.topicNumber >= 201 && t.topicNumber <= 300);
    catalogSubheading = "Division 3: Apostolic & Kingdom Mysteries, Altars & Spiritual Warfare (Topics 201 to 300)";
  } else if (divisionFilter === "part4") {
    topics = topics.filter(t => t.topicNumber >= 301 && t.topicNumber <= 400);
    catalogSubheading = "Division 4: Christological Titles, Redemptive Names, Holiness & Ethics (Topics 301 to 400)";
  } else if (divisionFilter === "part5") {
    topics = topics.filter(t => t.topicNumber >= 401 && t.topicNumber <= 500);
    catalogSubheading = "Division 5: Dispensations, Historic Creeds, Eschatology & Eternal Glory (Topics 401 to 500)";
  }

  const topicsHTML = topics.map(topic => {
    const scripturesList = topic.anchorScriptures?.map(s => `
      <div class="topic-scripture-item">
        <strong class="topic-scripture-ref">${escapeHTML(s.reference)}</strong>
        ${s.text ? `<span class="topic-scripture-text">"${escapeHTML(s.text)}"</span>` : ''}
      </div>
    `).join('') || '';

    const pillarsList = topic.keyInsights?.map(k => `<li>${escapeHTML(k)}</li>`).join('') || '';

    return `
      <div class="topic-card" id="topic-${topic.topicNumber}">
        <div class="topic-card-header">
          <div class="topic-badge">TOPIC #${topic.topicNumber}</div>
          <div class="topic-category-badge">${escapeHTML(topic.category)}</div>
          <div class="topic-division-badge">${escapeHTML(topic.division)}</div>
        </div>
        <h3 class="topic-title">#${topic.topicNumber}: ${escapeHTML(topic.title)}</h3>
        <p class="topic-summary">${escapeHTML(topic.theologicalSummary)}</p>

        ${scripturesList ? `
          <div class="topic-scriptures-wrap">
            <div class="topic-sub-label">Anchor Scriptures</div>
            ${scripturesList}
          </div>
        ` : ''}

        ${pillarsList ? `
          <div class="topic-pillars-wrap">
            <div class="topic-sub-label">Doctrinal Pillars</div>
            <ul class="topic-pillars-list">
              ${pillarsList}
            </ul>
          </div>
        ` : ''}

        ${topic.practicalApplication ? `
          <div class="topic-application-wrap">
            <div class="topic-sub-label">Practical Discipleship</div>
            <p class="topic-application-text">${escapeHTML(topic.practicalApplication)}</p>
          </div>
        ` : ''}
      </div>
    `;
  }).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>500 Systematic Topics Catalog Compendium - The Joy of the Lord</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@600;700;800;900&family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Playfair+Display:ital,wght@0,600;0,700;0,800;0,900;1,600&display=swap" rel="stylesheet">
  <style>
    @page {
      size: letter;
      margin: 15mm 12mm 15mm 12mm;
    }
    @media print {
      body {
        background: #ffffff !important;
        color: #0f172a !important;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .no-print {
        display: none !important;
      }
      .topic-card {
        page-break-inside: avoid;
        break-inside: avoid;
      }
      .division-header-banner {
        page-break-before: always;
        break-before: page;
      }
    }
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    body {
      background-color: #f6f2ea;
      color: #0f172a;
      font-family: 'Lora', Georgia, serif;
      line-height: 1.6;
      padding: 24px 16px;
    }
    .compendium-container {
      max-width: 960px;
      margin: 0 auto;
      background: #fdfbf7;
      border: 1.5px solid #dcc398;
      border-top: 5px solid #b48c35;
      border-radius: 8px;
      padding: 32px 36px;
      box-shadow: 0 10px 30px rgba(15, 23, 42, 0.08);
      position: relative;
    }
    /* Floating Action Bar for Web View */
    .action-bar {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      gap: 12px;
      margin-bottom: 24px;
      padding-bottom: 16px;
      border-bottom: 1px solid #e5d5bc;
    }
    .btn {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 13px;
      font-weight: 700;
      padding: 9px 18px;
      border-radius: 6px;
      cursor: pointer;
      text-transform: uppercase;
      letter-spacing: 1px;
      transition: all 0.2s ease;
      display: inline-flex;
      align-items: center;
      gap: 8px;
      text-decoration: none;
    }
    .btn-primary {
      background: #0f172a;
      color: #ffffff;
      border: 1px solid #0f172a;
    }
    .btn-gold {
      background: #b48c35;
      color: #ffffff;
      border: 1px solid #926f28;
    }
    .btn-outline {
      background: #ffffff;
      color: #0f172a;
      border: 1.5px solid #dcc398;
    }
    .btn:hover {
      opacity: 0.9;
      transform: translateY(-1px);
    }
    /* Header Banner */
    .master-banner {
      text-align: center;
      border-bottom: 2px solid #b48c35;
      padding-bottom: 24px;
      margin-bottom: 30px;
    }
    .brand-crown {
      font-size: 24px;
      color: #b48c35;
      margin-bottom: 6px;
    }
    .brand-sub {
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      letter-spacing: 3px;
      font-weight: 800;
      color: #b48c35;
      margin-bottom: 8px;
    }
    .master-title {
      font-family: 'Cinzel', 'Playfair Display', Georgia, serif;
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.25;
      margin-bottom: 10px;
    }
    .master-subheading {
      font-size: 15px;
      font-style: italic;
      color: #475569;
      max-width: 720px;
      margin: 0 auto 12px auto;
    }
    .master-meta {
      font-size: 12px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      color: #64748b;
      letter-spacing: 0.5px;
    }
    /* Divisions Table of Contents */
    .toc-box {
      background: #f6f0e4;
      border: 1px solid #dcc398;
      border-left: 4px solid #b48c35;
      border-radius: 6px;
      padding: 16px 20px;
      margin-bottom: 30px;
    }
    .toc-title {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 12px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 2px;
      color: #926f28;
      margin-bottom: 10px;
    }
    .toc-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
      gap: 8px 16px;
      font-size: 12.5px;
    }
    .toc-item {
      color: #1e293b;
    }
    .toc-item strong {
      color: #b48c35;
    }
    /* Topics Catalog Grid */
    .topics-grid {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
    .topic-card {
      background: #ffffff;
      border: 1px solid #e2d3b8;
      border-radius: 6px;
      padding: 20px 24px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.03);
      position: relative;
    }
    .topic-card-header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .topic-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1px;
      background: #0f172a;
      color: #ffffff;
      padding: 3px 8px;
      border-radius: 4px;
    }
    .topic-category-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      font-weight: 700;
      background: #f4efe2;
      color: #926f28;
      border: 1px solid #dcc398;
      padding: 2px 8px;
      border-radius: 4px;
    }
    .topic-division-badge {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10px;
      color: #64748b;
      padding: 2px 6px;
    }
    .topic-title {
      font-family: 'Playfair Display', Georgia, serif;
      font-size: 19px;
      font-weight: 700;
      color: #0f172a;
      margin-bottom: 8px;
      line-height: 1.3;
    }
    .topic-summary {
      font-size: 14px;
      color: #334155;
      line-height: 1.55;
      margin-bottom: 12px;
      text-align: justify;
    }
    .topic-sub-label {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-size: 10.5px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: #b48c35;
      margin-bottom: 4px;
    }
    .topic-scriptures-wrap {
      background: #faf7f0;
      border-left: 3px solid #b48c35;
      padding: 8px 12px;
      border-radius: 4px;
      margin-bottom: 10px;
    }
    .topic-scripture-item {
      font-size: 12px;
      margin-bottom: 4px;
    }
    .topic-scripture-ref {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      font-weight: 700;
      color: #926f28;
      margin-right: 6px;
    }
    .topic-scripture-text {
      font-style: italic;
      color: #1e293b;
    }
    .topic-pillars-wrap {
      margin-bottom: 10px;
    }
    .topic-pillars-list {
      list-style-type: none;
      padding-left: 0;
      font-size: 12.5px;
      color: #475569;
    }
    .topic-pillars-list li {
      position: relative;
      padding-left: 16px;
      margin-bottom: 3px;
    }
    .topic-pillars-list li::before {
      content: "✦";
      position: absolute;
      left: 0;
      color: #b48c35;
      font-size: 9px;
      top: 2px;
    }
    .topic-application-wrap {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      padding: 8px 12px;
      border-radius: 4px;
    }
    .topic-application-text {
      font-size: 12px;
      color: #475569;
      font-style: italic;
    }

    /* Master Compendium Closing Block */
    .compendium-closing-block {
      margin-top: 36px;
      padding-top: 24px;
      border-top: 3px solid #b48c35;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      page-break-inside: avoid;
    }
    .closing-portrait {
      width: 72px;
      height: 72px;
      border-radius: 50%;
      border: 3px solid #b48c35;
      object-fit: cover;
      box-shadow: 0 4px 10px rgba(0,0,0,0.18);
    }
    .closing-text-wrap {
      text-align: left;
    }
    .closing-quote {
      font-size: 18px;
      font-weight: 800;
      font-style: italic;
      color: #0f172a;
      letter-spacing: 0.5px;
      margin-bottom: 4px;
    }
    .closing-author {
      font-size: 14.5px;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      text-transform: uppercase;
      letter-spacing: 2.5px;
      font-weight: 800;
      color: #b48c35;
    }
    .closing-sub {
      font-size: 12px;
      color: #64748b;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
    }
  </style>
</head>
<body>
  <div class="compendium-container">
    <!-- Screen Action Bar -->
    <div class="action-bar no-print">
      <button class="btn btn-outline" onclick="window.scrollTo({top: 0, behavior: 'smooth'})">Back to Top</button>
      <button class="btn btn-gold" onclick="window.print()">Print / Save PDF</button>
    </div>

    <!-- Master Brand Banner -->
    <div class="master-banner">
      <div class="brand-crown">✦ ☩ ✦</div>
      <div class="brand-sub">The Joy of the Lord • Christian Devotional Sanctuary</div>
      <h1 class="master-title">500 Systematic Theology & Core Christian Life Topics</h1>
      <p class="master-subheading">${escapeHTML(catalogSubheading)}</p>
      <div class="master-meta">
        Compendium Catalog • Total Topics: ${topics.length} • Generated on ${escapeHTML(currentDate)}
      </div>
    </div>

    <!-- Division Overview Box -->
    <div class="toc-box">
      <div class="toc-title">Catalog Divisions Overview</div>
      <div class="toc-grid">
        <div class="toc-item"><strong>Division 1:</strong> Core Christian Life (1–100)</div>
        <div class="toc-item"><strong>Division 2:</strong> Systematic Theology Doctrines (101–200)</div>
        <div class="toc-item"><strong>Division 3:</strong> Kingdom Mysteries & Altars (201–300)</div>
        <div class="toc-item"><strong>Division 4:</strong> Christology & Holiness (301–400)</div>
        <div class="toc-item"><strong>Division 5:</strong> Eschatology & Eternal Glory (401–500)</div>
      </div>
    </div>

    <!-- Full Topics Grid -->
    <div class="topics-grid">
      ${topicsHTML}
    </div>

    <!-- Mandatory Signature Closing Block with Logo and Subscription -->
    <div class="compendium-closing-block">
      <img class="closing-portrait" src="${escapeHTML(photoSrc)}" alt="${escapeHTML(profile.name || 'The Joy of the Lord')}" onerror="this.src='/icon.svg'" />
      <div class="closing-text-wrap">
        <div class="closing-quote">"${escapeHTML(profile.tagline || 'The joy of the Lord is my strength')}"</div>
        <div class="closing-author">${escapeHTML(profile.name || 'Bismark Twum')}</div>
        <div class="closing-sub">The Joy of the Lord • Christian Devotional Sanctuary</div>
      </div>
    </div>
  </div>
</body>
</html>`;
}

/**
 * Downloads the Complete 500 Topics Master Compendium document as a standalone HTML document
 */
export function download500TopicsCatalog(
  divisionFilter?: string,
  creatorProfile?: CreatorProfile
): void {
  const html = generate500TopicsCatalogCompendiumHTML(divisionFilter, creatorProfile);
  const blob = new Blob([html], { type: "text/html;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const filterSuffix = divisionFilter ? `-${divisionFilter}` : "-master-compendium";
  link.href = url;
  link.download = `joy-of-the-lord-500-topics${filterSuffix}.html`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Opens print dialog for the 500 Topics Master Compendium
 */
export function print500TopicsCatalog(
  divisionFilter?: string,
  creatorProfile?: CreatorProfile
): void {
  const html = generate500TopicsCatalogCompendiumHTML(divisionFilter, creatorProfile);
  const printWindow = window.open("", "_blank");
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
  } else {
    download500TopicsCatalog(divisionFilter, creatorProfile);
  }
}


