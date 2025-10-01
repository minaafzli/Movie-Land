import { useState, useEffect } from "react";
import heartEmpty from "../image/heart.svg";
import heartFull from "../image/heart-fill.svg";

export default function FavoriteButton({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsFavorite(favorites.some((f) => f.imdbID === movie.imdbID));
  }, [movie]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isFavorite) {
      updatedFavorites = favorites.filter((f) => f.imdbID !== movie.imdbID);
    } else {
      updatedFavorites = [...favorites, movie];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsFavorite(!isFavorite);
  };

  return (
    <img
      onClick={toggleFavorite}
      src={isFavorite ? heartFull : heartEmpty}
      alt="favorite"
      className="w-6 h-6 cursor-pointer transition-transform hover:scale-110"
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    />
  );
}
