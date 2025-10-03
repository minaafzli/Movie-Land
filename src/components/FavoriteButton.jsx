import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import heartEmpty from "../image/heart.svg";
import heartFull from "../image/heart-fill.svg";
import { isUserLoggedIn, isFavorite, addToFavorites, removeFromFavorites } from "../utils/authUtils";

export default function FavoriteButton({ movie }) {
  const [isFav, setIsFav] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isUserLoggedIn()) {
      setIsFav(false);
      return;
    }
    setIsFav(isFavorite(movie.imdbID));
  }, [movie]);

  useEffect(() => {
    const handleFavoritesChange = () => {
      if (isUserLoggedIn()) {
        setIsFav(isFavorite(movie.imdbID));
      }
    };

    window.addEventListener("favoritesChanged", handleFavoritesChange);
    window.addEventListener("userLoggedOut", () => setIsFav(false));

    return () => {
      window.removeEventListener("favoritesChanged", handleFavoritesChange);
      window.removeEventListener("userLoggedOut", () => setIsFav(false));
    };
  }, [movie]);

  const toggleFavorite = () => {
    if (!isUserLoggedIn()) {
      alert("Please login to add favorites!");
      navigate("/signin");
      return;
    }

    if (isFav) {
      removeFromFavorites(movie.imdbID);
      setIsFav(false);
    } else {
      addToFavorites(movie);
      setIsFav(true);
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  return (
    <img
      onClick={toggleFavorite}
      src={isFav ? heartFull : heartEmpty}
      alt="favorite"
      className={`w-6 h-6 cursor-pointer transition-transform hover:scale-110 ${
        isAnimating ? "scale-125" : ""
      }`}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
    />
  );
}