import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function useGetUsername() {
  const supabase = createClientComponentClient<Database>();
  const [name, setName] = useState<string | null>(null);

  useEffect(() => {
    const getUsername = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session?.user.email) return;

      const { data: user } = await supabase
        .from("user")
        .select("name")
        .eq("id", data.session.user.id);

      if (user) {
        setName(user[0].name);
      }
    };

    getUsername();
  }, [supabase]);

  return { name, setName };
}
