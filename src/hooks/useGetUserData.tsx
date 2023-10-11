import { Database } from "@/lib/database.types";
import { userDataAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function useGetUserData() {
  const supabase = createClientComponentClient<Database>();
  const [userData, setUserData] = useAtom(userDataAtom);
  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.push("/");
        return;
      }

      const { data: user } = await supabase
        .from("user")
        .select("name, avatar_url, email, id, preferred_currency")
        .eq("id", data.session.user.id);

      if (user) {
        setUserData(user[0]);
      }
    };

    getUserData();
  }, [router, setUserData, supabase]);

  return { userData, setUserData };
}
