"use client";

import AddButton from "@/components/addButton/AddButton";
import WishlistGrid from "@/components/contentDisplay/wishlistGrid/WishlistGrid";
import SearchBar from "@/components/searchBar/SearchBar";
import Select from "@/components/select/Select";
import WishlistForm from "@/components/wishlistForm/WishlistForm";
import {
  wishlistSearchAtom,
  viewFilterOptions,
  sortFilterOptions,
  viewFilterAtom,
  sortFilterAtom,
} from "@/store/store";
import { useSetAtom } from "jotai";
import { useState } from "react";

export default function Wishlist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const setWishlistSearch = useSetAtom(wishlistSearchAtom);
  const setViewFilter = useSetAtom(viewFilterAtom);
  const setSortFilter = useSetAtom(sortFilterAtom);
  const handleSearch = (searchTerm: string) => {
    setWishlistSearch(searchTerm);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Wishlist</h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar
            placeholder="Search for a website"
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-4">
          <Select
            options={viewFilterOptions}
            direction="left"
            onChange={(option: SelectOption) => setViewFilter(option)}
          />
          <Select
            options={sortFilterOptions}
            direction="right"
            onChange={(option: SelectOption) => setSortFilter(option)}
          />
        </div>
      </section>
      <WishlistGrid />
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
