"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import InventoryGridSkeleton from "./InventoryGridSkeleton";
import { useAtomValue } from "jotai";
import {
  inventorySearchAtom,
  seasonFilterAtom,
  sortFilterAtom,
} from "@/store/store";
import { sortInventory } from "@/utils/filterUtils";
import useGetInventory from "@/hooks/useGetInventory";
import InventoryCard from "@/components/contentDisplay/inventoryCard/InventoryCard";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { useState } from "react";
import Modal from "@/components/feedback/modal/Modal";
import EditInventoryForm from "@/components/forms/editInventoryForm/EditInventoryForm";

export default function InventoryGrid() {
  const supabase = createClientComponentClient<Database>();
  const [showModal, setShowModal] = useState(false);
  const inventorySearch = useAtomValue(inventorySearchAtom);
  const seasonFilter = useAtomValue(seasonFilterAtom);
  const sortFilter = useAtomValue(sortFilterAtom);
  const [currentIventoryItem, setCurrentInventoryItem] =
    useState<InventoryItem | null>(null);
  const { currency } = useGetPreferredCurrency({});  
  const { inventory, setInventory, error, isLoading, isValidating } =
    useGetInventory();

  const onDeleteInventoryItem = async (id: number) => {
    const { error } = await supabase.from("inventory").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this item from inventory.");
      return;
    }
    setInventory(inventory.filter((item) => item.id !== id));
    toast.success("Deleted item from inventory.");
  };

  return (
    <>
      {isLoading && <InventoryGridSkeleton />}
      {!isLoading && !isValidating && (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
          {!isLoading &&
            inventory &&
            sortInventory(inventory, sortFilter.text)
              .filter((item) =>
                item.title.toLowerCase().includes(inventorySearch.toLowerCase())
              )
              .filter((item) => {
                if (seasonFilter.text === "Show All") return true;
                return item.season === seasonFilter.text;
              })
              .map((item) => (
                <InventoryCard
                  key={item.id}
                  data={item}
                  currency={currency}
                  onEdit={() => {
                    setCurrentInventoryItem(item);
                    setShowModal(true);
                  }}
                />
              ))}
        </section>
      )}
      {!isLoading && !isValidating && inventory && inventory.length === 0 && (
        <div className="flex h-full items-center">
          <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
            No items found
          </h3>
        </div>
      )}
      {showModal && currentIventoryItem && (
        <Modal>
          <EditInventoryForm
            inventoryItem={currentIventoryItem}
            onDelete={() => onDeleteInventoryItem(currentIventoryItem.id)}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
