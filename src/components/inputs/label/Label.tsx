interface Props {
  htmlFor?: string;
  children: React.ReactNode;
}

export default function Label(props: Props) {
  const { htmlFor, children } = props;
  return (
    <label
      className="text-md font-medium text-gray-900 dark:text-white"
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
}
