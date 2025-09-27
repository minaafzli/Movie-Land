 import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Subscription from "../pages/Subscription";
import Search from "../pages/Search";
import MovieDetails from "../pages/MovieDetails";
import Profile from "../pages/Profile";

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/subscription" element={<Subscription />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}
