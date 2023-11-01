import Image from "next/image";
import PlaceholderImage from "@/assets/images/imagePlaceholder.png";
import { getShortAddress } from "@/utils/linkUtils";
import MoreIcon from "@/assets/icons/moreIcon.svg";

interface Props {
  item: WishlistItem;
  viewMode: string;
  onEdit: () => void;
}

function WishlistCard(props: Props) {
  const { item, viewMode, onEdit } = props;

  return (
    <>
      <article
        className="flex flex-col relative bg-white rounded-2xl border-2 p-4 cursor-pointer hover:border-neutral-300 dark:bg-stone-800 dark:border-neutral-700 dark:hover:border-neutral-600"
        onClick={() => {
          window.open(item.url, "_blank");
        }}
      >
        {viewMode !== "Compact" && item.image_url && (
          <Image
            className={`rounded-lg ml-auto mr-auto mb-6 bg-white ${
              viewMode === "Large"
                ? "h-28 w-28 sm:h-36 sm:w-36"
                : "h-20 w-20 sm:h-28 sm:w-28"
            } object-contain`}
            src={item.image_url ?? PlaceholderImage}
            alt="Wishlist item"
            width={120}
            height={130}
            unoptimized={true}
          />
        )}
        <div className="flex flex-col gap-1">
          {(item.logo_url || item.url) && (
            <div className="flex gap-1 flex-wrap items-center">
              {item.logo_url && (
                <Image
                  src={item.logo_url}
                  alt={"Website Favicon"}
                  width={20}
                  height={20}
                />
              )}
              <h2 className="break-words overflow-clip text-sm text-gray-400 dark:text-neutral-400 max-w-[80%]">
                {getShortAddress(item.url)}
              </h2>
            </div>
          )}

          <h3 className="text-stone-600 font-medium leading-5 dark:text-neutral-300 max-w-[90%]">
            {item.title}
          </h3>
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
    </>
  );
}

export default WishlistCard;
