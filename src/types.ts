export type SearchTab = "search" | "images" | "news" | "videos";

export type SearchResult = {
  title: string;
  link: string;
};

export type ImageResult = {
  image: { src: string };
  link: { href: string; title: string };
};

export type NewsResult = {
  title: string;
  links: { href: string }[];
  source: { href: string };
};

export type VideoResult = {
  title: string;
  link: string;
};

export type NormalizedResult =
  | SearchResult
  | ImageResult
  | NewsResult
  | VideoResult;

export const SEARCH_TABS: SearchTab[] = [
  "search",
  "images",
  "news",
  "videos",
];

export const isSearchTab = (value: string): value is SearchTab =>
  SEARCH_TABS.includes(value as SearchTab);

export const isSearchResult = (
  result: NormalizedResult,
): result is SearchResult =>
  "link" in result && typeof result.link === "string" && !("image" in result);

export const isImageResult = (
  result: NormalizedResult,
): result is ImageResult => "image" in result;

export const isNewsResult = (result: NormalizedResult): result is NewsResult =>
  "links" in result && "source" in result;

export const isVideoResult = (
  result: NormalizedResult,
): result is VideoResult => isSearchResult(result);
