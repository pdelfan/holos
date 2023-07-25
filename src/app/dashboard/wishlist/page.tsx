"use client";

import AddButton from "@/components/addButton/AddButton";
import SearchBar from "@/components/searchBar/SearchBar";
import WishlistForm from "@/components/wishlistForm/WishlistForm";
import { useState } from "react";

export default function Wishlist() {
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <h1 className="text-3xl font-semibold text-header-1">Wishlist</h1>
      <section className="flex flex-wrap justify-between items-center mt-4">
        <div className="flex-1">
          <SearchBar placeholder="Search for an item" onChange={() => {}} />
        </div>
        <div className="flex-1"></div>
        <div className="fixed bottom-0 right-0">
          <div className="relative">
            <WishlistForm
              userID={""}
              isOpen={showAddModal}
              onClose={() => setShowAddModal(false)}
            />
            <AddButton onClick={() => setShowAddModal(!showAddModal)} />
          </div>
        </div>
      </section>
    </>
  );
}
