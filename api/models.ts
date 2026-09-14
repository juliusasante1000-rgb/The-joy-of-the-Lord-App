import dotenv from "dotenv";
dotenv.config();

export default async function handler(req: any, res: any): Promise<void> {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization, x-gemini-api-key");
  res.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const recommendedCascade = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash",
    "gemini-flash-latest",
  ];

  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const apiKey = rawKey ? rawKey.replace(/^["']|["']$/g, "").trim() : "";

  if (!apiKey) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: "GEMINI_API_KEY is not configured in Vercel Environment Variables.",
      recommendedCascade,
      models: [],
    }));
    return;
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data: any = await response.json();

    if (!response.ok) {
      res.statusCode = response.status;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({
        error: `Gemini API returned status ${response.status}: ${response.statusText}`,
        details: data,
        recommendedCascade,
      }));
      return;
    }

    const allModels = data.models || [];
    const contentGenerationModels = allModels
      .filter((m: any) => m.supportedGenerationMethods?.includes("generateContent"))
      .map((m: any) => ({
        id: m.name.replace(/^models\//, ""),
        displayName: m.displayName || m.name,
        description: m.description,
        supportedMethods: m.supportedGenerationMethods,
      }));

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      success: true,
      totalModels: allModels.length,
      primaryModel: "gemini-3.6-flash",
      recommendedCascade,
      models: contentGenerationModels,
    }));
  } catch (err: any) {
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({
      error: `Failed to list Gemini models: ${err.message}`,
      recommendedCascade,
    }));
  }
}
