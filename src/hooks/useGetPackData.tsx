import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

interface Props {
  id: string;
  isShared?: boolean;
}

export default function useGetPackData(props: Props) {
  const { id, isShared = false } = props;
  const supabase = createClientComponentClient<Database>();
  const [packData, setPackData] = useState<GroupData[] | null>(null);

  const { error, isLoading, isValidating } = useSWR(
    [`getPackData${id}`, `${id}`],
    async () => {
      if (id === "") return;
      const { data: user } = await supabase.auth.getSession();
      if (!isShared && !user.session) {
        return;
      }

      const matchCondition = isShared
        ? { pack_id: id }
        : { pack_id: id, user_id: user.session?.user.id };

      const { data: groups } = await supabase
        .from("group")
        .select("*, pack_item(*, inventory(*))")
        .match(matchCondition);

      setPackData(groups as GroupData[]);
    }
  );

  return {
    packData,
    setPackData,
    errorPackData: error,
    isLoadingPackData: isLoading,
  };
}
