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
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import Footer from "./components/Footer";
import LeftSide from "./components/LeftSide";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const handleChangeLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    // إزالة اللغة الحالية من الـ URL
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    // بناء رابط جديد
    router.replace(`/${newLocale}${pathWithoutLocale}`);
  };


  return (
    <div dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-4">
      <div className="w-full max-w-6xl bg-white rounded-[40px] overflow-hidden shadow-xl flex flex-col lg:flex-row">
        {/* Left Side */}
        <LeftSide/>

        {/* Right Side */}
        <div className="lg:w-[65%] bg-[#f8f9fc] flex flex-col p-4 lg:p-6">
          {/* Language */}
          <div className="flex justify-end">
            <button 
              className="w-24 flex items-center justify-center gap-2 border rounded-xl px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 transition"
              onClick={handleChangeLanguage}
            >
              {/* <Globe size={18} /> */}
              {locale === "en" ? "العربية" : "English"}
            </button>
          </div>

          {/* Form */}
          <div className="flex-1 flex items-center justify-center py-6 pb-0">
            <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm px-10 py-4">
              <div className="text-center mb-8">
                <h4 className="text-5xl font-bold text-[#081b4b] mb-4">
                  {t("login.Welcome_Back")}!
                </h4>

                <p className="text-gray-500 text-lg">
                  {t("login.Continue_to_Center_Education")}
                </p>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block mb-3 font-medium">
                  {t("login.Email_Address")}
                </label>

                <div className="flex items-center border rounded-2xl px-4 h-15">
                  <Mail className="text-gray-400" />

                  <input
                    type="email"
                    placeholder={`${t("common.Enter")} ${t("login.Email_Address")}`}
                    className="w-full ml-3 outline-none bg-transparent"
                    style={{ marginInlineStart: "calc(var(--spacing) * 3)"}}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block mb-2 font-medium">
                  {t("login.Password")}
                </label>

                <div className="flex items-center border rounded-2xl px-4 h-15">
                  <Lock className="text-gray-400" />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder={`${t("common.Enter")} ${t("login.Password")}`}
                    className="w-full ml -3 outline-none bg-transparent"
                    style={{ marginInlineStart: "calc(var(--spacing) * 3)" }}
                  />
                  {showPassword ? (
                    <EyeOff className="text-gray-400 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                  ) : (
                    <Eye className="text-gray-400 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                  )}
                </div>

                <div className={`mt-3 ${locale === "en" ? "text-left" : "text-right"}`}>
                  <button className="text-blue-600 hover :underline">
                    {t("login.Forgot Password")}
                  </button>
                </div>
              </div>

              {/* Sign In */}
              <button className="w-full h-15 rounded-2xl mt-6 text-white font-semibold text-xl bg-linear-to-r from-blue-700 to-blue-500 hover:opacity-95 transition cursor-pointer">
                {t("login.Sign_In")}
              </button>

              {/* Sign Up */}
              <div className="text-center mt-8">
                <span className="text-gray-600">
                  {t("login.Don_t_have_an_account")}
                </span>

                <button className="ml-2 text-blue-600 font-semibold hover:underline"
                  style={{ marginInlineStart: "calc(var(--spacing) * 2)"}}
                >
                  {t("login.Sign_Up")}
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <Footer/>
        </div>
      </div>
    </div>
  );
}
