import { useEffect, useRef } from "react";

interface Props {
  callback: () => void;
}

function useOutsideSelect(props: Props) {
  const { callback } = props;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {          
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }      
      
      callback();
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [callback]);

  return ref;
}

export default useOutsideSelect;
