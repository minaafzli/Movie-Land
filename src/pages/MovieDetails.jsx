import {  useEffect } from "react";
function MovieDetails({movie_id }) {
  useEffect(() => {
    async function fetchMovies() {
      const res = await fetch(
        `https://www.omdbapi.com/?i=${movie_id}&apikey=c8bca4f7`
      );
      const data = await res.json();
      console.log(data);
    }
    fetchMovies();
  },[] );
    return (
        <div className="text-center bg-amber-600 pt-20">
    </div>
    )
}

export default MovieDetails
