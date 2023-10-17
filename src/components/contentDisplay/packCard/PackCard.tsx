import Image from "next/image";
import MoreIcon from "@/assets/icons/moreIcon.svg";
import { useRouter } from "next/navigation";
import PackSummary from "../packSummary/PackSummary";

interface Props {
  item: Pack;
  currency: string;
  onEdit: () => void;
}

function PackCard(props: Props) {
  const { item, currency, onEdit } = props;
  const router = useRouter();
  const total = {
    weight_unit: item.weight_unit,
    base_weight: item.base_weight,
    total_weight: item.total_weight,
    currency: currency,
    total_cost: item.total_cost,
    total_items: item.total_items,
  };

  return (
    <article
      className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer hover:border-neutral-300 dark:bg-stone-800 dark:border-neutral-700 dark:hover:border-neutral-600"
      onClick={() => {
        router.push(`packs/${item.id}`);
      }}
    >
      <div className="flex flex-col gap-1 mb-6">
        <h2 className="text-stone-600 font-medium leading-5 dark:text-stone-300 max-w-[80%]">
          {item.title}
        </h2>
        <h3 className="break-words overflow-clip text-base text-stone-400 max-w-[80%]">
          {item.description}
        </h3>
      </div>
      <PackSummary data={total} />
      <div className="flex gap-2 absolute right-5 top-5">
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover dark:bg-stone-300 dark:hover:bg-neutral-200"
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
