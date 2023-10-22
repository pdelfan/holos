import { getTagColour, getTagIcon } from "@/utils/packUtils";
import Image from "next/image";

interface Props {
  title: string;
}

function Tag(props: Props) {
  const { title } = props;

  const selectedColour = getTagColour(title);
  const selectedIcon = getTagIcon(title);

  return (
    <div
      className={`flex m-auto items-center justify-center  gap-1 p-2.5 text-xs text-center font-medium ${selectedColour} rounded-full max-w-[2rem]`}
    >
      {selectedIcon && (
        <Image
          src={selectedIcon}
          alt="Tag icon"
          width={15}
          height={15}
          className="object-contain min-w-[0.8rem]"
        />
      )}
    </div>
  );
}

export default Tag;
