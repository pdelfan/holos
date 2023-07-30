"use client";

import SearchBar from "@/components/search/searchBar/SearchBar";

export default function Packs() {
  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Packs</h1>
      <section className="flex flex-wrap justify-between items-center mt-3">
        <div className="flex-1 max-w-lg">
          <SearchBar placeholder="Search for a pack" onChange={() => {}} />
        </div>
        <div className="flex-1"></div>
      </section>
    </>
  );
}
