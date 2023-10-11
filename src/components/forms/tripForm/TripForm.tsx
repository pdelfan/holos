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
  onClose: () => void;
}

export default function TripForm(props: Props) {
  const { onClose } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState<string>("");
  const [elevation, setElevation] = useState<number>(0);
  const [elevationUnit, setElevationUnit] = useState<string>("m");
  const [distance, setDistance] = useState<number>(0);
  const [distanceUnit, setDistanceUnit] = useState<string>("km");
  const [baseWeight, setBaseWeight] = useState<number>(0);
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const setTrip = useSetAtom(tripsAtom);

  const onAddTrip = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("trip")
        .insert([
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
        ])
        .select();

      if (error) {
        toast.error("Couldn't add trip.");
        return;
      }

      onClose();
      setTrip((trips) => [...trips, data[0]]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onAddTrip} className="gap-y-8 flex flex-col">
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
              max={new Date().toISOString().split("T")[0]}
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
              options={["kg", "g", "lb", "oz"]}
              onChange={setWeightUnit}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <Button onClick={onClose}>Cancel</Button>
          <Button
            type="submit"
            bgColor="bg-zinc-600 dark:bg-zinc-800"
            textColor="text-gray-100"
            aria-disabled={loading}
            disabled={loading}
          >
            {loading ? "Adding Trip..." : "Add Trip"}
          </Button>
        </div>
      </form>
    </div>
  );
}
