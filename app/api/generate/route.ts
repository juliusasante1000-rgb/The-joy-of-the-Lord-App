import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

export const runtime = "nodejs";
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

export async function POST(request: Request): Promise<Response> {
  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const apiKey = rawKey ? rawKey.replace(/^["']|["']$/g, "").trim() : "";

  if (!apiKey || apiKey.length === 0) {
    return Response.json(
      {
        error: "GEMINI_API_KEY missing in Vercel Environment Variables. Add it in Vercel Dashboard > Settings > Environment Variables"
      },
      { status: 500 }
    );
  }

  try {
    const body = await request.json().catch(() => ({}));
    const {
      prompt,
      systemInstruction,
      actionType,
      category,
      scriptureReference,
      scriptureText,
      version,
      topic,
      question
    } = body || {};

    let userPrompt = prompt;
    let responseMimeType: string | undefined = undefined;

    const act = String(actionType || "").trim().toLowerCase();
    const ref = scriptureReference || "Daily Scripture";
    const txt = scriptureText || "";
    const v = version || "KJV";
    const currentSubject = topic || body?.subject || body?.scriptureTheme || "Divine Strength, Peace & Victory";

    if (!userPrompt) {
      if (act.includes("prayer") && !act.includes("point")) {
        userPrompt = `You are a reverent, apostolic Christian pastoral leader and prayer general. Compose an anointed, deeply transformative Guided Prayer rooted directly in the living conjunction of the scripture and subject:
Current Subject: "${currentSubject}"
Theme Scripture: ${ref} (${v})
Scripture Text: "${txt}"

MANDATORY INSTRUCTIONS:
1. Address the subject "${currentSubject}" directly in living conjunction with theme scripture ${ref}.
2. Ground every petition in the exact truth of "${txt}".
3. Conclude with an authoritative apostolic warfare and victory decree.
${AI_OUTPUT_IMPROVEMENT_RULES}

Format your response as a valid JSON object matching this schema:
{
  "title": "Sacred Prayer of Faith: ${currentSubject}",
  "scriptureAnchor": "${ref} (${v}) - '${txt}'",
  "adoration": "Exalt God's supreme holiness, sovereignty, and divine faithfulness demonstrated in ${ref} regarding ${currentSubject}.",
  "confession": "Reverent surrender of human insufficiency, fear, and self-reliance into His covenant hands.",
  "thanksgiving": "Heartfelt thanksgiving for God's steadfast promises, the finished work of Christ, and His grace.",
  "petition": "Direct, heartfelt, and targeted petitions applying ${ref} directly to ${currentSubject}.",
  "warfareDeclaration": "Authoritative apostolic decrees breaking doubt, fear, delay, and enemy limitations in Jesus' Name.",
  "closing": "Triumphant seal and affirmation in Jesus' victorious Name. Amen."
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

    // Determine the full system prompt matching preview exactly
    const fullSystemInstruction = systemInstruction
      ? `${systemInstruction}\n${ANTI_LOOP_DIRECTIVE}`
      : getSystemPromptForCategory(category, actionType);

    // Explicitly lower HARM_CATEGORY thresholds to BLOCK_NONE so theological and scriptural text is not blocked
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

    const genAI = new GoogleGenerativeAI(apiKey);
    // Dynamic model aliases with automatic fallback handling to prevent 503/404 breaking changes
    const candidateModels = [
      "gemini-3.8-flash",
      "gemini-flash-latest",
      "gemini-3.1-flash-lite",
      "gemini-3.6-flash",
    ];
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
        console.warn(`[GEMINI VERCEL] Model alias ${modName} failed: ${msg}. Falling back to next candidate...`);
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

    // Handle empty: If text() is empty, log result.response.candidates[0].finishReason and safetyRatings
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

      return Response.json(
        {
          error: errorMsg,
          text: "",
          raw: result.response,
        },
        { status: 500 }
      );
    }

    const parsedJson = extractJson(text);

    return Response.json({
      success: true,
      text: text || "",
      raw: result.response,
      data: parsedJson || { text },
      modelUsed,
    });
  } catch (err: any) {
    const rawMsg = err?.message || String(err);
    console.error("[GEMINI VERCEL POST ERROR]:", rawMsg);

    return Response.json(
      {
        error: `Gemini API call failed: ${rawMsg}`,
        details: rawMsg,
      },
      { status: 500 }
    );
  }
}

export async function GET(): Promise<Response> {
  const hasKey = Boolean(process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY);
  return Response.json({
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
    geminiKeyConfigured: hasKey,
  });
}
