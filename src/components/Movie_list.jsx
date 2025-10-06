import { useEffect, useState, useRef } from "react";

const categories = {
  Anime: [
    "tt13706018",
    "tt2560140",
    "tt0877057",
    "tt9335498",
    "tt12343534",
    "tt0388629",
  ],
  "Top Action": [
    "tt4154796",
    "tt7286456",
    "tt4154756",
    "tt1877830",
    "tt0848228",
    "tt4633694",
  ],
  Series: [
    "tt0903747",
    "tt7366338",
    "tt2442560",
    "tt0944947",
    "tt9140554",
    "tt4158110",
  ],
};

export default function Movie_list() {
  const [moviesByCategory, setMoviesByCategory] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState({});
  const intervalRefs = useRef({});

  useEffect(() => {
    async function fetchMovies() {
      const results = {};
      for (const category in categories) {
        const ids = categories[category];
        const movies = [];
        for (const id of ids) {
          const res = await fetch(
            `https://www.omdbapi.com/?i=${id}&apikey=c8bca4f7`
          );
          const data = await res.json();
          movies.push(data);
        }
        results[category] = movies;
      }
      setMoviesByCategory(results);

      const initIndexes = {};
      Object.keys(categories).forEach((cat) => (initIndexes[cat] = 0));
      setCurrentIndex(initIndexes);

      setLoading(false);
    }
    fetchMovies();
  }, []);

  useEffect(() => {
    if (loading) return;

    Object.keys(categories).forEach((category) => {
      intervalRefs.current[category] = setInterval(() => {
        slide(category, 1);
      }, 3000);
    });

    return () => {
      Object.keys(intervalRefs.current).forEach((key) => {
        clearInterval(intervalRefs.current[key]);
      });
    };
  }, [loading, moviesByCategory]);

  const slide = (cat, direction) => {
    const movies = moviesByCategory[cat] || [];
    const total = movies.length;
    setCurrentIndex((prev) => {
      const newIndex = (prev[cat] + direction + total) % total;
      return { ...prev, [cat]: newIndex };
    });
  };

  const handleManualSlide = (cat, direction) => {
    clearInterval(intervalRefs.current[cat]);
    slide(cat, direction);
    
    intervalRefs.current[cat] = setInterval(() => {
      slide(cat, 1);
    }, 3000);
  };

  return (
    <div className="p-6 sm:p-10 text-accent bg-secondary">
      {Object.keys(categories).map((category) => {
        const movies = moviesByCategory[category] || [];
        const index = currentIndex[category] || 0;

        return (
          <div key={category} className="mb-10">
            <h2 className="text-2xl font-bold mb-4">{category}</h2>

            <div className="hidden md:flex md:items-center md:justify-center gap-4 flex-wrap">
              {loading
                ? Array.from({ length: 6 }).map((_, i) => (
                    <div
                      key={i}
                      className="
                        bg-bgGray p-2 rounded 
                        w-[220px] h-[360px] flex flex-col animate-pulse
                      "
                    >
                      <div className="w-full h-[280px] bg-gray-700 rounded"></div>
                      <div className="mt-2 h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="mt-2 h-3 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  ))
                : movies.map((movie) => (
                    <a
                      key={movie.imdbID}
                      href={`/movieDetails/${movie.imdbID}`}
                      className="
                        bg-bgGray p-2 rounded 
                        w-[220px] h-[360px] flex flex-col hover:scale-105 transition-transform
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
                        <h3 className="text-sm font-semibold truncate">
                          {movie.Title}
                        </h3>
                        <p className="text-xs text-gray-400">{movie.Year}</p>
                      </div>
                    </a>
                  ))}
            </div>

            <div className="md:hidden relative w-full overflow-hidden">
              <div className="flex items-center justify-center py-4">
                
                {/* Previous btn */}
                <button
                  onClick={() => handleManualSlide(category, -1)}
                  className="absolute left-2 z-10 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-all shadow-lg cursor-pointer"
                  aria-label="Previous"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>

                <div className="flex gap-4 justify-center items-center px-16">
                  {loading ? (
                    <div className="bg-bgGray p-2 rounded w-[220px] h-[360px] flex flex-col animate-pulse flex-shrink-0">
                      <div className="w-full h-[280px] bg-gray-700 rounded"></div>
                      <div className="mt-2 h-4 bg-gray-600 rounded w-3/4"></div>
                      <div className="mt-2 h-3 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  ) : (
                    <>
                      {/* کارت اول - همیشه نمایش داده می‌شود */}
                      {movies.slice(index, index + 1).map((movie) => (
                        <a
                          key={movie.imdbID}
                          href={`/movieDetails/${movie.imdbID}`}
                          className="bg-bgGray p-2 rounded w-[220px] h-[360px] flex flex-col hover:scale-105 transition-transform flex-shrink-0"
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
                            <h3 className="text-sm font-semibold truncate">
                              {movie.Title}
                            </h3>
                            <p className="text-xs text-gray-400">{movie.Year}</p>
                          </div>
                        </a>
                      ))}


                      {movies.slice(index + 1, index + 2).map((movie) => (
                        <a
                          key={movie.imdbID}
                          href={`/movieDetails/${movie.imdbID}`}
                          className="bg-bgGray p-2 rounded w-[220px] h-[360px] flex flex-col hover:scale-105 transition-transform flex-shrink-0 hidden min-[500px]:flex"
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
                            <h3 className="text-sm font-semibold truncate">
                              {movie.Title}
                            </h3>
                            <p className="text-xs text-gray-400">{movie.Year}</p>
                          </div>
                        </a>
                      ))}
                    </>
                  )}
                </div>

                {/* next btn  */}
                <button
                  onClick={() => handleManualSlide(category, 1)}
                  className="absolute right-2 z-10 bg-black/70 text-white p-3 rounded-full hover:bg-black/90 transition-all shadow-lg cursor-pointer"
                  aria-label="Next"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

            
              <div className="flex justify-center gap-2 mt-2">
                {movies.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      clearInterval(intervalRefs.current[category]);
                      setCurrentIndex((prev) => ({ ...prev, [category]: i }));
                      intervalRefs.current[category] = setInterval(() => {
                        slide(category, 1);
                      }, 3000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === index ? "bg-white w-6" : "bg-gray-500"
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}