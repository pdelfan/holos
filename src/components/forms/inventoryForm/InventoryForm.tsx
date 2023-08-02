import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import { updateIventoryData } from "@/utils/fetchUtils";

interface Props {
  onClose: () => void;
}

export default function InventoryForm(props: Props) {
  const { onClose } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>("kg");
  const [season, setSeason] = useState<string>("3-Season");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [url, setURL] = useState<string | null>(null);

  const onAddItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    const { error } = await supabase.from("inventory").insert([
      {
        title: title,
        description: description ?? "",
        image_url: imageURL === "" ? null : imageURL,
        url: url === "" ? null : url,
        price: price,
        weight: weight ?? 0,
        weight_unit: weightUnit,
        season: season,
        user_id: user.session.user.id,
      },
    ]);

    if (error) {
      toast.error("Couldn't add item to inventory.");
      return;
    }

    toast.success("Added item to inventory.");
    onClose();
    updateIventoryData();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onAddItem} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              autoFocus
              required
              maxLength={80}
              type="text"
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
              value={description}
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
              className="w-full  border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
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
            Add Item
          </button>
        </div>
      </form>
    </div>
  );
}
