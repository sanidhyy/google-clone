import React, { createContext, useContext, useState } from "react";

const ResultContext = createContext();

const BASE_URL = "https://real-time-serp-data.p.rapidapi.com";
const RAPID_API_HOST = "real-time-serp-data.p.rapidapi.com";
const RESULT_LIMIT = 20;

const ENDPOINTS = {
  search: "/web/search-light",
  images: "/images/search",
  news: "/news/search",
  videos: "/videos/search",
};

const matchYoutubeUrl = (url) => {
  const pattern =
    /^(?:https?:\/\/)?(?:m\.|www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return Boolean(url?.match(pattern));
};

const buildUrl = (tab, searchTerm) => {
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

const normalizeSearch = (payload) => {
  const items = Array.isArray(payload)
    ? payload
    : payload?.organic_results ?? [];

  return items
    .filter((item) => item?.title && item?.url)
    .map((item) => ({ title: item.title, link: item.url }));
};

const normalizeImages = (payload) => {
  const items = Array.isArray(payload) ? payload : payload?.images ?? [];

  return items
    .filter((item) => item?.url)
    .map((item) => ({
      image: { src: item.url },
      link: {
        href: item.source_url || item.url,
        title: item.title || "",
      },
    }));
};

const normalizeNews = (payload) => {
  const items = Array.isArray(payload) ? payload : payload?.news ?? [];

  return items
    .filter((item) => item?.title && item?.link)
    .map((item) => ({
      title: item.title,
      links: [{ href: item.link }],
      source: { href: item.source_url || item.link },
    }));
};

const normalizeVideos = (payload) => {
  const items = Array.isArray(payload) ? payload : payload?.videos ?? [];

  return items
    .filter((item) => matchYoutubeUrl(item?.link))
    .map((item) => ({ title: item.title, link: item.link }));
};

const normalizeResults = (tab, payload) => {
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

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Github");

  const getResults = async (tab, term) => {
    if (!ENDPOINTS[tab] || !term) return;

    setIsLoading(true);

    try {
      const response = await fetch(buildUrl(tab, term), {
        method: "GET",
        headers: {
          "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
          "X-RapidAPI-Host": RAPID_API_HOST,
        },
      });

      const body = await response.json();

      if (!response.ok || body.status === "ERROR") {
        setResults([]);
        return;
      }

      setResults(normalizeResults(tab, body.data ?? body).slice(0, RESULT_LIMIT));
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
