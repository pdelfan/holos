import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface Props {
  id: string;
  isShared?: boolean;
}

export default function useGetPack(props: Props) {
  const { id, isShared } = props;
  const supabase = createClientComponentClient<Database>();
  const [pack, setPack] = useState<Pack | null>(null);
  const [isLoadingPack, setIsLoadingPack] = useState(true);

  useEffect(() => {
    setIsLoadingPack(true);
    const getPack = async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!isShared && !user.session) {
        return;
      }

      const matchCondition = isShared
        ? { share_id: id }
        : { user_id: user.session?.user.id, id: id };

      const { data } = await supabase
        .from("pack")
        .select("*")
        .match(matchCondition);
      if (data) {
        if (data[0].is_public || !isShared) {
          setPack(data[0]);
        } else {
          setPack(null);
        }
      }
      setIsLoadingPack(false);
    };
    getPack();
  }, [id, isShared, supabase]);

  return { pack, setPack, isLoadingPack };
}
