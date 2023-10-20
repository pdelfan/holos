"use client";

import FloatingActionButton from "@/components/actions/floatingActionButton/FloatingActionButton";
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
import useSearch from "@/hooks/useSearch";

export default function Wishlist() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [viewFilter, setViewFilter] = useAtom(viewFilterAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const { searchTerm, handleSearch } = useSearch();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Wishlist
      </h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar
            placeholder="Search for a website or item"
            onChange={handleSearch}
          />
        </div>        
        <FloatingActionButton onClick={() => setShowAddModal(!showAddModal)} />
        
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
        search={searchTerm}
        sortFilter={sortFilter}
        viewFilter={viewFilter}
      />
      {showAddModal && (
        <Modal>
          <WishlistForm onClose={() => setShowAddModal(false)} />
        </Modal>
      )}
    </>
  );
}
