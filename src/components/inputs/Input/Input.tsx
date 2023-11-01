import { RefObject } from "react";

interface Props {
  ref?: RefObject<HTMLInputElement>;
  required?: boolean;
  id?: string;
  type: string;
  name?: string;
  placeholder?: string;
  accept?: string;
  value?: string | number;
  spellCheck?: boolean;
  max?: string;
  maxLength?: number;
  step?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {
  return (
    <input
      className="px-4 py-2.5 bg-input rounded-xl mt-1 w-full text-gray-600 focus:outline-gray-400 focus:bg-input-focus dark:bg-neutral-500 dark:focus:bg-neutral-400 dark:focus:outline-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100  
      file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-medium      
      file:bg-gray-light file:text-white
      hover:file:bg-gray hover:file:brightness-95 hover:file:cursor-pointer
      file:dark:bg-neutral-700      
      "
      {...props}
    />
  );
}
