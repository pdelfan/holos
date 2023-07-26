"use client";

import AddButton from "@/components/addButton/AddButton";
import WishlistGrid from "@/components/contentDisplay/wishlistGrid/WishlistGrid";
import SearchBar from "@/components/searchBar/SearchBar";
import WishlistForm from "@/components/wishlistForm/WishlistForm";
import { wishlistSearchAtom } from "@/store/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Wishlist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [wishlistSearch, setWishlistSearch] = useAtom(wishlistSearchAtom);
  const handleSearch = (searchTerm: string) => {
    setWishlistSearch(searchTerm);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Wishlist</h1>
      <section className="flex flex-wrap justify-between items-center mt-3">
        <div className="flex-1 max-w-lg">
          <SearchBar placeholder="Search for a website" onChange={handleSearch} />
        </div>
        <div className="flex-1"></div>
      </section>
      <WishlistGrid filter={wishlistSearch} />
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
