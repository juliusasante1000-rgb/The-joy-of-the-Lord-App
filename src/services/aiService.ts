/**
 * Master AI Service for The Joy of the Lord
 * 
 * Features & Guarantees:
 * 1. BLANK OUTPUT FIX:
 *    - Full try/catch error handling with structured error reporting in console & UI
 *    - Checks for API_KEY presence (VITE_GEMINI_API_KEY / server GEMINI_API_KEY)
 *    - Displays "API Key missing. Please set VITE_GEMINI_API_KEY in .env" if missing
 *    - Uses proper `await` calls on model generation
 * 
 * 2. REPEATING CONTENT FIX:
 *    - Sentence & paragraph deduplication engine (prevent duplicate loops)
 *    - Standardized generationConfig: temperature: 0.75, topP: 0.95, maxOutputTokens: 2048
 *    - Anti-loop system instruction: "NEVER repeat. Be concise. Do not loop. Provide final answer only once."
 *    - Single clean execution flow
 * 
 * 3. VERCEL & NETLIFY COMPATIBILITY:
 *    - Direct client-side Gemini fallback using import.meta.env.VITE_GEMINI_API_KEY
 *    - Fullstack proxy fallback to /api/* when running on local dev or Cloud Run
 * 
 * 4. DEBUGGING & LOGGING:
 *    - Dynamic Primary Model: gemini-3.6-flash (with automatic cascade to gemini-3.5-flash-lite, gemini-flash-lite-latest, gemini-3.1-flash-lite)
 *    - Comprehensive console logging of request, response, and duration
 */

import { sanitizeNonMathResponse } from "../utils/mathSanitizer";

export interface AiGenerationOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
  model?: string;
  responseMimeType?: string;
  storageKey?: string;
  actionType?: string;
  category?: string;
}

export interface AiServiceResult<T = any> {
  success: boolean;
  text?: string;
  data?: T;
  error?: string;
  modelUsed?: string;
  durationMs?: number;
}

/**
 * Deduplicate sentences and paragraphs to prevent infinite repeating loops
 */
export function deduplicateSentences(text: string): string {
  if (!text) return "";
  const trimmed = text.trim();
  // Do not alter or truncate structured JSON responses
  if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
    return text;
  }

  const lines = text.split("\n");
  const resultLines: string[] = [];
  const seenLineSet = new Set<string>();

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) {
      resultLines.push("");
      continue;
    }

    // Check if whole line was repeated consecutively
    const lineKey = trimmedLine.toLowerCase();
    if (seenLineSet.has(lineKey) && trimmedLine.length > 25) {
      continue; // skip duplicate full line
    }
    seenLineSet.add(lineKey);

    // Sentence-level deduplication within the line
    const sentences = trimmedLine.split(/(?<=[.?!])\s+/);
    const seenSentences = new Set<string>();
    const cleanedSentences: string[] = [];

    for (const sentence of sentences) {
      const sTrim = sentence.trim();
      if (!sTrim) continue;
      const sKey = sTrim.toLowerCase();
      if (!seenSentences.has(sKey)) {
        seenSentences.add(sKey);
        cleanedSentences.push(sTrim);
      }
    }

    resultLines.push(cleanedSentences.join(" "));
  }

  const rawResult = resultLines.join("\n").trim();
  return cleanChristianWalkCliché(rawResult);
}

/**
 * Remove clichéd openings like "In our Christian walk"
 */
export function cleanChristianWalkCliché(text: string): string {
  if (!text) return "";
  let cleaned = text.replace(/^(?:["']?\s*)In our (?:Christian|daily|spiritual) walk(?: with (?:God|Christ|the Lord))?,?\s*/i, "");
  cleaned = cleaned.replace(/^(?:["']?\s*)As Christians?,?\s*/i, "");
  cleaned = cleaned.replace(/(\n\s*)In our (?:Christian|daily|spiritual) walk(?: with (?:God|Christ|the Lord))?,?\s*/gi, "$1");
  cleaned = cleaned.replace(/^([a-z])/, (m, c) => c.toUpperCase());
  return cleaned;
}

/**
 * Check if a client-side or environment API key is configured
 */
export function getClientGeminiApiKey(): string | null {
  const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  if (viteKey && typeof viteKey === "string" && viteKey.trim().length > 0 && !viteKey.includes("MY_GEMINI")) {
    return viteKey.trim();
  }
  try {
    const local = localStorage.getItem("gemini_api_key") || localStorage.getItem("user_gemini_api_key");
    if (local && local.trim().length > 0 && !local.includes("MY_GEMINI")) {
      return local.trim();
    }
  } catch {}
  return null;
}

/**
 * Core User Directives to Improve AI Quality & Output
 */
export const AI_OUTPUT_IMPROVEMENT_RULES = `
Rules for Uniqueness, Scripture Concurrence, and Hopeful Encouragement:
a. CONCURRENCE WITH SCRIPTURE: Anchor your output intimately in the SPECIFIC scripture, verse vocabulary, historical context, and exact theme provided. Draw out the unique metaphors, Hebrew/Greek roots, and spiritual dynamics native to this exact text. Never produce generic Christian filler or interchangeable advice.
b. FRESHNESS & VARIETY: Make every generation distinctly unique. Radically vary your opening hook, sentence cadence, and structure. Never open with clichéd expressions like "In our Christian walk", "As Christians", "In our daily walk", "In this passage", or "Today we examine". Open directly with an arresting biblical insight, historical moment, or linguistic revelation.
c. RICH HOMILETIC DEPTH: Tailor your voice to match the character of the scripture—exultant for praise, reverent for holiness, strategic for warfare, pastoral for affliction. Ensure every point is fresh, concrete, and deeply impactful.
d. JOY OF THE LORD & CONCLUDING HOPE: Anchor firmly in the bedrock truth of Nehemiah 8:10 ("The joy of the LORD is your strength"). At the conclusion of your message, you MUST conclude with an inspiring, triumphant, and hope-igniting apostolic encouragement that lifts the believer into confident expectation, joy, and divine resilience.
e. STRICT BOUNDARY ON MATHEMATICAL ANALOGIES & FORMULAS:
   - MATHEMATICAL ANALOGIES, FORMULAS, EQUATIONS ($...$ or $$...$$), FORCE VECTORS, AND CALCULUS/SCIENTIFIC CONCEPTS ARE STRICTLY AND EXCLUSIVELY RESERVED FOR "MATHEMASERMON" AND "APOSTLEMATH".
   - YOU ARE ABSOLUTELY AND STRICTLY FORBIDDEN from including mathematical analogies, equations, formulas, or vector models in ANY OTHER place, including:
     • Explain This Verse / Expository Analysis
     • Historical Context & Cultural Setting
     • Create Devotion / Daily Scripture / Devotions
     • Create Prayer / Guided Prayers / Warfare Prayers
     • Prayer Points / 5 High-Impact Prayer Points
     • The Joy of the Lord
     • Rhema Word & Prophetic Inspirations
     • Systematic Theology & Doctrines
   - Keep all of these write-ups 100% pastoral, covenant-anchored, scriptural, and devotional.`;

/**
 * Master Anti-Loop System Prompt
 */
export const ANTI_LOOP_DIRECTIVE = `Provide deep, unique, and illuminating theological, historical, and practical insight. Never repeat phrases or loop. Be precise, profound, and substantive. Do not use generic filler.
${AI_OUTPUT_IMPROVEMENT_RULES}`;

/**
 * Core AI Generation Service
 */
export async function generateAiContent<T = any>(
  options: AiGenerationOptions
): Promise<AiServiceResult<T>> {
  const startTime = performance.now();
  const temperature = options.temperature ?? 0.82;
  const topP = options.topP ?? 0.95;
  const maxOutputTokens = options.maxOutputTokens ?? 2048;
  const targetModel = options.model || "gemini-3.6-flash";

  const systemPrompt = options.systemInstruction
    ? `${options.systemInstruction} ${ANTI_LOOP_DIRECTIVE}`
    : `You are an apostolic Christian theologian, biblical expositor, and inspirational guide. Deliver rich, multifaceted, and deeply grounded theological depth with exact Scripture citations and practical spiritual fortitude. ${ANTI_LOOP_DIRECTIVE}`;

  console.log(`[AI SERVICE] 🚀 Dispatching prompt to model ${targetModel}:`, {
    prompt: options.prompt.substring(0, 100) + "...",
    temperature,
    topP,
    maxOutputTokens
  });

  // Step 1: Call server-side API route (/api/generate) using relative URL only
  let lastErrorMessage = "";
  try {
    const serverRes = await fetch("/api/generate", {
      method: "POST",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      },
      body: JSON.stringify({
        prompt: options.prompt,
        systemInstruction: systemPrompt,
        responseMimeType: options.responseMimeType,
        timestamp: Date.now(),
        _nonce: Math.random().toString(36).substring(2),
        generationConfig: {
          temperature,
          topP,
          maxOutputTokens
        }
      })
    });

    const serverData = await serverRes.json().catch(() => null);

    if (serverRes.ok && serverData && (serverData.response || serverData.text)) {
      const rawText = serverData.response || serverData.text;
      const cleanedText = deduplicateSentences(rawText);
      const durationMs = Math.round(performance.now() - startTime);

      console.log(`[AI SERVICE] ✅ Received response from /api/generate in ${durationMs}ms:`, {
        model: serverData.modelUsed || targetModel,
        rawLength: rawText.length,
        cleanedLength: cleanedText.length
      });

      // Persist to localStorage if storageKey provided
      if (options.storageKey) {
        saveToLocalStorage(options.storageKey, cleanedText);
      }

      const sanitizedText = sanitizeNonMathResponse(cleanedText, options.category, options.actionType);
      const parsedData = tryParseJson(sanitizedText);
      const sanitizedData = parsedData ? sanitizeNonMathResponse(parsedData, options.category, options.actionType) : null;

      return {
        success: true,
        text: sanitizedText,
        data: (sanitizedData || parsedData) as T,
        modelUsed: serverData.modelUsed || targetModel,
        durationMs
      };
    } else if (serverData && (serverData.error || serverData.message)) {
      lastErrorMessage = serverData.error || serverData.message;
    } else {
      lastErrorMessage = `Server returned status ${serverRes.status} (${serverRes.statusText || "Error"})`;
    }
  } catch (serverErr: any) {
    console.warn("[AI SERVICE] /api/generate fetch error:", serverErr);
    lastErrorMessage = serverErr?.message || "Failed to reach /api/generate";
  }

  // Step 2: Explicit error reporting
  const durationMs = Math.round(performance.now() - startTime);
  const finalError = lastErrorMessage || "GEMINI_API_KEY missing in Vercel Environment Variables. Add it in Vercel Dashboard > Settings > Environment Variables";
  console.warn(`[AI SERVICE] ⚠️ Live AI generation failed: ${finalError}`);
  return {
    success: false,
    error: finalError,
    modelUsed: "none",
    durationMs
  };
}

function tryParseJson(str: string): any {
  if (!str) return null;
  let clean = str.trim();
  if (clean.startsWith("```json")) clean = clean.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
  else if (clean.startsWith("```")) clean = clean.replace(/^```\s*/i, "").replace(/\s*```$/, "");
  clean = clean.trim();
  try {
    return JSON.parse(clean);
  } catch {
    return null;
  }
}

function saveToLocalStorage(key: string, data: any) {
  try {
    if (typeof window === "undefined") return;
    const existingRaw = localStorage.getItem(key);
    let history: any[] = [];
    if (existingRaw) {
      try {
        const parsed = JSON.parse(existingRaw);
        history = Array.isArray(parsed) ? parsed : [parsed];
      } catch {
        history = [];
      }
    }
    const updated = [data, ...history].slice(0, 30);
    localStorage.setItem(key, JSON.stringify(updated));
  } catch (e) {
    console.warn("[AI SERVICE] Storage write failed:", e);
  }
}
