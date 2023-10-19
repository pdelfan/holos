import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

export default function useGetPackData(packID: string) {
  const supabase = createClientComponentClient<Database>();
  const [packData, setPackData] = useState<GroupData[] | null>(null);

  const { error, isLoading, isValidating } = useSWR(
    [`getPackData${packID}`, `${packID}`],
    async () => {
      if (packID === "") return;
      const { data: user } = await supabase.auth.getSession();
      if (!user.session) {
        return;
      }

      const { data: groups } = await supabase
        .from("group")
        .select("*, pack_item(*, inventory(*))")
        .match({ pack_id: packID, user_id: user.session?.user.id });

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
