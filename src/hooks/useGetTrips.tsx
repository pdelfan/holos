import { Database } from "@/lib/database.types";
import { tripsAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

export default function useGetTrips() {
  const supabase = createClientComponentClient<Database>();
  const [trips, setTrips] = useAtom(tripsAtom);

  const { error, isLoading, isValidating } = useSWR("getTrips", async () => {
    const { data: user } = await supabase.auth.getSession();
    const { data: trips } = await supabase
      .from("trip")
      .select("*")
      .eq("user_id", user.session?.user.id);
    setTrips(trips ?? []);
  });

  return { trips, setTrips, error, isLoading, isValidating };
}
