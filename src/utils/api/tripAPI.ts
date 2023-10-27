import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";

const supabase = createClientComponentClient<Database>();

export const deleteTripItem = async (id: number) => {
  const { error } = await supabase.from("trip").delete().eq("id", id);
  if (error) {
    toast.error("Couldn't delete this item from trips.");
    return;
  }
};
