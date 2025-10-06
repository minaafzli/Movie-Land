import { useNavigate } from "react-router-dom";
import { getUserData, logoutUser, getFavorites } from "../utils/authUtils";

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = getUserData();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      logoutUser();
      navigate("/");
    }
  };

  return (
    <div className="bg-bgGray rounded-lg p-6 mb-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-2">
            Welcome back, {userData.username}!
          </h2>
          <p className="text-gray-400">{userData.email}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
          </svg>
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-1">Favorite Movies</h3>
          <p className="text-2xl font-bold text-accent">
            {getFavorites().length}
          </p>
        </div>

        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-1">Account Status</h3>
          <p className="text-lg font-bold text-green-500">{userData.subscription}</p>
        </div>
      </div>
    </div>
  );
}