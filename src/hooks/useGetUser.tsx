import { Database } from "@/lib/database.types";
import {
  User,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useGetUser() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const getUser = async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!user.session?.user.email) {
        router.push("/");
        return;
      }
      setUser(user.session.user);
    };
    getUser();
  }, [router, supabase.auth]);

  return { user };
}
