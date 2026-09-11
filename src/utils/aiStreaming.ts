/**
 * AI Streaming Engine, 5-Minute Cache, Debounce, and Fast Mode Controller
 * The Joy of the Lord - Christian AI Platform
 */

import { deduplicateSentences, ANTI_LOOP_DIRECTIVE, getClientGeminiApiKey, generateAiContent } from "../services/aiService";

/**
 * Universal safe JSON parser that cleans markdown fences, repairs unescaped backslashes,
 * and handles edge cases gracefully.
 */
export function safeJsonParse<T = any>(str: string): T | null {
  if (!str || typeof str !== "string") return null;
  const trimmed = str.trim();
  if (!trimmed) return null;

  // 1. Direct parse attempt
  try {
    return JSON.parse(trimmed) as T;
  } catch {
    // continue
  }

  // 2. Strip markdown fences ```json ... ``` or ``` ... ```
  let cleaned = trimmed;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "");
    try {
      return JSON.parse(cleaned) as T;
    } catch {
      // continue
    }
  }

  // 3. Extract JSON object {...} or array [...]
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = cleaned.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate) as T;
    } catch {
      // 4. Try escaping loose single backslashes (common in LaTeX formulas)
      try {
        const repaired = candidate.replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, "\\\\");
        return JSON.parse(repaired) as T;
      } catch {
        // continue
      }
    }
  }

  // 5. Auto-repair truncated JSON tokens
  try {
    let str = cleaned;
    let inString = false;
    let isEscaped = false;
    const stack: string[] = [];

    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (isEscaped) {
        isEscaped = false;
        continue;
      }
      if (char === "\\") {
        isEscaped = true;
        continue;
      }
      if (char === '"') {
        inString = !inString;
        continue;
      }
      if (!inString) {
        if (char === "{" || char === "[") {
          stack.push(char);
        } else if (char === "}") {
          if (stack.length > 0 && stack[stack.length - 1] === "{") stack.pop();
        } else if (char === "]") {
          if (stack.length > 0 && stack[stack.length - 1] === "[") stack.pop();
        }
      }
    }

    if (inString) str += '"';
    while (stack.length > 0) {
      const open = stack.pop();
      if (open === "{") str += "}";
      else if (open === "[") str += "]";
    }

    const fixed = str.replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, "\\\\");
    return JSON.parse(fixed) as T;
  } catch {
    // continue
  }

  return null;
}

export interface StreamCallbacks<T = any> {
  onChunk?: (chunkText: string, accumulatedText: string, partialData?: T | null) => void;
  onProgress?: (progressPercent: number) => void;
  onComplete?: (fullText: string, data?: T | null, isCached?: boolean) => void;
  onError?: (errorMessage: string) => void;
}

export interface StreamAiOptions extends StreamCallbacks {
  endpoint?: string;
  actionType?: string;
  subject?: string;
  scriptureReference?: string;
  scriptureText?: string;
  scriptureTheme?: string;
  version?: string;
  topic?: string;
  need?: string;
  category?: string;
  mathematicalConcept?: string;
  prompt?: string;
  systemInstruction?: string;
  fastMode?: boolean;
  timeoutMs?: number;
  storageKey?: string;
  mathBranch?: string;
  spiritualConcept?: string;
  question?: string;
  specificChallenge?: string;
  seasonCategory?: string;
  focusNeed?: string;
  placeName?: string;
  biblicalReference?: string;
  context?: string;
  [key: string]: any;
}

// In-Flight Debounce Tracker: Prevents duplicate triggers within 600ms
const IN_FLIGHT_REQUESTS = new Map<string, Promise<any>>();
const LAST_TRIGGER_TIMESTAMPS = new Map<string, number>();

/**
 * Fast Mode State Management
 */
const FAST_MODE_STORAGE_KEY = "joy_fast_mode_active";

export function getIsFastMode(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem(FAST_MODE_STORAGE_KEY);
  // Default to true for blazing fast experience unless explicitly toggled off
  return stored !== null ? stored === "true" : true;
}

export function setIsFastMode(enabled: boolean): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(FAST_MODE_STORAGE_KEY, enabled ? "true" : "false");
  window.dispatchEvent(new CustomEvent("joy_fast_mode_changed", { detail: { fastMode: enabled } }));
}

/**
 * Compute unique request key for AI request debouncing
 */
export function getAiCacheKey(options: StreamAiOptions): string {
  const parts = [
    options.actionType || "",
    options.scriptureReference || "",
    options.version || "",
    options.topic || "",
    options.need || "",
    options.category || "",
    options.mathematicalConcept || "",
    options.prompt || ""
  ];
  return parts.join("::").toLowerCase().trim();
}

/**
 * RULE 1 COMPLIANCE: No persistent caching of AI responses between requests.
 * Always returns null so every AI request generates fresh, non-cached content.
 */
export function getCachedAiResult(_cacheKey: string): null {
  return null;
}

/**
 * RULE 1 COMPLIANCE: Do not store AI responses in persistent cache between requests.
 */
export function saveAiResultToCache(_cacheKey: string, _text: string, _data: any, _fastMode: boolean): void {
  // Deliberately no-op to satisfy Rule 1 (no persistent caching across requests)
}

/**
 * Primary Streaming Generator with Vercel Caching Bypass, SSE Chunk Processing,
 * and Fallback Mechanism
 */
export async function streamAiContent<T = any>(
  options: StreamAiOptions
): Promise<{ success: boolean; text: string; data?: T; isCached?: boolean; error?: string }> {
  const cacheKey = getAiCacheKey(options);
  const now = Date.now();

  // 1. Debounce check: If clicked > 3 times in 1 second, or already in flight
  const lastTrigger = LAST_TRIGGER_TIMESTAMPS.get(cacheKey) || 0;
  if (now - lastTrigger < 600 && IN_FLIGHT_REQUESTS.has(cacheKey)) {
    console.log(`[AI DEBOUNCE] ⚡ Throttled rapid trigger for: "${cacheKey.substring(0, 40)}" (reusing in-flight stream)`);
    try {
      const existingResult = await IN_FLIGHT_REQUESTS.get(cacheKey);
      return existingResult;
    } catch (e) {
      // Proceed to new call
    }
  }
  LAST_TRIGGER_TIMESTAMPS.set(cacheKey, now);

  // 2. Initiate Streaming Call & register in-flight promise
  const streamPromise = (async () => {
    const isFast = options.fastMode ?? getIsFastMode();
    const timeoutMs = options.timeoutMs ?? (isFast ? 25000 : 45000);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let accumulatedText = "";
    let parsedData: any = null;

    options.onProgress?.(15);

    try {
      console.log(`[AI STREAM START] 🚀 [FastMode: ${isFast}] Calling /api/generate-stream with cache: no-store...`);

      // RULE 1: Non-cacheable payload with random timestamp and nonce
      const payload = {
        ...options,
        prompt: options.prompt,
        actionType: options.actionType,
        scriptureReference: options.scriptureReference,
        scriptureText: options.scriptureText,
        scriptureTheme: options.scriptureTheme,
        version: options.version,
        topic: options.topic,
        need: options.need,
        category: options.category,
        mathematicalConcept: options.mathematicalConcept,
        mathBranch: options.mathBranch,
        spiritualConcept: options.spiritualConcept,
        question: options.question,
        specificChallenge: options.specificChallenge,
        seasonCategory: options.seasonCategory,
        focusNeed: options.focusNeed,
        placeName: options.placeName,
        biblicalReference: options.biblicalReference,
        context: options.context,
        systemInstruction: options.systemInstruction,
        fastMode: isFast,
        stream: true,
        timestamp: Date.now(),
        _nonce: Math.random().toString(36).substring(2),
        generationConfig: {
          temperature: (options as any).temperature ?? (isFast ? 0.72 : 0.78),
          topP: (options as any).topP ?? 0.95,
          maxOutputTokens: (options as any).maxOutputTokens ?? (isFast ? 1800 : 3000)
        }
      };

      const clientKey = getClientGeminiApiKey();
      if (clientKey) {
        (payload as any).apiKey = clientKey;
      }

      const sseHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream",
        "Cache-Control": "no-store, no-cache, must-revalidate"
      };
      if (clientKey) {
        sseHeaders["x-gemini-api-key"] = clientKey;
      }

      // Tier 1: Try SSE streaming endpoint first (POST with cache: 'no-store')
      let sseSuccess = false;
      try {
        const response = await fetch("/api/generate-stream", {
          method: "POST",
          cache: "no-store",
          headers: sseHeaders,
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        options.onProgress?.(35);

        if (response.ok && response.body) {
          const reader = response.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";
          let chunkCount = 0;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || ""; // keep unfinished line in buffer

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed || !trimmed.startsWith("data:")) continue;

              const jsonStr = trimmed.replace(/^data:\s*/, "").trim();
              if (jsonStr === "[DONE]") {
                break;
              }

              try {
                const event = JSON.parse(jsonStr);
                if (event.chunk) {
                  accumulatedText += event.chunk;
                  chunkCount++;
                  const progress = Math.min(95, 35 + Math.round(chunkCount * 3));
                  options.onProgress?.(progress);

                  // Try parsing partial JSON if applicable
                  const tempParsed = safeJsonParse(accumulatedText);
                  options.onChunk?.(event.chunk, accumulatedText, tempParsed);
                }

                if (event.fullText) {
                  accumulatedText = event.fullText;
                }

                if (event.data) {
                  parsedData = event.data;
                }

                if (event.done) {
                  break;
                }
              } catch (jsonErr) {
                // Raw text chunk fallback
                if (jsonStr) {
                  accumulatedText += jsonStr;
                  options.onChunk?.(jsonStr, accumulatedText);
                }
              }
            }
          }

          if (accumulatedText.trim().length > 0) {
            sseSuccess = true;
          }
        }
      } catch (streamAttemptErr) {
        console.warn("[AI STREAMING SSE NOTICE] SSE endpoint skipped or not available:", (streamAttemptErr as any)?.message);
      }

      clearTimeout(timeoutId);

      // If SSE succeeded, finalize and return
      if (sseSuccess && accumulatedText) {
        options.onProgress?.(100);
        accumulatedText = deduplicateSentences(accumulatedText);
        if (!parsedData) {
          parsedData = safeJsonParse(accumulatedText);
        }

        saveAiResultToCache(cacheKey, accumulatedText, parsedData, isFast);

        if (options.storageKey && (parsedData || accumulatedText)) {
          try {
            const itemToSave = parsedData || { text: accumulatedText, date: new Date().toISOString() };
            const existing = localStorage.getItem(options.storageKey);
            let hist = existing ? JSON.parse(existing) : [];
            if (!Array.isArray(hist)) hist = [hist];
            localStorage.setItem(options.storageKey, JSON.stringify([itemToSave, ...hist.slice(0, 30)]));
          } catch (e) {}
        }

        options.onComplete?.(accumulatedText, parsedData, false);

        return {
          success: true,
          text: accumulatedText,
          data: parsedData as T,
          isCached: false
        };
      }

      // Tier 2: Try specific endpoints (/api/generate, /api/generate-verse-action, /api/generate-devotion)
      const candidateUrls = [
        "/api/generate",
        "/api/generate-verse-action",
        "/api/generate-devotion",
        "/.netlify/functions/generate"
      ];

      for (const targetUrl of candidateUrls) {
        try {
          const fallbackRes = await fetch(targetUrl, {
            method: "POST",
            cache: "no-store",
            headers: {
              "Content-Type": "application/json",
              "Cache-Control": "no-store, no-cache, must-revalidate"
            },
            body: JSON.stringify(payload)
          });

          if (fallbackRes.ok) {
            const resData = await fallbackRes.json();
            const finalText = deduplicateSentences(
              resData.text || resData.response || JSON.stringify(resData.data || resData.devotion || resData)
            );
            const finalData = resData.data || resData.devotion || safeJsonParse(finalText);

            options.onProgress?.(100);
            options.onChunk?.(finalText, finalText, finalData);
            options.onComplete?.(finalText, finalData, false);

            saveAiResultToCache(cacheKey, finalText, finalData, isFast);

            return {
              success: true,
              text: finalText,
              data: finalData as T,
              isCached: false
            };
          }
        } catch (candidateErr) {
          // continue to next candidate
        }
      }

      // Tier 2.5: Direct client-side Gemini fallback if client key is configured in browser
      const directKey = getClientGeminiApiKey();
      if (directKey) {
        try {
          const directResult = await generateAiContent<T>({
            prompt: options.prompt,
            systemInstruction: options.systemInstruction,
            actionType: options.actionType,
            temperature: 0.80,
            model: "gemini-3.1-flash-lite"
          });
          if (directResult && directResult.success && (directResult.data || directResult.text)) {
            const outText = directResult.text || JSON.stringify(directResult.data);
            const outData = directResult.data || safeJsonParse(outText);
            options.onProgress?.(100);
            options.onChunk?.(outText, outText, outData);
            options.onComplete?.(outText, outData, false);
            saveAiResultToCache(cacheKey, outText, outData, isFast);
            return {
              success: true,
              text: outText,
              data: outData as T,
              isCached: false
            };
          }
        } catch (directErr) {
          console.warn("[DIRECT CLIENT GEMINI] Direct client fallback attempt:", directErr);
        }
      }

      // Live AI generation could not be completed via streaming or endpoints
      console.warn("[AI STREAMING] ⚠️ Live AI generation could not be completed across all endpoints.");
      const failureMsg = "AI generation could not be completed right now. Please try again.";
      options.onError?.(failureMsg);
      return {
        success: false,
        text: "",
        error: failureMsg,
        isCached: false
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("[AI STREAMING ERROR HANDLER]", err);
      const failureMsg = "AI generation could not be completed right now. Please try again.";
      options.onError?.(failureMsg);
      return {
        success: false,
        text: "",
        error: failureMsg,
        isCached: false
      };
    } finally {
      IN_FLIGHT_REQUESTS.delete(cacheKey);
    }
  })();

  IN_FLIGHT_REQUESTS.set(cacheKey, streamPromise);
  return streamPromise;
}
