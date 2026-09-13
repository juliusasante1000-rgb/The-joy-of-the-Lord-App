import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";
import { GoogleGenAI } from "@google/genai";
import type { IncomingMessage, ServerResponse } from "http";

export const maxDuration = 30;

const GEMINI_MODELS = [
  "gemini-2.5-flash",
  "gemini-1.5-flash",
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest"
];

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

export default async function handler(req: any, res: any): Promise<void> {
  // Enable CORS
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
      geminiKeyConfigured: hasKey
    }));
    return;
  }

  // Check API Key
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!apiKey || typeof apiKey !== "string" || apiKey.trim().length === 0) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "GEMINI_API_KEY missing in Vercel Environment Variables. Add it in Vercel Dashboard > Settings > Environment Variables"
    }));
    return;
  }

  // Parse Body
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
    scriptureReference,
    scriptureText,
    topic,
    question
  } = body || {};

  let userPrompt = prompt;
  if (!userPrompt) {
    if (actionType && scriptureReference) {
      userPrompt = `Perform ${actionType} on scripture ${scriptureReference}: "${scriptureText || ""}".`;
    } else if (topic) {
      userPrompt = `Compose an inspiring Christian devotion on topic: "${topic}".`;
    } else if (question) {
      userPrompt = `Answer this question biblically: "${question}".`;
    } else {
      userPrompt = "Provide an inspiring Christian reflection and prayer on the Joy of the Lord.";
    }
  }

  const sysPrompt = systemInstruction || "You are an apostolic Christian theologian and pastoral teacher. Provide biblically grounded, deep, inspiring, and hope-filled commentary.";

  let generatedText = "";
  let modelUsed = "";
  let lastError: any = null;

  // Try @google/genai SDK first
  try {
    const ai = new GoogleGenAI({ apiKey: apiKey.trim() });
    for (const model of GEMINI_MODELS) {
      try {
        const result = await ai.models.generateContent({
          model,
          contents: userPrompt,
          config: {
            systemInstruction: sysPrompt,
            temperature: 0.8
          }
        });
        if (result?.text) {
          generatedText = result.text;
          modelUsed = model;
          break;
        }
      } catch (mErr: any) {
        lastError = mErr;
      }
    }
  } catch (genAiErr) {
    lastError = genAiErr;
  }

  // Fallback to @google/generative-ai SDK
  if (!generatedText) {
    try {
      const genAI = new GoogleGenerativeAI(apiKey.trim());
      for (const model of GEMINI_MODELS) {
        try {
          const modelInstance = genAI.getGenerativeModel({
            model,
            systemInstruction: sysPrompt
          });
          const res = await modelInstance.generateContent(userPrompt);
          const resText = res.response.text();
          if (resText) {
            generatedText = resText;
            modelUsed = model;
            break;
          }
        } catch (mErr: any) {
          lastError = mErr;
        }
      }
    } catch (genErr) {
      lastError = genErr;
    }
  }

  if (!generatedText) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: `Gemini API call failed: ${lastError?.message || "Failed to generate content"}`,
      details: lastError?.message
    }));
    return;
  }

  const parsed = extractJson(generatedText);

  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    success: true,
    text: generatedText,
    response: generatedText,
    data: parsed || { text: generatedText },
    modelUsed
  }));
}
