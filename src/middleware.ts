import { type NextRequest, NextResponse } from "next/server";
import { match } from "@formatjs/intl-localematcher";
// @ts-ignore
import Negotiator from "negotiator";

const locales = ["en", "ja"];

function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("Accept-Language");
  const headers = { "accept-language": acceptLanguage };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, "en");
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`,
  );

  if (pathnameHasLocale) return;

  const locale = getLocale(request);
  console.log(locale);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: [
    // Skip all internal paths (_next)
    "/((?!_next).*)",
    // Optional: only run on root (/) URL
    // '/'
  ],
};
