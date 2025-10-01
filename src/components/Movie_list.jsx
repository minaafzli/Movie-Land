import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

const categories = {
  Anime: [
    "tt13706018", // Demon Slayer
    "tt2560140",  // Attack on Titan
    "tt0877057",  // Death Note
    "tt9335498",  // Jujutsu Kaisen
    "tt12343534", // Chainsaw Man
    "tt0388629",  // Naruto
  ],
  "Top Action": [
    "tt4154796", // Avengers: Endgame
    "tt7286456", // Joker
    "tt4154756", // Infinity War
    "tt1877830", // The Batman
    "tt0848228", // The Avengers
    "tt4633694", // Spider-Man: Into the Spider-Verse
    
  ],
  Series: [
    "tt0903747", // Breaking Bad
    "tt7366338", // Chernobyl
    "tt2442560", // Peaky Blinders
    "tt0944947", // Game of Thrones
    "tt9140554", // Loki
    "tt4158110", // Mr. Robot
  ],
};

export default function Movie_list() {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const containerRefs = useRef({});

  useEffect(() => {
    async function fetchMovies() {
      const results = {};
      for (const category in categories) {
        const ids = categories[category];
        const movies = [];
        for (const id of ids) {
          const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c8bca4f7`);
          const data = await res.json();
          movies.push(data);
        }
        results[category] = movies;
      }
      setMoviesByCategory(results);
      setLoading(false); 
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      Object.values(containerRefs.current).forEach((container) => {
        if (container) {
          if (container.scrollLeft + container.clientWidth >= container.scrollWidth) {
            container.scrollTo({ left: 0, behavior: "smooth" });
          } else {
            container.scrollBy({ left: container.clientWidth / 2, behavior: "smooth" });
          }
        }
      });
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-6 sm:p-10 text-accent bg-secondary">
      {Object.keys(categories).map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>

          <div
            ref={(el) => (containerRefs.current[category] = el)}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
          >
            {loading
              ? //loading
                Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="
                      snap-center bg-bgGray p-2 rounded flex-shrink-0
                      min-w-[70%] sm:min-w-[45%] md:min-w-[220px] lg:min-w-[220px]
                      h-[360px] flex flex-col animate-pulse
                    "
                  >
                    <div className="w-full h-[280px] bg-gray-700 rounded"></div>
                    <div className="mt-2 h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="mt-2 h-3 bg-gray-600 rounded w-1/2"></div>
                  </div>
                ))
              : // movies
                [...moviesByCategory[category]].map((movie, index) => (
                  <Link key={`${movie.imdbID}-${index}`} to={`/movieDetails/${movie.imdbID}`}>
                    <div
                      className="
                        snap-center bg-bgGray p-2 rounded flex-shrink-0
                        min-w-[70%] sm:min-w-[45%] md:min-w-[220px] lg:min-w-[220px]
                        h-[360px] flex flex-col hover:scale-105 transition-transform
                      "
                    >
                      <div className="w-full h-[280px] overflow-hidden rounded">
                        <img
                          loading="lazy"
                          src={movie.Poster}
                          alt={movie.Title}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="mt-2 flex flex-col justify-between h-[60px]">
                        <h3 className="text-sm font-semibold truncate">{movie.Title}</h3>
                        <p className="text-xs text-gray-400">{movie.Year}</p>
                      </div>
                    </div>
                  </Link>
                ))}
          </div>
        </div>
      ))}
    </div>
  );
}
