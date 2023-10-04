import { useState, useEffect } from "react";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";
import { Database } from "@/lib/database.types";
import Toggle from "@/components/inputs/toggle/Toggle";
import Button from "@/components/actions/button/Button";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";

interface Props {
  pack: Pack;
  onClose: () => void;
}

export default function ShareForm(props: Props) {
  const { pack, onClose } = props;
  const ref = useOutsideSelect({ callback: () => onClose() });
  const supabase = createClientComponentClient<Database>();
  const [isPublic, setIsPublic] = useState<boolean | null>(null); // Use null as an initial value
  const [isLoading, setIsLoading] = useState(false);
  const [value, copy] = useCopyToClipboard();

  useEffect(() => {
    // fetch the latest is_public value from the server when the modal is opened
    const fetchIsPublic = async () => {
      try {
        const { data, error } = await supabase
          .from("pack")
          .select("is_public")
          .eq("id", pack.id)
          .single();

        if (error) {
          throw error;
        }

        setIsPublic(data?.is_public || false); // Use the fetched value or default to false
      } catch (error) {
        toast.error("Unable to fetch the latest data. Try again.");
      }
    };

    fetchIsPublic();
  }, [pack.id, supabase]);

  const onToggle = async () => {
    if (isLoading) return;
    setIsLoading(true);

    const { error } = await supabase
      .from("pack")
      .update({ is_public: !isPublic })
      .eq("id", pack.id);
    if (error) {
      toast.error("Something went wrong. Try again.");
      return;
    }
    setIsPublic(!isPublic);
    setIsLoading(false);
  };

  return (
    <div
      ref={ref}
      className="z-50 fixed overflow-auto top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[35rem] translate-x-[-50%] translate-y-[-50%] bg-white rounded-xl border border-solid border-slate-200 shadow-md p-4 focus:outline-none animate-fade animate-duration-200"
    >
      <span className="flex flex-wrap justify-between items-center gap-3">
        <h3 className="font-medium">Sharing</h3>
        <div className="flex flex-wrap items-center gap-3">
          <span className="ml-3 text-sm font-medium text-gray-500 dark:text-gray-300">
            {isPublic !== null
              ? isPublic
                ? "Enabled"
                : "Disabled"
              : "Loading..."}
          </span>
          {isPublic !== null && (
            <Toggle checked={isPublic} onChange={onToggle} />
          )}
        </div>
      </span>

      {!isPublic && (
        <p className="text-sm mt-3">
          This pack is currently private. Enable sharing to make it public.
        </p>
      )}

      {isPublic && (
        <div className="mt-5">
          <p className="mt-2 text-gray-600 text-sm font-medium">
            Share this link with people to view your pack.
          </p>

          <div className="flex items-center gap-3 mt-3">
            <input
              defaultValue={`${process.env.NEXT_PUBLIC_SITE_URL}/share/${pack.share_id}`}
              className="px-4 py-2 bg-input rounded-xl w-full text-gray-600 focus:outline-gray-400 focus:bg-input-focus"
            />
            <Button
              onClick={() =>
                copy(
                  `${process.env.NEXT_PUBLIC_SITE_URL}/share/${pack.share_id}`
                )
              }
            >
              Copy
            </Button>
          </div>
        </div>
      )}
      <div className="mt-6">
        <Button onClick={() => onClose()}>Close</Button>
      </div>
    </div>
  );
}
