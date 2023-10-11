import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import TextArea from "@/components/inputs/textarea/Textarea";
import Label from "@/components/inputs/label/Label";
import { packsAtom } from "@/store/store";
import { useSetAtom } from "jotai";

interface Props {
  pack: Pack;
  onDelete: () => void;
  onClose: () => void;
}

export default function EditPackForm(props: Props) {
  const { onDelete, onClose, pack } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState(pack.title);
  const [description, setDescription] = useState(pack.description);
  const [weightUnit, setWeightUnit] = useState(pack.weight_unit);
  const setPacks = useSetAtom(packsAtom);

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

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("pack")
        .update({
          title: title,
          description: description,
          weight_unit: weightUnit,
        })
        .match({ id: pack.id, user_id: user.session.user.id })
        .select();
      if (error) {
        toast.error("Couldn't update pack.");
        return;
      }

      onClose();
      setPacks((prev) => {
        const index = prev.findIndex((item) => item.id === pack.id);
        prev[index] = data[0];
        return [...prev];
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onUpdatePack}>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <Label>Title</Label>
            <Input
              autoFocus
              required
              type="text"
              maxLength={80}
              placeholder="Title"
              aria-label="Pack title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-auto">
            <Label>Description</Label>
            <TextArea
              placeholder="Description"
              aria-label="Description"
              maxLength={120}
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
              bgColor="bg-zinc-600 dark:bg-zinc-800"
              textColor="text-gray-100"
              aria-disabled={loading}
              disabled={loading}
            >
              {loading ? "Updating Pack..." : "Update Pack"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
