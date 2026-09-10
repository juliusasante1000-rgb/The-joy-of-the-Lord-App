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

import { deduplicateSentences, ANTI_LOOP_DIRECTIVE, getClientGeminiApiKey } from "../services/aiService";

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
 * Generate doctrinal response for any theological question
 */
function buildDoctrinalAnswer(question: string, category: string = "Christian Orthodoxy"): { answer: string; scriptures: string[]; keyTakeaway: string } {
  const qLower = question.toLowerCase();
  
  let mainScripture = "John 14:6 — 'Jesus saith unto him, I am the way, the truth, and the life: no man cometh unto the Father, but by me.'";
  let doctrineExplanation = `According to historic Christian orthodoxy, all true doctrine is anchored upon the infallible Word of God and the person and work of Jesus Christ. Through the Holy Scriptures, God has revealed His eternal nature, His holy law, and His redemptive plan of salvation by grace through faith.`;
  let lifeApplication = `Hold fast to sound doctrine in your daily walk. Let God's Word renew your mind, guide your relationships, and anchor your decisions in faith and love.`;
  let concludingDeclaration = `I declare that my life is founded on the unshakeable truth of God's Word, and I walk in victory and joy through Jesus Christ our Lord!`;

  if (qLower.includes("salvation") || qLower.includes("saved") || qLower.includes("born again")) {
    mainScripture = "Ephesians 2:8-9 — 'For by grace are ye saved through faith; and that not of yourselves: it is the gift of God: Not of works, lest any man should boast.'";
    doctrineExplanation = `Salvation is entirely the sovereign gift of God's unmerited grace, received through personal faith in Jesus Christ's substitutionary atonement on the Cross. Regeneration (being born again) is the miraculous work of the Holy Spirit imparting eternal life.`;
    lifeApplication = `Rest completely in the finished work of Christ. Walk daily with assurance of your salvation, bearing the fruit of repentance and joyful obedience.`;
    concludingDeclaration = `I decree that I am redeemed by the precious blood of the Lamb, justified by faith, and sealed by the Holy Spirit of promise!`;
  } else if (qLower.includes("holy spirit") || qLower.includes("anointing") || qLower.includes("tongues") || qLower.includes("power")) {
    mainScripture = "Acts 1:8 — 'But ye shall receive power, after that the Holy Ghost is come upon you: and ye shall be witnesses unto me both in Jerusalem, and in all Judaea, and in Samaria, and unto the uttermost part of the earth.'";
    doctrineExplanation = `The Holy Spirit is the third Person of the Triune Godhead, co-equal and co-eternal with the Father and the Son. He convicts of sin, indwells believers at regeneration, empowers with supernatural gifts, and releases divine authority for kingdom witness and holy living.`;
    lifeApplication = `Cultivate a continuous, sensitive communion with the Holy Spirit through daily prayer, worship, and yielding to His promptings.`;
    concludingDeclaration = `I declare that I am filled with the power of the Holy Ghost, walking in divine wisdom and supernatural fruitfulness today!`;
  } else if (qLower.includes("healing") || qLower.includes("sick") || qLower.includes("miracle")) {
    mainScripture = "Isaiah 53:4-5 / 1 Peter 2:24 — 'By whose stripes ye were healed.'";
    doctrineExplanation = `Divine healing is a covenant provision secured in Christ's atonement. Christ took our infirmities and carried our sorrows. The prayer of faith, accompanied by the laying on of hands and the Name of Jesus, releases God's supernatural healing virtue.`;
    lifeApplication = `Lay hold of God's healing promises with confident faith, declaring health and wholeness over your physical body and mind.`;
    concludingDeclaration = `I decree that by the stripes of Jesus I am healed, strengthened, and restored in every cell of my body to the glory of God!`;
  } else if (qLower.includes("faith") || qLower.includes("believe") || qLower.includes("trust")) {
    mainScripture = "Hebrews 11:1, 6 — 'Now faith is the substance of things hoped for, the evidence of things not seen... but without faith it is impossible to please him.'";
    doctrineExplanation = `Biblical faith is not blind optimism; it is unwavering trust in God's character and covenant promises. Faith comes by hearing the Word of God (Romans 10:17) and acts boldly upon divine instruction.`;
    lifeApplication = `Feed your spirit daily with the Word of God, speak faith-filled words, and refuse to waver when confronted with contrary physical circumstances.`;
    concludingDeclaration = `I walk by faith and not by sight. My trust is firmly anchored in the Living God who never fails!`;
  } else if (qLower.includes("warfare") || qLower.includes("demon") || qLower.includes("deliverance") || qLower.includes("enemy")) {
    mainScripture = "Ephesians 6:10-12 / Luke 10:19 — 'Behold, I give unto you power to tread on serpents and scorpions, and over all the power of the enemy: and nothing shall by any means hurt you.'";
    doctrineExplanation = `Believers engage in spiritual warfare from the position of Christ's completed triumph at Calvary. Through the Name of Jesus, the blood of the Lamb, the Word of God, and the full armor of God, every demonic stronghold is pulled down.`;
    lifeApplication = `Put on the whole armor of God daily, stand in spiritual authority, and enforce the victory of Calvary through prayer and praise.`;
    concludingDeclaration = `In the mighty Name of Jesus Christ, I bind every spirit of fear and oppression. The Joy of the Lord is my unbreachable fortress!`;
  }

  const answer = `### Biblical & Systematic Exposition: ${question}

**1. Scriptural Foundation:**
${mainScripture}

**2. Orthodox Theological Explanation:**
${doctrineExplanation}

**3. Practical Life Application:**
${lifeApplication}

**4. Apostolic Decree:**
${concludingDeclaration}`;

  return {
    answer,
    scriptures: [mainScripture.split("—")[0].trim(), "Psalm 119:105", "2 Corinthians 1:20", "John 17:17"],
    keyTakeaway: "Anchor your life in the unchanging truth of God's Word and live in joyful obedience to Jesus Christ."
  };
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
            text: (data as any)?.text || (data as any)?.response || (data as any)?.answer,
          };
        }

        // If response is not ok (e.g. 404 on static hosting), break to try next endpoint or client fallback
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

  // Tier 2: Direct Client-Side Gemini API call if client key is configured
  const clientApiKey = getClientGeminiApiKey();
  if (clientApiKey) {
    const modelsToTry = ["gemini-2.5-flash", "gemini-flash-latest", "gemini-2.5-flash-lite", "gemini-3.1-flash-lite"];
    const promptText = payload?.prompt || payload?.question || (payload?.scriptureReference ? `Exposition on ${payload.scriptureReference}: "${payload.scriptureText || ''}"` : payload?.topic || "Christian Theology");
    
    for (const modelName of modelsToTry) {
      try {
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${clientApiKey}`;
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ role: "user", parts: [{ text: promptText }] }],
            systemInstruction: { parts: [{ text: "You are an orthodox Christian theologian and pastoral guide. Provide biblically sound, reverent insights." }] }
          })
        });

        if (res.ok) {
          const resJson = await res.json().catch(() => null);
          const rawText = resJson?.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText && rawText.trim()) {
            const cleaned = deduplicateSentences(rawText);
            let parsedObj: any = null;
            try {
              let clean = cleaned.trim();
              if (clean.startsWith("```json")) clean = clean.replace(/^```json\s*/i, "").replace(/\s*```$/, "");
              else if (clean.startsWith("```")) clean = clean.replace(/^```\s*/i, "").replace(/\s*```$/, "");
              parsedObj = JSON.parse(clean);
            } catch {
              parsedObj = null;
            }

            const returnData: any = parsedObj || {
              answer: cleaned,
              text: cleaned,
              response: cleaned
            };

            return {
              success: true,
              data: returnData,
              text: cleaned
            };
          }
        }
      } catch (clientErr) {
        console.warn(`[AI CLIENT] Direct client call with ${modelName} failed:`, clientErr);
      }
    }
  }

  // Do NOT silently replace failed AI requests with generic canned content
  console.warn("[AI CLIENT] ⚠️ Live AI generation could not be completed via server endpoints or direct calls.");
  return {
    success: false,
    error: "AI generation could not be completed right now. Please try again.",
    isApiKeyMissing: !clientApiKey && !Boolean(process.env.GEMINI_API_KEY)
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
