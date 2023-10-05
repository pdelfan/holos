import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import { updatePackData } from "@/utils/fetchUtils";
import Button from "@/components/actions/button/Button";

interface Props {
  pack: Pack;
  onDelete: () => void;
  onClose: () => void;
}

export default function EditPackForm(props: Props) {
  const { onDelete, onClose, pack } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [title, setTitle] = useState(pack.title);
  const [description, setDescription] = useState(pack.description);
  const [weightUnit, setWeightUnit] = useState(pack.weight_unit);

  const onUpdatePack = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (
      !user.session ||
      (title === pack.title &&
        description === pack.description &&
        weightUnit === pack.weight_unit)
    ) {
      onClose();
      return;
    }

    const { error } = await supabase
      .from("pack")
      .update({
        title: title,
        description: description,
        weight_unit: weightUnit,
      })
      .match({ id: pack.id, user_id: user.session.user.id });
    if (error) {
      toast.error("Couldn't update pack.");
      return;
    }

    toast.success("Updated pack.");
    onClose();
    updatePackData();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onUpdatePack}>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              autoFocus
              required
              type="text"
              maxLength={80}
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
              maxLength={120}
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex-auto">
            <FormSelect
              label="Unit"
              initialValue={weightUnit}
              options={["kg", "g", "lb", "oz"]}
              onChange={setWeightUnit}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-5 justify-between">
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
              bgColor="bg-zinc-600"
              textColor="text-gray-100"
            >
              Update Pack
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
