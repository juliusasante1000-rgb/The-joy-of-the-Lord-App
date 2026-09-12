/**
 * Master Specialized AI Prompts & Theological Architectures
 * Ensures that both primary server routes and any client fallbacks receive
 * 100% identical, non-truncated apostolic instructions, mathematical models,
 * Greek/Hebrew lexical guidelines, schemas, and anti-loop rules.
 */

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

/**
 * Builds the complete, specialized prompt and configuration for any AI action.
 * Guarantees that neither server nor client fallback ever strips down the prompt.
 */
export function buildComprehensiveAiRequest(payload: any): {
  prompt: string;
  systemInstruction: string;
  responseMimeType?: string;
} {
  const actionType = String(payload?.actionType || "").trim();
  const act = actionType.toLowerCase();
  const category = payload?.category || "";
  const need = payload?.need || payload?.focusNeed || "";
  const topic = payload?.topic || "";
  const scriptureReference = payload?.scriptureReference || payload?.biblicalReference || "";
  const scriptureText = payload?.scriptureText || "";
  const version = payload?.version || "KJV";
  const userPrompt = payload?.prompt || payload?.question || "";

  let finalPrompt = userPrompt;
  let responseMimeType: string | undefined = undefined;

  // 1. Joy of the Lord Overcoming Guide
  if (payload?.specificChallenge || act === "joy_battle" || act === "joy overcoming" || act === "the joy of the lord" || act === "joy") {
    const challenge = payload?.specificChallenge || need || topic || "Overcoming sudden distress and finding supernatural peace";
    const joyCat = category || "Anxiety & Fear";
    const ref = scriptureReference || "Nehemiah 8:10";
    const txt = scriptureText || "The joy of the LORD is your strength.";

    finalPrompt = `Generate a comprehensive Joy of the Lord Overcoming Guide for a believer battling:
Category: ${joyCat}
Challenge: ${challenge}
Scripture Anchor: ${ref} (${version})
VERBATIM AUTHENTIC SCRIPTURE: "${txt}"

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: id, challengeTitle, category, rootDeception, scripturalTruth, anchorVerses (array of {reference, text, version}), joyStrategySteps, fortressDeclaration, deliverancePrayer.`;
    responseMimeType = "application/json";
  }
  // 2. Rhema Prophetic Now-Word
  else if (payload?.seasonCategory || act === "rhema" || act === "rhema_word" || act === "rhema prophetic word") {
    const season = payload?.seasonCategory || category || "Breakthrough";
    const focus = payload?.focusNeed || need || "Spiritual open doors and clarity";
    const ref = scriptureReference || "Revelation 3:8";
    const txt = scriptureText || "I have set before thee an open door...";

    finalPrompt = `Generate an anointed, living prophetic Rhema Word for a Christian believer.
Season Category: ${season}
Focus Need / Desire: ${focus}
Scripture Anchor: ${ref} (${version})
VERBATIM AUTHENTIC SCRIPTURE: "${txt}"

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: id, title, seasonCategory, propheticDeclaration, nowWordText, scriptureAnchor { reference, text }, actionCommandment, propheticDecree, dailyActivationGuide, spiritualAtmosphere.`;
    responseMimeType = "application/json";
  }
  // 3. ApostleMath
  else if (payload?.mathBranch || act === "apostlemath" || (act.includes("apostle") && act.includes("math"))) {
    const mb = payload?.mathBranch || "Trigonometry & Vectors";
    const sc = payload?.spiritualConcept || topic || "Directional Alignment and Holy Spirit Bearing";
    const ref = scriptureReference || "Proverbs 3:5-6";
    const txt = scriptureText || "Trust in the LORD with all thine heart...";

    finalPrompt = `Generate a profound ApostleMath lesson by Apostle Bismark Twum.
Math Branch: ${mb}
Spiritual Concept: ${sc}
Scripture Anchor: ${ref} (${version})
VERBATIM AUTHENTIC SCRIPTURE: "${txt}"

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: id, title, subtitle, mathBranch, mathPrinciple, mathFormula, mathIllustration, lifeConnection, biblicalTruth, keyScripture { reference, text }, mathemaSermon, practicalApplication, prayer, tags, readTimeMinutes.`;
    responseMimeType = "application/json";
  }
  // 4. MathemaSermon
  else if (act === "mathemasermon" || act.includes("mathemasermon")) {
    const ref = scriptureReference || "Romans 8:28";
    const txt = scriptureText || "And we know that all things work together for good...";
    const subj = payload?.subject || topic || "Mathematical Superposition of Providence";

    finalPrompt = `Compose a comprehensive, scholarly, and spiritually electrifying MathemaSermon based on:
Scripture: ${ref} (${version})
Scripture Text: "${txt}"
Subject: ${subj}

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: id, title, subtitle, mathematicalConcept, formula, conceptualAnalogy, theologicalExposition, lifeTransformation, altarCallPrayer, tags.`;
    responseMimeType = "application/json";
  }
  // 5. Prayer (Sacred Covenant Prayer)
  else if (act === "prayer" || act === "create prayer" || act === "prayer_points" || act.includes("prayer")) {
    const ref = scriptureReference || "Psalm 46:1";
    const txt = scriptureText || "God is our refuge and strength...";
    const subj = payload?.subject || need || topic || "Supernatural Peace & Deliverance";

    finalPrompt = `Compose a comprehensive, high-impact, scripturally saturated Christian prayer for:
Scripture: ${ref} (${version})
Scripture Text: "${txt}"
Subject / Focus: ${subj}

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: title, subtitle, category, theme, sections { adoration, confessionAndSurrender, thanksgiving, scripturePromise, petition, spiritualWarfare, declarationInJesusName }.`;
    responseMimeType = "application/json";
  }
  // 6. Daily Devotional
  else if (act === "devotion" || act === "daily devotion" || act === "sanctuary_devotion" || topic || act.includes("devotion")) {
    const ref = scriptureReference || "Psalm 119:105";
    const txt = scriptureText || "Thy word is a lamp unto my feet, and a light unto my path.";
    const theme = topic || payload?.scriptureTheme || payload?.subject || "Illuminated Path in Dark Valleys";

    finalPrompt = `Generate a rich, deeply revelatory Christian daily devotion on:
Scripture Anchor: ${ref} (${version})
Scripture Text: "${txt}"
Theme: ${theme}

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: devotion { title, keyScripture, passageText, historicalContext, theologicalReflection, practicalApplication, guidedPrayer, actionStep, apostolicDecree, hopeEncouragementConclusion }.`;
    responseMimeType = "application/json";
  }
  // 7. Doctrine / Theological Inquiry
  else if (act === "doctrine" || act === "ask_doctrine" || payload?.question) {
    const q = payload?.question || userPrompt;
    finalPrompt = `Topic Category: ${category || "Christian Theology & Orthodoxy"}
User Question: ${q}

Deliver an in-depth, rigorous, and deeply inspiring theological exposition with exceptional biblical scholarship and apostolic power:
1. **Scriptural Exegesis & Cross-References**: Cite exact Scripture passages across Old and New Testaments.
2. **Original Language Nuance**: Analyze relevant Hebrew or Greek root terms.
3. **Covenantal & Creedal Context**: Ground the response in historic orthodox theology.
4. **Practical Life Transformation**: Concrete, actionable guidance for living out this truth.
5. **Apostolic Warfare & Faith Decree**: Conclude with a bold scriptural faith declaration.

${AI_OUTPUT_IMPROVEMENT_RULES}
Format as JSON with keys: answer, scriptures, keyTakeaway.`;
    responseMimeType = "application/json";
  }

  const systemInstruction = payload?.systemInstruction || getSystemPromptForCategory(category, actionType);

  return {
    prompt: finalPrompt,
    systemInstruction,
    responseMimeType
  };
}
