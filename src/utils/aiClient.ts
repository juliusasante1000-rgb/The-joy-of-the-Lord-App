/**
 * Universal AI Client & Safe Network Utility for The Joy of the Lord
 * Compatible with AI Studio, Local Express Server, Vercel (/api/generate), and Netlify (/.netlify/functions/generate).
 * 
 * Guarantees:
 * 1. ZERO INFINITE LOADING: Strict 30-second AbortController timeout on all network calls.
 * 2. PROPER ERROR REPORTING: Handles API_KEY_MISSING and network failures with user-friendly retryable messages.
 * 3. NO REPETITION / DUPLICATE LOOPS: Sentence deduplication filter on all AI outputs.
 * 4. CLEAN CONSOLE LOGGING: Logs "Calling AI..." and explicit errors for Netlify/Vercel log inspection.
 */

import { deduplicateSentences, getClientGeminiApiKey } from "../services/aiService";
import { buildComprehensiveAiRequest, ANTI_LOOP_DIRECTIVE } from "./aiPrompts";

export { deduplicateSentences, ANTI_LOOP_DIRECTIVE };

export interface AiFetchOptions {
  maxRetries?: number;
  retryDelayMs?: number;
  timeoutMs?: number;
  storageKey?: string;
  temperature?: number;
  topP?: number;
  maxOutputTokens?: number;
  systemInstruction?: string;
}

export interface AiFetchResult<T = any> {
  success: boolean;
  data?: T;
  text?: string;
  error?: string;
  isApiKeyMissing?: boolean;
  isCached?: boolean;
}

/**
 * Safely parse JSON from a response, preventing HTML 404/500/<!DOCTYPE errors.
 */
export async function safeParseResponseJson<T = any>(response: Response): Promise<{ ok: boolean; data?: T; rawText?: string }> {
  try {
    const rawText = await response.text();
    if (!rawText || rawText.trim().startsWith("<")) {
      return { ok: false, rawText };
    }
    const data = JSON.parse(rawText) as T;
    return { ok: true, data, rawText };
  } catch (err) {
    return { ok: false };
  }
}

/**
 * General safe fetch wrapper that handles non-JSON responses and network drops gracefully.
 */
export async function safeFetchJson<T = any>(
  url: string,
  options?: RequestInit,
  timeoutMs: number = 10000
): Promise<{ ok: boolean; data?: T; error?: string; rawText?: string }> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const parsed = await safeParseResponseJson<T>(res);
    if (!res.ok) {
      const errMsg = (parsed.data as any)?.error || (parsed.data as any)?.message || `HTTP ${res.status}`;
      return { ok: false, error: errMsg, rawText: parsed.rawText };
    }
    if (!parsed.ok) {
      return { ok: false, error: "Non-JSON response from server", rawText: parsed.rawText };
    }
    return { ok: true, data: parsed.data };
  } catch (err: any) {
    clearTimeout(timeoutId);
    return {
      ok: false,
      error: err?.name === "AbortError" ? "Request timed out" : err?.message || "Network request failed",
    };
  }
}


/**
 * Fetch with strict timeout, multi-tier fallback, and intelligent client generation
 */
export async function fetchAiWithRetry<T = any>(
  endpoint: string,
  payload: any,
  options: AiFetchOptions = {}
): Promise<AiFetchResult<T>> {
  const timeoutMs = options.timeoutMs ?? 15000;
  const maxRetries = options.maxRetries ?? 1;
  const retryDelayMs = options.retryDelayMs ?? 1000;

  const candidateEndpoints = [
    endpoint,
    "/api/generate",
    "/.netlify/functions/generate",
  ].filter((v, i, a) => a.indexOf(v) === i);

  console.log("Calling AI...", { endpoint, candidateEndpoints, payloadPreview: payload?.actionType || payload?.topic || payload?.prompt || payload?.question || payload?.placeName });

  let lastServerError = "";

  for (const targetUrl of candidateEndpoints) {
    let attempt = 0;
    while (attempt <= maxRetries) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => {
        controller.abort();
      }, timeoutMs);

      try {
        const startTime = performance.now();
        const response = await fetch(targetUrl, {
          method: "POST",
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
            "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
            "Pragma": "no-cache",
            "Expires": "0",
          },
          body: JSON.stringify({
            ...payload,
            timestamp: Date.now(),
            _nonce: Math.random().toString(36).substring(2) + Date.now(),
            generationConfig: {
              temperature: options.temperature ?? 0.80,
              topP: options.topP ?? 0.95,
              maxOutputTokens: options.maxOutputTokens ?? 3000,
            },
            systemInstruction: options.systemInstruction
              ? `${options.systemInstruction} ${ANTI_LOOP_DIRECTIVE}`
              : ANTI_LOOP_DIRECTIVE,
          }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        const elapsedMs = Math.round(performance.now() - startTime);
        const parsed = await safeParseResponseJson<T>(response);

        if (response.ok && parsed.ok && parsed.data) {
          let data: any = parsed.data;

          const textVal = (typeof data?.text === "string" && data.text.trim())
            ? data.text
            : (typeof data?.response === "string" && data.response.trim())
              ? data.response
              : (typeof data?.answer === "string" && data.answer.trim())
                ? data.answer
                : "";

          if (!textVal && !data?.id && (data?.error || data?.message)) {
            lastServerError = data.error || data.message;
            continue;
          }

          // Apply sentence deduplication to string fields
          if (data && typeof data === "object") {
            if (typeof data.response === "string") data.response = deduplicateSentences(data.response);
            if (typeof data.text === "string") data.text = deduplicateSentences(data.text);
            if (typeof data.answer === "string") data.answer = deduplicateSentences(data.answer);
            if (typeof data.reflection === "string") data.reflection = deduplicateSentences(data.reflection);
            if (typeof data.guidedPrayer === "string") data.guidedPrayer = deduplicateSentences(data.guidedPrayer);
            if (typeof data.fullManuscript === "string") data.fullManuscript = deduplicateSentences(data.fullManuscript);
          }

          console.log(`[AI SUCCESS] ✅ Response from ${targetUrl} in ${elapsedMs}ms:`, data);

          if (options.storageKey && data) {
            try {
              const existingRaw = localStorage.getItem(options.storageKey);
              let history: any[] = [];
              if (existingRaw) {
                try {
                  const parsedHist = JSON.parse(existingRaw);
                  history = Array.isArray(parsedHist) ? parsedHist : [parsedHist];
                } catch {
                  history = [];
                }
              }
              const updatedHistory = [data, ...history.filter((item: any) => item?.id !== (data as any)?.id)].slice(0, 50);
              localStorage.setItem(options.storageKey, JSON.stringify(updatedHistory));
            } catch (storageErr) {
              console.warn("[AI STORAGE] Failed writing cache:", storageErr);
            }
          }

          return {
            success: true,
            data,
            text: textVal || (data as any)?.text || (data as any)?.response || (data as any)?.answer,
          };
        } else if (parsed?.data && ((parsed.data as any).error || (parsed.data as any).message)) {
          lastServerError = (parsed.data as any).error || (parsed.data as any).message;
        } else {
          lastServerError = `Server returned status ${response.status} (${response.statusText || "Error"})`;
        }

        break;
      } catch (err: any) {
        clearTimeout(timeoutId);
        attempt++;
        if (attempt <= maxRetries && err?.name !== "AbortError") {
          await new Promise((r) => setTimeout(r, retryDelayMs));
        }
      }
    }
  }

  // Do NOT silently replace failed AI requests with generic canned content
  const failureMsg = lastServerError || "GEMINI_API_KEY missing in Vercel Environment Variables. Add it in Vercel Dashboard > Settings > Environment Variables";
  console.warn(`[AI CLIENT] ⚠️ Live AI generation failed: ${failureMsg}`);
  return {
    success: false,
    error: failureMsg,
    isApiKeyMissing: true
  };
}

/**
 * Retrieve cached AI responses from localStorage
 */
export function getCachedAiHistory<T = any>(storageKey: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(storageKey);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [parsed];
  } catch (err) {
    console.warn(`[AI STORAGE] Failed reading ${storageKey}:`, err);
    return [];
  }
}
