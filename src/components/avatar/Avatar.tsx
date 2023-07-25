import Image from "next/image";
import AvatarSkeleton from "./AvatarSkeleton";
import { formatUsername } from "@/utils/textUtils";

interface Props {
  name: string | null;
  image?: string;
}

function Avatar(props: Props) {
  const { name, image } = props;

  return (
    <>
      {!name && <AvatarSkeleton />}
      {name && (
        <>
          {image && (
            <Image
              className="rounded-full"
              src={image}
              alt="Avatar image"
              width={35}
              height={35}
            />
          )}
          {!image && (
            <div className="flex items-center justify-center rounded-full bg-red-500 h-8 w-8">
              <span className="text-sm text-amber-50">
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
