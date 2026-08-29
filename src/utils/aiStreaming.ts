/**
 * AI Streaming Engine, 5-Minute Cache, Debounce, and Fast Mode Controller
 * The Joy of the Lord - Christian AI Platform
 */

import { deduplicateSentences, ANTI_LOOP_DIRECTIVE } from "../services/aiService";

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
  scriptureReference?: string;
  scriptureText?: string;
  scriptureTheme?: string;
  topic?: string;
  need?: string;
  category?: string;
  mathematicalConcept?: string;
  prompt?: string;
  systemInstruction?: string;
  fastMode?: boolean;
  timeoutMs?: number;
  storageKey?: string;
}

// 5-Minute In-Memory and Local Cache
interface CacheEntry {
  text: string;
  data: any;
  timestamp: number;
  fastMode: boolean;
}

const STREAM_CACHE = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache TTL

// In-Flight Debounce Tracker: Prevents duplicate triggers within 1000ms
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
 * Compute unique deterministic cache key for AI request
 */
export function getAiCacheKey(options: StreamAiOptions): string {
  const parts = [
    options.actionType || "",
    options.scriptureReference || "",
    options.topic || "",
    options.need || "",
    options.category || "",
    options.mathematicalConcept || "",
    options.prompt || "",
    options.fastMode ? "fast" : "deep"
  ];
  return parts.join("::").toLowerCase().trim();
}

/**
 * Helper to check and get cached AI result
 */
export function getCachedAiResult(cacheKey: string): CacheEntry | null {
  const entry = STREAM_CACHE.get(cacheKey);
  if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
    return entry;
  }
  if (entry) {
    STREAM_CACHE.delete(cacheKey);
  }
  return null;
}

/**
 * Helper to save AI result to cache
 */
export function saveAiResultToCache(cacheKey: string, text: string, data: any, fastMode: boolean): void {
  STREAM_CACHE.set(cacheKey, {
    text,
    data,
    timestamp: Date.now(),
    fastMode
  });
}

/**
 * Primary Streaming Generator with Caching, Debouncing, SSE Chunk Processing,
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

  // 2. 5-Minute Cache Hit Check
  const cached = getCachedAiResult(cacheKey);
  if (cached) {
    console.log(`[AI CACHE HIT (5-min)] ⚡ Returning cached response instantly:`, {
      key: cacheKey.substring(0, 40),
      ageSec: Math.round((Date.now() - cached.timestamp) / 1000)
    });

    options.onProgress?.(100);
    // Instant streaming delivery for responsive feel
    options.onChunk?.(cached.text, cached.text, cached.data);
    options.onComplete?.(cached.text, cached.data, true);

    return {
      success: true,
      text: cached.text,
      data: cached.data as T,
      isCached: true
    };
  }

  // 3. Initiate Streaming Call & register in-flight promise
  const streamPromise = (async () => {
    const isFast = options.fastMode ?? getIsFastMode();
    const timeoutMs = options.timeoutMs ?? (isFast ? 12000 : 25000);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let accumulatedText = "";
    let parsedData: any = null;

    options.onProgress?.(15);

    try {
      console.log(`[AI STREAM START] 🚀 [FastMode: ${isFast}] Calling /api/generate-stream...`);

      const payload = {
        prompt: options.prompt,
        actionType: options.actionType,
        scriptureReference: options.scriptureReference,
        scriptureText: options.scriptureText,
        scriptureTheme: options.scriptureTheme,
        topic: options.topic,
        need: options.need,
        category: options.category,
        mathematicalConcept: options.mathematicalConcept,
        systemInstruction: options.systemInstruction,
        fastMode: isFast,
        stream: true,
        generationConfig: isFast
          ? { temperature: 0.3, topP: 0.85, maxOutputTokens: 600 }
          : { temperature: 0.45, topP: 0.90, maxOutputTokens: 2048 }
      };

      // Try SSE streaming endpoint first
      const response = await fetch("/api/generate-stream", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "text/event-stream"
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      options.onProgress?.(35);

      if (!response.ok || !response.body) {
        throw new Error(`Server returned HTTP ${response.status}`);
      }

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

      clearTimeout(timeoutId);
      options.onProgress?.(100);

      // Clean and deduplicate final text
      accumulatedText = deduplicateSentences(accumulatedText);
      if (!parsedData) {
        parsedData = safeJsonParse(accumulatedText);
      }

      // Cache the result for 5 minutes
      saveAiResultToCache(cacheKey, accumulatedText, parsedData, isFast);

      // Save to localStorage history if storageKey specified
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
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.warn("[AI STREAMING FALLBACK] Streaming route failed or completed with fallback:", err?.message);

      // Fallback to standard endpoint /api/generate
      try {
        const fallbackRes = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            prompt: options.prompt,
            actionType: options.actionType,
            scriptureReference: options.scriptureReference,
            scriptureText: options.scriptureText,
            scriptureTheme: options.scriptureTheme,
            topic: options.topic,
            need: options.need,
            category: options.category,
            mathematicalConcept: options.mathematicalConcept,
            systemInstruction: options.systemInstruction,
            fastMode: isFast
          })
        });

        if (fallbackRes.ok) {
          const resData = await fallbackRes.json();
          const finalText = deduplicateSentences(resData.text || resData.response || JSON.stringify(resData.data || resData));
          const finalData = resData.data || safeJsonParse(finalText);

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
      } catch (fallbackErr) {
        console.error("[AI GENERATION ERROR]", fallbackErr);
      }

      const errorMsg = err?.name === "AbortError" 
        ? "AI response took longer than expected. Please try Fast Mode ⚡." 
        : (err?.message || "Generation error. Please check your connection.");

      options.onError?.(errorMsg);
      return {
        success: false,
        text: "",
        error: errorMsg
      };
    } finally {
      IN_FLIGHT_REQUESTS.delete(cacheKey);
    }
  })();

  IN_FLIGHT_REQUESTS.set(cacheKey, streamPromise);
  return streamPromise;
}
