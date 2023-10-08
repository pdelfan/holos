import Image from "next/image";
import { useCallback } from "react";
import MoreIcon from "@/assets/icons/moreIcon.svg";
import TotalWeightIcon from "@/assets/icons/totalWeight.svg";
import CostIcon from "@/assets/icons/costIcon.svg";

interface Props {
  data: InventoryItem;
  currency: string;
  onEdit: () => void;
}

function InventoryCard(props: Props) {
  const { data, currency, onEdit } = props;
  const { title, image_url, url, description, price, weight, weight_unit } =
    data;

  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <article
      className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer hover:border-neutral-300 dark:bg-stone-800 dark:border-neutral-700 dark:hover:border-neutral-600"
      onClick={() => {
        if (!url) return;
        window.open(url, "_blank");
      }}
    >
      {image_url && (
        <Image
          className="rounded-lg ml-auto mr-auto mb-6 h-28 w-28 object-contain bg-white"
          src={image_url}
          alt="Item image"
          width={80}
          height={80}
          loader={imageLoader}
        />
      )}

      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-600 font-medium leading-5 dark:text-stone-300">
            {title}
          </h2>
          {description && (
            <h3 className="break-words overflow-clip text-sm text-stone-400">
              {description}
            </h3>
          )}
        </div>
        <div className="flex justify-between gap-4 mt-4 items-center">
          {price !== 0 && (
            <span className="flex items-center gap-1 text-sm font-medium text-stone-500 border-stone-300 dark:text-stone-400">
              <Image src={CostIcon} alt="Cost icon" width={20} height={20} />
              {currency} 
              {price}
            </span>
          )}
          {weight !== 0 && (
            <span className="flex items-center gap-1 text-sm font-medium text-stone-500 border-stone-300 dark:text-stone-400">
              <Image
                src={TotalWeightIcon}
                alt="Weight icon"
                width={20}
                height={20}
              />
              {weight} {weight_unit}
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 absolute right-5 top-5">
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover dark:bg-stone-300 dark:hover:bg-neutral-200"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Image src={MoreIcon} alt="Dots icon" width={20} height={20} />
        </button>
      </div>
    </article>
  );
}

export default InventoryCard;
