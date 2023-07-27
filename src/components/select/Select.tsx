"use client";

import Image from "next/image";
import Button from "@/components/button/Button";
import useOutsideSelect from "@/hooks/useOutsideSelect";
import { useState } from "react";

interface Props {
  selected: SelectOption;
  options: SelectOption[];
  direction?: "left" | "right";
  onChange: (option: SelectOption) => void;
}

export default function Select(props: Props) {
  const { selected, options, direction = "right", onChange } = props;
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideSelect({ callback: () => setIsOpen(false) });

  const handleSelect = (option: SelectOption) => {
    if (option === selected) {
      setIsOpen(false);
      return;
    }
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        text={selected.text}
        icon={selected.icon}
      />
      {isOpen && (
        <div
          className={`absolute top-10 z-10  ${
            direction === "right" ? "right-0" : "left-0"
          } flex flex-col w-max bg-white mt-2 rounded-lg p-2 shadow-lg border-2 border-gray-100 animate-fade-down animate-duration-150`}
        >
          {options.map((option) => (
            <button
              className="flex justify-start items-center gap-2 p-2 rounded-lg font-medium text-button-text hover:bg-gray-100"
              key={option.text}
              onClick={() => {
                handleSelect(option);
                onChange(option);
              }}
            >
              {option.icon && (
                <Image src={option.icon} alt="Icon" width={20} height={20} />
              )}
              {option.text}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
