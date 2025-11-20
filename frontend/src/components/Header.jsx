import React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="w-full px-8 py-4 flex items-center justify-between">

        {/* Left: Logo + Branding */}
        <Link to="/" className="flex items-center gap-3 group">
          <div
            className="w-11 h-11 rounded-xl bg-gradient-to-tr
            from-indigo-600 to-blue-500 flex items-center justify-center
            text-white font-bold text-xl shadow hover:shadow-md
            transition-all group-hover:scale-110"
          >
            TL
          </div>

          <div>
            <h1 className="text-xl font-semibold text-gray-900 group-hover:text-indigo-600 transition-colors">
              TinyLink
            </h1>
            <p className="text-xs text-gray-500 tracking-wide">
              Shorten • Share • Track
            </p>
          </div>
        </Link>

        {/* Right Section */}
        <div className="flex items-center gap-8">
          <Link
            to="/"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white
            text-sm font-medium shadow hover:bg-indigo-700
            transition-all hover:shadow-md"
          >
            Dashboard
          </Link>
        </div>
      </div>
    </header>
  );
}
