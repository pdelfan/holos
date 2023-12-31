import { FormEvent, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import FormSelect from "../formSelect/FormSelect";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import TextArea from "@/components/inputs/textarea/Textarea";
import Label from "@/components/inputs/label/Label";
import { packsAtom } from "@/store/store";
import { useSetAtom } from "jotai";

interface Props {
  onClose: () => void;
}

export default function PackForm(props: Props) {
  const { onClose } = props;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [loading, setLoading] = useState(false);
  const supabase = createClientComponentClient<Database>();
  const setPacks = useSetAtom(packsAtom);

  const onAddPack = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("pack")
        .insert([
          {
            title: title,
            description: description,
            base_weight: 0,
            total_weight: 0,
            weight_unit: weightUnit,
            total_cost: 0,
            total_items: 0,
            user_id: user.session.user.id,
            is_public: false,
          },
        ])
        .select();

      if (error) {
        toast.error("Couldn't add pack.");
        return;
      }

      onClose();
      setPacks((prev) => [...prev, data[0]]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onAddPack}>
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <Label>Title</Label>
            <Input              
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
              options={["kg", "g", "lb", "oz"]}
              onChange={setWeightUnit}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-5 justify-end">
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
            {loading ? "Adding Pack..." : "Add Pack"}
          </Button>
        </div>
      </form>
    </div>
  );
}
