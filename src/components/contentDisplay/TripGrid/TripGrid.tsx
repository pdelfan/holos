"use client";

import { Database } from "@/lib/database.types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import toast from "react-hot-toast";
import { useAtomValue } from "jotai";
import { sortFilterAtom, tripSearchAtom } from "@/store/store";
import { sortTrips } from "@/utils/filterUtils";
import useGetTrips from "@/hooks/useGetTrips";
import TripCard from "@/components/tripCard/TripCard";
import TripGridSkeleton from "./TripGridSkeleton";
import { useState } from "react";
import EditTripForm from "@/components/editTripForm/EditTripForm";
import ModalContainer from "@/components/modalContainer/ModalContainer";

export default function TripGrid() {
  const supabase = createClientComponentClient<Database>();
  const tripSearch = useAtomValue(tripSearchAtom);
  const sortFilter = useAtomValue(sortFilterAtom);
  const [showModal, setShowModal] = useState(false);
  const [currentTrip, setCurrentTrip] = useState<TripItem | null>(null);
  const { trips, setTrips, error, isLoading, isValidating } = useGetTrips();

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
      {!isLoading && !isValidating && (
        <section className="grid grid-cols-[repeat(auto-fill,minmax(22rem,1fr))] gap-4 mt-10 animate-fade">
          {!isLoading &&
            trips &&
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
                  onDelete={() => onDeleteTrip(item.id)}
                  onEdit={() => {
                    setCurrentTrip(item);
                    setShowModal(true);
                  }}
                />
              ))}
        </section>
      )}
      {!isLoading && !isValidating && trips && trips.length === 0 && (
        <div className="flex h-full items-center">
          <h3 className="text-gray text-lg text-center basis-full">
            No trips found
          </h3>
        </div>
      )}
      {showModal && currentTrip && (
        <ModalContainer>
          <EditTripForm
            tripItem={currentTrip}
            onClose={() => setShowModal(false)}
          />
        </ModalContainer>
      )}
    </>
  );
}
