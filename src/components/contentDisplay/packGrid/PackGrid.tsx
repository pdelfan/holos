"use client";

import { useAtom } from "jotai";
import { packsAtom } from "@/store/store";
import { sortPacks } from "@/utils/filterUtils";
import PackGridSkeleton from "./PackGridSkeleton";
import { useState } from "react";
import Modal from "@/components/feedback/modal/Modal";
import PackCard from "../packCard/PackCard";
import EditPackForm from "@/components/forms/editPackForm/EditPackForm";
import useFetchDB from "@/hooks/useFetchDB";
import Pagination from "@/components/navigational/pagination/Pagination";
import Result from "../result/Result";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { deletePack } from "@/utils/api/apiPackUtils";

interface Props {
  search: string;
  sortFilter: SelectOption;
}

export default function PackGrid(props: Props) {
  const { search, sortFilter } = props;
  const [showModal, setShowModal] = useState(false);
  const [currentPack, setCurrentPack] = useState<Pack | null>(null);
  const { currency } = useGetPreferredCurrency({});
  const [packs, setPacks] = useAtom(packsAtom);
  const {
    pageIndex,
    setPageIndex,
    totalPages,
    error,
    isLoading,
    isValidating,
  } = useFetchDB({
    table: "pack",
    setData: setPacks,
  });

  const onDeletePack = async (id: number) => {
    deletePack(id);
    setPacks(packs.filter((item) => item.id !== id));
  };

  return (
    <>
      {isLoading || isValidating || !currency ? (
        <PackGridSkeleton />
      ) : (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(1fr,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(30rem,1fr))] gap-4 mt-10 animate-fade">
            {packs &&
              sortPacks(packs, sortFilter.text)
                .filter((item) =>
                  item.title.toLowerCase().includes(search.trim().toLowerCase())
                )
                .map((item) => (
                  <PackCard
                    key={item.id}
                    item={item}
                    currency={currency}
                    onEdit={() => {
                      setCurrentPack(item);
                      setShowModal(true);
                    }}
                  />
                ))}
          </section>
          {packs.length === 0 && <Result status="info">No packs found</Result>}
          {error && <Result status="error">Could not get pack items</Result>}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
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
