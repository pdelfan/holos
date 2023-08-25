import { Database } from "@/lib/database.types";
import { packAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

interface Props {
  packID: string;
}

export default function useGetPack(props: Props) {
  const { packID } = props;
  const supabase = createClientComponentClient<Database>();
  const [pack, setPack] = useAtom(packAtom);

  const { error, isLoading, isValidating } = useSWR("getPack", async () => {
    const { data: user } = await supabase.auth.getSession();
    const { data } = await supabase
      .from("pack")
      .select("*")
      .match({ user_id: user.session?.user.id, id: packID });
    setPack(data ? data[0] : null);
  });

  return { pack, setPack, error, isLoading, isValidating };
}
