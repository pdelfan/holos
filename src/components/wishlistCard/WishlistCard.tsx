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
  onDelete: () => void;
}

function WishlistCard(props: Props) {
  const { url, onDelete } = props;
  const { data, isLoading } = useGetMetadata({ url });
  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <>
      {isLoading && <Skeleton />}
      {data && (
        <article
          className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer group hover:border-neutral-300"
          onClick={() => {
            window.open(data.url, "_self");
          }}
        >
          <Image
            className="object-cover rounded-lg ml-auto mr-auto"
            loader={imageLoader}
            src={data.image ?? PlaceholderImage}
            alt="Wishlist item"
            width={150}
            height={150}
          />
          <div className="mt-6">
            <div className="flex gap-1 flex-wrap items-center">
              <Image
                src={data.logo ?? PlaceholderIcon}
                alt={"Website Favicon"}
                width={20}
                height={20}
              />
              <h2 className="break-words overflow-clip text-sm text-gray-400">
                {getShortAddress(data.url)}
              </h2>
            </div>
            <h3 className="text-stone-600 font-medium">{data.title}</h3>
          </div>
          <div className="hidden group-hover:flex gap-2 absolute right-5 top-5">
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
