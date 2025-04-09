"use client";
import React, { useState } from "react";
import { useFireBase } from "@/context/FireBase";

const page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signinUserWithEmailAndPassword } = useFireBase() || {};
  const firebase = useFireBase();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // if you implement this in your context:
      // await signinUserWithEmailAndPassword(email, password)
      let res = await firebase.signinUserWithEmailAndPassword(email, password);
      alert("Successfully signed in!");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        {/* Illustration Side */}
        <div className="w-1/2 hidden md:block bg-gray-200">
          <img
            src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?fit=crop&w=800&q=80"
            alt="Login illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">
            Welcome Back
          </h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block mb-1 text-gray-600">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block mb-1 text-gray-600">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 cursor-pointer hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Log In
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Don’t have an account?{" "}
            <a href="/signup" className="text-blue-500 hover:underline">
              Sign up
            </a>
          </p>
          <button
            onClick={() => firebase.signinWithGoogle()}
            className="w-full flex items-center justify-center gap-3 bg-white border cursor-pointer border-gray-300 rounded-lg shadow-sm py-3 text-gray-700 font-semibold hover:bg-gray-100 transition duration-300"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google logo"
              className="w-5 h-5"
            />
            Sign in with Google
          </button>
          <button
            onClick={() => firebase.signinWithGithub()}
            className="w-full flex items-center justify-center gap-3 bg-black text-white border border-gray-800 rounded-lg shadow-sm py-3 font-semibold hover:bg-gray-900 transition duration-300 cursor-pointer"
          >
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg"
              alt="GitHub logo"
              className="w-5 h-5 invert"
            />
            Sign in with GitHub
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
