import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const requestUrl = new URL(req.url);
  const user = requestUrl.searchParams.get("user");

  const supabase = createClient(
    `${process.env.NEXT_PUBLIC_SUPABASE_URL}`,
    `${process.env.SERVICE_ROLE_KEY}`,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
  if (!user) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/notify?message=notDeleted`,
      {
        statusText: "Account was not deleted",
        status: 301,
      }
    );
  }

  const { data, error } = await supabase.auth.admin.deleteUser(user);

  if (error) {
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_SITE_URL}/notify?message=notDeleted`,
      {
        statusText: "Account was not deleted",
        status: 301,
      }
    );
  }

  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_SITE_URL}/notify?message=deleted`,
    {
      statusText: "Account deleted",
      status: 301,
    }
  );
}
