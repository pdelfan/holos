import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

interface Props {
  groupID: number;
}

export default function useGetGroupData(props: Props) {
  const { groupID } = props;
  const supabase = createClientComponentClient<Database>();
  const [groupData, setGroupData] = useState<PackItem[] | []>([]);

  const { error, isLoading, isValidating } = useSWR(
    `getGroupData${groupID}`,
    async () => {
      const { data } = await supabase
        .from("pack_item")
        .select(
          "*, inventory ( id, title, description, image_url, price, weight, weight_unit )"
        )
        .match({ group_id: groupID });
      setGroupData(data as PackItem[]);      
    }
  );

  return { groupData, setGroupData, error, isLoading, isValidating };
}
