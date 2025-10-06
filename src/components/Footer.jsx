import logo from '../image/logo.png'
import instagram from '../image/instagram.svg'
import tiktok from '../image/tiktok.svg'
import facebook from '../image/facebook.svg'
import Subscription from '../pages/Subscription'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'

function Footer() {
  return (
    <footer id='footer' className="bg-secondary px-6 md:px-20 py-10 font-[inter]">
      <div className="flex flex-col gap-12 border-b border-border pb-8 md:flex-row md:justify-between">

        <div className="md:w-[350px] lg:w-lg text-center md:text-left">
          <img src={logo} alt="movie land-logo" className="w-50 mx-auto md:mx-0 mb-4" />
          <p className="text-muted lg:text-xl 
          leading-relaxed">
            where every frame tells a story, and every click opens the door to a world of limitless entertainment. Immerse yourself in a universe of unparalleled movie .
          </p>
        </div>

        <div className="grid grid-cols-2 md:flex flex-col text-xl  sm:flex-row gap-8 justify-center md:justify-start text-center sm:text-left">
          <ul className="text-accent space-y-2">

           <HashLink smooth to="/#header"> <li className="hover:bg-bgGray px-3 py-2 rounded-2xl cursor-pointer">Home</li></HashLink>

           <HashLink smooth to="/#faq"> <li className="hover:bg-bgGray px-3 py-2 rounded-2xl cursor-pointer">F & Q</li></HashLink>

            <Link to="/Subscription"><li className="hover:bg-bgGray px-3 py-2 rounded-2xl cursor-pointer">Subscribe</li></Link>

          <Link to ='/Profile'> <li className="hover:bg-bgGray px-3 py-2 rounded-2xl cursor-pointer">Profile</li></Link> 
          </ul>

        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <p className="text-accent mb-4 whitespace-nowrap">Stay up to date</p>
          <div className="flex gap-4">
            <img src={facebook} alt="facebook" className="w-8 h-8 cursor-pointer" />
            <img src={instagram} alt="instagram" className="w-8 h-8 cursor-pointer" />
            <img src={tiktok} alt="tiktok" className="w-6 h-6 cursor-pointer" />
          </div>
        </div>
        </div>

      </div>

      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 text-center md:text-left">
        <p className="text-muted text-sm">&copy; 2025 Movie Land All Rights Reserved</p>
        <p className="text-muted text-sm">Terms and condition · Privacy Policy</p>
      </div>
    </footer>
  )
}

export default Footer
