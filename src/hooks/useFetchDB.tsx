import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import useSWR from "swr";

interface Props<T> {
  itemPerPage: number;
  table: string;
  setData: (value: T) => void;
}

export default function useFetchDB<T extends Record<string, any>>(
  props: Props<T>
) {
  const { table, itemPerPage, setData } = props;
  const supabase = createClientComponentClient<Database>();
  const [pageIndex, setPageIndex] = useState(0);

  const fetcher = async () => {
    const { data: user } = await supabase.auth.getSession();
    const from = pageIndex * itemPerPage;
    const to = from + itemPerPage - 1;

    const { data: fetchedData, error } = await supabase
      .from(table)
      .select("*")
      .range(from, to)
      .eq("user_id", user.session?.user.id);

    if (error) {
      throw error;
    }
    setData(fetchedData as unknown as T);
    return fetchedData as unknown as T;
  };

  const { data, error: fetchError } = useSWR(
    [table, pageIndex, itemPerPage],
    fetcher
  );

  const countFetcher = async () => {
    const { data: user } = await supabase.auth.getSession();
    const { count } = await supabase
      .from(table)
      .select("*", { count: "exact", head: true })
      .eq("user_id", user.session?.user.id);
    return count;
  };

  const { data: count, error: countError } = useSWR(
    [table, "pagniation"],
    countFetcher
  );

  const totalItems = count ?? 0;
  const totalPages = Math.ceil(totalItems / itemPerPage);
  const isLoading = !data && !fetchError;

  return {
    totalItems,
    itemPerPage,
    totalPages,
    pageIndex,
    setPageIndex,
    error: fetchError,
    isLoading,
  };
}
