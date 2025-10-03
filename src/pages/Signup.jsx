import React from "react";
import logo from "../image/logo.png";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import login_bg from "../image/login_bg.jpg";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { loginUser, logoutUser } from "../utils/authUtils";

/* validation schema */
const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email format is not correct!")
    .required("Email is required!"),
  password: yup.string().min(8).required("Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onSubmit",
  });

  const onSubmit = (data) => {
    logoutUser();

    const safe = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    localStorage.setItem("user", JSON.stringify(safe));
    
    loginUser({
      username: data.username,
      email: data.email,
    });

    navigate("/profile");
  };

  return (
    <div
      className="flex h-screen justify-center items-center px-[30px] md:px-[100px] min-h-screen bg-cover"
      style={{ backgroundImage: `url(${login_bg})` }}
    >
      <div className="absolute inset-0 bg-black/80"></div>
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center relative z-10">
          <img src={logo} alt="movie land" className="mb-4" />
          <p className="text-3xl text-accent font-bold py-2">
            Join the Cinematic Society Experience
          </p>
          <p className="text-accent/60">
            Unlock the Gates to a World of Infinite Movie Magic with Seamless
            Registration - Your Passport to Personalized Film Adventures Awaits!
          </p>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-8"
          noValidate
          autoComplete="on"
        >
          <div className="border-1 border-muted/35 rounded-lg p-8 relative z-10 bg-black/80">
            {/* username */}
            <div className="pb-4">
              <label htmlFor="username" className="text-accent">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="username"
                type="text"
                {...register("username")}
                aria-invalid={!!errors.username}
                className={`w-full mt-2 p-2 rounded text-accent border ${
                  errors.username ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                placeholder="Enter username"
                autoComplete="name"
              />
              {errors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.username.message}
                </p>
              )}
            </div>

            {/* email */}
            <div className="pb-4">
              <label htmlFor="email" className="text-accent">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="email"
                type="email"
                {...register("email")}
                aria-invalid={!!errors.email}
                className={`w-full mt-2 p-2 rounded text-accent border ${
                  errors.email ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                placeholder="example@movieland.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* password */}
            <div>
              <label htmlFor="password" className="text-accent">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                type="password"
                {...register("password")}
                aria-invalid={!!errors.password}
                className={`w-full mt-2 p-2 rounded text-accent border ${
                  errors.password ? "border-red-500" : "border-gray-700"
                } focus:outline-none`}
                placeholder="Enter password"
                autoComplete="new-password"
              />
              <p className="text-muted text-sm mt-1">
                Must be at least 8 characters
              </p>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center w-full gap-2 pt-8">
              <Button type="submit" disabled={isSubmitting}>
                Getting Started
              </Button>

              <div className="flex flex-col items-center md:flex-row gap-2 justify-center">
                <p className="text-accent text-center">
                  Already have an account?
                </p>
                <Link to="/signin">
                  <button
                    type="button"
                    className="cursor-pointer text-primary hover:text-hover"
                  >
                    Sign in
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}