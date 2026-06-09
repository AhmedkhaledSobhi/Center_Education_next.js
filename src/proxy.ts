import createMiddleware from 'next-intl/middleware';
import {routing} from './i18n/routing';
import { NextResponse, NextRequest } from "next/server";

// export default createMiddleware({
//   ...routing,
//   localeDetection: false
// });


// export const config = {
//   matcher: ['/((?!api|_next|.*\\..*).*)']
// };
// ______________________________________


const intlMiddleware = createMiddleware({
  ...routing,
  localeDetection: false,
});

export default function middleware(req: Request) {
  const url = new URL(req.url);
  const pathname = url.pathname;

  const token = req.headers.get("cookie")?.includes("access_token");

  const isLoginPage = pathname.includes("/login");
  const isDashboardPage = pathname.includes("/dashboard");

  // if (!token && isDashboardPage) {
  //   return NextResponse.redirect(new URL("/login", req.url));
  // }

  // if (token && isLoginPage) {
  //   return NextResponse.redirect(new URL("/dashboard", req.url));
  // }

  return intlMiddleware(req as any);
}

// ______________________________________

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};