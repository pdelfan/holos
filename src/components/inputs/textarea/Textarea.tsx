interface Props {
  id?: string;
  name?: string;
  placeholder?: string;
  maxLength?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function TextArea(props: Props) {
  return (
    <textarea
      className="px-4 py-2.5 bg-input rounded-xl mt-1 w-full text-gray-600 focus:outline-gray-400 focus:bg-input-focus dark:bg-neutral-500 dark:focus:bg-neutral-400 dark:focus:outline-neutral-600 dark:placeholder-neutral-400 dark:text-neutral-100"
      {...props}
    />
  );
}
