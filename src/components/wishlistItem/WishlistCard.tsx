import Image from "next/image";
import PlaceholderImage from "@/assets/images/imagePlaceholder.png";
import PlaceholderIcon from "@/assets/images/iconPlaceholder.png";
import { getShortAddress } from "@/utils/linkUtils";
import useGetMetadata from "@/hooks/useGetMetadata";
import Skeleton from "./Skeleton";

interface Props {
  wishlistItem: WishlistItem;
}

function WishlistCard(props: Props) {
  const { wishlistItem } = props;
  const { data, isLoading } = useGetMetadata({ wishlistItem });

  return (
    <>
      {isLoading && <Skeleton />}
      {data && (
        <article className="flex flex-col bg-white rounded-xl border-2 p-4 max-w-xs">
          <Image
            className="object-cover rounded-t-lg ml-auto mr-auto"
            src={data.image ?? PlaceholderImage}
            alt="Item image"
            width={150}
            height={150}
          />
          <div className="mt-6">
            <div className="flex gap-1 flex-wrap items-center">
              <Image
                src={data.logo ?? PlaceholderIcon}
                alt={"Website Favicon"}
                width={30}
                height={30}
              />
              <p className="break-words overflow-clip	text-sm text-gray-400">
                {getShortAddress(data.url)}
              </p>
            </div>
            <h4>{data.title}</h4>
          </div>
        </article>
      )}
    </>
  );
}

export default WishlistCard;
