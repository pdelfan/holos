import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function useGetPack(packID: string) {
  const supabase = createClientComponentClient<Database>();
  const [pack, setPack] = useState<Pack | null>(null);
  const [isLoadingPack, setIsLoadingPack] = useState(true);

  useEffect(() => {
    setIsLoadingPack(true);
    const getPack = async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!user.session) {
        return;
      }
      const { data } = await supabase
        .from("pack")
        .select("*")
        .match({ user_id: user.session?.user.id, id: packID });
      setPack(data ? data[0] : null);
      setIsLoadingPack(false);
    };
    getPack();
  }, [packID, setPack, supabase]);

  return { pack, setPack, isLoadingPack };
}
