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
  const [formData, setFormData] = useState<TripForm>({
    title: "",
    date: "",
    elevation: 0,
    elevationUnit: "m",
    distance: 0,
    distanceUnit: "km",
    baseWeight: 0,
    totalWeight: 0,
    weightUnit: "kg",
  });
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
            title: formData.title,
            date: formData.date,
            elevation: formData.elevation ?? 0,
            elevation_unit: formData.elevationUnit,
            distance: formData.distance ?? 0,
            distance_unit: formData.distanceUnit,
            base_weight: formData.baseWeight ?? 0,
            total_weight: formData.totalWeight ?? 0,
            weight_unit: formData.weightUnit,
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
              required
              type="text"
              maxLength={60}
              placeholder="Title"
              aria-label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="flex-auto">
            <Label>Date</Label>
            <Input
              required
              type="date"
              aria-label="Date of the trip"
              max={new Date().toISOString().split("T")[0]}
              value={formData.date}
              onChange={(e) =>
                setFormData({ ...formData, date: e.target.value })
              }
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
                value={formData.elevation}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    elevation: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex-auto">
              <FormSelect
                label="Unit"
                options={["m", "ft"]}
                onChange={(newUnit) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    elevationUnit: newUnit,
                  }));
                }}
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
                value={formData.distance}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    distance: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex-auto">
              <FormSelect
                label="Unit"
                options={["km", "mi"]}
                onChange={(newUnit) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    distanceUnit: newUnit,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex-auto sm:flex-1">
            <Label>Base Weight</Label>
            <Input
              required
              type="number"
              step="0.01"
              placeholder="0"
              aria-label="Base Weight"
              value={formData.baseWeight}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  baseWeight: parseFloat(e.target.value),
                });
              }}
            />
          </div>
          <div className="flex-auto sm:flex-1">
            <Label>Total Weight</Label>
            <Input
              required
              type="number"
              step="0.01"
              placeholder="0"
              aria-label="Total Weight"
              value={formData.totalWeight}
              onChange={(e) => {
                setFormData({
                  ...formData,
                  totalWeight: parseFloat(e.target.value),
                });
              }}
            />
          </div>
          <div className="flex-auto sm:flex-1">
            <FormSelect
              label="Unit"
              options={["kg", "g", "lb", "oz"]}
              onChange={(newUnit) => {
                setFormData((prevFormData) => ({
                  ...prevFormData,
                  weightUnit: newUnit,
                }));
              }}
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
