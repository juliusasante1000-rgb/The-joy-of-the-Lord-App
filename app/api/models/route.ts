export const runtime = "nodejs";

export async function GET(request: Request): Promise<Response> {
  const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  const apiKey = rawKey ? rawKey.replace(/^["']|["']$/g, "").trim() : "";

  const recommendedCascade = [
    "gemini-3.6-flash",
    "gemini-3.5-flash-lite",
    "gemini-flash-lite-latest",
    "gemini-3.1-flash-lite",
    "gemini-3.8-flash",
    "gemini-flash-latest",
  ];

  if (!apiKey) {
    return Response.json(
      {
        error: "GEMINI_API_KEY is not configured in Vercel Environment Variables.",
        recommendedCascade,
        models: [],
      },
      { status: 500 }
    );
  }

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    const data: any = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error: `Gemini API returned status ${response.status}: ${response.statusText}`,
          details: data,
          recommendedCascade,
        },
        { status: response.status }
      );
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

    return Response.json({
      success: true,
      totalModels: allModels.length,
      primaryModel: "gemini-3.6-flash",
      recommendedCascade,
      models: contentGenerationModels,
    });
  } catch (err: any) {
    return Response.json(
      {
        error: `Failed to list Gemini models: ${err.message}`,
        recommendedCascade,
      },
      { status: 500 }
    );
  }
}
