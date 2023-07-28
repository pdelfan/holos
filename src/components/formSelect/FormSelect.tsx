import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import DropdownIcon from "@/assets/icons/dropdownIcon.svg";

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
      <label className="flex text-md font-medium text-gray-900 dark:text-white">
        {label}
        <Image
          src={DropdownIcon}
          alt="Arrow down icon"
          width={20}
          height={20}
        />
      </label>
      <span className="flex items-center">
        <select
          className="appearance-none border border-solid border-slate-200 rounded-xl px-4 py-2 mt-2 outline-none focus:bg-zinc-100 flex-1"
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
