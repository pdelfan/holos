import PackSummary from "../packSummary/PackSummary";
import Image from "next/image";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import { useRouter } from "next/navigation";

interface Props {
  data: Pack;
  onEdit: () => void;
  onDelete: () => void;
}

function PackCard(props: Props) {
  const { data, onEdit, onDelete } = props;
  const { title, description } = data;
  const router = useRouter();

  const gradient = {
    background:
      "radial-gradient(50% 50% at 50% 50%, #000 0%, #6A6A6A 100%)",
  };

  return (
    <article
      className="flex flex-col relative rounded-2xl p-5 cursor-pointer group hover:brightness-105"
      style={gradient}
      onClick={() => {
        router.push(`packs/${data.id}`);
      }}
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-stone-100 font-medium text-lg leading-5">
          {title}
        </h2>
        <h3 className="break-words overflow-clip text-stone-300 mt-2">
          {description}
        </h3>
      </div>
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
