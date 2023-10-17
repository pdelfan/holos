"use client";

import InventoryGridSkeleton from "./InventoryGridSkeleton";
import { useAtom } from "jotai";
import { inventoryAtom } from "@/store/store";
import { sortInventory } from "@/utils/filterUtils";
import InventoryCard from "@/components/contentDisplay/inventoryCard/InventoryCard";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { useState } from "react";
import Modal from "@/components/feedback/modal/Modal";
import EditInventoryForm from "@/components/forms/editInventoryForm/EditInventoryForm";
import Pagination from "@/components/navigational/pagination/Pagination";
import useFetchDB from "@/hooks/useFetchDB";
import Result from "../result/Result";
import { deleteItemFromInventory } from "@/utils/api/apiInventoryUtils";

interface Props {
  search: string;
  seasonFilter: SelectOption;
  sortFilter: SelectOption;
}

export default function InventoryGrid(props: Props) {
  const { search, seasonFilter, sortFilter } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentInventoryItem, setCurrentInventoryItem] =
    useState<InventoryItem | null>(null);
  const { currency } = useGetPreferredCurrency({});
  const [inventory, setInventory] = useAtom(inventoryAtom);
  const {
    pageIndex,
    setPageIndex,
    totalPages,
    error,
    isLoading,
    isValidating,
  } = useFetchDB({
    table: "inventory",
    setData: setInventory,
  });

  const onDeleteInventoryItem = async (id: number) => {
    deleteItemFromInventory(id);
    setInventory(inventory.filter((item) => item.id !== id));
  };

  return (
    <>
      {isLoading || isValidating || !currency ? (
        <InventoryGridSkeleton />
      ) : (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-4 mt-10 animate-fade">
            {inventory &&
              sortInventory(inventory, sortFilter.text)
                .filter((item) =>
                  item.title.toLowerCase().includes(search.toLowerCase())
                )
                .filter((item) => {
                  if (seasonFilter.text === "Show All") return true;
                  return item.season === seasonFilter.text;
                })
                .map((item) => (
                  <InventoryCard
                    key={item.id}
                    item={item}
                    currency={currency}
                    onEdit={() => {
                      setCurrentInventoryItem(item);
                      setShowModal(true);
                    }}
                  />
                ))}
          </section>
          {inventory.length === 0 && (
            <Result status="info">No inventory items found</Result>
          )}
          {error && (
            <Result status="error">Could not get inventory items</Result>
          )}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              pageIndex={pageIndex}
              onChange={setPageIndex}
            />
          )}
        </>
      )}

      {showModal && currentInventoryItem && (
        <Modal>
          <EditInventoryForm
            inventoryItem={currentInventoryItem}
            onDelete={() => onDeleteInventoryItem(currentInventoryItem.id)}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
