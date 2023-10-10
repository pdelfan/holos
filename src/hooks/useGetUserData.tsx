import { Database } from "@/lib/database.types";
import { userDataAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useEffect } from "react";

export default function useGetUserData() {
  const supabase = createClientComponentClient<Database>();
  const [userData, setUserData] = useAtom(userDataAtom);

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user.email) return;

      const { data: user } = await supabase
        .from("user")
        .select("name, avatar_url, email, id")
        .eq("id", data.session.user.id);

      if (user) {
        setUserData(user[0]);
      }
    };

    getUserData();
  }, [setUserData, supabase]);

  return { userData, setUserData };
}
