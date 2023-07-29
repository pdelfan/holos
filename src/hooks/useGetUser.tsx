import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

export default function useGetUser() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState("");

  const { error, isLoading, isValidating } = useSWR("getUser", async () => {
    const { data: user } = await supabase.auth.getSession();
    if (!user.session?.user.email) return;
    setUser(user.session.user.email);
  });

  return { user, error, isLoading, isValidating };
}
