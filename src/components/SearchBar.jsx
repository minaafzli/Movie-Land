import { useState } from "react";
import search_icon from "../image/Search_icon.svg";
import SearchDropdown from "./SearchDropdown";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch(
        `https://www.omdbapi.com/?s=${value}&apikey=c8bca4f7`
      );
      const data = await res.json();
      setResults(data.Search || []);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-100 mx-auto mt-10 text-accent z-[9999]">
      <div className="flex items-center relative">
        <input
          type="text"
          className="bg-bgGray placeholder-muted text-accent mx-4 p-4 rounded-2xl w-full border-border focus:outline-none focus:ring-2 focus:ring-accent"
          placeholder="Search movie..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
        <img
          src={search_icon}
          className="absolute right-6 cursor-pointer"
          alt="search"
        />
      </div>

      {query && (
        <div
          className="
            absolute left-0 right-0 top-10
             shadow-2xl rounded-2xl p-4 
            z-[9999]
            h-100  
            overflow-y-auto 
            scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent
          "
        >
          <SearchDropdown results={results} loading={loading} />
        </div>
      )}
    </div>
  );
}
