"use client";

import AddButton from "@/components/actions/addButton/AddButton";
import WishlistGrid from "@/components/contentDisplay/wishlistGrid/WishlistGrid";
import Modal from "@/components/feedback/modal/Modal";
import SearchBar from "@/components/search/searchBar/SearchBar";
import Select from "@/components/forms/select/Select";
import WishlistForm from "@/components/forms/wishlistForm/WishlistForm";
import {
  viewFilterOptions,
  sortFilterOptions,
  viewFilterAtom,
  sortFilterAtom,
} from "@/store/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Wishlist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [wishlistSearch, setWishlistSearch] = useState("");
  const [viewFilter, setViewFilter] = useAtom(viewFilterAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const handleSearch = (searchTerm: string) => {
    setWishlistSearch(searchTerm);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Wishlist
      </h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar
            placeholder="Search for a website"
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 ml-auto">
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
      <WishlistGrid
        search={wishlistSearch}
        sortFilter={sortFilter}
        viewFilter={viewFilter}
      />
      <div className="fixed bottom-12 right-0 sm:bottom-0">
        <div className="relative">
          {showAddModal && (
            <Modal>
              <WishlistForm onClose={() => setShowAddModal(false)} />
            </Modal>
          )}
          <AddButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
