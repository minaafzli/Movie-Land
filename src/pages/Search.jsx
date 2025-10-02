import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import filter_icon from '../image/filter_icon.svg'
import SearchBar from "../components/SearchBar";

function Search() {
  const [query, setQuery] = useState(""); //search text
  const [results, setResults] = useState([]); 
  const [loading, setLoading] = useState(false); 

  const debounceTimeout = useRef(null);

  const handleSearch = (value) => {
    setQuery(value);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);

    debounceTimeout.current = setTimeout(async () => {
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
        if (data.Search) {
          setResults(data.Search);
        } else {
          setResults([]);
        }
      } catch (error) {
        console.error("Search error:", error);
      } finally {
        setLoading(false);
      }
    }, 500); 
  };

  return (
    <div className="bg-secondary min-h-screen">
      <Navbar />

=      <div className="items-center justify-center flex mt-10">
        <SearchBar onSearch={handleSearch} />
        <img src={filter_icon} className="cursor-pointer" />
      </div>

      <div className="p-6 sm:p-10 text-accent flex flex-col items-center justify-center">
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-bgGray rounded-lg h-[360px] animate-pulse"
              >
                <div className="h-[280px] bg-gray-700 rounded-t-lg"></div>
                <div className="mt-2 h-4 bg-gray-600 rounded w-3/4 mx-auto"></div>
                <div className="mt-2 h-3 bg-gray-600 rounded w-1/2 mx-auto"></div>
              </div>
            ))}
          </div>
        )}

        {!loading && results.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-6xl">
            {results.map((movie) => (
              <Link
                key={movie.imdbID}
                to={`/movieDetails/${movie.imdbID}`}
                className="bg-bgGray rounded-lg hover:scale-105 transition-transform"
              >
                <div className="h-[280px] overflow-hidden rounded-t-lg">
                  <img
                    loading="lazy"
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-2">
                  <h3 className="text-sm font-semibold truncate">{movie.Title}</h3>
                  <p className="text-xs text-gray-400">{movie.Year}</p>
                </div>
              </Link>
            ))}
          </div>
        )}

        {!loading && query && results.length === 0 && (
          <p className="text-muted mt-10">Unfortunately, nothing was found.🙄</p>
        )}
      </div>
    </div>
  );
}

export default Search;
