import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface Props {
  packID: string;
}

export default function useGetPack(props: Props) {
  const { packID } = props;
  const supabase = createClientComponentClient<Database>();
  const [pack, setPack] = useState<Pack | null>(null);

  useEffect(() => {
    const getPack = async () => {
      const { data: user } = await supabase.auth.getSession();
      const { data } = await supabase
        .from("pack")
        .select("*")
        .match({ user_id: user.session?.user.id, id: packID });
      setPack(data ? data[0] : null);
    };
    getPack();
  }, [packID, setPack, supabase]);

  return { pack, setPack };
}
