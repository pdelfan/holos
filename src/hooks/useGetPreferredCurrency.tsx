import { Database } from "@/lib/database.types";
import { currencyAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

export default function useGetPreferredCurrency() {
  const supabase = createClientComponentClient<Database>();
  const [currency, setCurrency] = useAtom(currencyAtom);

  const { error, isLoading, isValidating } = useSWR(
    "getPreferredCurrency",
    async () => {
      const { data: user } = await supabase.auth.getSession();
      const { data: currency } = await supabase
        .from("user")
        .select("preferred_currency")
        .eq("id", user.session?.user.id);
      if (currency) {
        setCurrency(currency[0].preferred_currency);
      } else {
        setCurrency("$");
      }
    }
  );

  return { currency, setCurrency, error, isLoading, isValidating };
}
