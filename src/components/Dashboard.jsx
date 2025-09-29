import { Link, useNavigate } from "react-router-dom";
import profile from "../image/Profile.jpg";
import Button from "./Button";

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    navigate("/Signup");
    return null;
  }

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.setItem("isLoggedIn", "false");
    navigate("/");
  };

  return (
    <div className="h-screen bg-black font-[inter] flex items-center justify-center">
      <div>
        <div className="border-primary border-2 bg-bgGray rounded-lg p-8 text-accent flex flex-col gap-4 items-center">
          <img src={profile} className="w-10 rounded-full" />
          <p>name: {user?.username}</p>
          <p>Subscription: {user?.subscription || "No subscription yet"}</p>

          {!user?.subscription && (
            <Link to="/Subscription">
              <Button>Buy Subscription</Button>
            </Link>
          )}
          {user.subscription && (<Link to="/">
              <Button>Go Home</Button>
            </Link>)}

          <button
            onClick={handleLogout}
            className="bg-red-500 rounded-lg p-3 hover:bg-red-600 cursor-pointer"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
