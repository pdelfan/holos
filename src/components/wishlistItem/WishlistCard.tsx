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
        <article className="flex flex-col bg-white rounded-2xl border-2 p-5 max-w-xs">
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
              <h2 className="break-words overflow-clip text-sm text-gray-400">
                {getShortAddress(data.url)}
              </h2>
            </div>
            <h3 className="text-stone-600 font-medium">{data.title}</h3>
          </div>
        </article>
      )}
    </>
  );
}

export default WishlistCard;
