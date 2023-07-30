"use client";

import Select from "@/components/forms/select/Select";
import SearchBar from "@/components/search/searchBar/SearchBar";
import {
  packSearchAtom,
  sortFilterAtom,
  sortFilterOptions,
} from "@/store/store";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

export default function Packs() {
  const [showAddModal, setShowAddModal] = useState(false);
  const setPackSearch = useSetAtom(packSearchAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const handleSearch = (searchTerm: string) => {
    setPackSearch(searchTerm);
  };
  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Packs</h1>
      <section className="flex flex-wrap gap-3 justify-between items-center mt-3">
        <div className="flex-1 max-w-lg basis-auto">
          <SearchBar placeholder="Search for a trip" onChange={handleSearch} />
        </div>
        <div className="flex">
          <Select
            selected={sortFilter}
            options={sortFilterOptions}
            direction="right"
            onChange={(option: SelectOption) => setSortFilter(option)}
          />
        </div>
      </section>
    </>
  );
}
