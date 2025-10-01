import { useState } from "react";
import download from "../image/download.svg";



export default function Player() {
  const [quality, setQuality] = useState("720");
  
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
        <div className="flex flex-col md:flex-row justify-between items-center md:gap-80">

      <h1 className="text-2xl mb-4"> Oppenheimer</h1>
      
      <div className="flex gap-8 justify-center items-center">

     <a 
      className=" cursor-pointer"
      href="/videos/Oppenheimer-720.mp4"
      download>     
       <img src={download} alt="download" />
      </a>

      <div >         {/* choose quality*/}
        <label htmlFor="quality" className="mr-2">Quality:</label>
        <select
          id="quality"
          value={quality}
          onChange={(e) => setQuality(e.target.value)}
          className="bg-gray-800 p-2 rounded cursor-pointer"
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
