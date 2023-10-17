import { Database } from "@/lib/database.types";
import { getCurrencySymbol } from "@/utils/currencyUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

export default function useGetPreferredCurrency(props: {
  showAbbreviation?: boolean;
}) {
  const { showAbbreviation = false } = props;

  const supabase = createClientComponentClient<Database>();
  const [currency, setCurrency] = useState<string | null>(null);

  useEffect(() => {
    const getCurrency = async () => {
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
    };

    getCurrency();
  }, [showAbbreviation, supabase]);

  return { currency, setCurrency };
}
