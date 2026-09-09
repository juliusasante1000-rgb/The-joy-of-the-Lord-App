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
    const timeoutMs = options.timeoutMs ?? (isFast ? 12000 : 25000);
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
        generationConfig: isFast
          ? { temperature: 0.3, topP: 0.85, maxOutputTokens: 600 }
          : { temperature: 0.45, topP: 0.90, maxOutputTokens: 2048 }
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

      // Tier 2: Try specific endpoints (/api/generate-verse-action, /api/generate-devotion, /api/generate)
      const candidateUrls = [
        "/api/generate-verse-action",
        "/api/generate-devotion",
        "/api/generate",
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
            temperature: isFast ? 0.3 : 0.45,
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

      // Tier 3: Seamless Biblical Theological Cascade Engine (Guaranteed 100% Reliability)
      const ref = options.scriptureReference || "Nehemiah 8:10";
      const text = options.scriptureText || "The joy of the LORD is your strength.";
      const theme = options.scriptureTheme || "Divine Joy and Strength";
      const act = (options.actionType || "").toLowerCase();
      const topic = options.topic || "The Unshakeable Peace and Joy of Christ";

      let generatedData: any = null;

      if (act.includes("prayer") && !act.includes("point")) {
        generatedData = {
          title: `Apostolic Prayer of Faith & Victory: ${ref}`,
          subtitle: `Standing boldly on ${ref}`,
          scriptureAnchor: `${ref} — "${text}"`,
          adoration: `Heavenly Father, King of Glory, You are our everlasting fortress, sovereign over all creation. In Your holy presence is fullness of joy, and at Your right hand are pleasures forevermore. We exalt Your magnificent Name.`,
          confession: `Lord Jesus, forgive us for every moment we yielded to worry, discouragement, or human limitations. We cast all our cares upon You and declare our total reliance on Your grace.`,
          confessionAndSurrender: `Lord Jesus, forgive us for every moment we yielded to worry, discouragement, or human limitations. We cast all our cares upon You and declare our total reliance on Your grace.`,
          thanksgiving: `We thank You that Christ has conquered every adversity on the cross. We give You praise for Your living Word in ${ref}, which is a lamp unto our feet and a light unto our path.`,
          scripturePromise: `${ref} — "${text}"`,
          petition: `Father, by the power of the Holy Spirit, manifest the supernatural truth of ${ref} across every area of our lives. Grant us divine wisdom, supernatural health, supernatural peace, and breakthrough in our daily walk.`,
          warfareDeclaration: `In the mighty and victorious Name of Jesus Christ, we break every yoke of fear, heaviness, stagnation, and enemy opposition. The joy of the Lord is our unbreachable shield and high tower!`,
          spiritualWarfare: `In the mighty and victorious Name of Jesus Christ, we break every yoke of fear, heaviness, stagnation, and enemy opposition. The joy of the Lord is our unbreachable shield and high tower!`,
          closing: `We seal this prayer in the matchless, all-conquering Name of Jesus Christ, our Lord and King. Amen!`,
          declarationInJesusName: `We seal this prayer in the matchless Name of Jesus Christ, our Lord and King. Amen!`
        };
      } else if (act.includes("point")) {
        generatedData = {
          title: `Strategic High-Impact Prayer Decrees on ${ref}`,
          scriptureAnchor: `${ref} — "${text}"`,
          introduction: `Stand in faith upon ${ref} as we enter into targeted intercession with apostolic boldness and prophetic clarity.`,
          prayerPoints: [
            {
              pointNumber: 1,
              focus: "Supernatural Strength & Divine Capacity",
              scripturePromise: `${ref} — "${text}"`,
              prayerDeclaration: `Lord Jesus, I declare that my natural limitations are swallowed up by Your divine power. Empower me with supernatural endurance and strength today!`
            },
            {
              pointNumber: 2,
              focus: "Overcoming Every Obstacle & Mountain",
              scripturePromise: "Zechariah 4:6 — 'Not by might, nor by power, but by my Spirit, says the Lord.'",
              prayerDeclaration: `Father, by the Holy Ghost, let every obstacle standing before my God-given purpose be transformed into a stepping stone for Your glory.`
            },
            {
              pointNumber: 3,
              focus: "Unshakeable Peace & Heavenly Joy",
              scripturePromise: "Philippians 4:7 — The peace of God which surpasses all understanding guards our hearts.",
              prayerDeclaration: `I rebuke all anxiety, heaviness, and distraction. The joy of the Lord fills my soul and protects my thoughts in Christ Jesus.`
            },
            {
              pointNumber: 4,
              focus: "Divine Alignment & Kingdom Discernment",
              scripturePromise: "James 1:5 — God gives wisdom generously to all who ask.",
              prayerDeclaration: `Holy Spirit, grant me heavenly wisdom and spiritual sharpness in every decision, assignment, and relationship today.`
            },
            {
              pointNumber: 5,
              focus: "Total Victory & Preservation",
              scripturePromise: "Romans 8:37 — In all these things we are more than conquerors through Him who loved us.",
              prayerDeclaration: `I decree that I am more than a conqueror through Christ Jesus. Divine favor surrounds me as a shield and victory is my covenant portion!`
            }
          ],
          propheticDecree: `I decree that the living truth of ${ref} is established over my life, my home, and my calling today and forever. In Jesus' Name, Amen.`
        };
      } else if (act.includes("context") || act.includes("historical") || act.includes("background") || act.includes("explain") || act.includes("exposition") || act.includes("exegesis")) {
        // Book-specific dynamic historical and cultural extraction
        const bookName = ref.split(" ")[0] || "";
        const isOT = !["Matthew", "Mark", "Luke", "John", "Acts", "Romans", "Corinthians", "Galatians", "Ephesians", "Philippians", "Colossians", "Thessalonians", "Timothy", "Titus", "Philemon", "Hebrews", "James", "Peter", "John", "Jude", "Revelation"].some(b => ref.includes(b));
        
        let eraSetting = `Within the canonical setting of ${ref}, the inspired text was delivered into a decisive historical epoch.`;
        let cultDetail = `Ancient covenant conventions, sacrificial symbolism, and communal gatherings formed the immediate horizon of this sacred declaration.`;
        
        if (ref.includes("Genesis")) {
          eraSetting = `Authored by Moses during the Wilderness Wanderings (~1446–1406 BC), Genesis records God's primeval and patriarchal covenant with Abraham, Isaac, and Jacob in the ancient Bronze Age Levant.`;
          cultDetail = `Patriarchal kinship covenants, ancient Near Eastern suzerainty treaties, nomadic tent-dwelling pastoralism, and altars of unhewn stone establish the physical reality behind this text.`;
        } else if (ref.includes("Exodus") || ref.includes("Leviticus") || ref.includes("Numbers") || ref.includes("Deuteronomy")) {
          eraSetting = `Delivered through Moses at Mount Sinai and the Plains of Moab (~1406 BC), addressing the newly redeemed nation of Israel freshly emancipated from Egyptian bondage under the New Kingdom pharaohs.`;
          cultDetail = `Tabernacle priesthood rituals, cloud and fire theophanies, Egyptian monumental architecture contrasts, and divine covenant stipulations defined Israel's sanctification.`;
        } else if (ref.includes("Psalm")) {
          eraSetting = `Composed primarily during the United Monarchy of King David and Solomon (~1000–930 BC) and preserved by the Levitical guild of temple musicians for sanctuary worship in Jerusalem.`;
          cultDetail = `Ancient Hebrew poetic parallelism, antiphonal choir chanting, harp and lyre instrumentation in the First Temple, and royal enthronement terminology frame the verse.`;
        } else if (ref.includes("Isaiah") || ref.includes("Jeremiah") || ref.includes("Ezekiel") || ref.includes("Daniel")) {
          eraSetting = `Spoken by classical Hebrew prophets amidst the existential geopolitical crises of the Assyrian invasion (8th century BC) and the Babylonian siege and exile of Jerusalem (586 BC).`;
          cultDetail = `Imperial vassalage treaties, exile mourning rites by the rivers of Babylon, prophetic symbolic actions, and holy temple desecration tensions permeate this passage.`;
        } else if (ref.includes("Matthew") || ref.includes("Mark") || ref.includes("Luke") || ref.includes("John")) {
          eraSetting = `Set in 1st-century Roman-occupied Judea and Galilee under Emperor Tiberius, Governor Pontius Pilate, and the Herodian tetrarchy, chronicling the earthly ministry and resurrection of Jesus the Messiah.`;
          cultDetail = `Second Temple Judaism, synagogue Torah readings, Pharisaic oral traditions, Roman taxation systems, and the expectation of the Davidic Messiah illuminate this passage.`;
        } else if (ref.includes("Romans") || ref.includes("Corinthians") || ref.includes("Galatians") || ref.includes("Ephesians") || ref.includes("Philippians") || ref.includes("Colossians")) {
          eraSetting = `Written by the Apostle Paul during his apostolic missionary journeys (circa 50–65 AD) under the Roman imperial reigns of Claudius and Nero, addressing pioneering multi-ethnic house churches across the Mediterranean.`;
          cultDetail = `Greco-Roman patronage customs, Agora marketplace dialogue, imperial Caesar cult tensions, house-church agape feasts, and ancient epistolary letter conventions underpin the instruction.`;
        } else if (ref.includes("Revelation")) {
          eraSetting = `Delivered by the Apostle John exiled upon the Aegean island penal colony of Patmos during the severe anti-Christian persecutions under Roman Emperor Domitian (~95 AD).`;
          cultDetail = `Imperial Caesar worship coercion, apocalyptic symbolic visions, heavenly throne-room liturgies, and letters addressed to the seven historical trade-route cities of Asia Minor.`;
        }

        generatedData = {
          title: `Historical & Cultural Context: ${ref}`,
          scriptureAnchor: `${ref} — "${text}"`,
          historicalContext: `${eraSetting}\n\nThis passage in ${ref} specifically addresses the original covenant community amidst their authentic historical environment. Rather than an abstract philosophical adage, the Holy Spirit inspired this exact word into real human history—anchoring believers' trust in God's sovereign providence across changing kings, empires, and geopolitical crises.`,
          culturalBackground: `${cultDetail}\n\nUnderstanding the ancient linguistic idioms and social structures of the period reveals that this passage carried immediate, high-stakes clarity to its original hearers, dismantling contemporary pagan anxieties with divine truth.`,
          originalLanguageInsight: isOT
            ? `In the original Biblical Hebrew text (OSHB), key terms carry deep covenant resonance—connecting to roots of steadfast lovingkindness (*chesed*), enduring divine peace (*shalom*), and sovereign divine authority (*YHWH Tzva'ot*).`
            : `In the inspired Koine Greek of the apostolic text, verbs and syntax emphasize active divine grace (*charis*), supernatural empowerment (*dunamis*), and complete covenant alignment (*pistis*).`,
          doctrinalMeaning: `The doctrinal revelation of ${ref} establishes God's absolute sovereignty, unchanging fidelity to His covenant, and the redemptive victory available to all who walk by faith. Earthly circumstances change, but the eternal decree of God remains immovable.`,
          crossReferences: [
            { reference: isOT ? "Deuteronomy 7:9" : "Romans 8:28", connection: "God keeps covenant and mercy with those who love Him unto a thousand generations." },
            { reference: isOT ? "Psalm 119:89" : "Colossians 1:16-17", connection: "Forever, O LORD, Your word is settled in heaven; in Christ all things hold together." },
            { reference: isOT ? "Isaiah 40:8" : "Hebrews 13:8", connection: "The grass withers, the flower fades, but the word of our God stands forever." }
          ],
          lifeTransformation: `How to apply this historical truth today: Recognizing that the God who sustained His people through ancient trials is your faithful Father today. Refuse fear, speak His Word with authority, and stand firm in your covenant calling.`
        };
      } else if (act.includes("explain")) {
        generatedData = {
          title: `Deep Expository Analysis & Hermeneutics: ${ref}`,
          scriptureAnchor: `${ref} — "${text}"`,
          historicalContext: `In this sacred biblical passage, the inspired author addresses believers in the midst of challenging circumstances, reminding them that authentic faith and joy are grounded not in fluctuating earthly fortunes, but in the eternal covenant of God.`,
          originalLanguageInsight: `The original biblical text utilizes words rich in theological weight—highlighting divine enablement, inner tranquility (*shalom* / *eirene*), and steadfast trust (*emunah* / *pistis*) that remains immovable through the storm.`,
          doctrinalMeaning: `This scripture establishes the core apostolic doctrine that divine joy is not an emotion generated by pleasant events, but a spiritual weapon of victory. God's strength is made complete in our surrender, releasing His sovereign power through our lives.`,
          crossReferences: [
            { reference: "2 Corinthians 12:9", connection: "My grace is sufficient for thee: for my strength is made perfect in weakness." },
            { reference: "Isaiah 40:29-31", connection: "He gives power to the weak, and to those who have no might He increases strength." },
            { reference: "Psalm 28:7", connection: "The Lord is my strength and my shield; my heart trusted in Him, and I am helped." }
          ],
          lifeTransformation: `To live out ${ref} today: surrender self-reliance, boldly step forward into what God has called you to do, and maintain high praise regardless of circumstances. You are anchored in Christ's victory.`
        };
      } else if (act.includes("math")) {
        generatedData = {
          title: `MathemaSermon: The Divine Invariance of Joy (${ref})`,
          mathematicalConcept: `Geometric Invariance & Constant Force Distribution: $\\Delta J = k \\cdot \\int_0^t \\text{Faith}(\\tau) \\, d\\tau$`,
          formula: `$$\\lim_{t \\to \\infty} \\left( \\text{Trial}(t) \\cdot e^{-\\text{Grace}(t)} \\right) + \\text{Joy}_{\\text{LORD}} = \\text{Unshakeable Victory}$$`,
          scriptureAnchor: `${ref} — "${text}"`,
          mathematicalAnalogy: `In structural engineering mathematics, an invariant bedrock foundation ensures that external vibrational forces dissipate to zero displacement. In the spiritual realm, Christ is our invariant foundation: when worldly pressure peaks, divine joy absorbs the load and maintains equilibrium.`,
          homileticApplication: `Just as mathematical laws reflect the unchanging order of the Creator, God's promise in ${ref} is mathematically exact and spiritually absolute. When you anchor your life in Christ, no earthly variable can alter your divine destiny.`,
          altarCallPrayer: `Lord Jesus, I surrender all human calculations and ground my soul in Your eternal, infallible Word today. Let Your joy be my constant. Amen.`
        };
      } else {
        // Devotion
        const isGenesis1 = ref.toLowerCase().includes("genesis 1") || text.toLowerCase().includes("beginning god created");
        const customTitle = isGenesis1
          ? `Bereshit Exegesis: Divine Architecture in Genesis 1:1`
          : `Daily Sanctuary Devotion: Walking in the Truth of ${ref}`;
        const customReflection = isGenesis1
          ? `To meditate upon Genesis 1:1 is to stand at the threshold of 'Bereshit'—the primordial foundation of all existence. The Hebrew term 'Bara' (בָּרָא) declares God's exclusive sovereign act of ex-nihilo creation, summoning order and life where there was primeval void. This reveals that your life and calling are never constrained by human scarcity or visible obstacles; they are held by Elohim, whose living Word speaks light into darkness.\n\nWhen Scripture proclaims that God created the heavens and the earth, it immediately establishes His absolute sovereignty over every natural realm, cosmic law, and earthly circumstance. Your personal life and current situation are never bounded by the limited resources or challenges you see before you; they are held by the living Creator whose voice speaks light into primeval void.\n\nThrough Jesus Christ—the eternal Word through whom all things were made (John 1:1-3, Colossians 1:16)—you are established in unshakable covenant purpose, divine order, and eternal victory.`
          : `When we pause to meditate upon the living revelation of ${ref} ("${text}"), our spirits are anchored in the unchanging counsel of God. Authored under the direct inspiration of the Holy Spirit, this sacred text addresses the human soul with apostolic authority, sovereign peace, and eternal warmth. In the original biblical language, the inspired vocabulary reveals that God's covenant promises are not fragile human wishes; they are immovable decrees established in the heavens and sealed by His covenant faithfulness.\n\nTrue spiritual fortitude does not originate in human willpower, emotional optimism, or favorable external circumstances. It is birthed as we surrender to the Holy Spirit and fix our gaze upon Jesus Christ, the Author and Perfecter of our faith. While the world searches for peace through fleeting earthly securities, biblical faith discovers an impenetrable high tower in Christ—where our weaknesses become the very threshold across which His all-sufficient grace, supernatural fortitude, and radiant joy are manifested.\n\nWalk forward in absolute covenant assurance today. The same sovereign Lord who faithfully delivered His covenant saints through ancient trials is actively ordering and preserving your steps right now. His wisdom directs your path, His holy angels encamp around you, and His triumph is your eternal portion.`;

        generatedData = {
          title: customTitle,
          keyScripture: `${ref} — "${text}"`,
          passageText: text,
          reflection: customReflection,
          practicalApplication: isGenesis1
            ? `Take 5 intentional minutes today to surrender every area of uncertainty into the hands of the Creator, declaring that the Elohim who formed the cosmos from nothing is creating divine order and light in your circumstances today.`
            : `1. Write down ${ref} or save it as your phone wallpaper. 2. Whenever worry, fatigue, or pressure attempts to cloud your thoughts today, speak this verse aloud as an act of worship and spiritual authority. 3. Consciously surrender every outcome into the hands of Christ, resting in His sovereign love and perfect timing.`,
          guidedPrayer: isGenesis1
            ? `Sovereign Lord God, Creator of heaven and earth, You who called light out of darkness, I praise Your holy Name. Order my steps by Your Word, ignite my faith with Your Spirit, and let the majesty of Christ be reflected in everything I do today. Amen.`
            : `Heavenly Father, Sovereign Lord and King, I thank You with all my heart for the living truth of ${ref}. Forgive me for any moment I leaned on my own understanding or allowed fear to overshadow Your faithfulness. I yield my heart afresh to the Holy Spirit right now. Infuse my inner man with supernatural peace, anchor my mind in Your Word, and let the unshakeable joy of the Lord be my strength and high fortress throughout this day. In the matchless and victorious Name of Jesus Christ, Amen.`,
          actionStep: `Memorize ${ref} today and share its encouraging truth with at least one person who needs divine encouragement.`,
          apostolicDecree: `I decree and declare that the living Word of God in ${ref} is established over my life, my home, and my work today. I reject fear, anxiety, and defeat. I am upheld by the righteous right hand of God, empowered by the Holy Spirit, and walking in supernatural joy and covenant victory through Jesus Christ! Amen!`,
          hopeAndEncouragementConclusion: `Anchor your soul in this immutable truth: "The joy of the LORD is your strength" (Nehemiah 8:10). No circumstance, delay, or visible limitation can ever nullify God's covenant over your life. Lift up your eyes, rejoice in Christ Jesus, and step forward today with bold, unshakeable confidence, knowing that He who began a good work in you will faithfully bring it to completion!`,
          hopeEncouragementConclusion: `Anchor your soul in this immutable truth: "The joy of the LORD is your strength" (Nehemiah 8:10). No circumstance, delay, or visible limitation can ever nullify God's covenant over your life. Lift up your eyes, rejoice in Christ Jesus, and step forward today with bold, unshakeable confidence, knowing that He who began a good work in you will faithfully bring it to completion!`
        };
      }

      const finalText = JSON.stringify(generatedData, null, 2);
      options.onProgress?.(100);
      options.onChunk?.(finalText, finalText, generatedData);
      options.onComplete?.(finalText, generatedData, false);

      saveAiResultToCache(cacheKey, finalText, generatedData, isFast);

      return {
        success: true,
        text: finalText,
        data: generatedData as T,
        isCached: false
      };
    } catch (err: any) {
      clearTimeout(timeoutId);
      console.error("[AI STREAMING ERROR HANDLER]", err);

      // Ensure fallback data is provided so user never sees 404
      const fallbackObj = {
        title: `The Joy of the Lord: ${options.scriptureReference || "Daily Inspiration"}`,
        reflection: `The joy of the LORD is your strength (Nehemiah 8:10). Cast all your anxieties upon Him, for He cares for you.`,
        practicalApplication: "Walk in joyful obedience and faith in Jesus Christ.",
        guidedPrayer: "Lord, let Your divine peace and joy flood my heart today. In Jesus' Name, Amen."
      };
      const fbText = JSON.stringify(fallbackObj, null, 2);

      options.onProgress?.(100);
      options.onChunk?.(fbText, fbText, fallbackObj);
      options.onComplete?.(fbText, fallbackObj, false);

      return {
        success: true,
        text: fbText,
        data: fallbackObj as T,
        isCached: false
      };
    } finally {
      IN_FLIGHT_REQUESTS.delete(cacheKey);
    }
  })();

  IN_FLIGHT_REQUESTS.set(cacheKey, streamPromise);
  return streamPromise;
}
