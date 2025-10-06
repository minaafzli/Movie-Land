import { useState, useRef } from "react";
import logo from "../image/logo.png";
import icon_hamburger from "../image/icon-hamburger.svg";
import theme_icon from "../image/theme_icon.svg";
import profile_icon from "../image/profile_icon.svg";
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
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

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
    <div className="h-16 bg-secondary/50 text-white flex items-center px-6 text-xl border-t-2 border-primary relative z-30">
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-4 items-center">
          <Link to="/">
            <img src={logo} alt="movie-land-logo" className="w-40" />
          </Link>
          
        </div>

        <div className="flex md:gap-5 gap-2 items-center">

          <Link to="/"><p className="cursor-pointer text-accent hidden md:block">Home</p></Link>

          {/* Theme Menu */}
          <div className="relative flex items-center">
            <button ref={themeButtonRef} onClick={toggleThemeMenu}>
              <img
                src={theme_icon}
                className="cursor-pointer block align-middle"
                alt="theme"
              />
            </button>

            {isThemeOpen && (
              <div
                ref={themeMenuRef}
                className="absolute right-0 top-10 w-40 bg-secondary border-2 border-primary rounded-lg shadow-lg text-md z-50"
              >
                <ul className="flex flex-col">
                  <li>
                    <button
                      onClick={() => changeTheme("default")}
                      className="w-full text-left px-4 py-2 hover:bg-primary/30 rounded-t-lg"
                    >
                      Default
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeTheme("red")}
                      className="w-full text-left px-4 py-2 hover:bg-primary/30"
                    >
                      Red
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => changeTheme("yellow")}
                      className="w-full text-left px-4 py-2 hover:bg-primary/30 rounded-b-lg"
                    >
                      Yellow
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {isLoggedIn ? (
            <Link to="/profile">
              <img
                src={profile_icon}
                className="cursor-pointer md:block align-middle hidden"
                alt="profile"
              />
            </Link>
          ) : (
            <div className="hidden md:flex gap-2 justify-center items-center">
              <Link to="/Subscription">
                <Button>Subscribe</Button>
              </Link>
              <Link to="/Signup">
                <Button_filled>Sign up</Button_filled>
              </Link>
            </div>
          )}
          {/* Hamburger Menu */}
          <button
            ref={hamburgerButtonRef}
            className="md:hidden"
            onClick={toggleHamburgerMenu}
          >
            <img
              src={icon_hamburger}
              alt="menu"
              className="cursor-pointer"
            />
          </button>

          {isOpen && (
            <div
              ref={hamburgerRef}
              className="absolute top-16 right-4 w-64 md:hidden bg-accent rounded-xl shadow-lg py-4 text-center space-y-2 z-50"
            >
              <div className="flex flex-col gap-2">

                <Link to="/"><p className="cursor-pointer text-muted hover:bg-hoverSecondary/30">Home</p></Link>
               
                {isLoggedIn && (
                  <Link
                    to="/Profile"
                    className="hover:bg-hoverSecondary/30 py-2 text-muted cursor-pointer"
                    onClick={() => setIsOpen(false)}
                  >
                    Profile
                  </Link>
                )}

                {!isLoggedIn && (
                  <Link to="/Signup" onClick={() => setIsOpen(false)}>
                    <button className="rounded-full px-6 py-1 text-lg text-secondary uppercase bg-hoverSecondary hover:bg-primary">
                      Sign up
                    </button>
                  </Link>
                )}

                <Link to="/Subscription" onClick={() => setIsOpen(false)}>
                  <button className="rounded-full px-6 py-1 text-lg text-secondary uppercase bg-hoverSecondary hover:bg-primary cursor-pointer">
                    Subscription
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;