import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function useGetUser() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!user.session?.user.email) return;
      setUser(user.session.user.email);
    };
    getUser();
  }, [supabase.auth]);

  return { user };
}
