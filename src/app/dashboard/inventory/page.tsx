"use client";

import SearchBar from "@/components/searchBar/SearchBar";

export default function Inventory() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Inventory</h1>
      <section className="flex flex-wrap justify-between items-center mt-3">
        <div className="flex-1 max-w-lg">
          <SearchBar placeholder="Search for an item" onChange={() => {}} />
        </div>
        <div className="flex-1"></div>
      </section>
    </>
  );
}
