"use client";

import AddButton from "@/components/addButton/AddButton";
import SearchBar from "@/components/searchBar/SearchBar";
import WishlistCard from "@/components/wishlistCard/WishlistCard";
import WishlistForm from "@/components/wishlistForm/WishlistForm";
import useGetWishlist from "@/hooks/useGetWishlist";
import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState } from "react";
import toast from "react-hot-toast";

export default function Wishlist() {
  const supabase = createClientComponentClient<Database>();
  const [showAddModal, setShowAddModal] = useState(false);
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
      <h1 className="text-3xl font-semibold text-header-1">Wishlist</h1>
      <section className="flex flex-wrap justify-between items-center mt-3">
        <div className="flex-1 max-w-lg">
          <SearchBar placeholder="Search for an item" onChange={() => {}} />
        </div>
        <div className="flex-1"></div>
      </section>
      <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
        {!isLoading &&
          wishlist &&
          wishlist.map((item) => (
            <WishlistCard
              key={item.id}
              url={item.url}
              onDelete={() => onDeleteBookmark(item.id)}
            />
          ))}
      </section>
      <div className="fixed bottom-0 right-0">
        <div className="relative">
          {showAddModal && (
            <WishlistForm onClose={() => setShowAddModal(false)} />
          )}
          <AddButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
