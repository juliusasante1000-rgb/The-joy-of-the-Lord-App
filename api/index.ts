import dotenv from "dotenv";
dotenv.config();

import app from "../server";
import type { IncomingMessage, ServerResponse } from "http";

export default async function handler(req: IncomingMessage, res: ServerResponse): Promise<void> {
  // Normalize and preserve request URL for Vercel rewrites (e.g. /api/(.*) -> /api?path=$1)
  const headers = req.headers || {};
  const originalUrl = (headers["x-original-url"] as string) || (headers["x-forwarded-uri"] as string);
  const matchedPath = headers["x-matched-path"] as string;

  const rawUrl = req.url || "";
  const queryPart = rawUrl.includes("?") ? rawUrl.split("?")[1] : "";
  const params = new URLSearchParams(queryPart);
  const subRoute = params.get("path") || params.get("0");

  if (subRoute) {
    const cleanRoute = subRoute.replace(/^\//, "");
    const remainingQuery = Array.from(params.entries())
      .filter(([k]) => k !== "path" && k !== "0")
      .map(([k, v]) => `${k}=${encodeURIComponent(v)}`)
      .join("&");
    req.url = `/api/${cleanRoute}${remainingQuery ? `?${remainingQuery}` : ""}`;
  } else if (originalUrl && originalUrl.startsWith("/api/") && !originalUrl.startsWith("/api/index")) {
    req.url = originalUrl;
  } else if (matchedPath && matchedPath.startsWith("/api/") && !matchedPath.startsWith("/api/index")) {
    req.url = matchedPath;
  }

  // Handle request body in Vercel Serverless environment
  if ((req as any).body) {
    if (typeof (req as any).body === "string") {
      try {
        (req as any).body = JSON.parse((req as any).body);
      } catch {}
    } else if (Buffer.isBuffer((req as any).body)) {
      try {
        (req as any).body = JSON.parse((req as any).body.toString("utf-8"));
      } catch {}
    }
  } else if (!req.readableEnded && !(req as any)._readableState?.ended && req.method !== "GET" && req.method !== "HEAD") {
    try {
      const chunks: Buffer[] = [];
      for await (const chunk of req) {
        chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
      }
      if (chunks.length > 0) {
        const raw = Buffer.concat(chunks).toString("utf-8");
        try {
          (req as any).body = JSON.parse(raw);
        } catch {
          (req as any).body = raw;
        }
      }
    } catch {}
  }

  return new Promise<void>((resolve, reject) => {
    res.on("finish", () => resolve());
    res.on("close", () => resolve());
    res.on("error", (err) => reject(err));

    try {
      (app as any)(req, res, (err: any) => {
        if (err) reject(err);
        else resolve();
      });
    } catch (dispatchErr) {
      reject(dispatchErr);
    }
  });
}


