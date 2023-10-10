import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";

interface Props<T> {
  itemPerPage: number;
  data: T;
  setData: (value: T) => void;
  table: string;
}

export default function useFetchDB<T extends Record<string, any>>(
  props: Props<T>
) {
  const { table, itemPerPage, data, setData } = props;
  const supabase = createClientComponentClient<Database>();
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    const getCount = async () => {
      const { data: user } = await supabase.auth.getSession();
      const { count } = await supabase
        .from("inventory")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.session?.user.id);
      setTotalItems(count ?? 0);
    };
    getCount();
  }, [supabase]);

  useEffect(() => {
    const getData = async () => {
      setError(false);

      const from = pageIndex * itemPerPage;
      const to = from + itemPerPage - 1; // adjust the range to exclude the extra item

      const { data: user } = await supabase.auth.getSession();
      const { data: fetchedData, error } = await supabase
        .from(table)
        .select("*")
        .range(from, to)
        .eq("user_id", user.session?.user.id);

      if (error) {
        setError(true);
        setIsLoading(false);
        return;
      }

      setData(fetchedData as unknown as T);
      setIsLoading(false);
    };
    getData();
  }, [itemPerPage, pageIndex, setData, supabase, table]);

  return {
    totalItems,
    itemPerPage,
    pageIndex,
    setPageIndex,
    error,
    isLoading,
  };
}
