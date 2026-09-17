import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";

import {
  isSearchTab,
  type NormalizedResult,
  type SearchTab,
} from "../types";

type ResultContextValue = {
  getResults: (tab: SearchTab, term: string) => Promise<void>;
  results: NormalizedResult[];
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  isLoading: boolean;
};

type SearchResponse = {
  results?: NormalizedResult[];
};

const ResultContext = createContext<ResultContextValue | undefined>(undefined);

export const ResultContextProvider = ({ children }: { children: ReactNode }) => {
  const [results, setResults] = useState<NormalizedResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("Github");

  const getResults = useCallback(async (tab: SearchTab, term: string) => {
    if (!isSearchTab(tab) || !term) return;

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/search?tab=${encodeURIComponent(tab)}&q=${encodeURIComponent(term)}`,
      );
      const body = (await response.json()) as SearchResponse;

      if (!response.ok || !Array.isArray(body.results)) {
        setResults([]);
        return;
      }

      setResults(body.results);
    } catch {
      setResults([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <ResultContext.Provider
      value={{ getResults, results, searchTerm, setSearchTerm, isLoading }}
    >
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => {
  const context = useContext(ResultContext);

  if (!context) {
    throw new Error(
      "useResultContext must be used within a ResultContextProvider",
    );
  }

  return context;
};
