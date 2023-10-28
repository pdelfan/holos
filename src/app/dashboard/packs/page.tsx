"use client";

import FloatingActionButton from "@/components/actions/floatingActionButton/FloatingActionButton";
import PackGrid from "@/components/contentDisplay/packGrid/PackGrid";
import Modal from "@/components/feedback/modal/Modal";
import PackForm from "@/components/forms/packForm/PackForm";
import Select from "@/components/forms/select/Select";
import SearchBar from "@/components/search/searchBar/SearchBar";
import useSearch from "@/hooks/useSearch";
import { sortFilterOptions } from "@/utils/filterUtils";
import { useState } from "react";

export default function Packs() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortFilter, setSortFilter] = useState(sortFilterOptions[0]);
  const { searchTerm, handleSearch } = useSearch();

  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Packs
      </h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar placeholder="Search for a pack" onChange={handleSearch} />
        </div>
        <FloatingActionButton onClick={() => setShowAddModal(!showAddModal)} />

        <div className="flex ml-auto">
          <Select
            selected={sortFilter}
            options={sortFilterOptions}
            direction="right"
            onChange={(option: SelectOption) => setSortFilter(option)}
          />
        </div>
      </section>
      <PackGrid search={searchTerm} sortFilter={sortFilter} />
      {showAddModal && (
        <Modal>
          <PackForm onClose={() => setShowAddModal(false)} />
        </Modal>
      )}
    </>
  );
}
