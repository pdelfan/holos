import { Database } from "@/lib/database.types";
import { groupsAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

interface Props {
  packID: string;
}

export default function useGetGroups(props: Props) {
  const { packID } = props;
  const supabase = createClientComponentClient<Database>();
  const [groups, setGroups] = useAtom(groupsAtom);

  const { error, isLoading, isValidating } = useSWR("getGroups", async () => {
    const { data: user } = await supabase.auth.getSession();
    const { data: groups } = await supabase
      .from("group")
      .select("*")
      .match({ user_id: user.session?.user.id, pack_id: packID });
    setGroups(groups ?? []);
  });

  return { groups, setGroups, error, isLoading, isValidating };
}
