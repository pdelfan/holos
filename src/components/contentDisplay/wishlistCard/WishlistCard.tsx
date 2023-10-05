import Image from "next/image";
import PlaceholderImage from "@/assets/images/imagePlaceholder.png";
import PlaceholderIcon from "@/assets/images/iconPlaceholder.png";
import { getShortAddress } from "@/utils/linkUtils";
import useGetMetadata from "@/hooks/useGetMetadata";
import Skeleton from "./Skeleton";
import { useCallback } from "react";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";

interface Props {
  url: string;
  viewMode: string;
  onDelete: () => void;
}

function WishlistCard(props: Props) {
  const { url, viewMode, onDelete } = props;
  const { data, isLoading } = useGetMetadata({ url });
  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <>
      {isLoading && <Skeleton />}
      {data && (
        <article
          className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer hover:border-neutral-300"
          onClick={() => {
            window.open(data.url, "_blank");
          }}
        >
          {viewMode !== "Compact" && (
            <Image
              className={`rounded-lg ml-auto mr-auto mb-6 ${
                viewMode === "Large" ? "h-44 w-48" : "h-28 w-28"
              } object-contain`}
              loader={imageLoader}
              src={data.image ?? PlaceholderImage}
              alt="Wishlist item"
              width={120}
              height={130}
            />
          )}
          <div className="flex flex-col gap-1">
            <div className="flex gap-1 flex-wrap items-center">
              <Image
                src={data.logo ?? PlaceholderIcon}
                alt={"Website Favicon"}
                width={20}
                height={20}
              />
              <h2 className="break-words overflow-clip text-sm text-gray-400 lead">
                {getShortAddress(data.url)}
              </h2>
            </div>
            {viewMode !== "Medium" && (
              <h3 className="text-stone-600 font-medium leading-5">{data.title}</h3>
            )}
          </div>
          <div className="flex gap-2 absolute right-5 top-5">
            <button
              className="bg-button p-2 rounded-full hover:bg-button-hover"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Image src={DeleteIcon} alt="Dots icon" width={20} height={20} />
            </button>
          </div>
        </article>
      )}
    </>
  );
}

export default WishlistCard;
