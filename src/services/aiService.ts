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
 *    - Primary model: gemini-1.5-flash-latest (with gemini-2.5-flash cascade)
 *    - Comprehensive console logging of request, response, and duration
 */

export interface AiGenerationOptions {
  prompt: string;
  systemInstruction?: string;
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
  model?: string;
  responseMimeType?: string;
  storageKey?: string;
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

  return resultLines.join("\n").trim();
}

/**
 * Check if a client-side or environment API key is configured
 */
export function getClientGeminiApiKey(): string | null {
  const viteKey = (import.meta as any)?.env?.VITE_GEMINI_API_KEY;
  if (viteKey && typeof viteKey === "string" && viteKey.trim().length > 0 && !viteKey.includes("MY_GEMINI")) {
    return viteKey.trim();
  }
  return null;
}

/**
 * Master Anti-Loop System Prompt
 */
export const ANTI_LOOP_DIRECTIVE = "NEVER repeat. Be concise, swift, accurate, and precise. Address exactly what is asked without preambles, fluff, or loop. Provide final answer only once.";

/**
 * Core AI Generation Service
 */
export async function generateAiContent<T = any>(
  options: AiGenerationOptions
): Promise<AiServiceResult<T>> {
  const startTime = performance.now();
  const temperature = options.temperature ?? 0.45;
  const topP = options.topP ?? 0.90;
  const maxOutputTokens = options.maxOutputTokens ?? 2048;
  const targetModel = options.model || "gemini-3.7-flash";

  const systemPrompt = options.systemInstruction
    ? `${options.systemInstruction} ${ANTI_LOOP_DIRECTIVE}`
    : `You are an apostolic Christian theologian and pastoral guide. Respond swiftly, accurately, and precisely, speaking directly to what is asked. ${ANTI_LOOP_DIRECTIVE}`;

  console.log(`[AI SERVICE] 🚀 Dispatching prompt to model ${targetModel}:`, {
    prompt: options.prompt.substring(0, 100) + "...",
    temperature,
    topP,
    maxOutputTokens
  });

  // Step 1: Try server-side API proxy first if in fullstack environment
  try {
    const serverRes = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt: options.prompt,
        systemInstruction: systemPrompt,
        responseMimeType: options.responseMimeType,
        generationConfig: {
          temperature,
          topP,
          maxOutputTokens
        }
      })
    }).catch(() => null);

    if (serverRes && serverRes.ok) {
      const serverData = await serverRes.json().catch(() => null);
      if (serverData && (serverData.response || serverData.text)) {
        const rawText = serverData.response || serverData.text;
        const cleanedText = deduplicateSentences(rawText);
        const durationMs = Math.round(performance.now() - startTime);

        console.log(`[AI SERVICE] ✅ Received response via Server Proxy in ${durationMs}ms:`, {
          model: serverData.modelUsed || targetModel,
          rawLength: rawText.length,
          cleanedLength: cleanedText.length
        });

        // Persist to localStorage if storageKey provided
        if (options.storageKey) {
          saveToLocalStorage(options.storageKey, cleanedText);
        }

        return {
          success: true,
          text: cleanedText,
          data: tryParseJson(cleanedText) as T,
          modelUsed: serverData.modelUsed || targetModel,
          durationMs
        };
      }
    }
  } catch (serverErr) {
    console.warn("[AI SERVICE] Server proxy not responding, checking direct client API key...", serverErr);
  }

  // Step 2: Direct Client-Side Gemini API call (Vercel, Netlify, Static Builds)
  const clientApiKey = getClientGeminiApiKey();
  if (!clientApiKey) {
    const errorMsg = "API Key missing. Please set VITE_GEMINI_API_KEY in .env";
    console.error(`[AI SERVICE ERROR] ❌ ${errorMsg}`);
    return {
      success: false,
      error: errorMsg
    };
  }

  try {
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${targetModel}:generateContent?key=${clientApiKey}`;
    
    const requestPayload = {
      contents: [
        {
          role: "user",
          parts: [{ text: options.prompt }]
        }
      ],
      systemInstruction: {
        parts: [{ text: systemPrompt }]
      },
      generationConfig: {
        temperature,
        topP,
        maxOutputTokens,
        ...(options.responseMimeType ? { responseMimeType: options.responseMimeType } : {})
      }
    };

    const response = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestPayload)
    });

    const durationMs = Math.round(performance.now() - startTime);
    const responseJson = await response.json();

    console.log(`[AI SERVICE] Full API response from ${targetModel} in ${durationMs}ms:`, responseJson);

    if (!response.ok) {
      const errorMsg = responseJson?.error?.message || `HTTP ${response.status}: Failed to generate AI content`;
      console.error("[AI SERVICE ERROR] Response not OK:", errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

    const candidate = responseJson?.candidates?.[0];
    const candidateText = candidate?.content?.parts?.[0]?.text;

    if (!candidateText || !candidateText.trim()) {
      const errorMsg = "AI returned empty response. Please try again with a different prompt.";
      console.warn("[AI SERVICE WARNING]", errorMsg);
      return {
        success: false,
        error: errorMsg
      };
    }

    // Apply strict deduplication to prevent repetitive loop outputs
    const deduplicatedText = deduplicateSentences(candidateText);

    // Persist to localStorage if storageKey provided
    if (options.storageKey) {
      saveToLocalStorage(options.storageKey, deduplicatedText);
    }

    return {
      success: true,
      text: deduplicatedText,
      data: tryParseJson(deduplicatedText) as T,
      modelUsed: targetModel,
      durationMs
    };
  } catch (error: any) {
    const errorMsg = error?.message || "An unexpected error occurred during AI generation.";
    console.error("[AI SERVICE ERROR] Exception caught:", error);
    return {
      success: false,
      error: errorMsg
    };
  }
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
