import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getUserData, logoutUser, getFavorites } from "../utils/authUtils";
import useClickOutside from "../hooks/useClickOutside";

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = getUserData();
  const [showModal, setShowModal] = useState(false);

  const modalRef = useRef(null);
  useClickOutside(modalRef, () => setShowModal(false));

  
  const handleLogout = () => {
    logoutUser();
    setShowModal(false);
    navigate("/");
  };

  return (
    <div className="bg-bgGray rounded-lg p-6 mb-8 relative">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-accent mb-2">
            Welcome back, {userData.username}!
          </h2>
          <p className="text-gray-400">{userData.email}</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
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

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-1">Favorite Movies</h3>
          <p className="text-2xl font-bold text-accent">
            {getFavorites().length}
          </p>
        </div>

        <div className="bg-secondary p-4 rounded-lg">
          <h3 className="text-gray-400 text-sm mb-1">Account Status</h3>
          {userData.subscription &&
            <p className="text-lg font-bold text-green-500">
            {userData.subscription}
          </p>
          }
          {!userData.subscription &&
             <p className="text-accent font-bold text-lg"> No subscription</p>
          }
         
        </div>
      </div>

      {/* modal */}
      {showModal && (
        <div  className="fixed inset-0 bg-black/70 bg-opacity-60 flex items-center justify-center z-50">
          <div ref={modalRef} className="bg-bgGray p-6 rounded-xl shadow-lg w-80 text-center">
            <p className="text-accent text-lg mb-4">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                Logout
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
