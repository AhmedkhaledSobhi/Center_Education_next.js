/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",       // لو تستخدم app directory
    "./src/pages/**/*.{js,ts,jsx,tsx}",     // لو تستخدم pages directory
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "red",  // اللون الجديد اللي طلبته
      },
    },
  },
  plugins: [],
};