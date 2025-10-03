import { useState  , useEffect } from "react";
import DownloadButton from "../components/DownloadButton";
import FavoriteButton from "../components/FavoriteButton";
import { useParams } from "react-router-dom";

export default function Player() {
  const [quality, setQuality] = useState("720");
  const [movie , setMovie] = useState()
  const {id} = useParams()

useEffect(() => {
    async function fetchMovie() {
      const res = await fetch(`https://www.omdbapi.com/?i=${id}&apikey=c8bca4f7`); 
      const data = await res.json();
      setMovie(data);
    }
    fetchMovie();
  }, []);

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4">

      {/* player*/}
      <video
        key={quality} // reload video when quality changes
        controls
        className="w-full max-w-3xl rounded-lg shadow-lg"
        >
        <source src={`/videos/Oppenheimer-${quality}.mp4`} type="video/mp4" />
      can't play this video on your broswser
      </video>


        {/* choose quality*/}
        <div className="flex flex-col bg-primary/30 mt-4 px-4 py-2 rounded-2xl  md:flex-row justify-center items-center md:gap-80">

      <h1 className="text-2xl mb-4 md:mb-0 "> {movie.Title}</h1>
      
      <div className="flex gap-8 justify-center items-center">
        
      <DownloadButton/>
      <FavoriteButton movie={movie}/>

      <div > {/* choose quality*/}
        <label htmlFor="quality" className="mr-2">Quality:</label>
        <select
          id="quality"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="bg-muted p-2 rounded cursor-pointer"
          >
          <option value="360">360p</option>
          <option value="480">480p</option>
          <option value="720">720p</option>
        </select>
            </div>
          </div>
        </div>
    </div>
  );
}
