import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

interface Props {
  packID: string;
}

export default function useGetSharedPackData(props: Props) {
  const { packID } = props;
  const supabase = createClientComponentClient<Database>();
  const [packData, setPackData] = useState<GroupData[] | null>(null);

  const { error, isLoading, isValidating } = useSWR(
    [`getSharedPackData${packID}`, `${packID}`],
    async () => {
      if (packID === "") return;
      const { data: groups } = await supabase
        .from("group")
        .select("*, pack_item(*, inventory(*))")
        .match({ pack_id: packID });

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