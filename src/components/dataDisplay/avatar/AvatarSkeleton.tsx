interface Props {
  size?: "small" | "large";
}

export default function AvatarSkeleton(props: Props) {
  const { size = "small" } = props;
  return (
    <span
      className={`flex justify-center items-center ${
        size === "small" ? "h-8 w-8 rounded-lg" : "h-24 w-24 rounded-3xl"
      } rounded-lg bg-gray-300 animate-pulse`}
    >
      <span className="text-sm text-amber-50 animate-pulse" />
    </span>
  );
}
