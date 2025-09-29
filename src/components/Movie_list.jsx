

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const categories = {
  "Anime": ["tt2560140", "tt37113118","tt0877057", "tt8086718" ,"tt0388629"] ,
  "Top Action": ["tt0468569", "tt4154796", "tt0848228" ,"tt2975590", "tt13623632"],
  "series":["tt3032476", "tt0903747", "tt14452776" ,"tt6468322", "tt0455275"],
};

export default function Movie_list() {
  const [moviesByCategory, setMoviesByCategory] = useState({});

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

  return (
    <div className="p-10 text-accent bg-secondary">
      {Object.keys(moviesByCategory).map((category) => (
        <div key={category} className="mb-10">
          <h2 className="text-2xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 md:gap-4 ">
            {moviesByCategory[category].map((movie) => (
             <Link to={`/movie/:${movie.imdbID}`}>   <div key={movie.imdbID} className="bg-bgGray p-2 rounded ">
                <img src={movie.Poster} alt={movie.Title} />
                <h3 className="mt-2">{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
