import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import { updateIventoryData } from "@/utils/fetchUtils";

interface Props {
  inventoryItem: InventoryItem;
  onClose: () => void;
}

export default function EditInventoryForm(props: Props) {
  const { onClose, inventoryItem } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [title, setTitle] = useState(inventoryItem.title);
  const [description, setDescription] = useState(inventoryItem.description);
  const [price, setPrice] = useState<number>(inventoryItem.price ?? 0);
  const [weight, setWeight] = useState<number>(inventoryItem.weight ?? 0);
  const [weightUnit, setWeightUnit] = useState<string>(
    inventoryItem.weight_unit
  );
  const [season, setSeason] = useState<Season | string>(inventoryItem.season);
  const [imageURL, setImageURL] = useState<string | null>(
    inventoryItem.image_url
  );
  const [url, setURL] = useState<string | null>(inventoryItem.url);

  const onUpdateInventoryItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    const { error } = await supabase
      .from("inventory")
      .update({
        title: title,
        description: description ?? "",
        image_url: imageURL === "" ? null : imageURL,
        url: url === "" ? null : url,
        price: Number.parseFloat(price.toFixed(2)),
        weight: Number.parseFloat(weight.toFixed(2)) ?? 0,
        weight_unit: weightUnit,
        season: season,
      })
      .match({ id: inventoryItem.id, user_id: user.session.user.id });
    if (error) {
      toast.error("Couldn't update item.");
      return;
    }

    toast.success("Updated item.");
    onClose();
    updateIventoryData();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onUpdateInventoryItem} className="gap-y-8 flex flex-col">
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
              aria-label="Title"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
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
        </div>

        <div className="flex gap-8">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <label className="text-md font-medium text-gray-900 dark:text-white">
                Price
              </label>
              <input
                required
                type="number"
                step="0.01"
                placeholder="0"
                aria-label="Price of the item"
                className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div className="1">
              <FormSelect
                initialValue={season}
                label="Season"
                options={["3-Season", "Winter"]}
                onChange={setSeason}
              />
            </div>
            <div className="flex-1">
              <label className="text-md font-medium text-gray-900 dark:text-white">
                Weight
              </label>
              <input
                required
                type="number"
                step="0.01"
                placeholder="0"
                aria-label="Weight of the item"
                className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-2">
              <FormSelect
                label="Unit"
                options={["kg", "g", "lb", "oz"]}
                onChange={setWeightUnit}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Item URL
            </label>
            <input
              type="url"
              placeholder="https://"
              aria-label="Image URL"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={url ?? ""}
              onChange={(e) => {
                setURL(e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Image URL
            </label>
            <input
              type="url"
              placeholder="https://"
              aria-label="Image URL"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={imageURL ?? ""}
              onChange={(e) => {
                setImageURL(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-end">
          <button
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
      </form>
    </div>
  );
}
