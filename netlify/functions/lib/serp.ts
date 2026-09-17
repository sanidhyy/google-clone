import type {
  ImageResult,
  NewsResult,
  NormalizedResult,
  SearchResult,
  SearchTab,
  VideoResult,
} from "../../../src/types";

const BASE_URL = "https://real-time-serp-data.p.rapidapi.com";
const RAPID_API_HOST = "real-time-serp-data.p.rapidapi.com";
const RESULT_LIMIT = 20;

const ENDPOINTS: Record<SearchTab, string> = {
  search: "/web/search-light",
  images: "/images/search",
  news: "/news/search",
  videos: "/videos/search",
};

type RapidApiItem = {
  title?: string;
  url?: string;
  source_url?: string;
  link?: string;
};

type RapidApiBody = {
  status?: string;
  data?: unknown;
};

const matchYoutubeUrl = (url: string | undefined) => {
  const pattern =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return Boolean(url?.match(pattern));
};

const getItems = (payload: unknown, key: string): RapidApiItem[] => {
  if (Array.isArray(payload)) {
    return payload as RapidApiItem[];
  }

  if (payload && typeof payload === "object" && key in payload) {
    const value = (payload as Record<string, unknown>)[key];
    return Array.isArray(value) ? (value as RapidApiItem[]) : [];
  }

  return [];
};

const buildUrl = (tab: SearchTab, searchTerm: string) => {
  const params = new URLSearchParams({
    gl: "us",
    hl: "en",
  });

  if (tab === "search") {
    params.set("q", searchTerm);
    params.set("limit", String(RESULT_LIMIT));
  } else {
    params.set("query", searchTerm);
  }

  return `${BASE_URL}${ENDPOINTS[tab]}?${params.toString()}`;
};

const normalizeSearch = (payload: unknown): SearchResult[] =>
  getItems(payload, "organic_results")
    .filter((item): item is RapidApiItem & { title: string; url: string } =>
      Boolean(item.title && item.url),
    )
    .map((item) => ({ title: item.title, link: item.url }));

const normalizeImages = (payload: unknown): ImageResult[] =>
  getItems(payload, "images")
    .filter((item): item is RapidApiItem & { url: string } => Boolean(item.url))
    .map((item) => ({
      image: { src: item.url },
      link: {
        href: item.source_url || item.url,
        title: item.title || "",
      },
    }));

const normalizeNews = (payload: unknown): NewsResult[] =>
  getItems(payload, "news")
    .filter((item): item is RapidApiItem & { title: string; link: string } =>
      Boolean(item.title && item.link),
    )
    .map((item) => ({
      title: item.title,
      links: [{ href: item.link }],
      source: { href: item.source_url || item.link },
    }));

const normalizeVideos = (payload: unknown): VideoResult[] =>
  getItems(payload, "videos")
    .filter((item): item is RapidApiItem & { link: string } =>
      matchYoutubeUrl(item.link),
    )
    .map((item) => ({ title: item.title ?? "", link: item.link }));

const normalizeResults = (
  tab: SearchTab,
  payload: unknown,
): NormalizedResult[] => {
  switch (tab) {
    case "news":
      return normalizeNews(payload);
    case "images":
      return normalizeImages(payload);
    case "videos":
      return normalizeVideos(payload);
    default:
      return normalizeSearch(payload);
  }
};

export const fetchSerpResults = async (
  tab: SearchTab,
  term: string,
  apiKey: string,
): Promise<NormalizedResult[]> => {
  const response = await fetch(buildUrl(tab, term), {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": RAPID_API_HOST,
    },
  });

  const body = (await response.json()) as RapidApiBody;

  if (!response.ok || body.status === "ERROR") {
    throw new Error("Upstream search failed");
  }

  return normalizeResults(tab, body.data ?? body).slice(0, RESULT_LIMIT);
};
