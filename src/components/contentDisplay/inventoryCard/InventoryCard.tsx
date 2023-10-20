import Image from "next/image";
import MoreIcon from "@/assets/icons/moreIcon.svg";
import TotalWeightIcon from "@/assets/icons/totalWeight.svg";
import CostIcon from "@/assets/icons/costIcon.svg";

interface Props {
  item: InventoryItem;
  currency: string;
  onEdit: () => void;
}

function InventoryCard(props: Props) {
  const { item, currency, onEdit } = props;

  return (
    <article
      className="flex flex-col relative bg-white rounded-2xl border-2 p-4 cursor-pointer hover:border-neutral-300 dark:bg-stone-800 dark:border-neutral-700 dark:hover:border-neutral-600"
      onClick={() => {
        if (!item.url) return;
        window.open(item.url, "_blank");
      }}
    >
      {item.image_url && (
        <Image
          className="rounded-lg ml-auto mr-auto mb-6 h-20 w-20 sm:h-28 sm:w-28 object-contain bg-white"
          src={item.image_url}
          alt="Item image"
          width={80}
          height={80}
          
        />
      )}

      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-600 font-medium leading-5 dark:text-stone-300">
            {item.title}
          </h2>
          {item.description && (
            <h3 className="break-words overflow-clip text-sm text-stone-400">
              {item.description}
            </h3>
          )}
        </div>
        <div className="flex justify-between gap-4 items-center">
          {item.price !== 0 && (
            <span className="flex items-center gap-1 text-sm font-medium text-stone-500 border-stone-300 dark:text-stone-400">
              <Image src={CostIcon} alt="Cost icon" className="w-4 sm:w-4" />
              <h4 className="text-gray font-medium text-sm sm:text-base dark:text-neutral-200">
                {currency}
                {item.price}
              </h4>
            </span>
          )}
          {item.weight !== 0 && (
            <span className="flex items-center gap-1 text-sm font-medium text-stone-500 border-stone-300 dark:text-stone-400">
              <Image
                src={TotalWeightIcon}
                alt="Weight icon"
                height={20}
                className="w-4 sm:w-auto"
              />
              <h4 className="text-gray font-medium text-sm sm:text-base dark:text-neutral-200">
                {item.weight} {item.weight_unit}
              </h4>
            </span>
          )}
        </div>
      </div>
      <div className="flex gap-2 absolute top-2 right-2">
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
