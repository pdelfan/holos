import { Database } from "@/lib/database.types";
import { User, createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function useGetUser() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!user.session?.user.email) return;
      setUser(user.session.user);
    };
    getUser();
  }, [supabase.auth]);

  return { user };
}
