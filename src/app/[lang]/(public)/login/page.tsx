"use client";
import { useEffect, useState } from "react";

import {
  BookOpen,
  Ellipsis,
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
import { toast } from "sonner";
import axios, { AxiosError } from "axios";
import configService from "@/helpers/config"
import {LOGIN, PROFILES} from "@/helpers/url_helper"
import { ErrorMessage, Formik } from 'formik';
import * as Yup from "yup";
import GuestGuard from "@/Auth/GuestGuard";
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import { hasEmptyValue } from "@/helpers";

export default function LoginPage() {
  const t = useTranslations();
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loginType, setLoginType] = useState("TEACHER");
  const [loading, setLoading] = useState(false);

  const handleChangeLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    // إزالة اللغة الحالية من الـ URL
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    // بناء رابط جديد
    router.replace(`/${newLocale}${pathWithoutLocale}`);
  };

  // ______________________________________________________________
  interface LoginFormValues {
    email: string;
    password: string;
  }
  interface LoginResponse {
    status: number;
    message: string;
    data: {
      access_token: string;
      user: {
        id: number;
        lang?: string;
        [key: string]: unknown;
      };
      role?: string;
    };
  }
  const login = async (values: LoginFormValues): Promise<void> => {
    try {
      const { ...payload } = values;

      // تعديل رقم الهاتف والعمر
      // if (phoneLogin) payload.phone = `(${seletedCountry?.code})${payload.phone}`;

      const BASE_URL = configService.apiBaseUrl;
      const { data: res } = await axios.post<LoginResponse>(`${BASE_URL}${LOGIN}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res && res?.status == 1) {
        toast.success(res?.message, {
          duration: 3000,
        });

        // store in session for 5 minutes
        localStorage.setItem("role", JSON.stringify(res?.data?.user));
        localStorage.setItem("authUser", JSON.stringify(res?.data?.user));
        sessionStorage.setItem("authUser", JSON.stringify(res?.data?.user));

        localStorage.setItem("userInfo", JSON.stringify(res?.data?.user));
        localStorage.setItem("access_token", JSON.stringify(res?.data?.access_token));
        localStorage.setItem("I18N_LANGUAGE", res?.data?.user?.lang ?? locale);
        localStorage.setItem("i18nextLng", res?.data?.user?.lang ?? locale);

        const authUser = JSON.parse(localStorage.getItem("authUser") || "{}");
        const accessToken = JSON.parse(localStorage.getItem("access_token") || '""');
        const loginToken = accessToken;
        const idUser = authUser?.id

        if (loginToken || idUser) {
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${loginToken}`;
          axios.defaults.headers.common["login-type"] = loginType;
          const id = idUser;
          try {
            const response = await axios.get(`${BASE_URL}${PROFILES}`, { params: { id }, });
            localStorage.setItem("myInfo", JSON.stringify(response?.data?.data));
            localStorage.setItem("loginType", JSON.stringify(response?.data?.data?.role));
            router.replace("/dashboard");
          } catch (error) {
            // console.error(error.response?.data || error.message);
          }
        }
      } else {
        toast.error(res?.message, { 
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("error", error)
    }
  }

  // ______________________________________________________________

  return (
    <GuestGuard>
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
                <div className="text-center mb-5">
                  <h4 className="text-5xl font-bold text-[#081b4b] mb-4">
                    {t("login.Welcome_Back")}!
                  </h4>

                  <p className="text-gray-500 text-lg">
                    {t("login.Continue_to_Center_Education")}
                  </p>
                </div>
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    email: Yup.string()
                      .email(t("login.EmailIncorrect"))
                      .matches(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        t("login.EmailIncorrect")
                      )
                      .required(t("login.EmailRequired")),
                    password: Yup.string()
                      .required(t("login.passwordValidation"))
                      .min(6, t("login.passwordMinLength")),
                  })}
                  onSubmit={async (values, { resetForm }) => {
                    setLoading(true);
                    try {
                      const payload = {
                        ...values,
                      }
                      setLoading(true);
                      await login(payload);
                    } catch (err) {
                      // toast.error(err, {
                      //   hideProgressBar: false,
                      //   autoClose: 3000,
                      // });
                    } finally {
                      setLoading(false);
                    }
                  }}
                >
                  {({
                    handleSubmit,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    values,
                    isSubmitting,
                    setFieldValue,
                    resetForm,
                  }) => (<>
                    <form
                      onSubmit={handleSubmit}
                      onKeyDown={(event) => {
                        if (event.key === "Enter") {
                          event.preventDefault();
                        }
                      }}
                    >
                      {/* Email */}
                      <div className="mb-5">
                        <label className="block mb-3 font-medium">
                          {t("login.Email_Address")}
                        </label>
                        <div className="flex items-center border rounded-2xl px-4 h-12.5">
                          <Mail className="text-gray-400" />
                          <input
                            name="email"
                            value={values.email}  
                            id="email"
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            onBlur={handleBlur}    
                            type="email"
                            placeholder={`${t("common.Enter")} ${t("login.Email_Address")}`}
                            className="w-full ml-3 outline-none bg-transparent"
                            style={{ marginInlineStart: "calc(var(--spacing) * 3)"}}
                          />
                        </div>
                        {touched?.email && errors?.email && (
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-red-500 font-bold mt-1"
                          />
                        )}
                      </div>

                      {/* Password */}
                      <div>
                        <label className="block mb-2 font-medium">
                          {t("login.Password")}
                        </label>
                        <div className="flex items-center border rounded-2xl px-4 h-12.5">
                          <Lock className="text-gray-400" />
                          <input
                            name="password"
                            value={values.password}
                            onChange={(e) =>
                              setFieldValue("password", e.target.value)
                            }
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
                        {touched?.password && errors?.password && (
                          <ErrorMessage
                            name="password"
                            component="div"
                            className="text-red-500 font-bold mt-1"
                          />
                        )}
                        <div className={`mt-3 ${locale === "en" ? "text-left" : "text-right"}`}>
                          <button className="text-blue-600 hover :underline">
                            {t("login.Forgot Password")}
                          </button>
                        </div>
                      </div>
                      {/* Sign In */}
                      <button 
                        type="submit"
                        disabled={
                          loading ||
                          hasEmptyValue(values)
                        }
                        className="w-full h-12.5 flex items-center justify-center rounded-2xl mt-4 -6 text-white font-semibold text-xl bg-linear-to-r from-blue-700 to-blue-500 hover:opacity-95 transition cursor-pointer"
                      >
                        {loading ? <ButtonLoader height={25} width={30} /> : t("login.Sign_In")}
                      </button>
                    </form>
                  </>)}
                </Formik>

                {/* Sign Up */}
                <div className="text-center mt-4 -8">
                  <span className="text-gray-600">
                    {t("login.Don_t_have_an_account")}
                  </span>
                  <a
                    href="/register"
                    className="ml-2 text-blue-600 font-semibold hover:underline"
                    style={{ marginInlineStart: "calc(var(--spacing) * 2)"}}
                  >
                    {t("login.Sign_Up")}
                  </a>
                </div>
              </div>
            </div>

            {/* Footer */}
            <Footer/>
          </div>
        </div>
      </div>
    </GuestGuard>
  );
}
