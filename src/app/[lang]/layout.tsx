import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import "../../assets/styles/scss/main.scss"
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Center Education",
    template: "%s | Center Education",
  },
  description: "Center Education is a modern education platform offering courses, training programs, and professional learning experiences.",
  keywords: [
    "education",
    "courses",
    "training",
    "online learning",
    "Center Education",
  ]
};

export async function generateStaticParams() {
  return routing.locales.map((lang) => ({ lang }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const { lang } = params;

  const messages = await getMessages({ locale: lang });

  return (
    <NextIntlClientProvider messages={messages}>
      <div
        dir={lang === "ar" ? "rtl" : "ltr"}
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased min-h-full flex flex-col`}
      >
        {children}
      </div>
    </NextIntlClientProvider>
  );
}



