import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Button from "../components/Button";
import StarRating from "../components/StarRating";
import Button_filled from "../components/Button_filled";

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

      <div className="relative z-10 flex md:flex-row-reverse flex-col gap-16 justify-between items-center px-20 py-32">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="w-[320px] h-[480px] object-cover rounded-xl shadow-2xl"
        />

        <div className="relative z-10 flex flex-col gap-4 max-w-xl bg-black/60 p-6 rounded-xl">
          <h1 className="text-3xl font-bold">{movie.Title}</h1>
          <p>Genre: {movie.Genre}</p>
          <p>Plot: {movie.Plot}</p>
          <p>IMDB Rating: {movie.imdbRating}</p>
          <p>Language: {movie.Language}</p>
          <p>Year: {movie.Year}</p>

          <div className="flex gap-4 items-center">
            <p>Rate this Movie: </p>
            <StarRating
              maxRating={10}
              size={26}
              color="#facc15"
              defaultRating={movie.imdbRating ? Math.round(movie.imdbRating / 2) : 0}
            />
          </div>
          <div className="flex gap-8 justify-center">
        <Link to={`/Player/${movie.imdbID}`}> <Button>Watch Movie</Button> </Link> 
        <Button_filled>Add to Favorite</Button_filled>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Movie;
