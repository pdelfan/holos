import { FormEvent, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import { updateWishlistData } from "@/utils/fetchUtils";
import Button from "@/components/actions/button/Button";
import Input from "@/components/inputs/Input/Input";
import Label from "@/components/inputs/label/Label";
import { getSiteMetadata } from "@/utils/linkUtils";

interface Props {
  onClose: () => void;
}

export default function WishlistForm(props: Props) {
  const { onClose } = props;
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();

  const onAddBookmark = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    setLoading(true);

    try {
      const metadata: Metadata = await getSiteMetadata(url);
      const { error } = await supabase.from("wishlist").insert([
        {
          url: url,
          title: metadata.title ?? null,
          logo_url: metadata.logo ?? null,
          image_url: metadata.image ?? null,
          user_id: user.session.user.id,
        },
      ]);

      if (error) {
        toast.error("Couldn't add item to wishlist.");
        return;
      }

      toast.success("Added item to wishlist.");
      onClose();
      updateWishlistData();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border-2 border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200 dark:bg-neutral-700 dark:border-neutral-600"
    >
      <form onSubmit={onAddBookmark}>
        <Label>Website Address</Label>
        <Input
          autoFocus
          required
          id="url"
          name="url"
          type="url"
          placeholder="https://"
          aria-label="Website address"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
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
            {loading ? "Adding item..." : "Add Item"}
          </Button>
        </div>
      </form>
    </div>
  );
}
