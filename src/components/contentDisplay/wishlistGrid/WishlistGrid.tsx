"use client";

import WishlistCard from "@/components/contentDisplay/wishlistCard/WishlistCard";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import WishlistGridSkeleton from "./WishListGridSkeleton";
import { useAtom } from "jotai";
import { wishlistAtom } from "@/store/store";
import { sortWishlist } from "@/utils/filterUtils";
import useFetchDB from "@/hooks/useFetchDB";
import Pagination from "@/components/navigational/pagination/Pagination";
import Result from "../result/Result";

interface Props {
  search: string;
  viewFilter: SelectOption;
  sortFilter: SelectOption;
}

export default function WishlistGrid(props: Props) {
  const { search, viewFilter, sortFilter } = props;
  const supabase = createClientComponentClient<Database>();
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const {
    pageIndex,
    setPageIndex,
    totalPages,
    error,
    isLoading,
    isValidating,
  } = useFetchDB({
    table: "wishlist",
    setData: setWishlist,
  });

  const onDeleteBookmark = async (id: number) => {
    const { error } = await supabase.from("wishlist").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this item from wishlist.");
      return;
    }
    setWishlist(wishlist.filter((item) => item.id !== id));
  };

  return (
    <>
      {isLoading || isValidating ? (
        <WishlistGridSkeleton />
      ) : (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
            {wishlist &&
              sortWishlist(wishlist, sortFilter.text)
                .filter(
                  (item) =>
                    item.url.includes(search) ||
                    item?.title?.includes(search) ||
                    item?.title?.toLocaleLowerCase().includes(search)
                )
                .map((item) => (
                  <WishlistCard
                    key={item.id}
                    item={item}
                    viewMode={viewFilter.text}
                    onDelete={() => onDeleteBookmark(item.id)}
                  />
                ))}
          </section>
          {wishlist.length === 0 && (
            <Result status="info">No wishlist items found</Result>
          )}
          {error && (
            <Result status="error">Could not get wishlist items</Result>
          )}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              pageIndex={pageIndex}
              onChange={setPageIndex}
            />
          )}
        </>
      )}
    </>
  );
}
