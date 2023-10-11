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
import { inventoryAtom } from "@/store/store";
import { useSetAtom } from "jotai";

interface Props {
  onClose: () => void;
}

export default function InventoryForm(props: Props) {
  const { onClose } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [weight, setWeight] = useState<number>(0);
  const [weightUnit, setWeightUnit] = useState<string>("g");
  const [season, setSeason] = useState<string>("3-Season");
  const [imageURL, setImageURL] = useState<string | null>(null);
  const [url, setURL] = useState<string | null>(null);
  const setInventory = useSetAtom(inventoryAtom);

  const onAddItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("inventory")
        .insert([
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
        ])
        .select();

      if (error) {
        toast.error("Couldn't add item to inventory.");
        return;
      }

      onClose();
      setInventory((prev) => [...prev, data[0]]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[70vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onAddItem} className="gap-y-8 flex flex-col">
        <div className="flex flex-wrap justify-between gap-8">
          <div className="flex-auto">
            <Label>Title</Label>
            <Input
              autoFocus
              required
              maxLength={80}
              type="text"
              placeholder="Title"
              aria-label="Title"
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
              value={description}
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
                options={["g", "kg", "lb", "oz"]}
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

        <div className="flex flex-wrap gap-3 justify-end">
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
            {loading ? "Adding Item..." : "Add Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}
