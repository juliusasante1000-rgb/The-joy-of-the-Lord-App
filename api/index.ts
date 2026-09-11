import dotenv from "dotenv";
dotenv.config();

import app from "../server";
import type { IncomingMessage, ServerResponse } from "http";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  // In Vercel serverless environment with rewrites (e.g. /api/(.*) -> /api?path=$1):
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

  return (app as any)(req, res);
}

