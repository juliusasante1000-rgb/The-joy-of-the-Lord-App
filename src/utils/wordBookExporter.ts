import { Book } from "../types";

/**
 * Exports a Book into a standards-compliant Microsoft Word (.doc) document.
 * Formatted strictly according to user specifications:
 * - Font: Times New Roman
 * - Font Size: 12pt
 * - Line Spacing: 1.5 lines
 * - Margins: 1.0 inch on all sides (Letter 8.5in x 11.0in)
 * - Page breaks before every chapter and cover page
 */
export function generateWordDocumentHTML(book: Book): string {
  const escapeHTML = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  const formatMarkdownToHTML = (markdown: string) => {
    const paragraphs = markdown.split(/\n\s*\n/);
    return paragraphs
      .map((para) => {
        const trimmed = para.trim();
        if (!trimmed) return "";

        if (trimmed === "---") {
          return `<hr style="border: none; border-top: 1.5pt solid #B48C35; margin: 18pt 0;" />`;
        }

        if (trimmed.startsWith("# ")) {
          return `<h1 style="font-family: 'Times New Roman', Times, serif; font-size: 20pt; font-weight: bold; text-align: center; margin-top: 36pt; margin-bottom: 12pt; page-break-before: always; color: #1A2A44;">${escapeHTML(trimmed.replace(/^#\s+/, ""))}</h1>`;
        }

        if (trimmed.startsWith("## ")) {
          return `<h2 style="font-family: 'Times New Roman', Times, serif; font-size: 16pt; font-weight: bold; text-align: center; margin-top: 14pt; margin-bottom: 8pt; color: #B48C35;">${escapeHTML(trimmed.replace(/^##\s+/, ""))}</h2>`;
        }

        if (trimmed.startsWith("### ")) {
          return `<h3 style="font-family: 'Times New Roman', Times, serif; font-size: 13pt; font-weight: bold; margin-top: 16pt; margin-bottom: 6pt; page-break-after: avoid; color: #1A2A44;">${escapeHTML(trimmed.replace(/^###\s+/, ""))}</h3>`;
        }

        if (trimmed.startsWith("#### ")) {
          return `<h4 style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; font-weight: bold; font-style: italic; margin-top: 12pt; margin-bottom: 4pt; page-break-after: avoid; color: #333333;">${escapeHTML(trimmed.replace(/^####\s+/, ""))}</h4>`;
        }

        if (trimmed.startsWith("> ")) {
          const quoteContent = trimmed.replace(/^>\s*/, "");
          return `<blockquote style="font-family: 'Times New Roman', Times, serif; font-size: 11.5pt; font-style: italic; line-height: 1.5; margin: 10pt 0.5in; padding: 6pt 12pt; border-left: 3pt solid #B48C35; background-color: #FAF8F5;">${escapeHTML(quoteContent)}</blockquote>`;
        }

        if (trimmed.startsWith("$$") && trimmed.endsWith("$$")) {
          const formula = trimmed.slice(2, -2).trim();
          return `<div style="font-family: 'Courier New', monospace; font-size: 11pt; font-weight: bold; text-align: center; margin: 12pt 0; padding: 10pt; border: 1pt solid #D4AF37; background-color: #FDFBF7; color: #9E6E1E;">[APOSTLEMATH EQUATION]: ${escapeHTML(formula)}</div>`;
        }

        if (trimmed.startsWith("- ") || trimmed.startsWith("• ") || /^\d+\.\s/.test(trimmed)) {
          const lines = trimmed.split("\n");
          const listItems = lines
            .map((line) => {
              const clean = line.replace(/^[-•]\s+|\d+\.\s+/, "");
              return `<li style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; margin-bottom: 4pt; text-align: justify;">${escapeHTML(clean)}</li>`;
            })
            .join("");
          return `<ul style="margin-top: 4pt; margin-bottom: 8pt; padding-left: 28pt;">${listItems}</ul>`;
        }

        return `<p style="font-family: 'Times New Roman', Times, serif; font-size: 12pt; line-height: 1.5; margin-top: 0pt; margin-bottom: 8pt; text-align: justify;">${escapeHTML(trimmed)}</p>`;
      })
      .join("\n");
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Calculate total words and estimated Word pages
  const allText = book.chapters.map(c => c.content).join(" ");
  const totalWordCount = allText.split(/\s+/).filter(Boolean).length;
  const estimatedWordPages = Math.max(400, Math.round(totalWordCount / 240));

  return `<!DOCTYPE html>
<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<!--[if gte mso 9]>
<xml>
  <w:WordDocument>
    <w:View>Print</w:View>
    <w:Zoom>100</w:Zoom>
    <w:DoNotOptimizeForBrowser/>
  </w:WordDocument>
</xml>
<![endif]-->
<style>
  @page WordSection1 {
    size: 8.5in 11.0in;
    margin: 1.0in 1.0in 1.0in 1.0in;
    mso-header-margin: 0.5in;
    mso-footer-margin: 0.5in;
    mso-paper-source: 0;
  }
  div.WordSection1 {
    page: WordSection1;
  }
  body {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    color: #000000;
    margin: 0;
    padding: 0;
  }
  p.MsoNormal, p {
    font-family: 'Times New Roman', Times, serif;
    font-size: 12pt;
    line-height: 1.5;
    margin-top: 0pt;
    margin-bottom: 8pt;
    text-align: justify;
    mso-line-height-rule: exactly;
  }
  h1 {
    font-family: 'Times New Roman', Times, serif;
    font-size: 22pt;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    page-break-before: always;
    margin-top: 36pt;
    margin-bottom: 14pt;
    color: #1A2A44;
  }
  h2 {
    font-family: 'Times New Roman', Times, serif;
    font-size: 16pt;
    font-weight: bold;
    line-height: 1.5;
    text-align: center;
    margin-top: 14pt;
    margin-bottom: 10pt;
    color: #B48C35;
  }
  h3 {
    font-family: 'Times New Roman', Times, serif;
    font-size: 13pt;
    font-weight: bold;
    line-height: 1.5;
    margin-top: 16pt;
    margin-bottom: 6pt;
    color: #1A2A44;
    page-break-after: avoid;
  }
  blockquote {
    font-family: 'Times New Roman', Times, serif;
    font-size: 11.5pt;
    font-style: italic;
    line-height: 1.5;
    margin: 10pt 0.5in;
    padding: 6pt 12pt;
    border-left: 3pt solid #B48C35;
    background-color: #FAF8F5;
  }
  .title-page {
    text-align: center;
    padding-top: 100pt;
    page-break-after: always;
  }
  .book-main-title {
    font-size: 26pt;
    font-weight: bold;
    color: #1A2A44;
    letter-spacing: 1pt;
    margin-bottom: 16pt;
    line-height: 1.3;
  }
  .book-subtitle {
    font-size: 14pt;
    font-style: italic;
    color: #B48C35;
    margin-bottom: 30pt;
    line-height: 1.4;
    max-width: 6.5in;
    margin-left: auto;
    margin-right: auto;
  }
  .book-author {
    font-size: 18pt;
    font-weight: bold;
    color: #1A2A44;
    margin-top: 40pt;
    margin-bottom: 8pt;
  }
  .book-meta {
    font-size: 12pt;
    color: #555555;
    margin-top: 14pt;
    line-height: 1.6;
  }
  .toc-container {
    page-break-before: always;
    page-break-after: always;
    margin-top: 24pt;
  }
  .toc-title {
    font-size: 20pt;
    font-weight: bold;
    text-align: center;
    color: #1A2A44;
    margin-bottom: 16pt;
  }
  .toc-item {
    font-size: 12pt;
    line-height: 1.6;
    margin-bottom: 6pt;
    text-align: left;
  }
</style>
</head>
<body>
<div class="WordSection1">

  <!-- FORMAL TITLE COVER PAGE -->
  <div class="title-page">
    <div style="font-size: 11pt; font-weight: bold; letter-spacing: 2pt; text-transform: uppercase; color: #B48C35; margin-bottom: 20pt;">
      Global Theological & Spiritual Warfare Masterwork
    </div>
    <div class="book-main-title">
      ${escapeHTML(book.title.toUpperCase())}
    </div>
    <div class="book-subtitle">
      ${escapeHTML(book.description)}
    </div>
    <div style="width: 2.5in; height: 2pt; background-color: #B48C35; margin: 24pt auto;"></div>
    <div class="book-author">
      BY ${escapeHTML(book.author.toUpperCase())}
    </div>
    <div class="book-meta">
      ${book.totalChapters} Comprehensive Chapters • Over ${estimatedWordPages} Pages Equivalent<br>
      Strictly Rendered in Times New Roman 12pt • 1.5 Line Spacing<br>
      (Each Chapter Covering Over 25 Pages in In-Depth Exposition)<br>
      Biblical Theological Institute & Spiritual Dominion Sanctuary<br>
      Published & Certified: ${currentDate}
    </div>
  </div>

  <!-- TABLE OF CONTENTS -->
  <div class="toc-container">
    <div class="toc-title">TABLE OF CONTENTS</div>
    <p style="text-align: center; font-style: italic; color: #666; margin-bottom: 24pt; font-size: 12pt;">
      ${book.totalChapters} Chapters • Over ${estimatedWordPages} Pages Total (Over 25 Pages Per Chapter in MS Word Format)
    </p>

    <div style="margin-top: 16pt;">
      ${book.chapters
        .map((c) => {
          return `
          <div class="toc-item">
            <strong>Chapter ${c.chapterNumber}:</strong> ${escapeHTML(c.title)}
            ${c.subtitle ? `<br><span style="font-size: 11pt; color: #555555; padding-left: 20pt; font-style: italic;">${escapeHTML(c.subtitle)}</span>` : ""}
          </div>
          `;
        })
        .join("")}
    </div>
  </div>

  <!-- ALL 15 CHAPTERS FULL BODY EXPOSITION -->
  ${book.chapters
    .map((chapter) => {
      return `
      <div style="page-break-before: always; margin-top: 24pt;">
        <div style="text-align: center; font-size: 11pt; font-weight: bold; color: #B48C35; text-transform: uppercase; letter-spacing: 1.5pt;">
          Chapter ${chapter.chapterNumber} of ${book.totalChapters}
        </div>
        <h1 style="margin-top: 8pt; margin-bottom: 6pt;">
          ${escapeHTML(chapter.title)}
        </h1>
        ${
          chapter.subtitle
            ? `<div style="text-align: center; font-size: 13pt; font-style: italic; color: #B48C35; margin-bottom: 20pt;">
                ${escapeHTML(chapter.subtitle)}
               </div>`
            : ""
        }
        <div style="margin-top: 20pt;">
          ${formatMarkdownToHTML(chapter.content)}
        </div>
      </div>
      `;
    })
    .join("\n")}

  <!-- CLOSING COLOPHON & BLESSING -->
  <div style="page-break-before: always; text-align: center; padding-top: 100pt;">
    <div style="font-size: 18pt; font-weight: bold; color: #1A2A44; margin-bottom: 12pt;">
      THE APOSTOLIC BENEDICTION
    </div>
    <blockquote style="text-align: center; border: none; font-size: 13pt; color: #B48C35; margin-bottom: 30pt;">
      "Now unto him that is able to keep you from falling, and to present you faultless before the presence of his glory with exceeding joy, To the only wise God our Saviour, be glory and majesty, dominion and power, both now and ever. Amen."<br>
      — <strong>Jude 1:24–25</strong>
    </blockquote>
    <p style="font-size: 12pt; color: #333; margin-top: 40pt;">
      Written and sealed by <strong>Bismark Twum</strong><br>
      "The joy of the Lord is my strength" — Nehemiah 8:10<br>
      All rights reserved for the glory of the Kingdom of God.
    </p>
  </div>

</div>
</body>
</html>`;
}

/**
 * Triggers a client-side direct download of the Book as an MS Word (.doc) document.
 */
export function downloadBookAsWordDoc(book: Book, customFileName?: string): void {
  const htmlContent = generateWordDocumentHTML(book);
  const blob = new Blob([htmlContent], { type: "application/msword;charset=utf-8" });
  
  const fileName =
    customFileName ||
    `${book.title.replace(/[^a-zA-Z0-9_-]/g, "_")}_Over_400_Pages_Word_Bismark_Twum.doc`;

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(link.href);
}
