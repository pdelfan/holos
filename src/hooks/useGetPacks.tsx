import { Database } from "@/lib/database.types";
import { packsAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

export default function useGetPacks() {
  const supabase = createClientComponentClient<Database>();
  const [packs, setPacks] = useAtom(packsAtom);

  const { error, isLoading, isValidating } = useSWR("getPacks", async () => {
    const { data: user } = await supabase.auth.getSession();
    const { data: packs } = await supabase
      .from("pack")
      .select("*")
      .eq("user_id", user.session?.user.id);
    setPacks(packs ?? []);
  });

  return { packs, setPacks, error, isLoading, isValidating };
}
