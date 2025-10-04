import { useState, useRef } from "react";
import search_icon from "../image/search_icon.svg";
import SearchDropdown from "./SearchDropdown";
import useClickOutside from "../hooks/useClickOutside";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  // 
  const [filters, setFilters] = useState({
    type: "all", // all, movie, series, episode
    yearFrom: "",
    yearTo: "",
  });

  const filterRef = useRef(null);
  const filterButtonRef = useRef(null);

  useClickOutside(filterRef, () => setIsFilterOpen(false), filterButtonRef);

  const handleSearch = async (value, currentFilters = filters) => {
    setQuery(value);

    if (value.trim().length < 2) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      let url = `https://www.omdbapi.com/?s=${value}&apikey=c8bca4f7`;
      
      if (currentFilters.type !== "all") {
        url += `&type=${currentFilters.type}`;
      }
      
    
      const res = await fetch(url);
      const data = await res.json();
      
      let filteredResults = data.Search || [];
      
      if (currentFilters.yearFrom || currentFilters.yearTo) {
        filteredResults = filteredResults.filter((movie) => {
          const movieYear = parseInt(movie.Year);
          const fromYear = currentFilters.yearFrom ? parseInt(currentFilters.yearFrom) : 0;
          const toYear = currentFilters.yearTo ? parseInt(currentFilters.yearTo) : 9999;
          
          return movieYear >= fromYear && movieYear <= toYear;
        });
      }
      
      setResults(filteredResults);
    } catch (e) {
      console.error("Search error:", e);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    handleSearch(query, filters);
    setIsFilterOpen(false);
  };

  const resetFilters = () => {
    const defaultFilters = {
      type: "all",
      yearFrom: "",
      yearTo: "",
    };
    setFilters(defaultFilters);
    handleSearch(query, defaultFilters);
    setIsFilterOpen(false);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto mt-10 text-accent z-[25]">
      <div className="flex items-center gap-2">
        {/* Search Input */}
        <div className="flex items-center relative flex-1">
          <input
            type="text"
            className="bg-bgGray placeholder-muted text-accent p-4 rounded-2xl w-full border-border focus:outline-none focus:ring-2 focus:ring-accent"
            placeholder="Search movie..."
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <img
            src={search_icon}
            className="absolute right-4 cursor-pointer"
            alt="search"
          />
        </div>

        {/* Filter Button */}
        <button
          ref={filterButtonRef}
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className="bg-bgGray p-4 rounded-2xl hover:bg-primary/30 transition-colors relative"
          title="Filters"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
            />
          </svg>
          {(filters.type !== "all" || filters.yearFrom || filters.yearTo) && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full"></span>
          )}
        </button>
      </div>

      {/* Filter Dropdown */}
      {isFilterOpen && (
        <div
          ref={filterRef}
          className="absolute right-0 top-16 w-80 bg-bgGray border-2 border-primary rounded-xl shadow-lg p-4 z-50"
        >
          <h3 className="text-lg font-semibold mb-4">Filters</h3>

          {/* Type Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Type</label>
            <select
              value={filters.type}
              onChange={(e) =>
                setFilters({ ...filters, type: e.target.value })
              }
              className="w-full bg-secondary text-accent p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
            >
              <option value="all">All</option>
              <option value="movie">Movies</option>
              <option value="series">Series</option>
              <option value="episode">Episodes</option>
            </select>
          </div>

          {/* Year Range Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Year Range</label>
            <div className="flex gap-2 items-center">
              <input
                type="number"
                placeholder="From"
                value={filters.yearFrom}
                onChange={(e) =>
                  setFilters({ ...filters, yearFrom: e.target.value })
                }
                className="w-full bg-secondary text-accent p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                min="1900"
                max="2099"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="To"
                value={filters.yearTo}
                onChange={(e) =>
                  setFilters({ ...filters, yearTo: e.target.value })
                }
                className="w-full bg-secondary text-accent p-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-accent"
                min="1900"
                max="2099"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <button
              onClick={applyFilters}
              className="flex-1 bg-primary hover:bg-primary/80 text-white py-2 rounded-lg transition-colors"
            >
              Apply
            </button>
            <button
              onClick={resetFilters}
              className="flex-1 bg-secondary hover:bg-secondary/80 text-accent py-2 rounded-lg border border-border transition-colors"
            >
              Reset
            </button>
          </div>

          <p className="text-xs text-muted mt-3 text-center">
            Note: OMDB API has limited filtering capabilities. Genre filtering is not available.
          </p>
        </div>
      )}

      {/* Search Results Dropdown */}
      {query && (
        <div className="absolute left-0 h-100 right-0 top-20 rounded-2xl p-4 z-[30] max-h-96 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent">
          <SearchDropdown results={results} loading={loading} />
        </div>
      )}
    </div>
  );
}
