import Image from "next/image";
import MoreIcon from "@/assets/icons/moreIcon.svg";
import { useRouter } from "next/navigation";

interface Props {
  item: Pack;
  onEdit: () => void;  
}

function PackCard(props: Props) {
  const { item, onEdit } = props;  
  const router = useRouter();

  const gradient = {
    background:
      "radial-gradient(50% 50% at 50% 50%, #000 0%, #6A6A6A 100%)",
  };

  return (
    <article
      className="flex flex-col relative rounded-2xl p-5 cursor-pointer hover:brightness-105"
      style={gradient}
      onClick={() => {
        router.push(`packs/${item.id}`);
      }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-stone-100 font-medium text-lg leading-5 max-w-[80%]">
          {item.title}
        </h2>
        <h3 className="break-words overflow-clip text-stone-300 mt-2 max-w-[80%]">
          {item.description}
        </h3>
      </div>
      <div className="flex gap-2 absolute right-5 top-5">     
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Image src={MoreIcon} alt="Edit icon" width={20} height={20} />
        </button>
      </div>
    </article>
  );
}

export default PackCard;
