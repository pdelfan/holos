import useOutsideSelect from "@/hooks/useOutsideSelect";
import { FormEvent, useState } from "react";
import FormSelect from "../formSelect/FormSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Textarea from "@/components/inputs/textarea/Textarea";
import Label from "@/components/inputs/label/Label";
import { useSetAtom } from "jotai";
import { inventoryAtom } from "@/store/store";

interface Props {
  inventoryItem: InventoryItem;
  onDelete: () => void;
  onClose: () => void;
}

export default function EditInventoryForm(props: Props) {
  const { onClose, onDelete, inventoryItem } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [loading, setLoading] = useState(false);
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
  const setInventory = useSetAtom(inventoryAtom);

  const onUpdateInventoryItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (
      !user.session ||
      (title === inventoryItem.title &&
        description === inventoryItem.description &&
        price === inventoryItem.price &&
        season === inventoryItem.season &&
        weight === inventoryItem.weight &&
        weightUnit === inventoryItem.weight_unit &&
        url === inventoryItem.url &&
        imageURL === inventoryItem.image_url)
    ) {
      onClose();
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
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
        .match({ id: inventoryItem.id, user_id: user.session.user.id })
        .select();
      if (error) {
        toast.error("Couldn't update item.");
        return;
      }

      onClose();
      setInventory((prev) => {
        const index = prev.findIndex((item) => item.id === inventoryItem.id);
        prev[index] = data[0];
        return prev;
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onUpdateInventoryItem} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <Label>Title</Label>
            <Input
              autoFocus
              required
              type="text"
              maxLength={80}
              placeholder="Title"
              aria-label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-auto">
            <Label>Description</Label>
            <Textarea
              placeholder="Description"
              aria-label="Description"
              maxLength={120}
              value={description ?? ""}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-8">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1">
              <Label>Price</Label>
              <Input
                required
                type="number"
                step="0.01"
                placeholder="0"
                aria-label="Price of the item"
                value={price}
                onChange={(e) => setPrice(parseFloat(e.target.value))}
              />
            </div>
            <div>
              <FormSelect
                initialValue={season}
                label="Season"
                options={["3-Season", "Winter"]}
                onChange={setSeason}
              />
            </div>
            <div className="flex-1">
              <Label>Weight</Label>
              <Input
                required
                type="number"
                step="0.01"
                placeholder="0"
                aria-label="Weight of the item"
                value={weight}
                onChange={(e) => setWeight(parseFloat(e.target.value))}
              />
            </div>
            <div className="flex-2">
              <FormSelect
                label="Unit"
                initialValue={weightUnit}
                options={["kg", "g", "lb", "oz"]}
                onChange={setWeightUnit}
              />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap justify-between gap-3">
          <div className="flex-1">
            <Label>Item URL</Label>
            <Input
              type="url"
              placeholder="https://"
              aria-label="Image URL"
              value={url ?? ""}
              onChange={(e) => {
                setURL(e.target.value);
              }}
            />
          </div>
          <div className="flex-1">
            <Label>Image URL</Label>
            <Input
              type="url"
              placeholder="https://"
              aria-label="Image URL"
              value={imageURL ?? ""}
              onChange={(e) => {
                setImageURL(e.target.value);
              }}
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3 justify-between">
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
              {loading ? "Updating Item..." : "Update Item"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
