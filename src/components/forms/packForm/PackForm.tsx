import { FormEvent, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import { updatePackData } from "@/utils/fetchUtils";
import FormSelect from "../formSelect/FormSelect";

interface Props {
  onClose: () => void;
}

export default function PackForm(props: Props) {
  const { onClose } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();

  const onAddPack = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    const { error } = await supabase.from("pack").insert([
      {
        title: title,
        description: description,
        base_weight: 0,
        total_weight: 0,
        weight_unit: weightUnit,
        total_cost: 0,
        total_items: 0,
        user_id: user.session.user.id,
      },
    ]);

    if (error) {
      toast.error("Couldn't add pack.");
      return;
    }

    toast.success("Added pack.");
    onClose();
    updatePackData();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onAddPack}>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              autoFocus
              required
              type="text"
              placeholder="Title"
              aria-label="Pack title"
              className="w-full rounded-xl px-4 py-2 mt-2 outline-none placeholder-input-placeholder text-input-text text-sm bg-input font-medium"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Description
            </label>
            <textarea
              placeholder="Description"
              aria-label="Description"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex-auto mb-5">
            <FormSelect
              label="Unit"
              options={["kg", "g", "lb", "oz"]}
              onChange={setWeightUnit}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-5 justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-zinc-50 text-zinc-500 text-sm font-medium px-4 py-2 border hover:bg-zinc-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg bg-zinc-600 text-gray-100 text-sm font-medium px-4 py-2 border hover:bg-zinc-700"
          >
            Add Pack
          </button>
        </div>
      </form>
    </div>
  );
}
