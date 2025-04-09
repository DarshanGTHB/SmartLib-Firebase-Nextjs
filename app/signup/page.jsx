'use client'
import React, { useState } from 'react'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: hook into your auth/signup logic
    console.log({ email, password })
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-4xl">
        {/* Image Side */}
        <div className="md:w-1/2">
          <img
            src="https://source.unsplash.com/collection/190727/800x600"
            alt="Signup Illustration"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-8 sm:p-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Create Account</h2>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-gray-600 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-gray-600 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 font-semibold rounded-lg bg-blue-500 hover:bg-blue-600 text-white transition"
            >
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 hover:underline">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
