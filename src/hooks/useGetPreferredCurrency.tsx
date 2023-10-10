import { Database } from "@/lib/database.types";
import { currencyAtom } from "@/store/store";
import { getCurrencySymbol } from "@/utils/currencyUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

export default function useGetPreferredCurrency(props: {
  showAbbreviation?: boolean;
}) {
  const { showAbbreviation = false } = props;

  const supabase = createClientComponentClient<Database>();
  const [currency, setCurrency] = useAtom(currencyAtom);

  const { error, isLoading, isValidating } = useSWR(
    "getPreferredCurrency",
    async () => {
      const { data: user } = await supabase.auth.getSession();
      if (!user.session) {
        return;
      }

      const { data: currency } = await supabase
        .from("user")
        .select("preferred_currency")
        .eq("id", user.session?.user.id);
      if (currency) {
        setCurrency(
          showAbbreviation
            ? currency[0].preferred_currency
            : getCurrencySymbol(currency[0].preferred_currency)
        );
      } else {
        setCurrency("USD");
      }
    }
  );

  return { currency, setCurrency, error, isLoading, isValidating };
}
