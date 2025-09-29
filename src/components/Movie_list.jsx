import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function MovieList() {
  const [movies, setMovies] = useState([]);

// پوستر و اطلعات همه فیلم های مرتبط با کلمه سرچ شده 
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `https://www.omdbapi.com/?s=barbie&apikey=c8bca4f7`
      );
      const data = await res.json();
          setMovies(data.Search); 

    }
    fetchMovies();
  }, []);

  return (
    <div className="grid grid-cols-2 md:grid-cols-5  gap-4 p-10  bg-black text-accent">
      {movies?.map((movie) => (
      <Link to="/MovieDetails">  <div key={movie.imdbID} className="bg-bgGray p-4 rounded-lg">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-auto" />
          <h2 className="mt-2 text-xl">{movie.Title}</h2>
          <p>{movie.Year}</p>
        </div>
        </Link>
      ))}
    </div>
  );
}
