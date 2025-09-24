import { useState  , useRef} from 'react'
import logo from '../image/logo.png'
import useClickOutside from '../hooks/useClickOutside';
import Button from './Button';
import Button_filled from './Button_filled';


function Navbar() {
   const [isOpen, setIsOpen] = useState(false)
  const  cardRef = useRef(null)

 useClickOutside(cardRef , ()=>setIsOpen(false))

  const changeTheme = (theme) => {
    document.documentElement.setAttribute("data-theme", theme)
    setIsOpen(false)
  }

  return (
    <div className="h-20 bg-gradient-to-b from-secondary via-black/60 via-40% to-transparent text-white flex items-center px-10 text-xl border-t-2 border-primary relative">
      <div className="flex justify-between w-screen">

        <div className="flex gap-8 justify-between items-center">
          <a href="#">
            <img src={logo} alt="movie-land-logo" className='w-40' />
          </a>
          <ul className="flex gap-5">
            <li><a href="#" className='text-lg'>Film</a></li>
            <li><a href="#" className='text-lg'>Anime</a></li>
            <li><a href="#" className='text-lg'>Contact us</a></li>
          </ul>
        </div>

        <div className="flex gap-5 items-center ">
          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </a>

          <a href="#">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
          </a>

          <div className="relative ">
            <button onClick={() => setIsOpen(!isOpen)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
              </svg>
            </button>

            {/* chooseColor menue */}
            {isOpen && (
              <div ref={cardRef} className="absolute right-0 mt-2 w-40 bg-secondary border-2 border-primary rounded-lg shadow-lg text-md ">
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
                 
                </ul>
              </div>
            )}
          </div>
          
                <Button>Subscribe</Button>
                <Button_filled>Sign up</Button_filled>
              
                 
        </div>

      </div>
    </div>
  )
}

export default Navbar
