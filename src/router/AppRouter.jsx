 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Signin from "../pages/Signin";
import Subscription from "../pages/Subscription";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";
import Player from "../pages/Player";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movieDetails/:id" element={<MovieDetails />} />
        <Route path="/Player/:id" element={<Player />}/>
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
