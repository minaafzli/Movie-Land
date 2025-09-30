

import { useEffect, useState ,useRef } from "react";
import { Link } from "react-router-dom";

const categories = {
  "Anime": ["tt2560140", "tt37113118","tt0877057", "tt8086718" ,"tt0388629","tt0877057", "tt8086718" ,"tt0388629"] ,
  "Top Action": ["tt0468569", "tt4154796", "tt0848228" ,"tt2975590", "tt13623632", "tt0848228" ,"tt2975590", "tt13623632"],
  "series":["tt3032476", "tt0903747", "tt14452776" ,"tt6468322", "tt0455275","tt14452776" ,"tt6468322", "tt0455275"],
};

export default function Movie_list() {
  const [moviesByCategory, setMoviesByCategory] = useState({});
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
    }
    fetchMovies();
  }, []);

  
  useEffect(() => {
    const interval = setInterval(() => {
      Object.values(containerRefs.current).forEach((container) => {
        if (container) {
          if (
            container.scrollLeft + container.clientWidth >=
            container.scrollWidth
          ) {
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
 <div className="p-10 text-accent bg-secondary">
  {Object.keys(moviesByCategory).map((category) => (
    <div key={category} className="mb-10">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>

      <div
        ref={(el) => (containerRefs.current[category] = el)}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth"
      >
        {[...moviesByCategory[category], ...moviesByCategory[category]].map(
          (movie, index) => (
            <Link key={`${movie.imdbID}-${index}`} to={`/movieDetails/${movie.imdbID}`}>
              <div
                className="
                  snap-center bg-bgGray p-2 rounded flex-shrink-0
                  min-w-[70%] sm:min-w-[45%] md:min-w-[220px] lg:min-w-[220px]
                  h-[360px]   // ✅ ارتفاع کارت در همه جا ثابت
                  flex flex-col
                "
              >
                <div className="w-full md:h-[280px]  overflow-hidden rounded">
                  <img
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
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  ))}
</div>





  );
}
