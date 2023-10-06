import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import DropdownIcon from "@/assets/icons/dropdownIcon.svg";
import Label from "@/components/inputs/label/Label";

interface Props {
  label: string;
  initialValue?: string;
  options: string[];
  onChange: (option: string) => void;
}

export default function FormSelect(props: Props) {
  const { label, initialValue, options, onChange } = props;
  const [selected, setSelected] = useState(initialValue ?? options[0]);

  const handelSelect = (option: string) => {
    setSelected(option);
    onChange(option);
  };

  return (
    <div className="flex flex-col">
      <Label>
        <span className="flex">
          {label}
          <Image
            src={DropdownIcon}
            alt="Arrow down icon"
            width={20}
            height={20}
          />
        </span>
      </Label>
      <span className="flex items-center">
        <select
          className="appearance-none px-4 py-2.5 bg-input rounded-xl mt-1 w-full flex-1 text-gray-600 focus:outline-gray-400 focus:bg-input-focus dark:bg-neutral-500 dark:focus:bg-neutral-400 dark:focus:outline-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
          value={selected}
          onChange={(e) => handelSelect(e.target.value)}
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </span>
    </div>
  );
}
