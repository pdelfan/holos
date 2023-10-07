import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface UserData {
  name: string | null;
  avatar_url: string | null;
}

export default function useGetUserData() {
  const supabase = createClientComponentClient<Database>();
  const [userData, setUserData] = useState<UserData>();

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user.email) return;

      const { data: user } = await supabase
        .from("user")
        .select("name, avatar_url")
        .eq("id", data.session.user.id);

      if (user) {
        setUserData(user[0]);
      }
    };

    getUserData();
  }, [supabase]);

  return { userData, setUserData };
}
