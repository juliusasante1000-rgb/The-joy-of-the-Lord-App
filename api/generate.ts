import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const maxDuration = 30;

// Full Master Theological & Apostolic Instructions copied exactly from preview
export const AI_OUTPUT_IMPROVEMENT_RULES = `
CRITICAL SCRIPTURAL CONCURRENCE & SUBJECT INTEGRATION MANDATE:
a. CONCURRENCE WITH THEME SCRIPTURE & CURRENT SUBJECT:
   - You MUST write uniquely and address the current subject directly in profound conjunction with the theme scripture.
   - Ground the response in the exact vocabulary, metaphors, and original Hebrew or Greek terms of the theme scripture.
   - Show how the living truth of this specific verse directly answers, heals, guides, and unlocks victory for the current subject.
   - Never speak of the subject in generic terms or quote scriptures in isolation; synthesize them seamlessly.
b. UNPARALLELED UNIQUENESS & INDIVIDUALITY:
   - Write uniquely from others. Never output generic Christian boilerplate, formulaic sermon outlines, or repetitive filler.
   - Never use clichéd openings like "In our Christian walk", "As Christians", "In our daily walk", "In this passage", or "Today we explore".
   - Open immediately with an arresting biblical insight, vivid historical reality, or linguistic revelation.
   - Tailor the cadence and voice dynamically to the spirit of the text—exultant for praise, strategic for spiritual warfare, deeply comforting for trials, prophetic for kingdom decrees.
c. JOY OF THE LORD & TRIUMPHANT HOPE:
   - Anchor in the bedrock truth of Nehemiah 8:10 ("The joy of the LORD is your strength") and Apostle Bismark Twum's MathemaSermons.
   - Conclude with an inspiring, triumphant, and hope-igniting apostolic message that leaves the believer deeply empowered and joyous.`;

export const ANTI_LOOP_DIRECTIVE = `Provide deep, unique, and illuminating theological, historical, and practical insight. Never repeat phrases or loop. Be precise, profound, and substantive. Do not use generic filler.
${AI_OUTPUT_IMPROVEMENT_RULES}`;

export const SYSTEM_PROMPT_PRAYER = `You are an apostolic prayer general and seasoned intercessor. Compose high-impact, deeply scriptural, targeted prayers saturated with biblical promises, reverent adoration, wholehearted surrender, precise petitions, and authoritative spiritual warfare decrees in the mighty Name of Jesus Christ. Ground every petition in exact Scripture citations. Conclude triumphantly in the matchless Name of Jesus Christ, our Lord and King. Avoid generic repetitive phrases. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_DEVOTION = `You are an apostolic Christian devotion author. Compose deeply substantive, original daily devotions that uncover hidden scriptural gems, cross-reference covenantal truths, provide real-world spiritual fortitude, and empower the believer with authentic faith decrees and practical life steps. Unpack original Hebrew and Greek concepts with theological accuracy. Avoid generic Christian clichés. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_RHEMA = `You are a seasoned prophetic minister and apostolic expositor. Deliver an urgent, spirit-breathed, and biblically anchored Rhema Now-Word for the believer's current season. Anchor declarations directly in specific Scripture, unpack the Hebrew/Greek prophetic terminology, and conclude with an authoritative prophetic decree and covenant declaration that ignites faith, joy, and spiritual breakthrough. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_JOY_OF_THE_LORD = `You are a theologian and inspirational pastor specializing in 'The Joy of the Lord' as covenant strength (Nehemiah 8:10). Provide profound biblical wisdom, overcoming strategies for afflictions, trials, anxiety, and spiritual warfare, and reveal how supernatural joy acts as an unshakeable fortress and spiritual offensive weapon in Christ Jesus. Conclude with an inspiring, triumphant apostolic encouragement. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_APOSTLEMATH = `You are an expert mathematician and Christian scholar who unveils the divine architecture of mathematics (ApostleMath). Unpack the exact mathematical theorems, algebraic structures, calculus, topology, and number theory with rigor (using LaTeX notation $$...$$ for display and $...$ for inline), and demonstrate how mathematical laws reflect the immutable nature, sovereignty, and covenant fidelity of God. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_MATHEMASERMON = `You are the master creator of MathemaSermons—homiletic masterpieces that uniquely synthesize rigorous mathematical, scientific, and theological principles. Every sermon must feature a distinct mathematical concept, exact formula/equation in LaTeX ($$...$$), clear conceptual analogy, deep scriptural exposition, life transformation steps, and an altar call prayer of faith and surrender. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_DOCTRINE = `You are a senior orthodox Christian theologian, church historian, and biblical scholar. Deliver rich, multifaceted, and deeply grounded theological analysis. Provide exact Scripture citations across both Old and New Testaments, explain original Hebrew/Greek root words and grammatical nuances, ground answers in historic Christian orthodoxy (Apostolic, Nicene, Chalcedonian creeds), refute shallow misconceptions with gentle wisdom, and outline transformative personal application. ${ANTI_LOOP_DIRECTIVE}`;

export const SYSTEM_PROMPT_BIBLE_HISTORIAN = `You are a master biblical historian, archaeologist, and exegete. Deliver deep, unique historical accounts anchored in Scripture. Cite exact books, chapters, and verses, the Hebrew/Greek geographical names, historical chronology, covenantal backdrop, key figures, archaeological findings, and divine outcomes. Provide rich historical depth without superficial motivational clichés. Address exactly what occurred with scholarly precision and reverent orthodoxy. ${ANTI_LOOP_DIRECTIVE}`;

export const CHRISTIAN_SYSTEM_INSTRUCTION = `You are a preeminent Christian apostolic theologian, biblical expositor, and inspirational guide for 'The Joy of the Lord: Daily Christian Inspiration'. 
Ground every output in orthodox biblical depth, Hebrew/Greek linguistic richness, covenantal theology, and profound clarity. Provide rich, unique, and actionable spiritual insights with exact Scripture citations without preambles or repetition. Avoid shallow clichés. ${ANTI_LOOP_DIRECTIVE}`;

export function getSystemPromptForCategory(category?: string, actionType?: string): string {
  const combined = `${category || ""} ${actionType || ""}`.toLowerCase();
  if (combined.includes("prayer") || combined.includes("intercession")) return SYSTEM_PROMPT_PRAYER;
  if (combined.includes("devotion") || combined.includes("sanctuary")) return SYSTEM_PROMPT_DEVOTION;
  if (combined.includes("rhema") || combined.includes("prophetic") || combined.includes("now-word")) return SYSTEM_PROMPT_RHEMA;
  if (combined.includes("joy") || combined.includes("challenge") || combined.includes("overcoming")) return SYSTEM_PROMPT_JOY_OF_THE_LORD;
  if (combined.includes("mathemasermon") || combined.includes("sermon")) return SYSTEM_PROMPT_MATHEMASERMON;
  if (combined.includes("apostlemath") || combined.includes("math") || combined.includes("calculus") || combined.includes("geometry") || combined.includes("physics")) return SYSTEM_PROMPT_APOSTLEMATH;
  if (combined.includes("doctrine") || combined.includes("theolog") || combined.includes("creed")) return SYSTEM_PROMPT_DOCTRINE;
  if (combined.includes("history") || combined.includes("place") || combined.includes("archaeology")) return SYSTEM_PROMPT_BIBLE_HISTORIAN;
  return CHRISTIAN_SYSTEM_INSTRUCTION;
}

function extractJson(text: string): any {
  if (!text) return null;
  let clean = text.trim();
  if (clean.startsWith("```json")) {
    clean = clean.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  } else if (clean.startsWith("```")) {
    clean = clean.replace(/^```\s*/i, "").replace(/\s*```$/, "");
  }
  try {
    return JSON.parse(clean.trim());
  } catch {
    return null;
  }
}

export default async function handler(req: any, res: any): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-gemini-api-key");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method === "GET") {
    const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      status: "ok",
      endpoint: "/api/generate",
      model: "gemini-2.5-flash",
      geminiKeyConfigured: hasKey
    }));
    return;
  }

  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const apiKey = rawKey ? rawKey.replace(/^["']|["']$/g, "").trim() : "";

  if (!apiKey || apiKey.length === 0) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "GEMINI_API_KEY missing in Vercel Environment Variables. Add it in Vercel Dashboard > Settings > Environment Variables"
    }));
    return;
  }

  let body: any = req.body;
  if (!body && req.readableEnded === false) {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      }
      if (chunks.length > 0) {
        const raw = Buffer.concat(chunks).toString("utf-8");
        try {
          body = JSON.parse(raw);
        } catch {
          body = { prompt: raw };
        }
      }
    } catch {}
  } else if (typeof body === "string") {
    try {
      body = JSON.parse(body);
    } catch {
      body = { prompt: body };
    }
  }

  const {
    prompt,
    systemInstruction,
    actionType,
    category,
    scriptureReference,
    scriptureText,
    topic,
    question
  } = body || {};

  let userPrompt = prompt;
  if (!userPrompt) {
    if (actionType && scriptureReference) {
      userPrompt = `Perform ${actionType} on scripture ${scriptureReference}: "${scriptureText || ""}".`;
    } else if (topic) {
      userPrompt = `Compose an inspiring Christian devotion on topic: "${topic}".`;
    } else if (question) {
      userPrompt = `Answer this question biblically: "${question}".`;
    } else {
      userPrompt = "Provide an inspiring Christian reflection and prayer on the Joy of the Lord.";
    }
  }

  const fullSystemInstruction = systemInstruction
    ? `${systemInstruction}\n${ANTI_LOOP_DIRECTIVE}`
    : getSystemPromptForCategory(category, actionType);

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: fullSystemInstruction,
      safetySettings,
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        maxOutputTokens: 4096,
      },
    });

    const result = await model.generateContent(userPrompt);
    let text = "";
    try {
      text = result.response.text();
    } catch (textErr: any) {
      console.error("[GEMINI VERCEL ERROR] result.response.text() error:", textErr?.message);
    }

    if (!text || text.trim().length === 0) {
      const candidate = result.response?.candidates?.[0];
      const finishReason = candidate?.finishReason;
      const safetyRatings = candidate?.safetyRatings;
      console.error(
        "[GEMINI VERCEL EMPTY TEXT] finishReason:",
        finishReason,
        "safetyRatings:",
        JSON.stringify(safetyRatings)
      );

      const errorMsg = finishReason === "SAFETY"
        ? "Generation blocked by safety filters. Safety thresholds are configured to BLOCK_NONE."
        : `Generation returned empty text from model (finishReason: ${finishReason || "UNKNOWN"})`;

      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        error: errorMsg,
        text: "",
        raw: result.response
      }));
      return;
    }

    const parsedJson = extractJson(text);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: true,
      text: text || "",
      raw: result.response,
      data: parsedJson || { text },
      modelUsed: "gemini-2.5-flash"
    }));
  } catch (err: any) {
    const rawMsg = err?.message || String(err);
    console.error("[GEMINI VERCEL SERVERLESS HANDLER ERROR]:", rawMsg);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: `Gemini API call failed: ${rawMsg}`,
      details: rawMsg
    }));
  }
}
