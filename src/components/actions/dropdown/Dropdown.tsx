"use client";

import { ReactNode, useState } from "react";
import DropdownButton from "./DropdownButton";
import DropdownList from "./DropdownList";
import useOutsideSelect from "@/hooks/useOutsideSelect";

interface Props {
  button: ReactNode;
  direction?: "left" | "right";
  children: ReactNode;
}

export default function Dropdown(props: Props) {
  const { button, direction = "right", children } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideSelect({ callback: () => setIsOpen(false) });

  return (
    <div className="relative">
      <span ref={ref}>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {button}
        </DropdownButton>
      </span>
      <DropdownList isOpen={isOpen} direction={direction}>
        {children}
      </DropdownList>
    </div>
  );
}
