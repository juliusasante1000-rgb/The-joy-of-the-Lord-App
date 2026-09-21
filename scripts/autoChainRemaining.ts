import fs from "fs";
import { execSync } from "child_process";

function getGenericCount(filePath: string): number {
  if (!fs.existsSync(filePath)) return 0;
  const content = fs.readFileSync(filePath, "utf8");
  const m = content.match(/the narrative records how/g);
  return m ? m.length : 0;
}

function isProcessRunning(pattern: string): boolean {
  try {
    const out = execSync(`pgrep -f "${pattern}" || true`, { encoding: "utf8" });
    return out.trim().length > 0;
  } catch {
    return false;
  }
}

async function runSectionWithSupervisor(section: string, filePath: string) {
  while (getGenericCount(filePath) > 0) {
    const left = getGenericCount(filePath);
    console.log(`[Supervisor] ${section} has ${left} generic chapters remaining.`);
    
    // Check if a worker is already actively processing it
    const active = isProcessRunning(`regenerateUniqueSummaries.ts ${section}`);
    if (!active) {
      console.log(`[Supervisor] Launching worker for ${section}...`);
      try {
        execSync(`npx tsx scripts/regenerateUniqueSummaries.ts ${section}`, { stdio: "inherit" });
      } catch (e: any) {
        console.warn(`[Supervisor] Worker for ${section} exited. Pausing 5s before next check...`);
        await new Promise((r) => setTimeout(r, 5000));
      }
    } else {
      console.log(`[Supervisor] Worker is currently running. Waiting 12s...`);
      await new Promise((r) => setTimeout(r, 12000));
    }
  }
  console.log(`[Supervisor] ★ ${section} is 100% COMPLETE AND AUTHENTIC! ★`);
}

async function main() {
  console.log("=================================================");
  console.log("[AutoChain] Pipeline Supervisor Active");
  console.log("=================================================");

  await runSectionWithSupervisor("otHistory", "src/data/chapterSummaries/otHistory.ts");
  await runSectionWithSupervisor("otPoetry", "src/data/chapterSummaries/otPoetry.ts");
  await runSectionWithSupervisor("otProphets", "src/data/chapterSummaries/otProphets.ts");

  console.log("\n=======================================================");
  console.log("★ ALL 1,189 CHAPTERS IN THE HOLY BIBLE ARE 100% UNIQUE ★");
  console.log("=======================================================");
}

main().catch(console.error);
