import { Database } from "@/lib/database.types";
import { wishlistAtom } from "@/store/store";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import useSWR from "swr";

export default function useGetBookmarks() {
  const supabase = createClientComponentClient<Database>();
  const [wishlist, setWishlist] = useAtom(wishlistAtom);

  const { error, isLoading, isValidating } = useSWR("getWishlist", async () => {
    const { data: user } = await supabase.auth.getSession();
    const { data: wishlist } = await supabase
      .from("wishlist")
      .select("*")
      .eq("user_id", user.session?.user.id);
    setWishlist(wishlist ?? []);
  });

  return { wishlist, setWishlist, error, isLoading, isValidating };
}
