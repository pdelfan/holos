import Image from "next/image";
import WearableIcon from "@/assets/icons/clothingIcon.svg";
import ConsumableIcon from "@/assets/icons/consumableIcon.svg";
import GeneralIcon from "@/assets/icons/items.svg";

interface Props {
  title: string;
}

function Tag(props: Props) {
  const { title } = props;

  const formatColour = (title: string) => {
    switch (title) {
      case "Wearable":
        return "bg-lime-300";
      case "Consumable":
        return "bg-pink-300";
      default:
        return "bg-stone-200";
    }
  };

  const formatIcon = (title: string) => {
    switch (title) {
      case "Wearable":
        return WearableIcon;
      case "Consumable":
        return ConsumableIcon;
      default:
        return GeneralIcon;
    }
  };

  const selectedColour = formatColour(title);
  const selectedIcon = formatIcon(title);

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
