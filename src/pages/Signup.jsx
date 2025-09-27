// src/pages/Signup.jsx
import React from "react";
import logo from "../image/logo.png";
import Button from "../components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/* validation schema */
const schema = yup.object().shape({
  username: yup.string().required("Name is required"),
  email: yup
    .string()
    .email("Email format is not correct!")
    .required("Email is required!"),
  password: yup
    .string()
    .min(8)
    .required("Password is required"),
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
    const safe = { username: data.username, email: data.email };
    localStorage.setItem("user", JSON.stringify(safe));
    localStorage.setItem("isLoggedIn", "true");

    navigate("/profile");
  };

  return (
    <div className="flex bg-secondary h-screen justify-center items-center px-[30px] md:px-[100px]">
      <div className="w-full max-w-md">
        <img src={logo} alt="movie land" className="mb-4" />
        <p className="text-3xl text-accent font-bold py-2">
          Join the Cinematic Society Experience
        </p>
        <p className="text-muted">
          Unlock the Gates to a World of Infinite Movie Magic with Seamless
          Registration - Your Passport to Personalized Film Adventures Awaits!
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 pt-8"
          noValidate
          autoComplete="on"
        >
          {/* username */}
          <div>
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
              <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          {/* email */}
          <div>
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
              <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
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
            <p className="text-muted text-sm mt-1">Must be at least 8 characters</p>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            Getting Started
          </Button>

          <div className="flex gap-2 justify-center">
            <p className="text-accent text-center">Already have an account?</p>
            <Link to="/signin">
              <button type="button" className="cursor-pointer text-primary hover:text-hover">
                Sign in
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
