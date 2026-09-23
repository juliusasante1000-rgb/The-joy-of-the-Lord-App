import { CreatorProfile, SystematicTopicItem } from "../types";
import { loadCreatorProfile } from "../data/creatorData";
import { BibleVerseExportItem } from "./devotionDocumentExporter";
import { cleanMathFromNonMathContent } from "./mathSanitizer";

// Helper to wrap text cleanly on an HTML5 canvas
function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  if (!text) return [];
  const paragraphs = text.split("\n");
  const allLines: string[] = [];

  for (const para of paragraphs) {
    if (!para.trim()) {
      allLines.push("");
      continue;
    }
    const words = para.split(/\s+/);
    let currentLine = words[0] || "";

    for (let i = 1; i < words.length; i++) {
      const word = words[i];
      const testLine = currentLine + " " + word;
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth) {
        allLines.push(currentLine);
        currentLine = word;
      } else {
        currentLine = testLine;
      }
    }
    allLines.push(currentLine);
  }

  return allLines;
}

// Helper to draw rounded rectangles on canvas
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number
) {
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
}

/**
 * Downloads an offscreen canvas as a PNG file.
 */
function downloadCanvasAsPNG(canvas: HTMLCanvasElement, filename: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    try {
      canvas.toBlob((blob) => {
        if (!blob) {
          reject(new Error("Canvas blob generation failed"));
          return;
        }
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = filename.endsWith(".png") ? filename : `${filename}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => URL.revokeObjectURL(url), 1000);
        resolve(true);
      }, "image/png");
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Generates and downloads a publication-grade picture (PNG) for any Bible verse.
 * Formatted with double 24k gold borders, church seal, rich typography,
 * original word study / commentary notes, guided prayer, and founder subscription.
 */
export async function downloadBibleVersePicture(
  verseItem: BibleVerseExportItem,
  creatorProfile?: CreatorProfile
): Promise<boolean> {
  if (typeof document !== "undefined" && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // fallback
    }
  }

  const profile = creatorProfile || loadCreatorProfile();
  const W = 2000;
  const H = 2800;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return false;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 1. Background Parchment
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#FFFFFF");
  bgGrad.addColorStop(0.25, "#FDFBF7");
  bgGrad.addColorStop(0.8, "#FAF5EB");
  bgGrad.addColorStop(1, "#F5EDE0");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Double Gold Framing & Filigree Corners
  const margin = 45;
  const innerMargin = 68;

  // Outer Gold Border
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 6;
  ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

  // Inner Delicate Gold Border
  ctx.strokeStyle = "#DCC398";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(innerMargin, innerMargin, W - innerMargin * 2, H - innerMargin * 2);

  // Corner Gold Accents
  const cornerL = 60;
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#B48C35";
  // Top-left
  ctx.beginPath();
  ctx.moveTo(margin - 3, margin + cornerL);
  ctx.lineTo(margin - 3, margin - 3);
  ctx.lineTo(margin + cornerL, margin - 3);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(W - margin + 3 - cornerL, margin - 3);
  ctx.lineTo(W - margin + 3, margin - 3);
  ctx.lineTo(W - margin + 3, margin + cornerL);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(margin - 3, H - margin + 3 - cornerL);
  ctx.lineTo(margin - 3, H - margin + 3);
  ctx.lineTo(margin + cornerL, H - margin + 3);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(W - margin + 3 - cornerL, H - margin + 3);
  ctx.lineTo(W - margin + 3, H - margin + 3);
  ctx.lineTo(W - margin + 3, H - margin + 3 - cornerL);
  ctx.stroke();

  let curY = innerMargin + 55;

  // 3. Header & Logo Crest
  // Draw Circular Emblem
  const centerX = W / 2;
  const emblemRadius = 38;
  ctx.fillStyle = "#0F172A";
  ctx.beginPath();
  ctx.arc(centerX, curY + emblemRadius, emblemRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 3.5;
  ctx.stroke();

  // Draw Gold Cross inside emblem
  ctx.strokeStyle = "#DCC398";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX, curY + 16);
  ctx.lineTo(centerX, curY + 60);
  ctx.moveTo(centerX - 16, curY + 30);
  ctx.lineTo(centerX + 16, curY + 30);
  ctx.stroke();

  curY += emblemRadius * 2 + 25;

  // Brand Name
  ctx.fillStyle = "#B48C35";
  ctx.font = "bold 32px 'Cinzel', 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.textAlign = "center";
  ctx.fillText("THE JOY OF THE LORD", centerX, curY);

  curY += 38;
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillStyle = "#475569";
  ctx.fillText("HOLY SCRIPTURE SANCTUARY • OFFICIAL PUBLICATION", centerX, curY);

  curY += 24;
  // Gold Divider with central diamond
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 350, curY);
  ctx.lineTo(centerX - 25, curY);
  ctx.moveTo(centerX + 25, curY);
  ctx.lineTo(centerX + 350, curY);
  ctx.stroke();

  ctx.fillStyle = "#B48C35";
  ctx.save();
  ctx.translate(centerX, curY);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-8, -8, 16, 16);
  ctx.restore();

  // 4. Scripture Reference Header
  curY += 65;
  const refText = `${verseItem.book} ${verseItem.chapter}:${verseItem.verse}`.toUpperCase();
  ctx.fillStyle = "#0A0F1D";
  ctx.font = "bold 64px 'Cinzel', 'Georgia', 'Source Serif 4', serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(refText, centerX, curY);

  curY += 40;
  const versionLabel = `${verseItem.version || "King James Version (KJV)"} • ${verseItem.testament || "Canonical Scripture"}`;
  ctx.font = "italic 22px 'Georgia', serif";
  ctx.fillStyle = "#B48C35";
  ctx.letterSpacing = "1px";
  ctx.fillText(versionLabel, centerX, curY);

  // 5. Dynamic Full-Canvas Sizing & Space Distribution
  curY += 35;
  const cardX = innerMargin + 50;
  const cardW = W - (innerMargin + 50) * 2;
  const contentMaxW = cardW - 120;
  const footerY = H - innerMargin - 110;
  const cardGap = 35;

  // Prepare Note & Prayer Content
  const ws = verseItem.wordStudy;
  const comm = verseItem.commentary;
  const hasNotes = Boolean(ws || verseItem.reflection || comm?.matthewHenry || comm?.spurgeon);

  let noteTitle = "EXEGESIS & SPIRITUAL REVELATION";
  let noteBody = cleanMathFromNonMathContent(verseItem.reflection || "");

  if (ws && ws.originalWord) {
    noteTitle = `HEBREW / GREEK WORD STUDY: ${ws.originalWord} (${ws.strongsNumber || ""})`;
    noteBody = `${ws.transliteration ? `Transliteration: "${ws.transliteration}". ` : ""}${ws.shortDef ? `Definition: ${ws.shortDef}. ` : ""}${ws.theologicalInsight ? `Theological Insight: ${ws.theologicalInsight}` : ""}`;
  } else if (!noteBody && comm) {
    noteTitle = "CLASSIC SCRIPTURAL EXPOSITION";
    noteBody = comm.matthewHenry ? `Matthew Henry: ${comm.matthewHenry}` : (comm.spurgeon ? `Charles Spurgeon: ${comm.spurgeon}` : "");
  }

  if (!noteBody) {
    noteBody = `Meditate upon this sacred revelation from ${refText}. The living Word of God produces supernatural life, divine clarity, and eternal hope in the believer's heart.`;
  }

  const defaultPrayer = verseItem.guidedPrayer ||
    `Heavenly Father, thank You for the living truth of ${refText}. Establish my faith firmly in Your promises, grant me divine discernment, and empower me to walk in holy obedience. In Jesus' mighty Name, Amen.`;

  // Total available space to cover 1 full page down to the footer
  const totalAvailableSpace = Math.max(900, footerY - 25 - curY - (hasNotes ? cardGap * 2 : cardGap));

  // Determine optimal font sizes and wrap lines dynamically so everything fits completely
  let passageFontSize = 52;
  let passageLineH = 74;
  ctx.font = `italic ${passageFontSize}px 'Georgia', 'Source Serif 4', serif`;
  let passageLines = wrapText(ctx, `"${verseItem.text}"`, contentMaxW);

  while (passageLines.length > 5 && passageFontSize > 34) {
    passageFontSize -= 3;
    passageLineH = Math.round(passageFontSize * 1.4);
    ctx.font = `italic ${passageFontSize}px 'Georgia', 'Source Serif 4', serif`;
    passageLines = wrapText(ctx, `"${verseItem.text}"`, contentMaxW);
  }

  let noteFontSize = 32;
  let noteLineH = 48;
  ctx.font = `${noteFontSize}px 'Georgia', serif`;
  let noteLines = hasNotes ? wrapText(ctx, noteBody, contentMaxW) : [];

  while (noteLines.length > 9 && noteFontSize > 22) {
    noteFontSize -= 2;
    noteLineH = Math.round(noteFontSize * 1.4);
    ctx.font = `${noteFontSize}px 'Georgia', serif`;
    noteLines = wrapText(ctx, noteBody, contentMaxW);
  }

  let prayerFontSize = 30;
  let prayerLineH = 46;
  ctx.font = `italic ${prayerFontSize}px 'Georgia', serif`;
  let prayerLines = wrapText(ctx, defaultPrayer, contentMaxW);

  while (prayerLines.length > 5 && prayerFontSize > 22) {
    prayerFontSize -= 2;
    prayerLineH = Math.round(prayerFontSize * 1.4);
    ctx.font = `italic ${prayerFontSize}px 'Georgia', serif`;
    prayerLines = wrapText(ctx, defaultPrayer, contentMaxW);
  }

  // Calculate natural height for each card
  const minPassageH = 120 + passageLines.length * passageLineH;
  const minNoteH = hasNotes ? (100 + noteLines.length * noteLineH) : 0;
  const minPrayerH = 125 + prayerLines.length * prayerLineH;
  const totalMinRequiredH = minPassageH + minNoteH + minPrayerH;

  let passageCardH = minPassageH;
  let noteCardH = minNoteH;
  let prayerCardH = minPrayerH;

  // Distribute remaining slack so cards cover the entire page down to the footer
  if (totalAvailableSpace > totalMinRequiredH) {
    const slack = totalAvailableSpace - totalMinRequiredH;
    const pWeight = hasNotes ? 0.35 : 0.52;
    const nWeight = hasNotes ? 0.38 : 0;
    const rWeight = 1 - pWeight - nWeight;

    passageCardH += Math.round(slack * pWeight);
    if (hasNotes) noteCardH += Math.round(slack * nWeight);
    prayerCardH = totalAvailableSpace - passageCardH - noteCardH;
  } else {
    const scaleFactor = totalAvailableSpace / totalMinRequiredH;
    passageCardH = Math.round(passageCardH * scaleFactor);
    if (hasNotes) noteCardH = Math.round(noteCardH * scaleFactor);
    prayerCardH = totalAvailableSpace - passageCardH - noteCardH;
  }

  // Draw Passage Card
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(180, 140, 53, 0.12)";
  ctx.shadowBlur = 24;
  ctx.shadowOffsetY = 10;
  roundRect(ctx, cardX, curY, cardW, passageCardH, 18);
  ctx.fill();

  // Card border
  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "#E5D5BC";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Left accent bar
  ctx.fillStyle = "#B48C35";
  ctx.fillRect(cardX, curY + 18, 10, passageCardH - 36);

  // Draw Passage Text (vertically balanced inside card)
  ctx.fillStyle = "#0A0F1D";
  ctx.textAlign = "left";
  ctx.font = `italic ${passageFontSize}px 'Georgia', 'Source Serif 4', serif`;
  const passageContentH = passageLines.length * passageLineH;
  let textY = curY + Math.max(65, Math.round((passageCardH - passageContentH) / 2) + Math.round(passageLineH * 0.4));
  for (const line of passageLines) {
    ctx.fillText(line, cardX + 60, textY);
    textY += passageLineH;
  }

  curY += passageCardH + cardGap;

  // 6. Theological Reflection / Word Study Box
  if (hasNotes && noteCardH > 0) {
    ctx.fillStyle = "#FDFBF7";
    roundRect(ctx, cardX, curY, cardW, noteCardH, 16);
    ctx.fill();
    ctx.strokeStyle = "#DCC398";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Section title
    ctx.fillStyle = "#B48C35";
    ctx.font = "bold 26px 'Plus Jakarta Sans', sans-serif";
    ctx.letterSpacing = "2px";
    ctx.fillText(`✦ ${noteTitle.toUpperCase()}`, cardX + 45, curY + 48);

    // Section content - draw every single line cleanly
    ctx.font = `${noteFontSize}px 'Georgia', serif`;
    ctx.fillStyle = "#1E293B";
    let ny = curY + 96;
    for (let i = 0; i < noteLines.length; i++) {
      ctx.fillText(noteLines[i], cardX + 45, ny);
      ny += noteLineH;
    }

    curY += noteCardH + cardGap;
  }

  // 7. Guided Prayer & Faith Decree Box
  ctx.fillStyle = "#0F172A";
  roundRect(ctx, cardX, curY, cardW, prayerCardH, 16);
  ctx.fill();
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  // Prayer Label
  ctx.fillStyle = "#DCC398";
  ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("✦ GUIDED PRAYER & FAITH DECREE", cardX + 45, curY + 46);

  ctx.fillStyle = "#F8FAFC";
  ctx.font = `italic ${prayerFontSize}px 'Georgia', serif`;
  let py = curY + 94;
  for (let i = 0; i < prayerLines.length; i++) {
    ctx.fillText(prayerLines[i], cardX + 45, py);
    py += prayerLineH;
  }

  ctx.fillStyle = "#B48C35";
  ctx.font = "bold 22px 'Georgia', serif";
  ctx.fillText(
    `Faith Decree: "The joy of the Lord is my strength" (Nehemiah 8:10) — Living and Victorious!`,
    cardX + 45,
    curY + prayerCardH - 22
  );

  // 8. Founder Signature & Subscription Footer
  // Gold Footer Line strictly at footerY (guaranteed no text overlap)
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX, footerY);
  ctx.lineTo(cardX + cardW, footerY);
  ctx.stroke();

  // Author details
  ctx.fillStyle = "#0F172A";
  ctx.font = "bold 22px 'Georgia', serif";
  ctx.textAlign = "left";
  ctx.fillText(`Curated & Published by ${profile.name}`, cardX + 10, footerY + 40);

  ctx.fillStyle = "#64748B";
  ctx.font = "18px 'Plus Jakarta Sans', sans-serif";
  const siteUrl = profile.socialLinks?.find((s) => s.type === "website")?.url || "https://joyofthelord.org";
  ctx.fillText(`The Joy of the Lord Sanctuary • ${siteUrl}`, cardX + 10, footerY + 70);

  ctx.textAlign = "right";
  ctx.fillStyle = "#B48C35";
  ctx.font = "italic bold 22px 'Georgia', serif";
  ctx.fillText('"The joy of the Lord is your strength"', cardX + cardW - 10, footerY + 40);

  ctx.fillStyle = "#475569";
  ctx.font = "bold 18px 'Georgia', serif";
  ctx.fillText("Nehemiah 8:10 • Apostolic & Prophetic Seal", cardX + cardW - 10, footerY + 70);

  const safeName = `Joy_Bible_Verse_${verseItem.book}_${verseItem.chapter}_${verseItem.verse}.png`.replace(/\s+/g, "_");
  return downloadCanvasAsPNG(canvas, safeName);
}

/**
 * Generates and downloads a publication-grade picture (PNG) for an individual
 * Systematic Topic (one-by-one download).
 * Formatted with double gold borders, classical header, anchor scriptures,
 * doctrinal summary, theological pillars, practical discipleship, and founder subscription.
 */
export async function downloadSystematicTopicPicture(
  topic: SystematicTopicItem,
  creatorProfile?: CreatorProfile
): Promise<boolean> {
  if (typeof document !== "undefined" && document.fonts) {
    try {
      await document.fonts.ready;
    } catch {
      // fallback
    }
  }

  const profile = creatorProfile || loadCreatorProfile();
  const W = 2000;
  const H = 2800;
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;

  const ctx = canvas.getContext("2d", { alpha: false });
  if (!ctx) return false;

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";

  // 1. Background Parchment
  const bgGrad = ctx.createLinearGradient(0, 0, 0, H);
  bgGrad.addColorStop(0, "#FFFFFF");
  bgGrad.addColorStop(0.25, "#FDFBF7");
  bgGrad.addColorStop(0.8, "#FAF5EB");
  bgGrad.addColorStop(1, "#F5EDE0");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // 2. Double Gold Framing & Filigree Corners
  const margin = 45;
  const innerMargin = 68;

  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 6;
  ctx.strokeRect(margin, margin, W - margin * 2, H - margin * 2);

  ctx.strokeStyle = "#DCC398";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(innerMargin, innerMargin, W - innerMargin * 2, H - innerMargin * 2);

  // Corner Gold Accents
  const cornerL = 60;
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#B48C35";
  // Top-left
  ctx.beginPath();
  ctx.moveTo(margin - 3, margin + cornerL);
  ctx.lineTo(margin - 3, margin - 3);
  ctx.lineTo(margin + cornerL, margin - 3);
  ctx.stroke();
  // Top-right
  ctx.beginPath();
  ctx.moveTo(W - margin + 3 - cornerL, margin - 3);
  ctx.lineTo(W - margin + 3, margin - 3);
  ctx.lineTo(W - margin + 3, margin + cornerL);
  ctx.stroke();
  // Bottom-left
  ctx.beginPath();
  ctx.moveTo(margin - 3, H - margin + 3 - cornerL);
  ctx.lineTo(margin - 3, H - margin + 3);
  ctx.lineTo(margin + cornerL, H - margin + 3);
  ctx.stroke();
  // Bottom-right
  ctx.beginPath();
  ctx.moveTo(W - margin + 3 - cornerL, H - margin + 3);
  ctx.lineTo(W - margin + 3, H - margin + 3);
  ctx.lineTo(W - margin + 3, H - margin + 3 - cornerL);
  ctx.stroke();

  let curY = innerMargin + 50;

  // 3. Header & Logo Crest
  const centerX = W / 2;
  const emblemRadius = 36;
  ctx.fillStyle = "#0F172A";
  ctx.beginPath();
  ctx.arc(centerX, curY + emblemRadius, emblemRadius, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 3.5;
  ctx.stroke();

  ctx.strokeStyle = "#DCC398";
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.moveTo(centerX, curY + 16);
  ctx.lineTo(centerX, curY + 56);
  ctx.moveTo(centerX - 15, curY + 28);
  ctx.lineTo(centerX + 15, curY + 28);
  ctx.stroke();

  curY += emblemRadius * 2 + 25;

  ctx.fillStyle = "#B48C35";
  ctx.font = "bold 30px 'Cinzel', 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "6px";
  ctx.textAlign = "center";
  ctx.fillText("THE JOY OF THE LORD", centerX, curY);

  curY += 36;
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "3px";
  ctx.fillStyle = "#475569";
  ctx.fillText(`500 SYSTEMATIC THEOLOGY COMPENDIUM • TOPIC #${topic.topicNumber}`, centerX, curY);

  curY += 22;
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 2.5;
  ctx.beginPath();
  ctx.moveTo(centerX - 350, curY);
  ctx.lineTo(centerX - 25, curY);
  ctx.moveTo(centerX + 25, curY);
  ctx.lineTo(centerX + 350, curY);
  ctx.stroke();

  ctx.fillStyle = "#B48C35";
  ctx.save();
  ctx.translate(centerX, curY);
  ctx.rotate(Math.PI / 4);
  ctx.fillRect(-7, -7, 14, 14);
  ctx.restore();

  // 4. Topic Title & Classification
  curY += 60;
  ctx.fillStyle = "#0A0F1D";
  ctx.font = "bold 58px 'Cinzel', 'Georgia', 'Source Serif 4', serif";
  ctx.letterSpacing = "1px";
  const titleLines = wrapText(ctx, topic.title, W - 360);
  for (const line of titleLines) {
    ctx.fillText(line, centerX, curY);
    curY += 68;
  }

  const categoryLabel = `${topic.division} • ${topic.category}`.toUpperCase();
  ctx.font = "bold 20px 'Plus Jakarta Sans', sans-serif";
  ctx.fillStyle = "#B48C35";
  ctx.letterSpacing = "2px";
  ctx.fillText(categoryLabel, centerX, curY);

  // 5. Dynamic Full-Canvas Sizing & Scriptural Anchor Box
  curY += 35;
  const cardX = innerMargin + 60;
  const cardW = W - (innerMargin + 60) * 2;
  const contentMaxW = cardW - 100;
  const footerY = H - innerMargin - 110;
  const cardGap = 35;

  const primaryRef = topic.anchorScriptures[0]?.reference || "Scriptural Anchor";
  const primaryText = topic.anchorScriptures[0]?.text || topic.theologicalSummary;
  const practicalText = topic.practicalApplication || "Live out this biblical truth daily through prayer, righteous walking, and steadfast trust in the Lord.";

  // Calculate available space to fill whole canvas down to footer
  const totalAvailableSpace = Math.max(900, footerY - 25 - curY - (cardGap * 2));

  // Dynamically wrap text and calculate optimal sizes so zero lines are clipped
  let scripFontSize = 32;
  let scripLineH = 46;
  ctx.font = `italic ${scripFontSize}px 'Georgia', serif`;
  let scriptureLines = wrapText(ctx, `"${primaryText}"`, contentMaxW);

  while (scriptureLines.length > 5 && scripFontSize > 22) {
    scripFontSize -= 2;
    scripLineH = Math.round(scripFontSize * 1.4);
    ctx.font = `italic ${scripFontSize}px 'Georgia', serif`;
    scriptureLines = wrapText(ctx, `"${primaryText}"`, contentMaxW);
  }

  let sumFontSize = 28;
  let sumLineH = 42;
  ctx.font = `${sumFontSize}px 'Georgia', serif`;
  let summaryLines = wrapText(ctx, topic.theologicalSummary, contentMaxW);

  while (summaryLines.length > 8 && sumFontSize > 20) {
    sumFontSize -= 2;
    sumLineH = Math.round(sumFontSize * 1.4);
    ctx.font = `${sumFontSize}px 'Georgia', serif`;
    summaryLines = wrapText(ctx, topic.theologicalSummary, contentMaxW);
  }

  let pracFontSize = 24;
  let pracLineH = 36;
  ctx.font = `italic ${pracFontSize}px 'Georgia', serif`;
  let practicalLines = wrapText(ctx, practicalText, contentMaxW);

  while (practicalLines.length > 5 && pracFontSize > 18) {
    pracFontSize -= 2;
    pracLineH = Math.round(pracFontSize * 1.4);
    ctx.font = `italic ${pracFontSize}px 'Georgia', serif`;
    practicalLines = wrapText(ctx, practicalText, contentMaxW);
  }

  const minScripH = 95 + scriptureLines.length * scripLineH;
  const minSumH = 95 + summaryLines.length * sumLineH;
  const minPracH = 115 + practicalLines.length * pracLineH;
  const totalMinH = minScripH + minSumH + minPracH;

  let scriptureCardH = minScripH;
  let summaryCardH = minSumH;
  let pillarsBoxH = minPracH;

  if (totalAvailableSpace > totalMinH) {
    const slack = totalAvailableSpace - totalMinH;
    scriptureCardH += Math.round(slack * 0.32);
    summaryCardH += Math.round(slack * 0.42);
    pillarsBoxH = totalAvailableSpace - scriptureCardH - summaryCardH;
  } else {
    const scale = totalAvailableSpace / totalMinH;
    scriptureCardH = Math.round(scriptureCardH * scale);
    summaryCardH = Math.round(summaryCardH * scale);
    pillarsBoxH = totalAvailableSpace - scriptureCardH - summaryCardH;
  }

  // 1. Scriptural Anchor Box
  ctx.fillStyle = "#FFFFFF";
  ctx.shadowColor = "rgba(180, 140, 53, 0.12)";
  ctx.shadowBlur = 18;
  ctx.shadowOffsetY = 6;
  roundRect(ctx, cardX, curY, cardW, scriptureCardH, 14);
  ctx.fill();

  ctx.shadowColor = "transparent";
  ctx.strokeStyle = "#E5D5BC";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#B48C35";
  ctx.fillRect(cardX, curY + 14, 8, scriptureCardH - 28);

  ctx.textAlign = "left";
  ctx.fillStyle = "#B48C35";
  ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
  ctx.fillText(`✦ ANCHOR SCRIPTURE: ${primaryRef}`, cardX + 45, curY + 48);

  ctx.fillStyle = "#0F172A";
  ctx.font = `italic ${scripFontSize}px 'Georgia', serif`;
  let sy = curY + 96;
  for (const line of scriptureLines) {
    ctx.fillText(line, cardX + 45, sy);
    sy += scripLineH;
  }

  curY += scriptureCardH + cardGap;

  // 6. Theological & Doctrinal Summary Box
  ctx.fillStyle = "#FDFBF7";
  roundRect(ctx, cardX, curY, cardW, summaryCardH, 14);
  ctx.fill();
  ctx.strokeStyle = "#DCC398";
  ctx.lineWidth = 2;
  ctx.stroke();

  ctx.fillStyle = "#B48C35";
  ctx.font = "bold 24px 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("✦ THEOLOGICAL EXPOSITION & SYSTEMATIC DEFINITION", cardX + 40, curY + 48);

  ctx.fillStyle = "#1E293B";
  ctx.font = `${sumFontSize}px 'Georgia', serif`;
  let sumY = curY + 94;
  for (let i = 0; i < summaryLines.length; i++) {
    ctx.fillText(summaryLines[i], cardX + 40, sumY);
    sumY += sumLineH;
  }

  curY += summaryCardH + cardGap;

  // 7. Core Pillars & Practical Application Box
  ctx.fillStyle = "#0F172A";
  roundRect(ctx, cardX, curY, cardW, pillarsBoxH, 14);
  ctx.fill();
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 2.5;
  ctx.stroke();

  ctx.fillStyle = "#DCC398";
  ctx.font = "bold 22px 'Plus Jakarta Sans', sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText("✦ PRACTICAL DISCIPLESHIP & CONFESSION", cardX + 40, curY + 42);

  ctx.fillStyle = "#F8FAFC";
  ctx.font = `italic ${pracFontSize}px 'Georgia', serif`;
  let pracY = curY + 84;
  for (let i = 0; i < practicalLines.length; i++) {
    ctx.fillText(practicalLines[i], cardX + 40, pracY);
    pracY += pracLineH;
  }

  // Faith decree
  ctx.fillStyle = "#B48C35";
  ctx.font = "bold 21px 'Georgia', serif";
  ctx.fillText(
    `Faith Decree: "The joy of the Lord is my strength" (Nehemiah 8:10) — Established on ${topic.title}!`,
    cardX + 40,
    curY + pillarsBoxH - 22
  );

  // 8. Founder Signature & Subscription Footer
  // Gold Footer Line strictly at footerY (guaranteed zero overlap)
  ctx.strokeStyle = "#B48C35";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(cardX, footerY);
  ctx.lineTo(cardX + cardW, footerY);
  ctx.stroke();

  ctx.fillStyle = "#0F172A";
  ctx.font = "bold 22px 'Georgia', serif";
  ctx.textAlign = "left";
  ctx.fillText(`Curated & Published by ${profile.name}`, cardX + 10, footerY + 40);

  ctx.fillStyle = "#64748B";
  ctx.font = "18px 'Plus Jakarta Sans', sans-serif";
  const topicSiteUrl = profile.socialLinks?.find((s) => s.type === "website")?.url || "https://joyofthelord.org";
  ctx.fillText(`The Joy of the Lord Sanctuary • ${topicSiteUrl}`, cardX + 10, footerY + 70);

  ctx.textAlign = "right";
  ctx.fillStyle = "#B48C35";
  ctx.font = "italic bold 22px 'Georgia', serif";
  ctx.fillText('"The joy of the Lord is your strength"', cardX + cardW - 10, footerY + 40);

  ctx.fillStyle = "#475569";
  ctx.font = "bold 18px 'Georgia', serif";
  ctx.fillText("Nehemiah 8:10 • 500 Topics Treasury", cardX + cardW - 10, footerY + 70);

  const safeTitle = topic.title.replace(/[^a-zA-Z0-9]/g, "_").slice(0, 40);
  const safeName = `Joy_Systematic_Topic_${topic.topicNumber}_${safeTitle}.png`;
  return downloadCanvasAsPNG(canvas, safeName);
}
