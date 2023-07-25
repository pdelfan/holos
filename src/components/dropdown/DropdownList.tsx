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
      <Transition
        show={isOpen}
        enter="transition-all ease-in-out duration-150"
        enterFrom="opacity-0 translate-y-0"
        enterTo="opacity-100 translate-y-3"
        leave="transition-all ease-in-out duration-75"
        leaveFrom="opacity-100 translate-y-3"
        leaveTo="translate-y-0 opacity-0"
      >
        <div
          className={`absolute z-10 ${
            direction === "right" ? "right-0" : "left-0"
          } p-2 min-w-max bg-white rounded-xl border border-solid border-slate-200 shadow-lg  `}
        >
          {children}
        </div>
      </Transition>    
  );
}
