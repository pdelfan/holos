"use client";

import AddButton from "@/components/actions/addButton/AddButton";
import PackGrid from "@/components/contentDisplay/packGrid/PackGrid";
import Modal from "@/components/feedback/modal/Modal";
import PackForm from "@/components/forms/packForm/PackForm";
import Select from "@/components/forms/select/Select";
import SearchBar from "@/components/search/searchBar/SearchBar";
import {
  packSearchAtom,
  sortFilterAtom,
  sortFilterOptions,
} from "@/store/store";
import { useAtom } from "jotai";
import { useState } from "react";

export default function Packs() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [packSearch, setPackSearch] = useAtom(packSearchAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const handleSearch = (searchTerm: string) => {
    setPackSearch(searchTerm);
  };
  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Packs
      </h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar placeholder="Search for a pack" onChange={handleSearch} />
        </div>
        <div className="flex ml-auto">
          <Select
            selected={sortFilter}
            options={sortFilterOptions}
            direction="right"
            onChange={(option: SelectOption) => setSortFilter(option)}
          />
        </div>
      </section>
      <PackGrid search={packSearch} sortFilter={sortFilter} />
      <div className="fixed bottom-12 right-0 sm:bottom-0">
        <div className="relative">
          {showAddModal && (
            <Modal>
              <PackForm onClose={() => setShowAddModal(false)} />
            </Modal>
          )}
          <AddButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
