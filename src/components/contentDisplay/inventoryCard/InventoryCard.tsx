import Image from "next/image";
import { useCallback } from "react";
import Tag from "@/components/contentDisplay/tag/Tag";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";

interface Props {
  data: InventoryItem;
  currency: string;
  onDelete: () => void;
  onEdit: () => void;
}

function InventoryCard(props: Props) {
  const { data, currency, onDelete, onEdit } = props;
  const { title, image_url, url, description, price, weight, weight_unit } =
    data;

  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <article
      className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer group hover:border-neutral-300"
      onClick={() => {
        if (!url) return;
        window.open(url, "_blank");
      }}
    >
      {image_url && (
        <Image
          className="rounded-lg ml-auto mr-auto mb-6 h-28 w-28 object-contain"
          src={image_url}
          alt="Item image"
          width={80}
          height={80}
          loader={imageLoader}
        />
      )}

      <div className="flex flex-col items-start">
        <div className="flex flex-col gap-1">
          <h2 className="text-stone-600 font-medium leading-5">{title}</h2>
          {description && (
            <h3 className="break-words overflow-clip text-sm text-stone-400">
              {description}
            </h3>
          )}
        </div>
        <div className="flex justify-between gap-5 mt-4 items-center">
          {price !== 0 && (
            <span className="text-sm font-medium text-stone-600">
              {currency}
              {price}
            </span>
          )}
          {weight !== 0 && (
            <span className="text-sm font-medium text-stone-600">
              {weight}
              {weight_unit}
            </span>
          )}
        </div>
      </div>
      <div className="hidden group-focus:flex group-hover:flex gap-2 absolute right-5 top-5">
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Image src={DeleteIcon} alt="Dots icon" width={20} height={20} />
        </button>
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Image src={EditIcon} alt="Dots icon" width={20} height={20} />
        </button>
      </div>
    </article>
  );
}

export default InventoryCard;
