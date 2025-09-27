import { useState, useRef } from "react";
import logo from "../image/logo.png";
import icon_hamburger from "../image/icon-hamburger.svg";
import useClickOutside from "../hooks/useClickOutside";
import Button from "./Button";
import Button_filled from "./Button_filled";
import { Link } from "react-router-dom";


function Navbar() {
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const themeMenuRef = useRef(null);
  const themeButtonRef = useRef(null);
  const hamburgerRef = useRef(null);
  const hamburgerButtonRef = useRef(null);

  useClickOutside(themeMenuRef, () => setIsThemeOpen(false), themeButtonRef);
  useClickOutside(hamburgerRef, () => setIsOpen(false), hamburgerButtonRef);

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme);
    setIsThemeOpen(false);
  };

  const toggleThemeMenu = () => {
    setIsThemeOpen((prev) => {
      if (!prev) setIsOpen(false); 
      return !prev;
    });
  };

  const toggleHamburgerMenu = () => {
    setIsOpen((prev) => {
      if (!prev) setIsThemeOpen(false);
      return !prev;
    });
  };

  return (
    <div className="h-20 bg-gradient-to-b from-secondary via-black/60 via-40% to-transparent text-white flex items-center px-6 text-xl border-t-2 border-primary relative">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-8 items-center">
          <Link to='/'>
            <img src={logo} alt="movie-land-logo" className="w-40" />
          </Link>
          <ul className="hidden md:flex gap-4">
            <li><Link to="/film" className="text-sm hover:text-muted">Film</Link></li>
            <li><Link to="/Anime" className="text-sm hover:text-muted">Anime</Link></li>
            <li><Link to="/Contact" className="text-sm hover:text-muted">Contact us</Link></li>
          </ul>
        </div>

        <div className="flex gap-5 items-center">

         
          {/* profile */}
          <Link to='/profile'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </Link>

          {/* theme */}
          <div className="relative">
            <button ref={themeButtonRef} onClick={toggleThemeMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-7 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </button>

            {isThemeOpen && (
              <div ref={themeMenuRef} className="absolute right-0 mt-2 w-40 bg-secondary border-2 border-primary rounded-lg shadow-lg text-md">
                <ul className="flex flex-col">
                  <li>
                    <button onClick={() => changeTheme("default")} className="w-full text-left px-4 py-2 hover:bg-primary/30">
                      Default
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changeTheme("red")} className="w-full text-left px-4 py-2 hover:bg-primary/30">
                      Red
                    </button>
                  </li>
                  <li>
                    <button onClick={() => changeTheme("yellow")} className="w-full text-left px-4 py-2 hover:bg-primary/30">
                      Yellow
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          <div className="hidden md:flex gap-2">
          <Link to='Subscription'>  <Button>Subscribe</Button></Link>
          <Link to='Signup'>  <Button_filled>Sign up</Button_filled> </Link>
          </div>

          {/* hamburger */}
          <button ref={hamburgerButtonRef} className="md:hidden" onClick={toggleHamburgerMenu}>
            <img src={icon_hamburger} alt="menu" className="cursor-pointer" />
          </button>

          {isOpen && (
            <div ref={hamburgerRef} className="absolute top-16 right-4 w-64 md:hidden mt-3 bg-accent rounded-xl shadow-lg py-4 text-center space-y-4 ">
              <ul className="flex flex-col text-muted">
                <Link to='Film' className="hover:bg-hoverSecondary py-2">Film</Link>
                <Link to='Anime' className="hover:bg-hoverSecondary py-2">Anime</Link>
                <Link to='Contact' className="hover:bg-hoverSecondary py-2">Contact us</Link>
              </ul>
              <button className="rounded-full px-6 py-1 text-lg text-secondary uppercase bg-hoverSecondary hover:bg-primary">
                Sign up
              </button>
              <button className="rounded-full px-6 py-1 text-lg text-secondary uppercase bg-hoverSecondary hover:bg-primary">
                Subscription
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
