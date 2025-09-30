

import { useState , useEffect } from "react";
import { useParams } from "react-router-dom";
function Movie() {
  const { id } = useParams(); 
  const [movie , setMovie] = useState(null)

     useEffect(() => {
  async function fetchMovie() {
    try {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c8bca4f7`);
      const text = await res.text();
      console.log("RAW Response:", text); 

      const data = JSON.parse(text); 
      console.log("Parsed JSON:", data);
      setMovie(data);
    } catch (err) {
      console.error("❌ JSON Parse Error:", err);
    }
  }
  fetchMovie();
}, [id]);


  if (!movie) return <p>Loading...</p>;

  return (
    <div className="p-10 text-secondary">
      <p className="text-black">mina</p>
      <h1 className="text-3xl font-bold">{movie.Title}</h1>
      <img src={movie.Poster} alt={movie.Title} className="my-4" />
      <p>Year: {movie.Year}</p>
      <p>Genre: {movie.Genre}</p>
      <p>Plot: {movie.Plot}</p>
      <p>IMDB Rating: {movie.imdbRating}</p>
    </div>
  );
}
export default Movie
