import { Database } from "@/lib/database.types";
import { inventoryAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

export default function useGetInventory() {
  const supabase = createClientComponentClient<Database>();
  const [inventory, setInventory] = useAtom(inventoryAtom);

  const { error, isLoading, isValidating } = useSWR(
    "getInventory",
    async () => {
      const { data: user } = await supabase.auth.getSession();
      const { data: inventory } = await supabase
        .from("inventory")
        .select("*")
        .eq("user_id", user.session?.user.id);
      setInventory(inventory ?? []);
    }
  );

  return { inventory, setInventory, error, isLoading, isValidating };
}
