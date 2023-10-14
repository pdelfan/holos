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

interface Props {
  search: string;
  viewFilter: SelectOption;
  sortFilter: SelectOption;
}

export default function WishlistGrid(props: Props) {
  const { search, viewFilter, sortFilter } = props;
  const supabase = createClientComponentClient<Database>();
  const [wishlist, setWishlist] = useAtom(wishlistAtom);
  const { pageIndex, setPageIndex, totalPages, error, isLoading } = useFetchDB({
    itemPerPage: 18,
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
      {isLoading && <WishlistGridSkeleton />}
      {!isLoading && (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
            {!isLoading &&
              wishlist &&
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
          {!isLoading && wishlist && wishlist.length === 0 && (
            <div className="flex h-full items-center">
              <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
                No trips found
              </h3>
            </div>
          )}
          {!isLoading && error && (
            <div className="flex h-full items-center">
              <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
                Could not get wishlist items
              </h3>
            </div>
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
