import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, SetStateAction, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";

interface Props {
  onClose: () => void;
  item: PackItem;
  onUpdate: (item: SetStateAction<[] | GroupData[] | null>) => void;
  onDelete: (id: number) => void;
}

export default function EditItemForm(props: Props) {
  const { onClose, onUpdate, onDelete, item } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });

  const [type, setType] = useState(item.type);
  const [quantity, setQuantity] = useState(item.quantity);

  const onUpdateItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session || (type === item.type && quantity === item.quantity)) {
      onClose();
      return;
    }

    const { error } = await supabase
      .from("pack_item")
      .update({
        type: type,
        quantity: quantity,
      })
      .eq("id", item.id);

    if (error) {
      toast.error("Couldn't update item.");
      return;
    }

    toast.success("Updated item.");

    // filter out the item and replace its data
    onUpdate((prev) => {
      if (!prev) return prev;
      const group = prev.find((group) => group.id === item.group_id);
      if (!group) return prev;
      return [
        ...prev.filter((group) => group.id !== item.group_id),
        {
          ...group,
          pack_item: [
            ...group.pack_item.filter((packItem) => packItem.id !== item.id),
            {
              ...item,
              type: type,
              quantity: quantity,
            },
          ],
        },
      ];
    });

    onClose();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onUpdateItem} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap gap-3">
          <div className="flex-1">
            <FormSelect
              label="Type"
              initialValue={type}
              options={["General", "Wearable", "Consumable"]}
              onChange={setType}
            />
          </div>
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Quantity
            </label>
            <input
              required
              type="number"
              step="1"
              placeholder="0"
              aria-label="Item quantity"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <button
            type="button"
            onClick={() => {
              onDelete(item.id);
              onClose();
            }}
            className="rounded-lg bg-red-600 text-white text-sm font-medium px-4 py-2 border hover:bg-red-700"
          >
            Delete
          </button>
          <div className="flex flex-wrap gap-3">
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
              Update Item
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
