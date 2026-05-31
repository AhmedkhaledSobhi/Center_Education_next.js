"use client";
import { useState } from "react";

import {
  BookOpen,
  Eye,
  EyeOff,
  Globe,
  GraduationCap,
  Lock,
  Mail,
  Trophy,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [lang, setLang] = useState("ar");
  return (
    <div
      dir="ltr"
      className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-4"
    >
      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-xl flex flex-col lg:flex-row">
        {/* Left Side */}
        <div
          className="lg:w-[35%] text-white p-12 flex flex-col justify-between"
          style={{
            background:
              "linear-gradient(180deg,#001a4d 0%,#003b9e 100%)",
          }}
        >
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center">
                <GraduationCap size={36} />
              </div>

              <div>
                <h1 className="text-5xl font-bold tracking-wide">
                  CENTER
                </h1>

                <p className="text-xl tracking-[15px]">
                  ACADEMY
                </p>
              </div>
            </div>

            <div className="w-16 h-1 bg-blue-400 mb-4" />

            <h3 className="text-4xl font-bold leading-tight mb-8">
              Learn Today,
              <br />
              <span className="text-blue-400">
                Lead Tomorrow.
              </span>
            </h3>

            <p className="text-xl text-gray-300 max-w-md">
              Center Academy is your gateway to quality
              education, real skills, and a brighter future.
            </p>
          </div>

          <div className="space-y-7 mt-10">
            <Feature
              icon={<GraduationCap />}
              title="Expert Instructors"
              desc="Learn from industry experts and passionate educators."
            />

            <Feature
              icon={<BookOpen />}
              title="Quality Courses"
              desc="Access a wide range of high-quality courses."
            />

            <Feature
              icon={<Trophy />}
              title="Achieve Your Goals"
              desc="Gain the knowledge and skills to achieve your dreams."
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:w-[65%] bg-[#f8f9fc] flex flex-col p-4 lg:p-6">
          {/* Language */}
          <div className="flex justify-end">
            <button 
              // className="flex items-center gap-2 border rounded-xl px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 transition" 
              className="w-24 flex items-center justify-center gap-2 border rounded-xl px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 transition"

              onClick={()=> setLang(lang === "ar" ? "en" : "ar")}
            >
              {/* <Globe size={18} /> */}
              {/* {lang === "ar" ? "Arabic" : "English"} */}
              {lang === "ar" ? "العربية" : "English"}
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 flex items-center justify-center py-6 pb-0">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm px-10 py-4">
              <div className="text-center mb-8">
                <h4 className="text-5xl font-bold text-[#081b4b] mb-4">
                  Welcome Back!
                </h4>

                <p className="text-gray-500 text-lg">
                  Sign in to continue to Center Academy
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block mb-3 font-medium">
                  Email Address
                </label>

                <div className="flex items-center border rounded-2xl px-4 h-15">
                  <Mail className="text-gray-400" />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full ml-3 outline-none bg-transparent"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 font-medium">
                  Password
                </label>

                <div className="flex items-center border rounded-2xl px-4 h-15">
                  <Lock className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="w-full ml-3 outline-none bg-transparent"
                  />
                  {showPassword ? (
                    <EyeOff className="text-gray-400 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                  ) : (
                    <Eye className="text-gray-400 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                  )}
                </div>

                <div className="text-right mt-3">
                  <button className="text-blue-600 hover:underline">
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Sign In */}
              <button className="w-full h-15 rounded-2xl mt-6 text-white font-semibold text-xl bg-gradient-to-r from-blue-700 to-blue-500 hover:opacity-95 transition">
                Sign In
              </button>

              {/* Sign Up */}
              <div className="text-center mt-8">
                <span className="text-gray-600">
                  Don't have an account?
                </span>

                <button className="ml-2 text-blue-600 font-semibold hover:underline">
                  Sign Up
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="pt-4">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center gap-3 text-gray-500">
                <GraduationCap
                  size={28}
                  className="text-[#0B2A6F]"
                />

                <span>
                  © 2026 Center Academy. All rights reserved.
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-3 text-blue-600 font-medium">
                <a
                  // href="/privacy-policy"
                  className="hover:underline"
                >
                  Privacy Policy
                </a>

                <span className="text-gray-400">|</span>

                <a
                  // href="/terms-of-use"
                  className="hover:underline"
                >
                  Terms of Use
                </a>

                <span className="text-gray-400">|</span>

                <a
                  // href="/contact-us"
                  className="hover:underline"
                >
                  Contact Us
                </a>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

function Feature({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="w-14 h-14 rounded-full bg-blue-600/30 flex items-center justify-center shrink-0">
        {icon}
      </div>

      <div>
        <h4 className="font-semibold text-lg">
          {title}
        </h4>

        <p className="text-gray-300 text-sm max-w-xs">
          {desc}
        </p>
      </div>
    </div>
  );
}