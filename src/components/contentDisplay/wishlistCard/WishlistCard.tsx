import Image from "next/image";
import PlaceholderImage from "@/assets/images/imagePlaceholder.png";
import { getShortAddress } from "@/utils/linkUtils";
import { useCallback } from "react";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";

interface Props {
  item: WishlistItem;
  viewMode: string;
  onDelete: () => void;
}

function WishlistCard(props: Props) {
  const { item, viewMode, onDelete } = props;
  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <>
      <article
        className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer hover:border-neutral-300 dark:bg-stone-800 dark:border-neutral-700 dark:hover:border-neutral-600"
        onClick={() => {
          window.open(item.url, "_blank");
        }}
      >
        {viewMode !== "Compact" && item.image_url && (
          <Image
            className={`rounded-lg ml-auto mr-auto mb-6 bg-white ${
              viewMode === "Large" ? "h-40 w-40" : "h-28 w-28"
            } object-contain`}
            loader={imageLoader}
            src={item.image_url ?? PlaceholderImage}
            alt="Wishlist item"
            width={120}
            height={130}
          />
        )}
        <div className="flex flex-col gap-1">
          <div className="flex gap-1 flex-wrap items-center">
            {item.logo_url && (
              <Image
                src={item.logo_url}
                alt={"Website Favicon"}
                width={20}
                height={20}
              />
            )}
            <h2 className="break-words overflow-clip text-sm text-gray-400 dark:text-neutral-400">
              {getShortAddress(item.url)}
            </h2>
          </div>
          {viewMode !== "Medium" && (
            <h3 className="text-stone-600 font-medium leading-5 dark:text-neutral-300">
              {item.title}
            </h3>
          )}
        </div>
        <div className="flex gap-2 absolute right-5 top-5">
          <button
            className="bg-button p-2 rounded-full hover:bg-button-hover dark:bg-stone-300 dark:hover:bg-neutral-200"
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
          >
            <Image src={DeleteIcon} alt="Dots icon" width={20} height={20} />
          </button>
        </div>
      </article>
    </>
  );
}

export default WishlistCard;
