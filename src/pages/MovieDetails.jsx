import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import StarRating from "../components/StarRating";
import FavoriteButton from "../components/FavoriteButton";

function Movie() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

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

  if (!movie) return <p className="bg-secondary text-primary flex justify-center items-center text-4xl font-bold h-screen">Loading...</p>;

  return (
    <div
      className="relative min-h-screen text-accent flex flex-col justify-center gap-20"
      style={{
        backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.9) 100%), url(${movie.Poster})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >

      <div className="absolute top-0 left-0 w-full z-20">
        <Navbar />
      </div>

      <div className="relative z-10 flex md:flex-row-reverse flex-col gap-12 justify-center items-center px-8 py-16 w-full max-w-6xl mx-auto">
  <img
    src={movie.Poster}
    alt={movie.Title}
    className="w-[280px] h-[420px] object-cover rounded-xl shadow-2xl flex-shrink-0"
  />

  <div className="relative z-10 flex flex-col gap-4 bg-black/60 p-6 rounded-xl max-w-2xl w-full break-words  overflow-hidden">
    <h1 className="text-3xl font-bold">{movie.Title}</h1>
    <p className="text-sm">Genre: {movie.Genre}</p>
    <p className="text-sm leading-relaxed">Plot: {movie.Plot}</p>
    <p className="text-sm">IMDB Rating: {movie.imdbRating}</p>
    <p className="text-sm">Language: {movie.Language}</p>
    <p className="text-sm">Year: {movie.Year}</p>

    <div className="flex flex-col md:flex-row gap-4 items-center">
      <p>Your Rate: </p>
      <StarRating
        maxRating={10}
        size={22}
        color="#facc15"
        defaultRating={movie.imdbRating ? Math.round(movie.imdbRating / 2) : 0}
      />
    </div>

    <div className="flex gap-6 justify-start items-center mt-4">
      <Link to={`/Player/${movie.imdbID}`}>
        <Button>Watch Movie</Button>
      </Link>
      <FavoriteButton movie={movie}/>
    </div>
  </div>
</div>


    </div>
  );
}

export default Movie;
