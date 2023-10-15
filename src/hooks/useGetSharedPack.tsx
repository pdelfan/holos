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
      const { data } = await supabase
        .from("pack")
        .select("*")
        .match({ share_id: shareID });

      if (data && data[0].is_public) {
        setPack(data[0]);
      } else {
        setPack(null);
      }
    };
    getPack();
  }, [shareID, setPack, supabase]);

  return { pack, setPack };
}
