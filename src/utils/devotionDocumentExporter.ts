import { Devotion, CreatorProfile, SpiritualPlace, PlaceScripture, MathemaSermonItem, RhemaWordItem, StructuredPrayer } from "../types";
import { ApostleMathLesson } from "../data/apostleMathData";
import { loadCreatorProfile } from "../data/creatorData";
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

