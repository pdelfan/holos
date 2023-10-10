"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useAtom, useAtomValue } from "jotai";
import { packSearchAtom, packsAtom, sortFilterAtom } from "@/store/store";
import { sortPacks } from "@/utils/filterUtils";
import PackGridSkeleton from "./PackGridSkeleton";
import { useState } from "react";
import Modal from "@/components/feedback/modal/Modal";
import PackCard from "../packCard/PackCard";
import EditPackForm from "@/components/forms/editPackForm/EditPackForm";
import useFetchDB from "@/hooks/useFetchDB";
import Pagination from "@/components/navigational/pagination/Pagination";

export default function PackGrid() {
  const supabase = createClientComponentClient<Database>();
  const packSearch = useAtomValue(packSearchAtom);
  const sortFilter = useAtomValue(sortFilterAtom);
  const [showModal, setShowModal] = useState(false);
  const [currentPack, setCurrentPack] = useState<Pack | null>(null);
  const [packs, setPacks] = useAtom(packsAtom);
  const { pageIndex, setPageIndex, totalItems, itemPerPage, error, isLoading } =
    useFetchDB({
      itemPerPage: 18,
      table: "pack",
      data: packs,
      setData: setPacks,
    });

  const onDeletePack = async (id: number) => {
    const { error } = await supabase.from("pack").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this pack.");
      return;
    }
    setPacks(packs.filter((item) => item.id !== id));
    toast.success("Deleted pack.");
  };

  return (
    <>
      {isLoading && <PackGridSkeleton />}
      {!isLoading && (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] gap-4 mt-10 animate-fade">
            {packs &&
              sortPacks(packs, sortFilter.text)
                .filter((item) =>
                  item.title
                    .toLowerCase()
                    .includes(packSearch.trim().toLowerCase())
                )
                .map((item) => (
                  <PackCard
                    key={item.id}
                    data={item}
                    onEdit={() => {
                      setCurrentPack(item);
                      setShowModal(true);
                    }}
                  />
                ))}
          </section>
          {!isLoading && packs && packs.length === 0 && (
            <div className="flex h-full items-center">
              <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
                No packs found
              </h3>
            </div>
          )}
          {!isLoading && error && (
            <div className="flex h-full items-center">
              <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
                Could not get pack items
              </h3>
            </div>
          )}
          {totalItems && (
            <Pagination
              totalPages={Math.ceil(totalItems / itemPerPage)}
              pageIndex={pageIndex}
              onChange={setPageIndex}
            />
          )}
        </>
      )}
      {showModal && currentPack && (
        <Modal>
          <EditPackForm
            pack={currentPack}
            onDelete={() => onDeletePack(currentPack.id)}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
