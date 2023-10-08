"use client";

import WishlistCard from "@/components/contentDisplay/wishlistCard/WishlistCard";
import useGetWishlist from "@/hooks/useGetWishlist";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import WishlistGridSkeleton from "./WishListGridSkeleton";
import { useAtomValue } from "jotai";
import {
  sortFilterAtom,
  viewFilterAtom,
  wishlistSearchAtom,
} from "@/store/store";
import { sortWishlist } from "@/utils/filterUtils";

export default function WishlistGrid() {
  const supabase = createClientComponentClient<Database>();
  const wishlistSearch = useAtomValue(wishlistSearchAtom);
  const viewFilter = useAtomValue(viewFilterAtom);
  const sortFilter = useAtomValue(sortFilterAtom);
  const { wishlist, setWishlist, error, isLoading, isValidating } =
    useGetWishlist();

  const onDeleteBookmark = async (id: number) => {
    const { error } = await supabase.from("wishlist").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this item from wishlist.");
      return;
    }
    setWishlist(wishlist.filter((item) => item.id !== id));
    toast.success("Deleted item from wishlist.");
  };

  return (
    <>
      {isLoading && <WishlistGridSkeleton />}
      {!isLoading && !isValidating && (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
          {!isLoading &&
            wishlist &&
            sortWishlist(wishlist, sortFilter.text)
              .filter((item) => item.url.includes(wishlistSearch))
              .map((item) => (
                <WishlistCard
                  key={item.id}
                  url={item.url}
                  title={item.title}
                  logo_url={item.logo_url}
                  image_url={item.image_url}
                  viewMode={viewFilter.text}
                  onDelete={() => onDeleteBookmark(item.id)}
                />
              ))}
        </section>
      )}
      {!isLoading && !isValidating && wishlist && wishlist.length === 0 && (
        <div className="flex h-full items-center">
          <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
            No items found
          </h3>
        </div>
      )}
    </>
  );
}
