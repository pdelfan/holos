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

type Action = "updateItem" | "uploadImage";

interface LoadingState {
  [key: string]: boolean;
}

interface FormData {
  title: string;
  description: string;
  price: number;
  weight: number;
  weightUnit: string;
  season: string;
  image_url: string | null;
  url: string | null;
  image: File | null;
}

interface Props {
  inventoryItem: InventoryItem;
  onDelete: () => void;
  onClose: () => void;
}

export default function EditInventoryForm(props: Props) {
  const { onClose, onDelete, inventoryItem } = props;
  const supabase = createClientComponentClient<Database>();
  const ref = useOutsideSelect({ callback: () => onClose() });
  const setInventory = useSetAtom(inventoryAtom);
  const [loading, setLoading] = useState<LoadingState>({});
  const [inputKey, setInputKey] = useState<string | null>(null);
  const [formData, setFormData] = useState<InventoryForm>({
    title: inventoryItem.title,
    description: inventoryItem.description ?? "",
    price: inventoryItem.price ?? 0,
    weight: inventoryItem.weight ?? 0,
    weightUnit: inventoryItem.weight_unit,
    season: inventoryItem.season,
    image_url: inventoryItem.image_url,
    url: inventoryItem.url,
    image: null,
  });

  const startLoading = (action: Action) => {
    setLoading((prev) => ({ ...prev, [action]: true }));
  };

  const stopLoading = (action: Action) => {
    setLoading((prev) => ({ ...prev, [action]: false }));
  };

  const onUpdateInventoryItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();

    if (
      !user.session ||
      (formData.title === inventoryItem.title &&
        formData.description === inventoryItem.description &&
        formData.price === inventoryItem.price &&
        formData.season === inventoryItem.season &&
        formData.weight === inventoryItem.weight &&
        formData.weightUnit === inventoryItem.weight_unit &&
        formData.url === inventoryItem.url &&
        formData.image_url === inventoryItem.image_url)
    ) {
      onClose();
      return;
    }

    startLoading("updateItem");

    try {
      const { data, error } = await supabase
        .from("inventory")
        .update({
          title: formData.title,
          description: formData.description ?? "",
          image_url: formData.image_url === "" ? null : formData.image_url,
          url: formData.url === "" ? null : formData.url,
          price: Number.parseFloat(formData.price.toFixed(2)),
          weight: Number.parseFloat(formData.weight.toFixed(2)) ?? 0,
          weight_unit: formData.weightUnit,
          season: formData.season,
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
      stopLoading("updateItem");
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    // check if size is more than 5MB
    if (e.target.files[0].size > 5242880) {
      toast.error(
        "Image uploaded is too large. Please upload an image less than 5MB."
      );
      setFormData((prev) => ({ ...prev, image: null }));
      setInputKey(Date.now().toString());
      return;
    }

    const image = e.target.files[0];
    setFormData((prev) => ({ ...prev, image }));

    const formData = new FormData();
    formData.append("image", image);

    startLoading("uploadImage");

    const response = await fetch("/api/imgur", {
      method: "POST",
      body: formData,
    });
    const data = await response.json();
    if (!data.success) {
      toast.error("Couldn't upload image.");
      return;
    }
    setFormData((prev) => ({ ...prev, image_url: data.data.link }));
    stopLoading("uploadImage");
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: null }));
    setFormData((prev) => ({ ...prev, image_url: null }));
    setInputKey(Date.now().toString());
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
              required
              type="text"
              maxLength={80}
              placeholder="Title"
              aria-label="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="flex-auto">
            <Label>Description</Label>
            <Textarea
              placeholder="Description"
              aria-label="Description"
              maxLength={120}
              value={formData.description ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
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
                value={formData.price}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    price: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div>
              <FormSelect
                initialValue={formData.season}
                label="Season"
                options={["3-Season", "Winter"]}
                onChange={(newSeason) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    season: newSeason,
                  }));
                }}
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
                value={formData.weight}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    weight: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex-2">
              <FormSelect
                label="Unit"
                initialValue={formData.weightUnit}
                options={["kg", "g", "lb", "oz"]}
                onChange={(newUnit) => {
                  setFormData((prevFormData) => ({
                    ...prevFormData,
                    weightUnit: newUnit,
                  }));
                }}
              />
            </div>
          </div>
        </div>

        <div className="flex-1">
          <Label>Item URL</Label>
          <Input
            type="url"
            placeholder="https://"
            aria-label="Image"
            value={formData.url ?? ""}
            onChange={(e) => {
              setFormData({ ...formData, url: e.target.value });
            }}
          />
        </div>
        <div className="flex-1">
          <Label>
            Image{" "}
            {loading["uploadImage"] &&
              "(Uploading image, it may take a while...)"}
          </Label>
          <div className="flex flex-wrap gap-3">
            <Input
              type="file"
              key={inputKey || ""}
              accept=".png, .jpg, .jpeg, .gif"
              aria-label="Image"
              onChange={handleImageChange}
              disabled={loading["uploadImage"]}
            />
            {(formData.image || formData.image_url) &&
              !loading["uploadImage"] && (
                <Button onClick={handleRemoveImage}>Remove Image</Button>
              )}
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
              disabled={loading["updateItem"] || loading["uploadImage"]}
            >
              {loading["updateItem"] ? "Updating Item..." : "Update Item"}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
