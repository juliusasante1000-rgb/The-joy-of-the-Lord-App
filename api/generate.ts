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
   - Conclude with an inspiring, triumphant, and hope-igniting apostolic message that leaves the believer deeply empowered and joyous.
d. STANDARDIZED MATHEMATICAL EQUATIONS MANDATE:
   - When presenting mathematical formulas, equations, or scientific laws, you MUST format them in standardized LaTeX notation.
   - For standalone display equations, use $$...$$ blocks (e.g. $$P(t) = P_0 e^{kt}$$ or $$\\vec{F} = m\\vec{a}$$).
   - For inline mathematical variables and expressions, use $...$ (e.g. $k > 0$, $x \\in \\mathbb{R}$).
   - Never output raw unformatted ASCII code blocks or plain unstructured text for mathematical formulas.
e. ANTI-DUPLICATION & ZERO-INCOHERENCE DIRECTIVE:
   - Write with supreme linear clarity, progressive revelation, and tight narrative coherence.
   - Do NOT duplicate paragraphs, repeat sentences with minor variations, or recycle points under different headings.
   - Ensure every section develops a fresh, distinct dimension of truth with sharp biblical precision.`;

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
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  if (!trimmed) return null;

  // 1. Direct parse attempt
  try {
    return JSON.parse(trimmed);
  } catch {}

  // 2. Strip markdown fences
  let cleaned = trimmed;
  if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
    try {
      return JSON.parse(cleaned);
    } catch {}
  }

  // 3. Extract JSON object {...}
  const firstBrace = cleaned.indexOf("{");
  const lastBrace = cleaned.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    const candidate = cleaned.substring(firstBrace, lastBrace + 1);
    try {
      return JSON.parse(candidate);
    } catch {
      try {
        const repaired = candidate.replace(/(?<!\\)\\(?!["\\/bfnrtu])/g, "\\\\");
        return JSON.parse(repaired);
      } catch {}
    }
  }

  // 4. Auto-repair truncated JSON
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
    return JSON.parse(fixed);
  } catch {}

  return null;
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
      primaryModel: "gemini-3.6-flash",
      modelsCascade: [
        "gemini-3.6-flash",
        "gemini-3.5-flash-lite",
        "gemini-flash-lite-latest",
        "gemini-3.1-flash-lite",
        "gemini-3.8-flash",
        "gemini-flash-latest",
      ],
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
    version,
    topic,
    need,
    subject,
    question,
    stream
  } = body || {};

  // Build specialized, comprehensive prompt and JSON schemas
  let userPrompt = prompt;
  let responseMimeType: string | undefined = undefined;

  const act = String(actionType || "").trim().toLowerCase();
  const rawUrl = String(req.url || "").toLowerCase();
  const isPrayerAction = act.includes("prayer") || Boolean(need) || rawUrl.includes("prayer");
  const ref = scriptureReference || (isPrayerAction ? "Philippians 4:6-7" : "Daily Scripture");
  const txt = scriptureText || (isPrayerAction ? "Be careful for nothing; but in every thing by prayer and supplication with thanksgiving let your requests be made known unto God." : "");
  const v = version || "KJV";
  const currentSubject = need || topic || body?.subject || body?.scriptureTheme || "Divine Strength, Peace & Breakthrough";

  if (!userPrompt) {
    if (isPrayerAction && !act.includes("point")) {
      userPrompt = `You are a reverent, apostolic Christian pastoral leader and prayer general. Compose an anointed, deeply transformative Structured Guided Prayer rooted directly in the living conjunction of the scripture and subject:
Current Subject: "${currentSubject}"
Prayer Category: "${category || "Breakthrough & Faith"}"
Theme Scripture: ${ref} (${v})
Scripture Text: "${txt}"

MANDATORY INSTRUCTIONS:
1. Address the subject "${currentSubject}" directly in living conjunction with theme scripture ${ref}.
2. Ground every petition in the exact truth and vocabulary of "${txt}".
3. Fill all 7 prayer sections with rich apostolic authority, biblical depth, and living faith.
4. Conclude with an authoritative apostolic warfare and victory decree sealing the breakthrough.
${AI_OUTPUT_IMPROVEMENT_RULES}

Format your response as a valid JSON object matching this schema:
{
  "title": "Apostolic Prayer for ${currentSubject}",
  "subtitle": "Faith-filled targeted intercession for ${currentSubject}",
  "category": "${category || "Breakthrough & Faith"}",
  "theme": "${currentSubject}",
  "suggestedScriptures": ["${ref}", "Philippians 4:6-7", "Psalm 91:1-2"],
  "scriptureAnchor": "${ref} (${v}) - '${txt}'",
  "scripturePromise": "${ref} (${v}) - '${txt}'",
  "adoration": "Exalt God's supreme holiness, sovereignty, and divine faithfulness demonstrated in ${ref} regarding ${currentSubject}.",
  "confessionAndSurrender": "Reverent surrender of human insufficiency, fear, and self-reliance into His covenant hands.",
  "thanksgiving": "Heartfelt thanksgiving for God's steadfast promises, the finished work of Christ on the cross, and His grace.",
  "petition": "Direct, heartfelt, and targeted petitions applying ${ref} directly to ${currentSubject}.",
  "warfareDeclaration": "Authoritative apostolic decrees breaking doubt, fear, delay, and enemy limitations in Jesus' Name.",
  "declarationInJesusName": "Triumphant seal and affirmation in Jesus' victorious Name. Amen."
}`;
      responseMimeType = "application/json";
    } else if (act.includes("point")) {
      userPrompt = `Generate 5 strategic, high-impact prayer points addressing the subject "${currentSubject}" in direct conjunction with theme scripture ${ref} ("${txt}").
Requirements:
1. Tailor each prayer point specifically to the intersection of "${currentSubject}" and ${ref}.
2. Ground each decree in the exact revelation of ${ref}.
${AI_OUTPUT_IMPROVEMENT_RULES}

Format your response as a valid JSON object matching this schema:
{
  "title": "5 Strategic Prayer Points: ${ref}",
  "scriptureAnchor": "${ref} (${v}) - '${txt}'",
  "prayerPoints": [
    { "pointNumber": 1, "focus": "Divine Alignment", "scripturePromise": "${ref}", "prayerDeclaration": "Decree of alignment..." },
    { "pointNumber": 2, "focus": "Supernatural Strength", "scripturePromise": "${ref}", "prayerDeclaration": "Decree of divine strength..." },
    { "pointNumber": 3, "focus": "Covenant Breakthrough", "scripturePromise": "${ref}", "prayerDeclaration": "Decree of open doors..." },
    { "pointNumber": 4, "focus": "Spiritual Protection", "scripturePromise": "${ref}", "prayerDeclaration": "Decree of angelic shielding..." },
    { "pointNumber": 5, "focus": "Apostolic Victory", "scripturePromise": "${ref}", "prayerDeclaration": "Decree of lasting fruitfulness..." }
  ],
  "propheticDecree": "Authoritative prophetic decree sealing these prayer points in Jesus' Name."
}`;
      responseMimeType = "application/json";
    } else if (act.includes("explain") || act.includes("exposition")) {
      userPrompt = `You are a preeminent Christian Biblical scholar and expositor. Provide a profound, deep verse-by-verse and theological explanation of ${ref} ("${txt}") in conjunction with "${currentSubject}".
${AI_OUTPUT_IMPROVEMENT_RULES}

Format your response as a valid JSON object matching this schema:
{
  "title": "Deep Expository Analysis: ${ref}",
  "scriptureAnchor": "${ref} (${v}) - '${txt}'",
  "historicalContext": "Authoritative historical and cultural setting of this passage: author, era, and original audience.",
  "originalLanguageInsight": "Deep original Hebrew or Greek root terms, grammatical nuances, and lexical definitions.",
  "doctrinalMeaning": "The central theological doctrine and eternal covenant truth revealed in this verse.",
  "crossReferences": [
    { "reference": "Book Chapter:Verse", "connection": "How this cross-reference illuminates the verse" },
    { "reference": "Book Chapter:Verse", "connection": "How this cross-reference illuminates the verse" }
  ],
  "lifeTransformation": "Practical life transformation showing how the believer walks in this truth daily."
}`;
      responseMimeType = "application/json";
    } else if (act.includes("math")) {
      userPrompt = `You are Apostle Bismark Twum, Christian educator and creator of MathemaSermons. Formulate a rich MathemaSermon homiletic lesson connecting: ${ref} ("${txt}") with an authentic mathematical or physical concept and LaTeX formula, addressing the subject "${currentSubject}".
${AI_OUTPUT_IMPROVEMENT_RULES}

Format as JSON with keys:
{
  "title": "MathemaSermon: Divine Harmony in ${ref}",
  "mathematicalConcept": "Mathematical or scientific principle name",
  "formula": "LaTeX formula e.g. \\lim_{t \\to \\infty} P(t) = \\infty",
  "mathematicalAnalogy": "How this mathematical law models spiritual dynamics",
  "homileticApplication": "Apostolic preaching points connecting the math directly to ${ref} and Christian life",
  "hopeAndEncouragementConclusion": "Inspiring conclusion releasing hope, confidence in God's promises, and strength",
  "altarCallPrayer": "Fervent prayer sealing the revelation"
}`;
      responseMimeType = "application/json";
    } else if (topic || act.includes("devotion") || act.includes("create devotion") || (actionType && scriptureReference)) {
      userPrompt = `Generate a rich, deeply inspiring Christian daily devotion addressing the subject "${currentSubject}" in direct, living conjunction with theme scripture:
Theme Scripture: ${ref} (${v})
Passage Text: "${txt}"
Current Subject: "${currentSubject}"

${AI_OUTPUT_IMPROVEMENT_RULES}

Format your response as a valid JSON object matching this schema:
{
  "title": "Devotion: ${currentSubject}",
  "keyScripture": "${ref} (${v}) - '${txt}'",
  "passageText": "${txt}",
  "historicalContext": "Brief historical and biblical context of this passage.",
  "reflection": "A 3-paragraph deep theological and spiritual reflection addressing '${currentSubject}' through the lens of ${ref}.",
  "practicalApplication": "Concrete, actionable step for daily Christian living addressing '${currentSubject}'.",
  "guidedPrayer": "A reverent, faith-filled prayer concluding in Jesus' name.",
  "actionStep": "A memorable action or reflection question for the day.",
  "apostolicDecree": "A triumphant faith decree declaring the truth of this verse over the believer.",
  "hopeEncouragementConclusion": "An inspiring, triumphant conclusion anchoring the believer in hope and the Joy of the Lord."
}`;
      responseMimeType = "application/json";
    } else if (question) {
      userPrompt = `Topic Category: ${category || "Christian Theology & Orthodoxy"}
User Question: ${question}

Deliver an in-depth, rigorous, and deeply inspiring theological exposition with biblical scholarship:
1. Scriptural Exegesis & Cross-References
2. Original Language Nuance (Hebrew/Greek)
3. Practical Life Transformation
4. Apostolic Faith Decree
${AI_OUTPUT_IMPROVEMENT_RULES}

Format as JSON with keys: answer, scriptures, keyTakeaway.`;
      responseMimeType = "application/json";
    } else {
      userPrompt = "Provide an inspiring Christian reflection, theological insight, and prayer on the Joy of the Lord as our strength.";
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

  const candidateModels = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-flash-latest",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash",
  ];

  const isStreamRequest = Boolean(
    req.headers?.accept?.includes("text/event-stream") ||
    req.url?.includes("stream") ||
    stream === true
  );

  const genAI = new GoogleGenerativeAI(apiKey);

  // --- SSE STREAMING HANDLER ---
  if (isStreamRequest) {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/event-stream");
    res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate, no-transform");
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Connection", "keep-alive");
    res.setHeader("X-Accel-Buffering", "no");
    if (typeof res.flushHeaders === "function") res.flushHeaders();

    let streamAccumulator = "";
    let streamWorked = false;
    let modelUsed = candidateModels[0];

    for (const modName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modName,
          systemInstruction: fullSystemInstruction,
          safetySettings,
          generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            maxOutputTokens: 3500,
            ...(responseMimeType ? { responseMimeType } : {})
          },
        });

        const streamResult = await model.generateContentStream(userPrompt);
        for await (const chunk of streamResult.stream) {
          const textChunk = chunk.text();
          if (textChunk) {
            streamAccumulator += textChunk;
            res.write(`data: ${JSON.stringify({ chunk: textChunk, fullText: streamAccumulator })}\n\n`);
            if (typeof res.flush === "function") res.flush();
          }
        }

        if (streamAccumulator.trim().length > 0) {
          streamWorked = true;
          modelUsed = modName;
          break;
        }
      } catch (streamErr: any) {
        console.warn(`[GEMINI VERCEL STREAM] Model ${modName} stream failed:`, streamErr?.message);
      }
    }

    if (!streamWorked && !streamAccumulator) {
      // Fallback single generation if stream failed
      for (const modName of candidateModels) {
        try {
          const model = genAI.getGenerativeModel({
            model: modName,
            systemInstruction: fullSystemInstruction,
            safetySettings,
            generationConfig: {
              temperature: 0.8,
              topP: 0.95,
              maxOutputTokens: 3500,
              ...(responseMimeType ? { responseMimeType } : {})
            },
          });
          const resSingle = await model.generateContent(userPrompt);
          const t = resSingle.response.text();
          if (t && t.trim().length > 0) {
            streamAccumulator = t;
            modelUsed = modName;
            res.write(`data: ${JSON.stringify({ chunk: t, fullText: t })}\n\n`);
            break;
          }
        } catch (e: any) {
          console.warn(`[GEMINI VERCEL FALLBACK] Model ${modName} failed:`, e?.message);
        }
      }
    }

    let parsedJson = extractJson(streamAccumulator);
    if (parsedJson && typeof parsedJson === "object") {
      if (!parsedJson.sections && (parsedJson.petition || parsedJson.adoration || parsedJson.spiritualWarfare)) {
        parsedJson.sections = {
          adoration: parsedJson.adoration || "Almighty God, Heavenly Father, You are holy and faithful in all Your ways.",
          confessionAndSurrender: parsedJson.confessionAndSurrender || parsedJson.confession || "Lord, I surrender my anxiety, weariness, and limitations into Your loving hands.",
          thanksgiving: parsedJson.thanksgiving || "Thank You, Lord, for Your unfailing grace, mercy, and covenant promises.",
          scripturePromise: parsedJson.scripturePromise || parsedJson.scriptureAnchor || ref,
          petition: parsedJson.petition || `Lord, I lift up ${currentSubject} before Your throne of grace.`,
          spiritualWarfare: parsedJson.spiritualWarfare || parsedJson.warfareDeclaration || "In the Name of Jesus Christ, every opposing work of darkness and limitation is broken.",
          declarationInJesusName: parsedJson.declarationInJesusName || parsedJson.closing || "In the mighty, victorious Name of Jesus Christ, Amen."
        };
      }
      if (!parsedJson.prayer && parsedJson.sections) {
        parsedJson.prayer = { ...parsedJson };
      }
    }

    res.write(`data: ${JSON.stringify({
      done: true,
      fullText: streamAccumulator,
      data: parsedJson || { text: streamAccumulator },
      modelUsed
    })}\n\n`);
    res.write("data: [DONE]\n\n");
    res.end();
    return;
  }

  // --- STANDARD JSON HANDLER ---
  try {
    let result: any = null;
    let modelUsed = candidateModels[0];
    let lastError: any = null;

    for (const modName of candidateModels) {
      try {
        const model = genAI.getGenerativeModel({
          model: modName,
          systemInstruction: fullSystemInstruction,
          safetySettings,
          generationConfig: {
            temperature: 0.8,
            topP: 0.95,
            maxOutputTokens: 3500,
            ...(responseMimeType ? { responseMimeType } : {})
          },
        });
        result = await model.generateContent(userPrompt);
        modelUsed = modName;
        break;
      } catch (modErr: any) {
        lastError = modErr;
        const msg = String(modErr?.message || "");
        console.warn(`[GEMINI VERCEL] Model ${modName} error: ${msg}. Trying next...`);
      }
    }

    if (!result) {
      throw lastError || new Error("All candidate Gemini models failed to generate content.");
    }

    let text = "";
    try {
      text = result.response.text();
    } catch (textErr: any) {
      console.error("[GEMINI VERCEL ERROR] result.response.text() error:", textErr?.message);
    }

    if (!text || text.trim().length === 0) {
      const candidate = result.response?.candidates?.[0];
      const finishReason = candidate?.finishReason;
      console.error("[GEMINI VERCEL EMPTY TEXT] finishReason:", finishReason);

      res.statusCode = 500;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        error: `Generation returned empty text (finishReason: ${finishReason || "UNKNOWN"})`,
        text: ""
      }));
      return;
    }

    let parsedJson = extractJson(text);
    if (parsedJson && typeof parsedJson === "object") {
      if (!parsedJson.sections && (parsedJson.petition || parsedJson.adoration || parsedJson.spiritualWarfare)) {
        parsedJson.sections = {
          adoration: parsedJson.adoration || "Almighty God, Heavenly Father, You are holy and faithful in all Your ways.",
          confessionAndSurrender: parsedJson.confessionAndSurrender || parsedJson.confession || "Lord, I surrender my anxiety, weariness, and limitations into Your loving hands.",
          thanksgiving: parsedJson.thanksgiving || "Thank You, Lord, for Your unfailing grace, mercy, and covenant promises.",
          scripturePromise: parsedJson.scripturePromise || parsedJson.scriptureAnchor || ref,
          petition: parsedJson.petition || `Lord, I lift up ${currentSubject} before Your throne of grace.`,
          spiritualWarfare: parsedJson.spiritualWarfare || parsedJson.warfareDeclaration || "In the Name of Jesus Christ, every opposing work of darkness and limitation is broken.",
          declarationInJesusName: parsedJson.declarationInJesusName || parsedJson.closing || "In the mighty, victorious Name of Jesus Christ, Amen."
        };
      }
      if (!parsedJson.prayer && parsedJson.sections) {
        parsedJson.prayer = { ...parsedJson };
      }
    }

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: true,
      text: text || "",
      raw: result.response,
      data: parsedJson || { text },
      modelUsed
    }));
  } catch (err: any) {
    const rawMsg = err?.message || String(err);
    console.error("[GEMINI VERCEL HANDLER ERROR]:", rawMsg);

    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: `Gemini API call failed: ${rawMsg}`,
      details: rawMsg
    }));
  }
}
