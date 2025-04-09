'use client'
import React, { useState } from 'react'
import { useFireBase } from '@/context/FireBase' 

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const firebase = useFireBase();
//   console.log(firebase);

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log({ email, password });
    let res = await firebase.signupUserWithEmailAndPassword(email, password);
    alert('Successfully signed up!');

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="flex w-full max-w-4xl bg-white shadow-2xl rounded-2xl overflow-hidden">
        
        {/* Image Side */}
        <div className="w-1/2 hidden md:block bg-blue-100">
          <img
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?fit=crop&w=800&q=80"
            alt="Sign up visual"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form Side */}
        <div className="w-full md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block mb-1 text-gray-600" htmlFor="email">Email</label>
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
              <label className="block mb-1 text-gray-600" htmlFor="password">Password</label>
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
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition duration-300"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">Log in</a>
          </p>

        </div>
      </div>
    </div>
  )
}
