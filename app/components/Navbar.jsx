"use client";

/**
 * Navbar Component
 *
 * Rationale:
 * - Modern Design: Clean, minimalistic layout with ample whitespace.
 * - Blue Theme: Uses Tailwind's blue palette for a professional, trustworthy feel.
 * - Responsive: Mobile-first, with a collapsible hamburger menu.
 * - Hover Effects: Smooth transition and subtle scale effect on links and buttons.
 * - Accessibility: ARIA attributes for menu toggle, semantic HTML.
 */
/**
 * Navbar Component
 *
 * Rationale:
 * - Modern Design: Clean, minimalistic layout with ample whitespace.
 * - Blue Theme: Uses Tailwind's blue palette for a professional, trustworthy feel.
 * - Responsive: Mobile-first, with a collapsible hamburger menu.
 * - Hover Effects: Smooth transition and subtle scale effect on links and buttons.
 * - Accessibility: ARIA attributes for menu toggle, semantic HTML.
 */

import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useFireBase } from "@/context/FireBase";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const firebase = useFireBase();

  return (
    <nav className="bg-blue-100 text-blue-800 shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo / Brand */}
          <div className="flex items-center space-x-2">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              alt="Logo"
              className="w-8 h-8"
            />
            <Link
              href="/allbooks"
              className="text-2xl font-bold hover:text-blue-500 transition-colors"
            >
              BookVerse
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {["Home", "About", "addlist", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-200 hover:scale-105 transform transition"
              >
                {item}
              </Link>
            ))}

            {/* Auth Buttons */}
            {!firebase.user ? (
              <>
                <Link
                  href="/login"
                  className="ml-4 px-4 py-2 rounded-md bg-white text-blue-600 font-semibold hover:bg-blue-100 transition"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      alt="login"
                      className="w-4 h-4"
                    />
                    <span>Log In</span>
                  </div>
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
                      alt="signup"
                      className="w-4 h-4"
                    />
                    <span>Sign Up</span>
                  </div>
                </Link>
              </>
            ) :
            (
              <>
              <div
                  onClick={() => firebase.signOutUser()}
                  className="px-4 py-2 rounded-md bg-blue-500 text-white font-semibold hover:bg-blue-600 transition"
                >
                  <div className="flex items-center space-x-2">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1828/1828490.png"
                      alt="signup"
                      className="w-4 h-4"
                    />
                    <span>Log Out</span>
                  </div>
                </div>
              </>

            )
            }
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
              className="focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-100 focus:ring-blue-500"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-blue-50 text-blue-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {["Home", "About", "Services", "Contact"].map((item) => (
              <Link
                key={item}
                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                className="block px-3 py-2 rounded-md text-base font-medium hover:bg-blue-100 hover:scale-105 transform transition"
                onClick={() => setIsOpen(false)}
              >
                {item}
              </Link>
            ))}
            <Link
              href="/login"
              className="block px-3 py-2 rounded-md text-base font-semibold bg-white text-blue-600 hover:bg-blue-100 transition"
              onClick={() => setIsOpen(false)}
            >
              Log In
            </Link>
            <Link
              href="/signup"
              className="block px-3 py-2 rounded-md text-base font-semibold bg-blue-500 text-white hover:bg-blue-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
