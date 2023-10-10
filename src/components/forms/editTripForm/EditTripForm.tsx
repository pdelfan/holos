import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";
import { useSetAtom } from "jotai";
import { tripsAtom } from "@/store/store";

interface Props {
  tripItem: TripItem;
  onDelete: () => void;
  onClose: () => void;
}

export default function EditTripForm(props: Props) {
  const { tripItem, onDelete, onClose } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [title, setTitle] = useState(tripItem.title);
  const [date, setDate] = useState(tripItem.date);
  const [elevation, setElevation] = useState<number>(tripItem.elevation);
  const [elevationUnit, setElevationUnit] = useState<string>(
    tripItem.elevation_unit
  );
  const [distance, setDistance] = useState<number>(tripItem.distance);
  const [distanceUnit, setDistanceUnit] = useState<string>(
    tripItem.distance_unit
  );
  const [baseWeight, setBaseWeight] = useState<number>(tripItem.base_weight);
  const [totalWeight, setTotalWeight] = useState<number>(tripItem.total_weight);
  const [weightUnit, setWeightUnit] = useState<string>(tripItem.weight_unit);
  const setTrip = useSetAtom(tripsAtom);

  const onUpdateTrip = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (
      !user.session ||
      (title === tripItem.title &&
        date === tripItem.date &&
        elevation === tripItem.elevation &&
        elevationUnit === tripItem.elevation_unit &&
        distance === tripItem.distance &&
        distanceUnit === tripItem.distance_unit &&
        baseWeight === tripItem.base_weight &&
        totalWeight === tripItem.total_weight &&
        weightUnit === tripItem.weight_unit)
    ) {
      onClose();
      return;
    }

    const { data, error } = await supabase
      .from("trip")
      .update({
        title: title,
        date: date,
        elevation: elevation ?? 0,
        elevation_unit: elevationUnit,
        distance: distance ?? 0,
        distance_unit: distanceUnit,
        base_weight: baseWeight ?? 0,
        total_weight: totalWeight ?? 0,
        weight_unit: weightUnit,
      })
      .match({ id: tripItem.id, user_id: user.session.user.id })
      .select();

    if (error) {
      toast.error("Couldn't update trip.");
      return;
    }

    toast.success("Updated trip.");
    onClose();
    setTrip((trips) => {
      const index = trips.findIndex((item) => item.id === tripItem.id);
      const newTrips = [...trips];
      newTrips[index] = data[0];
      return newTrips;
    });
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onUpdateTrip} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <Label>Title</Label>
            <Input
              autoFocus
              required
              type="text"
              maxLength={60}
              placeholder="Title"
              aria-label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-auto">
            <Label>Date</Label>
            <Input
              required
              type="date"
              aria-label="Date of the trip"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <Label>Elevation</Label>
              <Input
                required
                type="number"
                step="0.01"
                aria-label="Elevation of the trip"
                value={elevation}
                onChange={(e) => setElevation(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-auto">
              <FormSelect
                label="Unit"
                initialValue={elevationUnit}
                options={["m", "ft"]}
                onChange={setElevationUnit}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <Label>Distance</Label>
              <Input
                required
                type="number"
                step="0.01"
                aria-label="Elevation of the trip"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-auto">
              <FormSelect
                label="Unit"
                initialValue={distanceUnit}
                options={["km", "mi"]}
                onChange={setDistanceUnit}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex-1">
            <Label>Base Weight</Label>
            <Input
              required
              type="number"
              step="0.01"
              placeholder="0"
              aria-label="Base Weight"
              value={baseWeight}
              onChange={(e) => {
                setBaseWeight(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="flex-1">
            <Label>Total Weight</Label>
            <Input
              required
              type="number"
              step="0.01"
              placeholder="0"
              aria-label="Total Weight"
              value={totalWeight}
              onChange={(e) => {
                setTotalWeight(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Unit"
              initialValue={weightUnit}
              options={["kg", "g", "lb", "oz"]}
              onChange={setWeightUnit}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <Button
            type="button"
            onClick={() => {
              onDelete();
              onClose();
            }}
            bgColor="bg-red-600"
            textColor="text-white"
          >
            Delete
          </Button>
          <div className="flex flex-wrap gap-3">
            <Button type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              bgColor="bg-zinc-600 dark:bg-zinc-800"
              textColor="text-gray-100"
            >
              Update Trip
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
