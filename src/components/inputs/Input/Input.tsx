interface Props {
  autoFocus?: boolean;
  required?: boolean;
  id?: string;
  type: string;
  name?: string;
  placeholder?: string;
  value: string | number;
  spellCheck?: boolean;
  max?: string;
  maxLength?: number;
  step?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input(props: Props) {
  const {
    autoFocus = false,
    required,
    id,
    type,
    name,
    placeholder,
    value,
    spellCheck = false,
    max,
    maxLength,
    step,
    onChange,
  } = props;
  return (
    <input
      className="px-4 py-2.5 bg-input rounded-xl mt-1 w-full text-gray-600 focus:outline-gray-400 focus:bg-input-focus dark:bg-neutral-500 dark:focus:bg-neutral-400 dark:focus:outline-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
      autoFocus={autoFocus}
      required={required}
      id={id}
      name={name}
      type={type}
      max={max}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      spellCheck={spellCheck}
      step={step}
      onChange={onChange}
    />
  );
}
