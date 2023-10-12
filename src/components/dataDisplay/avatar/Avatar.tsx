import Image from "next/image";
import AvatarSkeleton from "./AvatarSkeleton";
import { formatUsername } from "@/utils/textUtils";

interface Props {
  name: string | undefined;
  image?: string | null;
  size?: "small" | "large";
}

function Avatar(props: Props) {
  const { name, image, size = "small" } = props;

  return (
    <>
      {!name && <AvatarSkeleton size={size} />}
      {name && (
        <>
          {image && (
            <Image
              className={`rounded-full object-cover inline-block ${
                size === "small" ? "h-8 w-8" : "h-24 w-24"
              }`}
              src={image}
              alt="Avatar image"
              width={size === "small" ? 35 : 96}
              height={size === "small" ? 35 : 96}
              unoptimized={true}
            />
          )}
          {!image && (
            <div
              className={`flex items-center justify-center bg-pink-600 rounded-full
            ${size === "small" ? "h-8 w-8" : "h-24 w-24"} `}
            >
              <span
                className={`${
                  size === "small" ? "text-sm" : "text-3xl"
                } text-amber-50`}
              >
                {formatUsername(name)}
              </span>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Avatar;
