import type { Config } from "@netlify/functions";

import { isSearchTab, type NormalizedResult } from "../../src/types";
import { fetchSerpResults } from "./lib/serp";

export default async (req: Request) => {
  const url = new URL(req.url);
  const tab = url.searchParams.get("tab") ?? "";
  const query = url.searchParams.get("q")?.trim() ?? "";

  if (!isSearchTab(tab)) {
    return Response.json({ error: "Invalid tab" }, { status: 400 });
  }

  if (!query) {
    return Response.json({ error: "Missing query" }, { status: 400 });
  }

  const apiKey = process.env.RAPID_API_KEY;

  if (!apiKey) {
    return Response.json(
      { error: "Search is not configured" },
      { status: 500 },
    );
  }

  try {
    const results: NormalizedResult[] = await fetchSerpResults(
      tab,
      query,
      apiKey,
    );
    return Response.json({ results });
  } catch {
    return Response.json({ error: "Search failed" }, { status: 502 });
  }
};

export const config: Config = {
  method: "GET",
  path: "/api/search",
};
