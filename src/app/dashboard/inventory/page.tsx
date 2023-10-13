"use client";

import AddButton from "@/components/actions/addButton/AddButton";
import InventoryGrid from "@/components/contentDisplay/inventoryGrid/InventoryGrid";
import InventoryForm from "@/components/forms/inventoryForm/InventoryForm";
import Modal from "@/components/feedback/modal/Modal";
import SearchBar from "@/components/search/searchBar/SearchBar";
import Select from "@/components/forms/select/Select";
import {
  seasonFilterAtom,
  seasonFilterOptions,
  sortFilterAtom,
  sortFilterOptions,
} from "@/store/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Inventory() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [inventorySearch, setInventorySearch] = useState("");
  const [seasonFilter, setSeasonFilter] = useAtom(seasonFilterAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const handleSearch = (searchTerm: string) => {
    setInventorySearch(searchTerm);
  };

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Inventory
      </h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar placeholder="Search for an item" onChange={handleSearch} />
        </div>
        <div className="flex gap-2 ml-auto">
          <Select
            selected={seasonFilter}
            options={seasonFilterOptions}
            direction="left"
            onChange={(option: SelectOption) => setSeasonFilter(option)}
          />
          <Select
            selected={sortFilter}
            options={sortFilterOptions}
            direction="right"
            onChange={(option: SelectOption) => setSortFilter(option)}
          />
        </div>
      </section>
      <InventoryGrid
        search={inventorySearch}
        seasonFilter={seasonFilter}
        sortFilter={sortFilter}
      />
      <div className="fixed bottom-12 right-0 sm:bottom-0">
        <div className="relative">
          {showAddModal && (
            <Modal>
              <InventoryForm onClose={() => setShowAddModal(false)} />
            </Modal>
          )}
          <AddButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
