import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";

import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });
  await supabase.auth.getSession();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // retrieve authorization code from the query parameter
  const nextQueryParam = new URL(req.url).searchParams.get("code");

  // If the user is not in the update password flow and is trying to access /updatePassword, redirect them to /
  if (!nextQueryParam && req.nextUrl.pathname === "/updatePassword") {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to the home page
  }

  // If user is signed in and the current path is not /signUp or /signIn, redirect to /dashboard
  if (user && req.nextUrl.pathname.includes("sign" || "dashboard")) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // If user is not signed in and the current path is not /signUp or /signIn, redirect to /
  if (!user && !req.nextUrl.pathname.includes("sign" || "dashboard")) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return res;
}

export const config = {
  matcher: ["/signIn", "/signUp", "/updatePassword", "/dashboard/:path*"],
};
