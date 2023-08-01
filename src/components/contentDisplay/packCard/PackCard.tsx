import PackSummary from "../packSummary/PackSummary";
import Image from "next/image";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import { useRouter } from "next/navigation";

interface Props {
  data: Pack;
  currency: string;
  onEdit: () => void;
  onDelete: () => void;
}

function PackCard(props: Props) {
  const { data, currency, onEdit, onDelete } = props;
  const {
    title,
    description,
    base_weight,
    total_weight,
    total_cost,
    total_items,
    weight_unit,
  } = data;

  const packSummary: PackSummary = {
    base_weight,
    total_weight,
    total_cost,
    total_items,
    weight_unit,
    currency,
  };

  const router = useRouter();

  return (
    <article
      className="flex flex-col relative bg-white rounded-2xl border-2 p-5 cursor-pointer group hover:border-neutral-300"
      onClick={() => {
        router.push(`packs/${data.id}`);
      }}
    >
      <div className="flex  flex-col gap-1 mb-6">
        <h2 className="text-stone-600 font-medium leading-5">{title}</h2>
        <h3 className="break-words overflow-clip text-stone-400">
          {description}
        </h3>
      </div>
      <PackSummary data={packSummary} />
      <div className="hidden group-focus:flex group-hover:flex gap-2 absolute right-5 top-5">
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <Image src={DeleteIcon} alt="Delete icon" width={20} height={20} />
        </button>
        <button
          className="bg-button p-2 rounded-full hover:bg-button-hover"
          tabIndex={0}
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          <Image src={EditIcon} alt="Edit icon" width={20} height={20} />
        </button>
      </div>
    </article>
  );
}

export default PackCard;
