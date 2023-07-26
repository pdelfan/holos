"use client";

import WishlistCard from "@/components/wishlistCard/WishlistCard";
import useGetWishlist from "@/hooks/useGetWishlist";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import WishlistGridSkeleton from "./WishListGridSkeleton";

interface Props {
  filter: string;
}

export default function WishlistGrid(props: Props) {
  const { filter } = props;
  const supabase = createClientComponentClient<Database>();
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
            wishlist
              .filter((item) => item.url.includes(filter))
              .map((item) => (
                <WishlistCard
                  key={item.id}
                  url={item.url}
                  onDelete={() => onDeleteBookmark(item.id)}
                />
              ))}
        </section>
      )}
      {!isLoading && wishlist.length === 0 && (
        <div className="flex h-full items-center">
          <h3 className="text-gray text-lg text-center basis-full">
            No items found
          </h3>
        </div>
      )}
    </>
  );
}
