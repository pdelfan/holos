import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import FormSelect from "../formSelect/FormSelect";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";

interface Props {
  packID: number;
  onUpdate: Dispatch<SetStateAction<[] | GroupData[] | null>>;
  onClose: () => void;
}

export default function GroupForm(props: Props) {
  const { packID, onUpdate, onClose } = props;
  const [title, setTitle] = useState("");
  const [weightUnit, setWeightUnit] = useState("g");
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();

  const onAddGroup = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    const { data, error } = await supabase
      .from("group")
      .insert({
        title: title,
        total_base_weight: 0,
        total_weight: 0,
        weight_unit: weightUnit,
        total_price: 0,
        total_quantity: 0,
        user_id: user.session.user.id,
        pack_id: packID,
      })
      .select("*");

    if (error) {
      toast.error("Couldn't add this group to pack.");
      return;
    }

    toast.success("Added group to pack.");
    onUpdate((prev) => {
      if (!prev) return prev;

      return [
        ...prev,
        {
          ...data[0],
          pack_item: [],
        },
      ];
    });
    onClose();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onAddGroup}>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1">
            <Label>Title</Label>
            <Input
              autoFocus
              required
              type="text"
              placeholder="Title of this group"
              aria-label="Website address"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <div className="flex-1">
              <FormSelect
                label="Total Weight Unit"
                options={["g", "kg", "lb", "oz"]}
                onChange={setWeightUnit}
              />
            </div>
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
          >
            Add Group
          </Button>
        </div>
      </form>
    </div>
  );
}
