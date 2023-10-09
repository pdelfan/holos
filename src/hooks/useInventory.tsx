import { Database } from "@/lib/database.types";
import { inventoryAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useState } from "react";
import useSWR from "swr";

export default function useInventory() {
  const supabase = createClientComponentClient<Database>();
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const [error, setError] = useState(false);

  const { isLoading, isValidating } = useSWR("getInventory", async () => {
    setError(false);

    const { data: user } = await supabase.auth.getSession();
    const { data: inventory, error } = await supabase
      .from("inventory")
      .select("*")
      .eq("user_id", user.session?.user.id);

    if (error) {
      setError(true);
      return;
    }

    setInventory(inventory ?? []);
  });

  return { inventory, setInventory, error, isLoading, isValidating };
}
