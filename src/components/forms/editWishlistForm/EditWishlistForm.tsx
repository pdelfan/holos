import { FormEvent, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";
import { useSetAtom } from "jotai";
import { wishlistAtom } from "@/store/store";

interface Props {
  wishlistItem: WishlistItem;
  onClose: () => void;
  onDelete: () => void;
}

export default function EditWishlistForm(props: Props) {
  const { wishlistItem, onClose, onDelete } = props;
  const [formData, setFormData] = useState<WishlistForm>({
    url: wishlistItem.url,
    title: wishlistItem.title ?? "",
    imageURL: wishlistItem.image_url ?? "",
  });
  const [loading, setLoading] = useState(false);
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();
  const setWishlist = useSetAtom(wishlistAtom);

  const onUpdateWishlistItem = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    setLoading(true);

    try {
      const { data, error } = await supabase
        .from("wishlist")
        .update({
          url: formData.url ?? null,
          title: formData.title,
          image_url: formData.imageURL ?? null,
        })
        .match({ id: wishlistItem.id, user_id: user.session.user.id })
        .select();

      if (error) {
        toast.error("Couldn't add item to wishlist.");
        return;
      }

      onClose();
      setWishlist((prev) => {
        const index = prev.findIndex((item) => item.id === wishlistItem.id);
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
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[75vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onUpdateWishlistItem}>
        <div className="flex flex-wrap gap-8">
          <div className="flex-auto">
            <Label>Title</Label>
            <Input
              required
              type="text"
              maxLength={80}
              placeholder="Title"
              aria-label="Title"
              value={formData.title ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
            />
          </div>
          <div className="flex-auto">
            <Label>Image URL</Label>
            <Input
              id="image_url"
              name="image_url"
              type="url"
              placeholder="https://"
              aria-label="Image URL"
              value={formData.imageURL ?? ""}
              onChange={(e) =>
                setFormData({ ...formData, imageURL: e.target.value })
              }
            />
          </div>
          <div className="flex-auto">
            <Label>Website Address</Label>
            <Input
              id="manual_url"
              name="manual_url"
              type="url"
              placeholder="https://"
              aria-label="Website address"
              value={formData.url}
              onChange={(e) =>
                setFormData({ ...formData, url: e.target.value })
              }
            />
          </div>
          <div className="flex flex-wrap flex-auto gap-3 justify-between">
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
        </div>
      </form>
    </div>
  );
}
