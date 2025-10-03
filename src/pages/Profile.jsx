import Dashboard from "../components/Dashboard"
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
function Profile() {
    return (
       <div className="bg-black">
        <Navbar/>
        <div className="flex justify-center gap-40 items-center">
        <div className="bg-amber-600 h-100 w-50">
        <p>hi</p>
        </div>
        <Dashboard/>
        </div>
        <Footer/>
       </div>
    )
}

export default Profile
