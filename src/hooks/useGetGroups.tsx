import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface Props {
  packID: string;
}

export default function useGetGroups(props: Props) {
  const { packID } = props;
  const supabase = createClientComponentClient<Database>();
  const [groups, setGroups] = useState<Group[] | []>([]);

  useEffect(() => {
    const getGroupData = async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!user.session) {
        return;
      }
      
      const { data: groups } = await supabase
        .from("group")
        .select("*")
        .match({ user_id: user.session?.user.id, pack_id: packID });
      setGroups(groups ?? []);
    };

    getGroupData();
  }, [packID, supabase]);

  return { groups, setGroups };
}
