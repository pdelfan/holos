"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useAtom } from "jotai";
import { tripsAtom } from "@/store/store";
import { sortTrips } from "@/utils/filterUtils";
import TripCard from "@/components/contentDisplay/tripCard/TripCard";
import TripGridSkeleton from "./TripGridSkeleton";
import { useState } from "react";
import EditTripForm from "@/components/forms/editTripForm/EditTripForm";
import Modal from "@/components/feedback/modal/Modal";
import useFetchDB from "@/hooks/useFetchDB";
import Pagination from "@/components/navigational/pagination/Pagination";
import Result from "../result/Result";

interface Props {
  search: string;
  sortFilter: SelectOption;
}

export default function TripGrid(props: Props) {
  const { search, sortFilter } = props;
  const supabase = createClientComponentClient<Database>();
  const [showModal, setShowModal] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<TripItem | null>(null);
  const [trips, setTrips] = useAtom(tripsAtom);
  const {
    pageIndex,
    setPageIndex,
    totalPages,
    error,
    isLoading,
    isValidating,
  } = useFetchDB({
    table: "trip",
    setData: setTrips,
  });

  const onDeleteTrip = async (id: number) => {
    const { error } = await supabase.from("trip").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this item from trips.");
      return;
    }
    setTrips(trips.filter((item) => item.id !== id));
  };

  return (
    <>
      {isLoading || isValidating ? (
        <TripGridSkeleton />
      ) : (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-10 animate-fade">
            {trips &&
              sortTrips(trips, sortFilter.text)
                .filter((item) =>
                  item.title.toLowerCase().includes(search.trim().toLowerCase())
                )
                .map((item) => (
                  <TripCard
                    key={item.id}
                    item={item}
                    onEdit={() => {
                      setCurrentTrip(item);
                      setShowModal(true);
                    }}
                  />
                ))}
          </section>
          {trips.length === 0 && <Result status="info">No trips found</Result>}
          {error && <Result status="error">Could not get trip items </Result>}
          {totalPages > 1 && (
            <Pagination
              totalPages={totalPages}
              pageIndex={pageIndex}
              onChange={setPageIndex}
            />
          )}

          {showModal && currentTrip && (
            <Modal>
              <EditTripForm
                tripItem={currentTrip}
                onDelete={() => onDeleteTrip(currentTrip.id)}
                onClose={() => setShowModal(false)}
              />
            </Modal>
          )}
        </>
      )}
    </>
  );
}
