import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, SetStateAction, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";

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
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState(item.type);
  const [quantity, setQuantity] = useState(item.quantity);

  const onUpdateItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session || (type === item.type && quantity === item.quantity)) {
      onClose();
      return;
    }

    setLoading(true);

    try {
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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
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
            <Label>Quantity</Label>
            <Input
              required
              type="number"
              step="1"
              placeholder="0"
              aria-label="Item quantity"
              value={quantity || ""}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
          <Button
            type="button"
            onClick={() => {
              onDelete(item.id);
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
              {loading ? "Updating Item..." : "Update Item"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
