import Dashboard from "../components/Dashboard";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import FavoritesList from "../components/FavoritesList";

function Profile() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center gap-20 py-10">
       
        <Dashboard />

        <div className="bg-primary/30 rounded-lg p-6 w-[90%] md:w-[70%]">
          <h2 className="text-2xl font-bold mb-4 text-accent">⭐ Your Favorite Movies</h2>
          <FavoritesList />
        </div>

       
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
