import { Transition } from "@headlessui/react";
import { ReactNode } from "react";

interface Props {
  isOpen: boolean;
  direction?: "left" | "right";
  children: ReactNode;
}

export default function DropdownList(props: Props) {
  const { isOpen, direction, children } = props;

  return (
    <>
      {isOpen && (
        <div
          className={`absolute z-10 ${
            direction === "right" ? "right-0" : "left-0"
          } p-2 min-w-max bg-white rounded-xl border border-solid border-slate-200 shadow-lg mt-2 animate-fade-down animate-duration-100`}
        >
          {children}
        </div>
      )}
    </>
  );
}
