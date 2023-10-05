import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import FormSelect from "../formSelect/FormSelect";
import Button from "@/components/actions/button/Button";

interface Props {
  group: Group;
  onUpdate: Dispatch<SetStateAction<[] | GroupData[] | null>>;
  onClose: () => void;
}

export default function EditGroupForm(props: Props) {
  const { group, onUpdate, onClose } = props;
  const [title, setTitle] = useState(group.title);
  const [weightUnit, setWeightUnit] = useState(group.weight_unit);
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();

  const onUpdateGroup = async (e: FormEvent) => {
    e.preventDefault(); // prevent refresh
    const { data: user } = await supabase.auth.getSession();
    if (
      !user.session ||
      (title === group.title && weightUnit === group.weight_unit)
    ) {
      onClose();
      return;
    }

    const { error } = await supabase
      .from("group")
      .update({
        title: title,
        weight_unit: weightUnit,
      })
      .match({ id: group.id, user_id: user.session.user.id });
    if (error) {
      toast.error("Couldn't update group.");
      return;
    }

    toast.success("Updated group.");
    onClose();
    onUpdate((prev) => {
      if (!prev) return prev;
      return prev.map((item) => {
        if (item.id === group.id) {
          return { ...item, title: title, weight_unit: weightUnit };
        }
        return item;
      });
    });
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <form onSubmit={onUpdateGroup}>
        <div className="flex flex-wrap gap-3">
          <div className="flex-1">
            <label className="text-md font-medium text-gray-900 dark:text-white">
              Title
            </label>
            <input
              autoFocus
              required
              type="text"
              placeholder="Title of this group"
              aria-label="Website address"
              className="w-full border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 placeholder:text-sm"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <div className="flex-1">
              <FormSelect
                label="Total Weight Unit"
                initialValue={weightUnit}
                options={["g", "kg", "lb", "oz"]}
                onChange={setWeightUnit}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 mt-5 justify-end">
          <Button type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" bgColor="bg-zinc-600" textColor="text-gray-100">
            Update Group
          </Button>
        </div>
      </form>
    </div>
  );
}
