interface Props {
  size?: "small" | "large";
}

export default function AvatarSkeleton(props: Props) {
  const { size = "small" } = props;
  return (
    <span
      className={`flex justify-center items-center rounded-full ${
        size === "small" ? "h-8 w-8" : "h-24 w-24"
      } bg-gray-300 animate-pulse dark:bg-gray-600`}
    >
      <span className="text-sm text-amber-50 animate-pulse" />
    </span>
  );
}
