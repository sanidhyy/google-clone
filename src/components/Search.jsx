import React, { useState } from "react";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Links } from "./Links";

// Search
export const Search = () => {
  const [search, setSearch] = useState("Github");
  const { setSearchTerm } = useResultContext();

  // handle search
  const handleSearch = () => {
    if (search.trim().length !== 0) {
      setSearchTerm(search);
    }
  };

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      {/* Search Input */}
      <input
        type="text"
        value={search}
        onKeyDown={(e) => {
          e?.key === "Enter" && handleSearch();
        }}
        placeholder="Seach Googl or type URL"
        onChange={(e) => setSearch(e.target.value)}
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 border rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
      />

      {/* Search Button */}
      <button
        type="button"
        className="absolute top-1.5 right-4 text-2xl text-gray-500"
        onClick={handleSearch}
      >
        🔎
      </button>

      {/* Links */}
      <Links />
    </div>
  );
};
