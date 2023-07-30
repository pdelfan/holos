"use client";

import AddButton from "@/components/addButton/AddButton";
import WishlistGrid from "@/components/contentDisplay/wishlistGrid/WishlistGrid";
import ModalContainer from "@/components/modalContainer/ModalContainer";
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
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

export default function Wishlist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const setWishlistSearch = useSetAtom(wishlistSearchAtom);
  const [viewFilter, setViewFilter] = useAtom(viewFilterAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
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
            selected={viewFilter}
            options={viewFilterOptions}
            direction="left"
            onChange={(option: SelectOption) => setViewFilter(option)}
          />
          <Select
            selected={sortFilter}
            options={sortFilterOptions}
            direction="right"
            onChange={(option: SelectOption) => setSortFilter(option)}
          />
        </div>
      </section>
      <WishlistGrid />
      <div className="fixed bottom-12 right-0 sm:bottom-0">
        <div className="relative">
          {showAddModal && (
            <ModalContainer>
              <WishlistForm onClose={() => setShowAddModal(false)} />
            </ModalContainer>
          )}
          <AddButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
