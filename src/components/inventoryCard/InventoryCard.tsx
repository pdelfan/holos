import Image from "next/image";
import { useCallback } from "react";
import Tag from "@/components/tag/Tag";

interface Props {
  data: InventoryData;
}

function InventoryCard(props: Props) {
  const { data } = props;
  const { title, image, description, tag, price, weight } = data;

  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <article className="flex bg-white rounded-2xl border-2 p-5 gap-5 max-w-md items-center cursor-pointer hover:border-neutral-300">
      {image && (
        <Image
          className="object-cover rounded-lg ml-auto mr-auto"
          src={image}
          alt="Item image"
          width={70}
          height={70}
          loader={imageLoader}
        />
      )}

      <div className="flex flex-col items-start">
        <div>
          <h2 className="text-stone-600 font-medium">{title}</h2>
          {description && (
            <h3 className="break-words overflow-clip text-sm text-stone-400">
              {description}
            </h3>
          )}
        </div>
        <div className="flex justify-between gap-5 mt-4 items-center">
          {tag && <Tag title={tag} />}
          {price && (
            <span className="text-sm font-medium text-stone-600">{price}</span>
          )}
          {weight && (
            <span className="text-sm font-medium text-stone-600">{weight}</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default InventoryCard;
