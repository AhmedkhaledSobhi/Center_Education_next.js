"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-linear-to-br from-indigo-900 via-purple-900 to-pink-900 text-white">

      {/* 🔵 Floating Blobs */}
      <div className="absolute w-72 h-72 bg-pink-500 rounded-full blur-3xl opacity-30 top-10 left-10 animate-pulse"></div>
      <div className="absolute w-96 h-96 bg-indigo-500 rounded-full blur-3xl opacity-30 bottom-10 right-10 animate-pulse"></div>

      {/* 🔷 Glass Card */}
      <div className="relative z-10 backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-10 text-center shadow-2xl max-w-md w-full">

        {/* 404 */}
        <h1 className="text-8xl font-extrabold tracking-widest bg-clip-text text-transparent bg-linear-to-br from-pink-400 to-indigo-400">
          404
        </h1>

        {/* Title */}
        <h2 className="mt-4 text-2xl font-semibold">
          Lost in Space 🚀
        </h2>

        {/* Description */}
        <p className="mt-3 text-gray-300 text-sm leading-relaxed">
          The page you're looking for doesn’t exist or has been moved.
          Maybe it got lost in another galaxy.
        </p>

        {/* Buttons */}
        <div className="mt-6 flex gap-3 justify-center">
          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl bg-white text-black font-medium hover:scale-105 transition"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-5 py-2.5 rounded-xl border border-white/30 hover:bg-white/10 transition"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}