// TODO: Duplicate or move this file outside the `_examples` folder to make it a route

import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";
import toast from "react-hot-toast";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
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
    return NextResponse.redirect("http:localhost:3000/");
  }

  const { data, error } = await supabase.auth.admin.deleteUser(user);

  return NextResponse.redirect("http:localhost:3000/");
}
