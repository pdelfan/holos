interface Prop {
  status: "error" | "info";
  children: React.ReactNode;
}

export default function Result(props: Prop) {
  const { children } = props;
  const selectedColour =
    props.status === "error"
      ? "text-red-500 dark:text-red-400"
      : "text-gray dark:text-neutral-400";
  return (
    <div className="flex h-full items-center">
      <h3
        className={`text-base sm:text-lg text-center basis-full ${selectedColour}`}
      >
        {children}
      </h3>
    </div>
  );
}
