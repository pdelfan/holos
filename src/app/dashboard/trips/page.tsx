"use client";

import FloatingActionButton from "@/components/actions/floatingActionButton/FloatingActionButton";
import TripGrid from "@/components/contentDisplay/TripGrid/TripGrid";
import Modal from "@/components/feedback/modal/Modal";
import SearchBar from "@/components/search/searchBar/SearchBar";
import Select from "@/components/forms/select/Select";
import TripForm from "@/components/forms/tripForm/TripForm";
import { sortFilterAtom, sortFilterOptions } from "@/store/store";
import { useAtom } from "jotai";
import { useState } from "react";
import useSearch from "@/hooks/useSearch";

export default function Trips() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const { searchTerm, handleSearch } = useSearch();

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1 dark:text-neutral-100">
        Trips
      </h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar placeholder="Search for a trip" onChange={handleSearch} />
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
      <TripGrid search={searchTerm} sortFilter={sortFilter} />
      <div className="fixed bottom-12 right-0 sm:bottom-0">
        <div className="relative">
          {showAddModal && (
            <Modal>
              <TripForm onClose={() => setShowAddModal(false)} />
            </Modal>
          )}
          <FloatingActionButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
