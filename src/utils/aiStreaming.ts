
/**
 * Production AI Streaming Engine, Client Cache, Debounce, and Fast Mode Controller
 * The Joy of the Lord - Christian AI Platform
 */

import { deduplicateSentences } from "../services/aiService";
import {
  selectAppropriateReservoirDevotion,
  saveDevotionToPermanentReservoir,
  formatReservoirDevotionForDisplay,
  getGracefulReservoirUnavailableMessage,
  normalizeOutlet,
  extractReservoirKey,
  selectUniversalReservoirItem,
  saveContentToUniversalReservoir,
  formatUniversalReservoirItemForDisplay,
  getGracefulUniversalReservoirMessage,
  ReservoirOutlet,
  UniversalReservoirItem
} from "../data/permanentContentReservoir";

export function isDevotionRequest(actionType?: string): boolean {
  if (!actionType) return true;
  const lower = actionType.toLowerCase();
  return lower.includes("devotion") || lower === "daily_devotion" || lower === "create devotion";
}

/**
 * Resolves the canonical outlet and indexing key from StreamAiOptions
 */
export function resolveOutletAndKey(options: StreamAiOptions): { outlet: ReservoirOutlet; key: string } {
  const outlet = normalizeOutlet(options.actionType, options.endpoint, options.category);
  const key = extractReservoirKey({
    scriptureReference: options.scriptureReference,
    biblicalReference: options.biblicalReference,
    placeName: options.placeName,
    mathematicalConcept: options.mathematicalConcept,
    topic: options.topic,
    subject: options.subject,
    question: options.question,
    need: options.need,
    category: options.category,
    prompt: options.prompt
  });
  return { outlet, key };
}

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
 * Client-Side AI Response Cache with 15-minute TTL
 * Prevents redundant calls for identical scripture, prayer, and devotion queries.
 */
interface CachedAiEntry {
  text: string;
  data: any;
  timestamp: number;
}
const CLIENT_AI_CACHE = new Map<string, CachedAiEntry>();
const CLIENT_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes

export function getCachedAiResult(cacheKey: string): { text: string; data: any } | null {
  const entry = CLIENT_AI_CACHE.get(cacheKey);
  if (entry && (Date.now() - entry.timestamp < CLIENT_CACHE_TTL_MS)) {
    return { text: entry.text, data: entry.data };
  }
  if (typeof window !== "undefined") {
    try {
      const stored = sessionStorage.getItem(`ai_cache_${cacheKey.substring(0, 80)}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && (Date.now() - parsed.timestamp < CLIENT_CACHE_TTL_MS)) {
          CLIENT_AI_CACHE.set(cacheKey, parsed);
          return { text: parsed.text, data: parsed.data };
        }
      }
    } catch {}
  }
  return null;
}

export function saveAiResultToCache(cacheKey: string, text: string, data: any, _fastMode?: boolean): void {
  if (!text && !data) return;
  const entry: CachedAiEntry = { text, data, timestamp: Date.now() };
  CLIENT_AI_CACHE.set(cacheKey, entry);
  if (typeof window !== "undefined") {
    try {
      sessionStorage.setItem(`ai_cache_${cacheKey.substring(0, 80)}`, JSON.stringify(entry));
    } catch {}
  }
}

export const USER_FRIENDLY_QUOTA_MESSAGE = 
  "Fresh AI generation is temporarily unavailable due to daily capacity limits. You can continue with our pre-indexed library of spiritual content, or try again in a few moments.";

export function isQuotaExceededResponse(status: number, message: string = ""): boolean {
  if (status === 429) return true;
  const lower = message.toLowerCase();
  return (
    lower.includes("429") ||
    lower.includes("quota") ||
    lower.includes("rate limit") ||
    lower.includes("resource_exhausted") ||
    lower.includes("too many requests") ||
    lower.includes("capacity limits")
  );
}

/**
 * Primary Streaming Generator with Vercel Caching Bypass, SSE Chunk Processing,
 * and Fallback Mechanism
 */
export async function streamAiContent<T = any>(
  options: StreamAiOptions
): Promise<{ success: boolean; text: string; data?: T; isCached?: boolean; error?: string; isQuota?: boolean; isReservoir?: boolean; reservoirLabel?: string }> {
  const cacheKey = getAiCacheKey(options);

  // 1. Check Client Cache First
  const cached = getCachedAiResult(cacheKey);
  if (cached && (cached.text || cached.data)) {
    console.log(`[CLIENT CACHE HIT] ⚡ Serving cached AI response for: "${cacheKey.substring(0, 40)}"`);
    options.onProgress?.(100);
    options.onChunk?.(cached.text, cached.text, cached.data);
    options.onComplete?.(cached.text, cached.data, true);
    return {
      success: true,
      text: cached.text,
      data: cached.data as T,
      isCached: true
    };
  }

  // 2. In-flight Request Deduplication: Re-use identical in-flight promise
  if (IN_FLIGHT_REQUESTS.has(cacheKey)) {
    console.log(`[AI DEDUPLICATION] ⚡ Awaiting existing in-flight request for: "${cacheKey.substring(0, 40)}"`);
    try {
      const inFlight = await IN_FLIGHT_REQUESTS.get(cacheKey);
      return inFlight;
    } catch (e) {
      // Proceed to new call if previous errored
    }
  }

  // 3. Initiate Streaming Call & register in-flight promise
  const streamPromise = (async () => {
    const isFast = options.fastMode ?? getIsFastMode();
    const timeoutMs = options.timeoutMs ?? (isFast ? 25000 : 45000);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    let accumulatedText = "";
    let parsedData: any = null;
    let lastServerErrorMessage = "";
    let isQuotaError = false;

    options.onProgress?.(15);

    try {
      console.log(`[AI STREAM START] 🚀 [FastMode: ${isFast}] Calling /api/generate-stream...`);

      // Clean payload without timestamp or nonce cache-busters
      const payload = {
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
        generationConfig: {
          temperature: (options as any).temperature ?? (isFast ? 0.72 : 0.78),
          topP: (options as any).topP ?? 0.95,
          maxOutputTokens: (options as any).maxOutputTokens ?? (isFast ? 1800 : 3000)
        }
      };

      const sseHeaders: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "text/event-stream"
      };

      let sseSuccess = false;
      try {
        const response = await fetch("/api/generate-stream", {
          method: "POST",
          headers: sseHeaders,
          body: JSON.stringify(payload),
          signal: controller.signal
        });

        options.onProgress?.(35);

        // Check for 429 quota limit immediately
        if (response.status === 429) {
          isQuotaError = true;
          clearTimeout(timeoutId);
          options.onError?.(USER_FRIENDLY_QUOTA_MESSAGE);
          return {
            success: false,
            text: "",
            error: USER_FRIENDLY_QUOTA_MESSAGE,
            isQuota: true,
            isCached: false
          };
        }

        if (response.ok) {
          const contentType = response.headers.get("content-type") || "";

          // Instant JSON response handler
          if (contentType.includes("application/json")) {
            try {
              const jsonData = await response.json();
              if (jsonData.error) {
                const errMsg = jsonData.message || jsonData.error;
                if (isQuotaExceededResponse(response.status, errMsg) || jsonData.isQuota) {
                  clearTimeout(timeoutId);
                  options.onError?.(USER_FRIENDLY_QUOTA_MESSAGE);
                  return {
                    success: false,
                    text: "",
                    error: USER_FRIENDLY_QUOTA_MESSAGE,
                    isQuota: true,
                    isCached: false
                  };
                }
                clearTimeout(timeoutId);
                options.onError?.(errMsg);
                return { success: false, text: "", error: errMsg, isCached: false };
              }
              accumulatedText = jsonData.text || (typeof jsonData.data === "string" ? jsonData.data : jsonData.data?.text) || "";
              parsedData = jsonData.data || safeJsonParse(accumulatedText);
              if (accumulatedText || parsedData) {
                sseSuccess = true;
              }
            } catch {}
          } else if (response.body) {
            // Standard SSE stream processing
            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let buffer = "";
            let chunkCount = 0;

            while (true) {
              const { done, value } = await reader.read();
              if (done) break;

              const decodedChunk = decoder.decode(value, { stream: true });
              buffer += decodedChunk;
              const lines = buffer.split("\n");
              buffer = lines.pop() || "";

              for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith("data:")) continue;

                const jsonStr = trimmed.replace(/^data:\s*/, "").trim();
                if (jsonStr === "[DONE]") {
                  break;
                }

                try {
                  const event = JSON.parse(jsonStr);

                  if (event.error) {
                    const errMsg = event.message || event.error;
                    if (isQuotaExceededResponse(0, errMsg) || event.isQuota) {
                      isQuotaError = true;
                      clearTimeout(timeoutId);
                      options.onError?.(USER_FRIENDLY_QUOTA_MESSAGE);
                      return {
                        success: false,
                        text: "",
                        error: USER_FRIENDLY_QUOTA_MESSAGE,
                        isQuota: true,
                        isCached: false
                      };
                    }
                    clearTimeout(timeoutId);
                    options.onError?.(errMsg);
                    return { success: false, text: "", error: errMsg, isCached: false };
                  }

                  if (event.chunk) {
                    accumulatedText += event.chunk;
                    chunkCount++;
                    const progress = Math.min(95, 35 + Math.round(chunkCount * 3));
                    options.onProgress?.(progress);

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
                } catch {
                  if (jsonStr) {
                    accumulatedText += jsonStr;
                    options.onChunk?.(jsonStr, accumulatedText);
                  }
                }
              }
            }

            if (accumulatedText.trim().length > 0 || parsedData) {
              sseSuccess = true;
            }
          }
        } else {
          try {
            const errData = await response.json();
            lastServerErrorMessage = errData?.message || errData?.error || `Server status ${response.status}`;
            if (isQuotaExceededResponse(response.status, lastServerErrorMessage)) {
              isQuotaError = true;
            }
          } catch {
            lastServerErrorMessage = `Server status ${response.status}`;
          }
        }
      } catch (streamAttemptErr: any) {
        console.warn("[AI STREAMING NOTICE] SSE transport interrupted:", streamAttemptErr?.message);
        lastServerErrorMessage = streamAttemptErr?.message || "Streaming connection interrupted";
      }

      clearTimeout(timeoutId);

      // On 429 Quota Exhausted: Check Permanent Content Reservoir for stored content across ALL outlets
      if (isQuotaError) {
        const { outlet, key } = resolveOutletAndKey(options);
        if (key) {
          const stored = selectUniversalReservoirItem(outlet, key);
          if (stored) {
            console.log(`[CLIENT UNIVERSAL RESERVOIR] 🏛️ Serving stored ${stored.label} for ${key} in outlet ${outlet}`);
            const formatted = stored.item.formattedText || formatUniversalReservoirItemForDisplay(stored.item);
            const dataToSend = stored.item.data || stored.item;
            options.onProgress?.(100);
            options.onChunk?.(formatted, formatted, dataToSend);
            options.onComplete?.(formatted, dataToSend, false);
            return {
              success: true,
              text: formatted,
              data: dataToSend as T,
              isQuota: false,
              isCached: false,
              isReservoir: true,
              reservoirLabel: stored.label
            };
          } else {
            const gracefulMsg = getGracefulUniversalReservoirMessage(outlet, key);
            options.onError?.(gracefulMsg);
            return {
              success: false,
              text: "",
              error: gracefulMsg,
              isQuota: true,
              isCached: false
            };
          }
        }

        options.onError?.(USER_FRIENDLY_QUOTA_MESSAGE);
        return {
          success: false,
          text: "",
          error: USER_FRIENDLY_QUOTA_MESSAGE,
          isQuota: true,
          isCached: false
        };
      }

      // If SSE succeeded, finalize and cache
      if (sseSuccess && (accumulatedText || parsedData)) {
        options.onProgress?.(100);
        accumulatedText = deduplicateSentences(accumulatedText);
        if (!parsedData) {
          parsedData = safeJsonParse(accumulatedText);
        }

        saveAiResultToCache(cacheKey, accumulatedText, parsedData, isFast);

        // When AI available -> auto-save fresh generation to Permanent Content Reservoir across ALL outlets!
        const { outlet, key } = resolveOutletAndKey(options);
        if (key && (parsedData || accumulatedText)) {
          saveContentToUniversalReservoir(outlet, key, parsedData || accumulatedText, accumulatedText);
        }

        if (options.storageKey && (parsedData || accumulatedText)) {
          try {
            const itemToSave = parsedData || { text: accumulatedText, date: new Date().toISOString() };
            const existing = localStorage.getItem(options.storageKey);
            let hist = existing ? JSON.parse(existing) : [];
            if (!Array.isArray(hist)) hist = [hist];
            localStorage.setItem(options.storageKey, JSON.stringify([itemToSave, ...hist.slice(0, 30)]));
          } catch {}
        }

        options.onComplete?.(accumulatedText, parsedData, false);

        return {
          success: true,
          text: accumulatedText,
          data: parsedData as T,
          isCached: false
        };
      }

      // Single Non-Streaming Fallback: Only for non-quota transport failure
      console.log("[AI FALLBACK] Attempting single non-streaming call to /api/generate...");
      try {
        const fallbackRes = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        if (fallbackRes.status === 429) {
          const { outlet, key } = resolveOutletAndKey(options);
          if (key) {
            const stored = selectUniversalReservoirItem(outlet, key);
            if (stored) {
              console.log(`[CLIENT UNIVERSAL RESERVOIR FALLBACK] 🏛️ Serving stored ${stored.label} for ${key} in outlet ${outlet}`);
              const formatted = stored.item.formattedText || formatUniversalReservoirItemForDisplay(stored.item);
              const dataToSend = stored.item.data || stored.item;
              options.onProgress?.(100);
              options.onChunk?.(formatted, formatted, dataToSend);
              options.onComplete?.(formatted, dataToSend, false);
              return {
                success: true,
                text: formatted,
                data: dataToSend as T,
                isQuota: false,
                isCached: false,
                isReservoir: true,
                reservoirLabel: stored.label
              };
            } else {
              const gracefulMsg = getGracefulUniversalReservoirMessage(outlet, key);
              options.onError?.(gracefulMsg);
              return {
                success: false,
                text: "",
                error: gracefulMsg,
                isQuota: true,
                isCached: false
              };
            }
          }
          options.onError?.(USER_FRIENDLY_QUOTA_MESSAGE);
          return {
            success: false,
            text: "",
            error: USER_FRIENDLY_QUOTA_MESSAGE,
            isQuota: true,
            isCached: false
          };
        }

        if (fallbackRes.ok) {
          const resData = await fallbackRes.json();
          const textContent = (typeof resData?.text === "string" && resData.text.trim())
            ? resData.text
            : (typeof resData?.response === "string" && resData.response.trim())
              ? resData.response
              : "";
          const finalData = resData.data || safeJsonParse(textContent);
          const finalText = deduplicateSentences(textContent || (finalData ? JSON.stringify(finalData) : ""));

          if (finalText || finalData) {
            options.onProgress?.(100);
            options.onChunk?.(finalText, finalText, finalData);
            options.onComplete?.(finalText, finalData, false);
            saveAiResultToCache(cacheKey, finalText, finalData, isFast);

            // Auto-save fresh generation to Permanent Content Reservoir across ALL outlets!
            const { outlet, key } = resolveOutletAndKey(options);
            if (key && (finalData || finalText)) {
              saveContentToUniversalReservoir(outlet, key, finalData || finalText, finalText);
            }

            return {
              success: true,
              text: finalText,
              data: finalData as T,
              isCached: false,
              isReservoir: !!resData?.isPermanentReservoir,
              reservoirLabel: resData?.reservoirLabel
            };
          }
        } else {
          try {
            const errBody = await fallbackRes.json();
            lastServerErrorMessage = errBody?.message || errBody?.error || `Status ${fallbackRes.status}`;
          } catch {}
        }
      } catch (fbErr: any) {
        lastServerErrorMessage = fbErr?.message || "Generation request failed";
      }

      // If quota error occurred during fallback
      if (isQuotaExceededResponse(0, lastServerErrorMessage)) {
        options.onError?.(USER_FRIENDLY_QUOTA_MESSAGE);
        return {
          success: false,
          text: "",
          error: USER_FRIENDLY_QUOTA_MESSAGE,
          isQuota: true,
          isCached: false
        };
      }

      // Live AI generation could not be completed
      const failureMsg = lastServerErrorMessage || "AI generation could not be completed right now. Please try again.";
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
      const isQuota = isQuotaExceededResponse(0, err?.message);
      if (isQuota) {
        const { outlet, key } = resolveOutletAndKey(options);
        if (key) {
          const stored = selectUniversalReservoirItem(outlet, key);
          if (stored) {
            console.log(`[CLIENT UNIVERSAL RESERVOIR ERROR CATCH] 🏛️ Serving stored ${stored.label} for ${key} in outlet ${outlet}`);
            const formatted = stored.item.formattedText || formatUniversalReservoirItemForDisplay(stored.item);
            const dataToSend = stored.item.data || stored.item;
            options.onProgress?.(100);
            options.onChunk?.(formatted, formatted, dataToSend);
            options.onComplete?.(formatted, dataToSend, false);
            return {
              success: true,
              text: formatted,
              data: dataToSend as T,
              isQuota: false,
              isCached: false,
              isReservoir: true,
              reservoirLabel: stored.label
            };
          } else {
            const gracefulMsg = getGracefulUniversalReservoirMessage(outlet, key);
            options.onError?.(gracefulMsg);
            return {
              success: false,
              text: "",
              error: gracefulMsg,
              isQuota: true,
              isCached: false
            };
          }
        }
      }
      const failureMsg = isQuota
        ? USER_FRIENDLY_QUOTA_MESSAGE
        : (err?.message || lastServerErrorMessage || "AI generation could not be completed right now. Please try again.");
      options.onError?.(failureMsg);
      return {
        success: false,
        text: "",
        error: failureMsg,
        isQuota,
        isCached: false
      };
    } finally {
      IN_FLIGHT_REQUESTS.delete(cacheKey);
    }
  })();

  IN_FLIGHT_REQUESTS.set(cacheKey, streamPromise);
  return streamPromise;
}
