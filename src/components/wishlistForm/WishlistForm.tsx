import { FormEvent, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import { Transition } from "@headlessui/react";

interface Props {
  userID: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function WishlistForm(props: Props) {
  const { userID, isOpen, onClose } = props;
  const [url, setUrl] = useState("");
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();

  const onAddBookmark = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
  };

  return (
    <Transition
      show={isOpen}
      enter="transition-all ease-in-out duration-150"
      enterFrom="opacity-0 -translate-y-20"
      enterTo="opacity-100 -translate-y-2"
      leave="transition-all ease-in-out duration-75"
      leaveFrom="opacity-100 translate-y-2"
      leaveTo="translate-y-0 -opacity-0"
    >
      <div
        ref={ref}
        className="absolute mb-3 origin-top bottom-0 right-5 w-[18rem] overflow-auto z-10 sm:max-h-80 md:max-h-[40rem] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 "
      >
        <form onSubmit={onAddBookmark}>
          <label className="text-md font-medium text-gray-900 dark:text-white">
            Website Address
          </label>
          <input
            autoFocus
            required
            type="url"
            placeholder="URL"
            aria-label="Website address"
            className="w-full mb-5 rounded-xl px-4 py-2 mt-2 outline-none placeholder-input-placeholder text-input-text text-sm bg-input font-medium"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <div className="flex flex-wrap gap-3 mt-5 justify-end">
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
              Add Item
            </button>
          </div>
        </form>
      </div>
    </Transition>
  );
}
