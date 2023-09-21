"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { packSearchAtom, sortFilterAtom } from "@/store/store";
import { sortPacks } from "@/utils/filterUtils";
import PackGridSkeleton from "./PackGridSkeleton";
import { useState } from "react";
import Modal from "@/components/feedback/modal/Modal";
import useGetPacks from "@/hooks/useGetPacks";
import PackCard from "../packCard/PackCard";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import EditPackForm from "@/components/forms/editPackForm/EditPackForm";

export default function PackGrid() {
  const supabase = createClientComponentClient<Database>();
  const packSearch = useAtomValue(packSearchAtom);
  const sortFilter = useAtomValue(sortFilterAtom);
  const [showModal, setShowModal] = useState(false);
  const [currentPack, setCurrentPack] = useState<Pack | null>(null);
  const { packs, setPacks, error, isLoading, isValidating } = useGetPacks();
  const { currency } = useGetPreferredCurrency();

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
      {!isLoading && !isValidating && (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(24rem,1fr))] gap-4 mt-10 animate-fade">
          {!isLoading &&
            packs &&
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
                  onDelete={() => onDeletePack(item.id)}
                  onEdit={() => {
                    setCurrentPack(item);
                    setShowModal(true);
                  }}
                />
              ))}
        </section>
      )}
      {!isLoading && !isValidating && packs && packs.length === 0 && (
        <div className="flex h-full items-center">
          <h3 className="text-gray text-lg text-center basis-full">
            No packs found
          </h3>
        </div>
      )}
      {showModal && currentPack && (
        <Modal>
          <EditPackForm
            pack={currentPack}
            onClose={() => setShowModal(false)}
          />
        </Modal>
      )}
    </>
  );
}
