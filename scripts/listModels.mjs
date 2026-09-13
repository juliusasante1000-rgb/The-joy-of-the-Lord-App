import dotenv from "dotenv";
dotenv.config();

const rawKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
const apiKey = rawKey ? rawKey.replace(/^["']|["']$/g, "").trim() : "";

if (!apiKey) {
  console.error("❌ ERROR: No GEMINI_API_KEY or GOOGLE_API_KEY found in environment or .env file.");
  console.error("Please add GEMINI_API_KEY=AIzaSy... to your .env file or environment variables.\n");
  process.exit(1);
}

console.log("🔍 Checking active Gemini models for API key (" + apiKey.slice(0, 6) + "..." + apiKey.slice(-4) + ")...\n");

async function listGeminiModels() {
  const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      console.error(`❌ HTTP Error ${response.status} (${response.statusText}):`);
      console.error(JSON.stringify(data, null, 2));
      if (response.status === 404) {
        console.error("\n⚠️ Caught 404 Not Found error on models endpoint. Verify your API key has Generative Language API enabled.");
      }
      process.exit(1);
    }

    if (!data.models || !Array.isArray(data.models)) {
      console.warn("⚠️ No models array returned. Response payload:", data);
      return;
    }

    console.log(`✅ Successfully retrieved ${data.models.length} active models from Gemini API:\n`);
    
    // Group models by generation capability
    const textGenModels = data.models.filter((m) =>
      m.supportedGenerationMethods?.includes("generateContent")
    );

    console.log("--- Content Generation Models (for generateContent) ---");
    textGenModels.forEach((m) => {
      const cleanName = m.name.replace(/^models\//, "");
      const isFlash = cleanName.includes("flash");
      const isPro = cleanName.includes("pro");
      const badge = isFlash ? "⚡ FLASH" : isPro ? "🧠 PRO" : "🤖 OTHER";
      console.log(`  • ${cleanName.padEnd(38)} [${badge}] - ${m.displayName || m.name}`);
    });

    console.log("\n--- Recommended Dynamic Aliases to Prevent 404 Errors ---");
    const candidates = [
      "gemini-3.5-flash",
      "gemini-flash-latest",
      "gemini-2.5-flash",
      "gemini-2.0-flash",
      "gemini-flash-lite-latest"
    ];
    candidates.forEach((cand) => {
      const match = data.models.find((m) => m.name === `models/${cand}` || m.name === cand);
      if (match) {
        console.log(`  ✓ ${cand} is active and ready to use.`);
      } else {
        console.log(`  ○ ${cand} (alias / cascading candidate)`);
      }
    });

    console.log("\nDiagnostic complete.\n");
  } catch (err) {
    console.error("❌ Network or Execution Error while fetching models:", err.message);
  }
}

listGeminiModels();
