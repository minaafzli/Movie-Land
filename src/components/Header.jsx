import Navbar from "./Navbar";
import header_img from "../image/header.jpg";
import Button from "./Button";
import Button_filled from "./Button_filled";

function Header() {
  return (
    <header
      className="relative h-screen bg-center bg-cover font-[inter]"
      style={{ backgroundImage: `url(${header_img})` }}
    >
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative z-10 flex flex-col h-full bg-gradient-to-t from-secondary via-black/50 via-10% to-transparent">
        <Navbar />

{/* main container */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl mx-auto px-[30px] md:px-[100px] text-center">
          <p className="text-accent font-semibold text-3xl md:text-5xl">
            Solaris Synchrony: a Celestial Odyssey of Hope and Harmony 
          </p>

          <p className="text-gray-400 text-md pt-8">
            Against the backdrop of a dying Earth, a group of scientists races to execute a daring plan to synchronize the consciousness of humanity with a new solar system.
          </p>

          <div className="flex flex-col md:flex-row gap-4 pt-8 md:items-center md:justify-center">
            <Button>Watch trailer</Button>
            <Button_filled>More info</Button_filled>
          </div>
          
        </div>
      </div>
    </header>
  );
}

export default Header;
