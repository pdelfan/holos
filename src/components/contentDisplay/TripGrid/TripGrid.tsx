"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useAtom, useAtomValue } from "jotai";
import { sortFilterAtom, tripSearchAtom, tripsAtom } from "@/store/store";
import { sortTrips } from "@/utils/filterUtils";
import TripCard from "@/components/contentDisplay/tripCard/TripCard";
import TripGridSkeleton from "./TripGridSkeleton";
import { useState } from "react";
import EditTripForm from "@/components/forms/editTripForm/EditTripForm";
import Modal from "@/components/feedback/modal/Modal";
import useFetchDB from "@/hooks/useFetchDB";
import Pagination from "@/components/navigational/pagination/Pagination";

export default function TripGrid() {
  const supabase = createClientComponentClient<Database>();
  const tripSearch = useAtomValue(tripSearchAtom);
  const sortFilter = useAtomValue(sortFilterAtom);
  const [showModal, setShowModal] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<TripItem | null>(null);
  const [trips, setTrips] = useAtom(tripsAtom);
  const { pageIndex, setPageIndex, totalPages, error, isLoading } = useFetchDB({
    itemPerPage: 18,
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
    toast.success("Deleted item from trips.");
  };

  return (
    <>
      {isLoading && <TripGridSkeleton />}
      {!isLoading && (
        <>
          <section className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-10 animate-fade">
            {trips &&
              sortTrips(trips, sortFilter.text)
                .filter((item) =>
                  item.title
                    .toLowerCase()
                    .includes(tripSearch.trim().toLowerCase())
                )
                .map((item) => (
                  <TripCard
                    key={item.id}
                    title={item.title}
                    date={item.date}
                    elevation={item.elevation}
                    elevationUnit={item.elevation_unit}
                    distance={item.distance}
                    distanceUnit={item.distance_unit}
                    baseWeight={item.base_weight}
                    totalWeight={item.total_weight}
                    weightUnit={item.weight_unit}
                    onEdit={() => {
                      setCurrentTrip(item);
                      setShowModal(true);
                    }}
                  />
                ))}
          </section>
          {trips.length === 0 && (
            <div className="flex h-full items-center">
              <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
                No trips found
              </h3>
            </div>
          )}
          {!isLoading && error && (
            <div className="flex h-full items-center">
              <h3 className="text-gray text-lg text-center basis-full dark:text-neutral-400">
                Could not get trip items
              </h3>
            </div>
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
  );
}
