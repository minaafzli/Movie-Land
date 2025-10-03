import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(savedFavorites);
  }, []);

  if (favorites.length === 0) {
    return <p className="text-gray-400 text-center">You have no favorite movies yet.</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {favorites.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-bgGray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-shadow"
        >
          <Link to={`/movieDetails/${movie.imdbID}`}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3 text-center text-accent">
              <h3 className="font-semibold text-sm">{movie.Title}</h3>
              <p className="text-xs text-gray-400">{movie.Year}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
}
