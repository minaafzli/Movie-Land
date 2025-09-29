import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";
import login_bg from "../image/login_bg.jpg";

export default function Signin() {
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!username) newErrors.username = "Username is required!";
    else if (username.length < 3)
      newErrors.username = "Username must be at least 3 characters";

    if (!password) newErrors.password = "Password is required!";
    else if (password.length < 8)
      newErrors.password = "Password should be at least 8 characters!";
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (!savedUser) {
      setErrors({
        general: "No account found. Please Sign up first.",
      });
      return;
    }

    if (savedUser.username === username && savedUser.password === password) {
      navigate("/profile");
    } else {
      setErrors({ general: "Username or password is incorrect! ❌" });
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-cover "
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>

      <form
        onSubmit={handleSubmit}
        className="relative z-10 bg-black/85 border border-muted/55 shadow-lg rounded-2xl p-8 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-accent">
          Sign in to your account
        </h2>

        {errors.general && (
          <p className="text-red-500 text-center mb-3">{errors.general}</p>
        )}

        {/* 🧑‍💻 Username */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-accent">
            Username<span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Enter your username"
            className={`w-full text-accent placeholder-muted p-2 border rounded-xl focus:outline-none ${
              errors.username ? "border-red-500" : "border-gray-300"
            }`}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          {errors.username && (
            <p className="text-red-500 text-sm mt-1">{errors.username}</p>
          )}
        </div>

        {/* 🔐 Password */}
        <div className="mb-5">
          <label className="block mb-2 font-medium text-accent">
            Password<span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            placeholder="Enter your password"
            className={`w-full text-accent placeholder-muted p-2 border rounded-xl focus:outline-none ${
              errors.password ? "border-red-500" : "border-gray-300"
            }`}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        <div className="flex flex-col items-center w-full gap-2">
          <Button>Sign in</Button>
          <div className="flex gap-2">
            <p className="text-accent">Don’t have an account?</p>
            <span
              className="text-primary hover:text-hover cursor-pointer"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}