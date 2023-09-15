import { Database } from "@/lib/database.types";
import { groupsAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useState } from "react";
import useSWR from "swr";

interface Props {
  groupID: string;
}

export default function useGetGroupData(props: Props) {
  const { groupID } = props;
  const supabase = createClientComponentClient<Database>();
  const [group, setGroup] = useState<PackItem[] | []>([]);

  const { error, isLoading, isValidating } = useSWR(
    "getGroupData",
    async () => {
      const { data: user } = await supabase.auth.getSession();
      const { data: group } = await supabase
        .from("pack_item")
        .select("*")
        .match({ user_id: user.session?.user.id, group_id: groupID });
      setGroup(group ?? []);
    }
  );

  return { group, setGroup, error, isLoading, isValidating };
}
