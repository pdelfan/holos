"use client";

import AddButton from "@/components/addButton/AddButton";
import TripGrid from "@/components/contentDisplay/TripGrid/TripGrid";
import ModalContainer from "@/components/modalContainer/ModalContainer";
import SearchBar from "@/components/searchBar/SearchBar";
import Select from "@/components/select/Select";
import TripForm from "@/components/tripForm/TripForm";
import {
  sortFilterAtom,
  sortFilterOptions,
  tripSearchAtom,
} from "@/store/store";
import { useAtom, useSetAtom } from "jotai";
import { useState } from "react";

export default function Trips() {
  const [showAddModal, setShowAddModal] = useState(false);
  const setTripSearch = useSetAtom(tripSearchAtom);
  const [sortFilter, setSortFilter] = useAtom(sortFilterAtom);
  const handleSearch = (searchTerm: string) => {
    setTripSearch(searchTerm);
  };
  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Trips</h1>
      <section className="flex flex-wrap justify-between items-center mt-3">
        <div className="flex-1 max-w-lg">
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
      <TripGrid />
      <div className="fixed bottom-0 right-0">
        <div className="relative">
          {showAddModal && (
            <ModalContainer>
              <TripForm onClose={() => setShowAddModal(false)} />
            </ModalContainer>
          )}
          <AddButton onClick={() => setShowAddModal(!showAddModal)} />
        </div>
      </div>
    </>
  );
}
