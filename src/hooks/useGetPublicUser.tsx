import { Database } from "@/lib/database.types";
import { extractUsername } from "@/utils/textUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  shareID: string;
}

export default function useGetPublicUser(props: Props) {
  const { shareID } = props;
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [preferredCurrency, setPreferredCurrency] = useState<string>("$");

  useEffect(() => {
    const getUser = async () => {
      const { data: user, error } = await supabase
        .from("pack")
        .select("user (email, name, avatar_url, preferred_currency)")
        .eq("share_id", shareID);

      if (error) {
        toast.error("Couldn't get user.");
        return;
      }

      if (user && user[0]?.user?.name) {
        setUser(user[0].user.name);
      }

      if (user && !user[0]?.user?.name && user[0]?.user?.email) {
        setUser(extractUsername(user[0].user.email));
      }

      if (user && user[0]?.user?.avatar_url) {
        setAvatar(user[0].user.avatar_url);
      }

      setPreferredCurrency(user[0]?.user?.preferred_currency ?? "$");
    };

    getUser();
  }, [shareID, supabase]);

  return { user, avatar, preferredCurrency };
}
