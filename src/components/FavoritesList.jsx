import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getFavorites, removeFromFavorites } from "../utils/authUtils";

export default function FavoritesList() {
  const [favorites, setFavorites] = useState([]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    loadFavorites();

    const handleFavoritesChange = () => {
      loadFavorites();
    };

    const handleLogout = () => {
      setFavorites([]);
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    window.addEventListener("userLoggedOut", handleLogout);

    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
      window.removeEventListener("userLoggedOut", handleLogout);
    };
  }, []);

  const handleRemove = (imdbID) => {
    removeFromFavorites(imdbID);
    loadFavorites();
  };

  if (favorites.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          className="w-24 h-24 text-gray-500 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
        <p className="text-xl text-gray-400 mb-2">No favorite movies yet</p>
        <p className="text-sm text-gray-500">
          Start adding movies to your favorites!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      {favorites.map((movie) => (
        <div
          key={movie.imdbID}
          className="bg-bgGray rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all relative group"
        >
          <Link to={`/movieDetails/${movie.imdbID}`}>
            <img
              src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder.png"}
              alt={movie.Title}
              className="w-full h-64 object-cover"
            />
            <div className="p-3 text-center text-accent">
              <h3 className="font-semibold text-sm truncate">{movie.Title}</h3>
              <p className="text-xs text-gray-400">{movie.Year}</p>
            </div>
          </Link>

          {/* close button */}
          <button
            onClick={() => handleRemove(movie.imdbID)}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full shadow-lg"
            title="Remove from favorites"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {/* heart icon  */}
          <div className="absolute top-2 left-2 bg-red-600 text-white p-1.5 rounded-full">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      ))}
    </div>
  );
}