import Image from "next/image";
import AvatarSkeleton from "./AvatarSkeleton";
import { formatUsername } from "@/utils/textUtils";

interface Props {
  name: string | null;
  image?: string;
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
              className="rounded-full h-52 w-52"
              src={image}
              alt="Avatar image"
              width={size === "small" ? 35 : 50}
              height={size === "small" ? 35 : 50}
            />
          )}
          {!image && (
            <div
              className={`flex items-center justify-center bg-purple 
            ${
              size === "small" ? "h-8 w-8 rounded-lg" : "h-24 w-24 rounded-3xl"
            } `}
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
