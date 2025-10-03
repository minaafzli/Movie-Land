import Navbar from "./Navbar";
import header_img from "../image/header.jpg";
import Button from "./Button";
import Button_filled from "./Button_filled";
import SearchBar from "./SearchBar";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header
      className="relative h-screen bg-center bg-cover font-[inter]"
      style={{ backgroundImage: `url(${header_img})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col h-full bg-gradient-to-t from-secondary via-black/30 via-10% to-transparent">

        <Navbar />
        <div className="flex items-center justify-center mt-10">

      
        <SearchBar/>
        </div>
{/* main container */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-[30px] md:px-[100px] text-center">
          <p className="text-accent font-semibold text-3xl md:text-5xl">
            Mars: a Celestial Odyssey of Hope and Harmony 
          </p>

          <p className="text-gray-400 text-md pt-8">
            Against the backdrop of a dying Earth, a group of scientists races to execute a daring plan to synchronize the consciousness of humanity with a new solar system.
          </p>
          <div className="flex flex-col md:flex-row gap-4 pt-8 md:items-center md:justify-center">
           <Link to='/Player/tt4939064'> <Button>Watch Movie</Button></Link>
           <Link to='/MovieDetails/tt4939064'> <Button_filled>More info</Button_filled></Link>
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
