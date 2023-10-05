import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import { updateTripData } from "@/utils/fetchUtils";
import Button from "@/components/actions/button/Button";

interface Props {
  onClose: () => void;
}

export default function TripForm(props: Props) {
  const { onClose } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<string>("");
  const [elevation, setElevation] = useState<number>(0);
  const [elevationUnit, setElevationUnit] = useState<string>("m");
  const [distance, setDistance] = useState<number>(0);
  const [distanceUnit, setDistanceUnit] = useState<string>("km");
  const [baseWeight, setBaseWeight] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>("kg");

  const onAddTrip = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    const { error } = await supabase.from("trip").insert([
      {
        title: title,
        date: date,
        elevation: elevation ?? 0,
        elevation_unit: elevationUnit,
        distance: distance ?? 0,
        distance_unit: distanceUnit,
        base_weight: baseWeight ?? 0,
        total_weight: totalWeight ?? 0,
        weight_unit: weightUnit,
        user_id: user.session.user.id,
      },
    ]);

    if (error) {
      toast.error("Couldn't add trip.");
      return;
    }

    toast.success("Added trip.");
    onClose();
    updateTripData();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onAddTrip} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              autoFocus
              required
              type="text"
              maxLength={60}
              placeholder="Title"
              aria-label="Title"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Date
            </label>
            <input
              required
              type="date"
              aria-label="Date of the trip"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <label className="text-md font-medium text-gray-900 dark:text-white">
                Elevation
              </label>
              <input
                required
                type="number"
                step="0.01"
                aria-label="Elevation of the trip"
                className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
                value={elevation}
                onChange={(e) => setElevation(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-auto">
              <FormSelect
                label="Unit"
                options={["m", "ft"]}
                onChange={setElevationUnit}
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <label className="text-md font-medium text-gray-900 dark:text-white">
                Distance
              </label>
              <input
                required
                type="number"
                step="0.01"
                aria-label="Elevation of the trip"
                className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
                value={distance}
                onChange={(e) => setDistance(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-auto">
              <FormSelect
                label="Unit"
                options={["km", "mi"]}
                onChange={setDistanceUnit}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Base Weight
            </label>
            <input
              required
              type="number"
              step="0.01"
              placeholder="0"
              aria-label="Base Weight"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={baseWeight}
              onChange={(e) => {
                setBaseWeight(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Total Weight
            </label>
            <input
              required
              type="number"
              step="0.01"
              placeholder="0"
              aria-label="Total Weight"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={totalWeight}
              onChange={(e) => {
                setTotalWeight(parseFloat(e.target.value));
              }}
            />
          </div>
          <div className="flex-1">
            <FormSelect
              label="Unit"
              options={["kg", "g", "lb", "oz"]}
              onChange={setWeightUnit}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" bgColor="bg-zinc-600" textColor="text-gray-100">
            Add Trip
          </Button>
        </div>
      </form>
    </div>
  );
}
