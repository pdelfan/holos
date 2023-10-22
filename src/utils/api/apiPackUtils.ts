import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const supabase = createClientComponentClient<Database>();

export const deletePack = async (id: number) => {
  const { error } = await supabase.from("pack").delete().eq("id", id);
  if (error) {
    toast.error("Couldn't delete this pack.");
    return;
  }
};

export const updateGroupPositions = async (chagnedGroups: Group[]) => {
  const { error } = await supabase.from("group").upsert(chagnedGroups);
  if (error) {
    toast.error("Couldn't update new positions.");
    return;
  }
};

export const deleteGroup = async (groupID: number, packData: GroupData[]) => {
  if (!packData) return;
  const { error } = await supabase.from("group").delete().eq("id", groupID);
  if (error) {
    toast.error("Couldn't delete this group.");
    return;
  }
};

export const updatePackTotals = async (
  packID: number,
  newTotals: PackSummary
) => {
  const { error } = await supabase
    .from("pack")
    .update({
      total_cost: newTotals.total_cost,
      total_items: newTotals.total_items,
      base_weight: newTotals.base_weight,
      total_weight: newTotals.total_weight,
    })
    .eq("id", packID);
  if (error) {
    toast.error("Couldn't update pack totals.");
    return;
  }
};
