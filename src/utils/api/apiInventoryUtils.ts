import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const supabase = createClientComponentClient<Database>();

export const deleteItemFromInventory = async (itemID: number) => {
  const { error } = await supabase.from("inventory").delete().eq("id", itemID);
  if (error) {
    toast.error("Couldn't delete this item from inventory.");
    return;
  }
};
