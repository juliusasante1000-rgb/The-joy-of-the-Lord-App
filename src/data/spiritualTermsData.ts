/**
 * Canonical Knowledge Base: Spiritual Terms & Charismatic Gifts
 * Ensures precise, orthodox definitions for young believers and all Bible AI models.
 *
 * CRITICAL THEOLOGICAL RULE:
 * - Word of Knowledge = PAST / PRESENT facts revealed (hidden facts that exist now or in the past).
 * - Word of Wisdom = FUTURE plans / instructions revealed (what will happen or what God instructs to do).
 */

export interface SpiritualTerm {
  term: string;
  definition: string;
  example: string;
  reference: string;
  modernExample: string;
  difference: string;
  category?: "Revelation Gifts" | "Power Gifts" | "Utterance Gifts" | "General Pneumatology";
}

export const SPIRITUAL_TERMS_COLLECTION: SpiritualTerm[] = [
  {
    term: "Word of Knowledge",
    definition: "A supernatural revelation by the Holy Spirit of facts that exist NOW or in the PAST that you could not know naturally. Past or present hidden facts.",
    example: "Jesus telling the Samaritan woman about her 5 husbands (John 4:17-18) and telling Nathanael 'I saw you under the fig tree' (John 1:48).",
    reference: "1 Cor 12:8",
    modernExample: "During prayer or ministry, you suddenly know someone had an accident 3 years ago or is currently dealing with a secret family problem without them telling you.",
    difference: "Word of Knowledge reveals PAST or PRESENT secret facts. Word of Wisdom reveals FUTURE plans, events, or divine instructions on what to DO.",
    category: "Revelation Gifts"
  },
  {
    term: "Word of Wisdom",
    definition: "A supernatural revelation by the Holy Spirit of God's plan, purpose, or instruction about the FUTURE. What to do next, or what will happen.",
    example: "Agabus warning Paul about future imprisonment (Acts 21:10-11) or Joseph's wisdom to store grain for the future famine (Genesis 41:33-36).",
    reference: "1 Cor 12:8",
    modernExample: "The Holy Spirit warns you before a journey saying 'Don't travel tomorrow' or gives you clear divine instructions on steps to take to avoid a coming trial.",
    difference: "Word of Wisdom tells you what WILL happen or what to DO next. Word of Knowledge reveals what happened in the PAST or what is secretly happening in the PRESENT.",
    category: "Revelation Gifts"
  },
  {
    term: "Prophecy",
    definition: "A supernatural utterance in a known tongue inspired by the Holy Spirit to bring edification, exhortation, and comfort to believers.",
    example: "Agabus prophesying of a great famine throughout the world (Acts 11:28), and Philip's daughters prophesying (Acts 21:9).",
    reference: "1 Cor 12:10; 1 Cor 14:3",
    modernExample: "During a fellowship meeting, a believer is prompted by the Spirit to speak an inspiring scripture message that deeply revives the congregation's faith.",
    difference: "Simple prophecy is for edification, exhortation, and comfort (1 Cor 14:3), distinct from predictive office prophecy or private guidance.",
    category: "Utterance Gifts"
  },
  {
    term: "Discerning of Spirits",
    definition: "A supernatural insight by the Holy Spirit to perceive the true spiritual origin behind a manifestation—whether it is from the Holy Spirit, an evil spirit, or human nature.",
    example: "Paul perceiving that the damsel in Philippi had a spirit of divination rather than holy power (Acts 16:16-18).",
    reference: "1 Cor 12:10",
    modernExample: "Instantly perceiving in your spirit that a visitor bringing a flattering religious proposal is actually motivated by a spirit of deception.",
    difference: "Discerning of spirits is not natural psychological suspicion, paranoia, or fault-finding; it is divine revelation into the spirit realm.",
    category: "Revelation Gifts"
  },
  {
    term: "Gift of Faith",
    definition: "A supernatural surge of holy certainty imparted by the Holy Spirit to believe God for the extraordinary and receive a miraculous breakthrough without doubt.",
    example: "Elijah standing alone on Mount Carmel declaring fire from heaven (1 Kings 18:36-38) or Daniel in the lions' den (Daniel 6:22-23).",
    reference: "1 Cor 12:9",
    modernExample: "During a life-threatening crisis, a sudden unshakable peace and conviction falls upon you that God has already solved the problem.",
    difference: "Distinct from general saving faith or everyday trust; this is a temporary sovereign empowerment to receive or command a miracle.",
    category: "Power Gifts"
  },
  {
    term: "Gifts of Healing",
    definition: "Supernatural operations of the Holy Spirit that restore health to the diseased body without human medical agency.",
    example: "Peter and John healing the lame man at the Beautiful Gate in the Name of Jesus (Acts 3:6-8).",
    reference: "1 Cor 12:9",
    modernExample: "Laying hands on a medically confirmed chronic illness in Jesus' Name and the patient is completely and instantaneously healed.",
    difference: "Plural 'gifts' denoting varied manifestations for different types of sicknesses and infirmities.",
    category: "Power Gifts"
  },
  {
    term: "Working of Miracles",
    definition: "A supernatural intervention of divine power that overrides, alters, or suspends the ordinary laws of nature.",
    example: "Moses parting the Red Sea (Exodus 14:21) or Jesus turning water into wine (John 2:7-11) and multiplying loaves (John 6:11).",
    reference: "1 Cor 12:10",
    modernExample: "Supernatural multiplication of emergency food or instant restoration of an amputated bone under apostolic prayer.",
    difference: "While healing cures an ailment over time or in the body, working of miracles creates new matter or overrides physical natural laws.",
    category: "Power Gifts"
  },
  {
    term: "Diverse Kinds of Tongues",
    definition: "Supernatural utterance by the Holy Spirit in languages never learned by the speaker, directed to God in prayer or as a public sign.",
    example: "The 120 disciples speaking in unlearned languages on the Day of Pentecost (Acts 2:4-11).",
    reference: "1 Cor 12:10; 1 Cor 14:2",
    modernExample: "A believer praying privately in the spirit during midnight intercession and speaking words that edify their inner man.",
    difference: "Distinct from natural foreign language learning; tongues is a spiritual gift for prayer or corporate ministry when interpreted.",
    category: "Utterance Gifts"
  },
  {
    term: "Interpretation of Tongues",
    definition: "Supernatural revelation by the Holy Spirit making known the meaning of an utterance spoken in diverse kinds of tongues.",
    example: "Corporate church gatherings in Corinth where tongues were translated for the assembly (1 Cor 14:27-28).",
    reference: "1 Cor 12:10; 1 Cor 14:13",
    modernExample: "After a public message in tongues in a prayer meeting, another believer is given the English meaning by the Spirit to encourage the church.",
    difference: "It is an interpretation, not a literal word-for-word translation, conveying the divine purpose and thought of the Spirit.",
    category: "Utterance Gifts"
  }
];

export const TECHNICAL_TERMS_SYSTEM_PROMPT = `You are a Bible explainer for young Christians.

When user asks about a technical term like "Word of Knowledge", "Word of Wisdom", "Prophecy", "Discernment":

1. Give simple definition in one sentence
2. Give biblical example with reference
3. Give modern example how it works today
4. Differentiate from similar terms

Keep it under 80 words, simple English, Ghana-friendly.

Do NOT confuse:
- Word of Knowledge = past/present facts revealed
- Word of Wisdom = future plans/instructions revealed

Example AI Response it will now give:
Word of Knowledge: This is when Holy Spirit tells you a secret fact about someone's past or present that you have no way of knowing. 
Bible example: Jesus told Nathanael "I saw you under the fig tree" (John 1:48) — present fact.
Today: During prayer, you suddenly know someone's sickness is from childhood without them telling you.
Difference: Word of Wisdom tells you what WILL happen or what to DO.`;

/**
 * Returns exact explanation if text or reference mentions a technical spiritual term
 */
export function getTechnicalTermExplanation(queryOrVerse: string): string | null {
  const q = (queryOrVerse || "").toLowerCase();
  
  if (q.includes("word of knowledge") || (q.includes("knowledge") && q.includes("1 cor 12:8"))) {
    return `Word of Knowledge: This is when the Holy Spirit tells you a secret fact about someone's past or present that you have no way of knowing naturally.
Bible example: Jesus told the Samaritan woman about her 5 husbands (John 4:17-18) and told Nathanael "I saw you under the fig tree" (John 1:48) — present fact.
Today: During prayer, you suddenly know someone's sickness or hardship is from childhood without them telling you.
Difference: Word of Wisdom tells you what WILL happen or what to DO about the future.`;
  }

  if (q.includes("word of wisdom") || (q.includes("wisdom") && q.includes("1 cor 12:8"))) {
    return `Word of Wisdom: This is when the Holy Spirit reveals God's plan, purpose, or instruction about the FUTURE — what to do next, or what will happen.
Bible example: Agabus warning Paul about future imprisonment (Acts 21:10-11) or Joseph's wisdom to store grain for future famine (Genesis 41:33-36).
Today: The Holy Spirit warns you before traveling saying "Do not travel tomorrow" or reveals divine instructions for a coming season.
Difference: Word of Knowledge reveals past or present secret facts; Word of Wisdom reveals future plans or instructions.`;
  }

  if (q.includes("discerning of spirits") || q.includes("discernment of spirits")) {
    return `Discerning of Spirits: Supernatural ability by the Holy Spirit to see or perceive whether a spiritual presence is from God, a demon, or human flesh.
Bible example: Paul recognized the slave girl in Philippi had a demon of divination, not the Holy Spirit (Acts 16:16-18).
Today: You instantly feel in your spirit that a smooth-talking person's message is false before anyone else notices.
Difference: It is not human suspicion or fault-finding; it is spiritual vision from God.`;
  }

  if (q.includes("prophecy") && !q.includes("prophet")) {
    return `Prophecy: A supernatural message spoken in a known language inspired by the Holy Spirit to strengthen people.
Bible example: Philip's four daughters prophesying to believers (Acts 21:8-9).
Today: Someone in church gives an inspired exhortation that directly comforts your grieving heart.
Difference: Simple prophecy is for edification, encouragement, and comfort (1 Cor 14:3), not judging people.`;
  }

  return null;
}
