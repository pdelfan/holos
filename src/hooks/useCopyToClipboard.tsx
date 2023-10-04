import { useState } from "react";
import toast from "react-hot-toast";

type CopiedValue = string | null;
type CopyFn = (text: string) => Promise<boolean>; // Return success

export function useCopyToClipboard(): [CopiedValue, CopyFn] {
  const [copiedText, setCopiedText] = useState<CopiedValue>(null);

  const copy: CopyFn = async (text) => {
    if (!navigator?.clipboard) {
      toast.error("Your browser doesn't support copying to clipboard.", {
        id: "clipboard not supported error",
      });
      return false;
    }

    // try to save to clipboard then save it in the state if worked
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      toast.success("Copied to clipboard.", {
        id: "clipboard success",
      });
      return true;
    } catch (error) {
      toast.error("Couldn't copy to clipboard.", {
        id: "clipboard error",
      });
      setCopiedText(null);
      return false;
    }
  };

  return [copiedText, copy];
}
