import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface Props {
  shareID: string;
}

export default function useGetSharedPack(props: Props) {
  const { shareID } = props;
  const supabase = createClientComponentClient<Database>();
  const [pack, setPack] = useState<Pack | null>(null);

  useEffect(() => {
    const getPack = async () => {
      const { data: user } = await supabase.auth.getSession();
      const { data } = await supabase
        .from("pack")
        .select("*")
        .match({ user_id: user.session?.user.id, share_id: shareID });
      setPack(data ? data[0] : null);
    };
    getPack();
  }, [shareID, setPack, supabase]);

  return { pack, setPack };
}
