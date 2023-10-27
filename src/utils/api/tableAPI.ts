import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const supabase = createClientComponentClient<Database>();

export const updateChangedItems = async (
  changedItems: PackItemWithoutInventory[]
) => {
  const { error } = await supabase.from("pack_item").upsert(changedItems);

  if (error) {
    toast.error("Couldn't update new positions.");
    return;
  }
};

export const deleteItem = async (id: number) => {
  const { error } = await supabase.from("pack_item").delete().eq("id", id);
  if (error) {
    toast.error("Couldn't delete this item.");
    return;
  }
};
