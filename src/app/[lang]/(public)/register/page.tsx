"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import GuestGuard from "@/Auth/GuestGuard";
import Footer from "./components/Footer";

import { hasEmptyValue, hasEmptyValueV2, usePageTitle } from "@/helpers";
import { useLocale, useTranslations } from "next-intl";
import LeftSide from "./components/LeftSide";
import { ErrorMessage, Formik } from "formik";
import * as Yup from "yup";
import { Eye, EyeOff, Lock, Mail, Phone, User } from "lucide-react";
import ButtonLoader from "@/components/ButtonLoader/ButtonLoader";
import Select from "react-select";
import { toast } from "sonner";
import axios from "axios";
import PhoneSelect from "@/components/PhoneSelect/PhoneSelect";

import configService from "@/helpers/config"
import { PROFILES, REGISTER } from "@/helpers/url_helper";
import Link from "next/link";


type PhoneCodeItem = {
  id?: number;
  countryName?: string;
  code: string;
};
export default function RegisterPage() {
  const t = useTranslations();
  usePageTitle(t("register.new_account_Centers_Education"));

  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [loginType, setLoginType] = useState("TEACHER");

  const [isChecked, setIsChecked] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState<PhoneCodeItem>({
    id: 251,
    countryName: "Egypt",
    code: "+20",
  });
  // const [selectedCountry, setSelectedCountry] = useState("+20");

  const handleChangeLanguage = () => {
    const newLocale = locale === "ar" ? "en" : "ar";
    // إزالة اللغة الحالية من الـ URL
    const pathWithoutLocale = pathname.replace(/^\/(ar|en)/, "");
    // بناء رابط جديد
    router.replace(`/${newLocale}${pathWithoutLocale}`);
  };

  const Account_type = [
    { name: t("register.Admin"), id: 0, value: "ADMIN" },
    { name: t("register.Teacher"), id: 1, value: "TEACHER" },
    { name: t("register.Student"), id: 2, value: "STUDENT" },
    { name: t("register.Employee"), id: 3, value: "EMPLOYEE" },
    { name: t("register.Assistant"), id: 4, value: "ASSISTANT" },
  ];

  const [initialValues, setInitialValues] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    password: "",
    email: "",
    password_confirmation: "",
    role: Account_type[0],
    age: 0,
    // address: "",
  });
  // ______________________________________________________________
  interface Role {
    name: string;
    id: number;
    value: string;
  }
  interface LoginFormValues {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    password_confirmation: string;
    phone: string;
    role: Role | null;
  }
  type RegisterPayload = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    phone: string;
    role: string | null;
    image_path?: string;
  };
  interface RegisterResponse {
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
  const register = async (values: LoginFormValues) => {
    try {
      const { password_confirmation, ...rest } = values;
      const payload: RegisterPayload = {
        ...rest,
        role: values.role?.value ?? null,
        phone: `(${selectedCountry?.code})${values.phone}`,
        image_path: "null",
      }
      const BASE_URL = configService.apiBaseUrl;
      const res = await axios.post<RegisterResponse>(`${BASE_URL}${REGISTER}`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res && res?.status == 1) {
        toast.success(res?.data?.message, {
          duration: 3000,
        });
        localStorage.setItem("role", JSON.stringify(res?.data?.data?.user));
        localStorage.setItem("authUser", JSON.stringify(res?.data?.data?.user));
        sessionStorage.setItem("authUser", JSON.stringify(res?.data?.data?.user));

        localStorage.setItem("userInfo", JSON.stringify(res?.data?.data?.user));
        if (res?.data?.data?.access_token !== undefined) {
          localStorage.setItem("access_token", JSON.stringify(res?.data?.data?.access_token));
        }
        localStorage.setItem("I18N_LANGUAGE", res?.data?.data?.user?.lang ?? locale);
        localStorage.setItem("i18nextLng", res?.data?.data?.user?.lang ?? locale);

        const authUser = JSON.parse(localStorage.getItem("authUser") || "null");
        const accessToken = JSON.parse(localStorage.getItem("access_token") || "null");
        const loginToken = accessToken;
        const idUser = authUser?.id
        if (!loginToken || !idUser) {
          toast.error(res?.data?.message, {
            duration: 3000,
          });
          return
        }
        if (loginToken || idUser) {
          axios.defaults.headers.common["Authorization"] =
            `Bearer ${loginToken}`;
          axios.defaults.headers.common["login-type"] = loginType;
          const id = idUser;
          try {
            const response = await axios.get(`${BASE_URL}${PROFILES}`, {
              params: { id },
            });
            localStorage.setItem("myInfo", JSON.stringify(response?.data));
            localStorage.setItem("loginType", JSON.stringify(response?.data?.role));
            router.replace("/dashboard");
          } catch (error) {
            // console.error(error.response?.data || error.message);
          }
        }
      } else {
        toast.error(res?.data?.message, {
          duration: 3000,
        });
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <GuestGuard>
      <div dir={locale === "ar" ? "rtl" : "ltr"} className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-4">
        <div className="w-full max-w-7xl 6xl bg-white rounded-[40px] overflow-hidden shadow-xl flex flex-col lg:flex-row">
          {/* _______ Left Side _______ */}
          <LeftSide/>

          {/* _______ Right Side _______ */}
          <div className="lg:w-[70%] bg-[#f8f9fc] flex flex-col p-4 lg:p-6">
            {/* _______ Language _______ */}
            <div className="flex justify-end">
              <button 
                className="w-24 flex items-center justify-center gap-2 border rounded-xl px-4 py-2 bg-white cursor-pointer hover:bg-gray-100 transition"
                onClick={handleChangeLanguage}
              >
                {/* <Globe size={18} /> */}
                {locale === "en" ? "العربية" : "English"}
              </button>
            </div>

            {/* _______ Form _______ */}
            <div className="flex-1 flex items-center justify-center py-6 pb-0">
              <div className="w-full max-w-3xl 2xl xl bg-white rounded-3xl shadow-sm px-10 py-4">
                <div className="text-center mb-5">
                  <h4 className="text-5xl md:text-2xl font-bold text-[#081b4b] mb-4">
                    {t("register.title")}!
                  </h4>

                  <p className="text-gray-500 text-lg">
                    {t("register.seb_Title")}
                  </p>
                </div>
                <Formik<LoginFormValues>
                  initialValues={initialValues}
                  enableReinitialize={true}
                  validationSchema={Yup.object({
                    first_name: Yup.string().required(
                      `${t("register.first_Name")} ${t("common.required")}`
                    ),
                    last_name: Yup.string().required(
                      `${t("register.last_Name")} ${t("common.required")}`
                    ),
                    role: Yup.object().nullable().required(
                      `${t("register.Account_type")} ${t("common.required")}`
                    ),
                    email: Yup.string()
                      .email(t("register.EmailIncorrect"))
                      .matches(
                        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                        t("register.EmailIncorrect")
                      )
                      .required(t("register.EmailRequired")),
                    phone: Yup.string()
                      .required(t("register.mobileNumberValidation"))
                      .matches(
                        /^01\d{9}$/,
                        t("register.enterSaudiCorrectNumber")
                      ),
                    password: Yup.string()
                      .required(t("register.passwordValidation"))
                      .min(6, t("register.passwordMinLength")),
                    password_confirmation: Yup.string()
                      .oneOf(
                        [Yup.ref("password")],
                        t("register.PasswordDoesNotmatch")
                      )
                      .required(
                        t("register.PasswordConfirmationRequired")
                      ),
                  })}
                  onSubmit={async (values, { resetForm }) => {
                    setLoading(true);
                    try {
                      const payload = {
                        ...values,
                      }
                      setLoading(true);
                      await register(payload);
                    } catch (err) {
                      // toast.error(err, {
                      //   position: "top-center",
                      //   hideProgressBar: false,
                      //   autoClose: 3000,
                      //   progress: undefined,
                      //   toastId: "",
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
                    setFieldTouched,
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
                      <div className="lg:flex justify-between gap-3 mb-3">
                        {/* _______ first name _______ */}
                        <div className="lg:w-[50%]">
                          <label className="block mb-3 font-medium">
                            {t("register.first_Name")}
                            <span className="text-red-600 ms-0.5">*</span>
                          </label>
                          <div className="flex items-center border rounded-2xl px-4 h-12.5">
                            <User className="text-gray-400" />
                            <input
                              type="text"
                              name="first_name"
                              title={t("register.first_Name")}
                              id="first_name"
                              placeholder={`${t("common.Enter")} ${t("register.first_Name")}`}
                              value={values.first_name}  
                              onChange={(e) =>
                                setFieldValue("first_name", e.target.value)
                              }
                              onBlur={handleBlur}    
                              className="w-full ml-3 outline-none bg-transparent"
                              style={{ marginInlineStart: "calc(var(--spacing) * 3)"}}
                            />
                          </div>
                          {touched?.first_name && errors?.first_name && (
                            <ErrorMessage
                              name="first_name"
                              component="div"
                              className="text-red-500 font-bold mt-1"
                            />
                          )}
                        </div>
                        {/* _______ last name _______ */}
                        <div className="lg:w-[50%]">
                          <label className="block mb-3 font-medium">
                            {t("register.last_Name")}
                            <span className="text-red-600 ms-0.5">*</span>
                          </label>
                          <div className="flex items-center border rounded-2xl px-4 h-12.5">
                            <User className="text-gray-400" />
                            <input
                              name="last_name"
                              id="last_name"
                              title={t("register.last_Name")}
                              value={values.last_name}  
                              onChange={(e) =>
                                setFieldValue("last_name", e.target.value)
                              }
                              onBlur={handleBlur}    
                              type="text"
                              placeholder={`${t("common.Enter")} ${t("register.last_Name")}`}
                              className="w-full ml-3 outline-none bg-transparent"
                              style={{ marginInlineStart: "calc(var(--spacing) * 3)"}}
                            />
                          </div>
                          {touched?.last_name && errors?.last_name && (
                            <ErrorMessage
                              name="last_name"
                              component="div"
                              className="text-red-500 font-bold mt-1"
                            />
                          )}
                        </div>
                      </div>

                      <div className="lg:flex justify-between gap-3 mb-3">
                        {/* _______ Account type _______ */}
                        <div className="lg:w-[50%]">
                          <label className="block mb-3 font-medium">
                            {t("register.Account_type")}
                            <span className="text-red-600 ms-0.5">*</span>
                          </label>
                          <Select
                            id="role"
                            name="role"
                            placeholder={`${t("common.Select")} ${t("register.Account_type")}`}
                            options={Account_type}
                            getOptionLabel={(option) => option.name}
                            getOptionValue={(option) => String(option.id)}
                            value={
                              Account_type.find((option) => option.id === values?.role?.id) || null
                            }
                            onChange={(option) => {
                              setFieldValue("role", option);
                            }}
                            onBlur={() => setFieldTouched("role", true)}
                            menuPortalTarget={typeof window !== "undefined" ? document.body : null}
                            menuPosition="fixed"
                            isDisabled
                            styles={{
                              control: (base, state) => ({
                                ...base,
                                minHeight: "50px",
                                height: "50px",
                                borderRadius: "16px",
                                borderColor: state.isFocused ? "#2563eb" : "#d1d5db",
                                boxShadow: "none",
                                "&:hover": {
                                  borderColor: "#2563eb",
                                },
                              }),
                              valueContainer: (base) => ({
                                ...base,
                                height: "50px",
                                padding: "0 12px",
                              }),
                              input: (base) => ({
                                ...base,
                                margin: 0,
                                padding: 0,
                              }),
                              indicatorSeparator: () => ({
                                display: "none",
                              }),
                              placeholder: (base) => ({
                                ...base,
                                color: "#9ca3af",
                              }),
                              menuPortal: (base) => ({
                                ...base,
                                zIndex: 9999,
                              }),
                              menu: (base) => ({
                                ...base,
                                direction: `${locale === "ar" ? "rtl" : "ltr"}`,
                                borderRadius: "12px",
                                overflow: "hidden",
                              }),
                            }}
                            classNamePrefix="react-select"
                          />
                          {touched.role && errors.role && (
                            <div className="text-red-500 font-bold mt-1">
                              {errors.role}
                            </div>
                          )}
                        </div>

                        {/* _______ Phone _______ */}
                        <div className="lg:w-[50%]">
                          <label className="block mb-3 font-medium">
                            {t("register.phone")}
                            <span className="text-red-600 ms-0.5">*</span>
                          </label>
                          <div className="flex border rounded-2xl h-12.5">
                            <PhoneSelect
                              selectedCountry={selectedCountry}
                              setSelectedCountry={setSelectedCountry}
                            />
                            <div className="flex items-center pe-4 x-4"
                              style={{
                                [locale === "ar" ? "borderRightWidth" : "borderLeftWidth"]: "1px",
                                [locale === "ar" ? "paddingRight":"paddingLeft"]: "calc(var(--spacing) * 2)"
                              }}
                            >
                              <input
                                type="text"
                                name="phone"
                                title={t("register.phone")}
                                id="phone"
                                placeholder={`${t("common.enter")} ${t("register.phone")} ${t("common.placeholder")}`}
                                value={values.phone}
                                onChange={(e) =>
                                  setFieldValue("phone", e.target.value)
                                }
                                onBlur={handleBlur}
                                className="w-full outline-none bg-transparent"
                                style={{ marginInlineEnd: "calc(var(--spacing) * 3)",}}
                              />
                              <Phone className="text-gray-400" />
                            </div>
                          </div>
                          {touched.phone && errors.phone && (
                            <div className="text-red-500 font-bold mt-1">
                              {errors.phone}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* _______ Email _______ */}
                      <div className="mb-3">
                        <label className="block mb-3 font-medium">
                          {t("register.Email_Address")}
                          <span className="text-red-600 ms-0.5">*</span>
                        </label>
                        <div className="flex items-center border rounded-2xl px-4 h-12.5">
                          <Mail className="text-gray-400" />
                          <input
                            type="email"
                            name="email"
                            title={t("register.Email_Address")}
                            id="email"
                            placeholder={`${t("common.Enter")} ${t("register.Email_Address")}`}
                            value={values.email}  
                            onChange={(e) =>
                              setFieldValue("email", e.target.value)
                            }
                            onBlur={handleBlur}    
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

                      <div className="lg:flex justify-between gap-3">
                        {/* _______ Password _______ */}
                        <div className="lg:w-[50%]">
                          <label className="block mb-2 font-medium">
                            {t("register.password")}
                            <span className="text-red-600 ms-0.5">*</span>
                          </label>
                          <div className="flex items-center border rounded-2xl px-4 h-12.5">
                            <Lock className="text-gray-400" />
                            <input
                              name="password"
                              id="password"
                              title={t("register.password")}
                              value={values.password}
                              onChange={(e) =>
                                setFieldValue("password", e.target.value)
                              }
                              type={showPassword ? "text" : "password"}
                              placeholder={`${t("common.Enter")} ${t("register.password")}`}
                              className="w-full ml -3 outline-none bg-transparent"
                              style={{ marginInlineStart: "calc(var(--spacing) * 3)" }}
                            />
                            {showPassword ? (
                              <Eye className="text-gray-400 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                            ) : (
                              <EyeOff className="text-gray-400 cursor-pointer" onClick={()=> setShowPassword(!showPassword)}/>
                            )}
                          </div>
                          {touched?.password && errors?.password && (
                            <ErrorMessage
                              name="password"
                              component="div"
                              className="text-red-500 font-bold mt-1"
                            />
                          )}
                        </div>

                        {/* _______ Confirm Password _______ */}
                        <div className="lg:w-[50%]">
                          <label className="block mb-2 font-medium">
                            {t("register.confirm_Password")}
                            <span className="text-red-600 ms-0.5">*</span>
                          </label>
                          <div className="flex items-center border rounded-2xl px-4 h-12.5">
                            <Lock className="text-gray-400" />
                            <input
                              name="password_confirmation"
                              id="password_confirmation"
                              title={t("register.confirm_Password")}
                              value={values.password_confirmation}
                              onChange={(e) =>
                                setFieldValue("password_confirmation", e.target.value)
                              }
                              type={showPasswordConfirm ? "text" : "password"}
                              placeholder={`${t("common.Enter")} ${t("register.confirm_Password")}`}
                              className="w-full ml -3 outline-none bg-transparent"
                              style={{ marginInlineStart: "calc(var(--spacing) * 3)" }}
                            />
                            {showPasswordConfirm ? (
                              <Eye className="text-gray-400 cursor-pointer" onClick={()=> setShowPasswordConfirm(!showPasswordConfirm)}/>
                            ) : (
                              <EyeOff className="text-gray-400 cursor-pointer" onClick={()=> setShowPasswordConfirm(!showPasswordConfirm)}/>
                            )}
                          </div>
                          {touched?.password_confirmation && errors?.password_confirmation && (
                            <ErrorMessage
                              name="password_confirmation"
                              component="div"
                              className="text-red-500 font-bold mt-1"
                            />
                          )}
                        </div>
                      </div>

                      {/* _______ terms conditions _______ */}
                      <div className={`mt-3 ${locale === "en" ? "text-left" : "text-right"}`}>
                        <div className="flex items-center ">
                          <input 
                            type="checkbox"
                            name="terms_conditions"
                            id="terms_conditions"
                            style={{
                              marginInlineEnd: "9px",
                              transform: "scale(1.5)",
                            }}
                            checked={isChecked}
                            onChange={(e) => setIsChecked(e.target.checked)}
                          /> 
                          <label
                            htmlFor="terms_conditions"
                            className={` cursor-pointer ${isChecked ? "text-blue-600" : "text-red-600" }`}
                          >
                            {t("register.I_agree")} {" "}
                            <span
                              className="cursor-pointer pb-3 hover:underline transition"
                            >
                              {t("register.Terms_Conditions")}
                            </span>{" "}
                            !{" "}
                          </label>
                        </div>
                      </div>
                    
                      {/* Sign In */}
                      <button 
                        type="submit"
                        disabled={
                          loading
                          || !isChecked
                          || hasEmptyValueV2(values)
                        }
                        className="w-full h-12 flex items-center justify-center rounded-2xl mt-4 -6 text-white font-semibold text-xl bg-linear-to-r from-blue-700 to-blue-500 hover:opacity-95 transition cursor-pointer"
                      >
                        {loading ? <ButtonLoader height={25} width={30} /> : t("register.Create_Account")}
                      </button>
                    </form>
                  </>)}
                </Formik>

                {/* Sign Up */}
                <div className="text-center mt-4 -8">
                  <span className="text-gray-600">
                    {t("register.Already_have_an_account")}
                  </span>
                  <Link
                    href="/login"
                    className="ml-2 text-blue-600 font-semibold hover:underline"
                    style={{ marginInlineStart: "calc(var(--spacing) * 2)"}}
                  >
                    {t("register.Sign_In")}
                  </Link>
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