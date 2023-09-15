import { FormEvent, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import { updateGroupData } from "@/utils/fetchUtils";

interface Props {
  groupID: number;
  title: string;
  onClose: () => void;
}

export default function EditGroupForm(props: Props) {
  const { groupID, title: initialTitle, onClose } = props;
  const [title, setTitle] = useState(initialTitle);
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();

  const onUpdateGroup = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (!user.session) {
      onClose();
      return;
    }

    const { error } = await supabase
      .from("group")
      .update({
        title: title,
      })
      .match({ id: groupID, user_id: user.session.user.id });
    if (error) {
      toast.error("Couldn't update title.");
      return;
    }

    toast.success("Updated title.");
    onClose();
    updateGroupData();
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onUpdateGroup}>
        <label className="text-md font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          autoFocus
          required
          type="text"
          placeholder="Title of this group"
          aria-label="Website address"
          className="w-full rounded-xl px-4 py-2 mt-2 outline-none placeholder-input-placeholder text-input-text text-sm bg-input font-medium"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
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
            Update Title
          </button>
        </div>
      </form>
    </div>
  );
}
