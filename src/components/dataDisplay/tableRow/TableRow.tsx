import Image from "next/image";
import Tag from "../../contentDisplay/tag/Tag";
import { SetStateAction } from "react";
import LinkIcon from "@/assets/icons/linkIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import DragIcon from "@/assets/icons/dragIcon.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  item: PackItem;
  viewMode?: boolean;
  currency: string;
  onEdit: (showEditItemModal: SetStateAction<boolean>) => void;
  onSelect: (item: SetStateAction<[] | PackItem>) => void;
}

function TableRow(props: Props) {
  const { item, viewMode, currency, onEdit, onSelect } = props;
  const { id, quantity, type } = item;
  const {
    title,
    image_url: image,
    url,
    description,
    price,
    weight,
    weight_unit,
  } = item.inventory;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    filter: isDragging ? "contrast(0.9)" : "contrast(1)",
  };

  return (
    <>
      <tr
        className={`bg-table-row border-y-2 align-middle dark:bg-neutral-800 dark:border-neutral-700`}
        ref={setNodeRef}
        style={style}
      >
        {!viewMode && (
          <td className="text-center pl-1 touch-none">
            <button
              className="touch-none p-2 hover:bg-button-hover rounded-lg dark:hover:bg-neutral-700"
              style={{ cursor: isDragging ? "grabbing" : "grab" }}
              {...listeners}
              {...attributes}
            >
              <Image
                draggable={false}
                className="w-auto h-auto"
                src={DragIcon}
                alt="Drag icon"
                width={10}
                height={10}
              />
            </button>
          </td>
        )}
        <td className="py-1.5 sm:py-2.5 lg:py-3">
          {image && (
            <Image
              className="border p-1 rounded-lg mx-auto max-w-[3rem] w-[3rem] h-[3.2rem] object-contain dark:border-neutral-400 bg-white"
              src={image}
              alt="Item image"
              height={40}
              width={40}
            />
          )}
        </td>
        <td className="text-center px-3">
          {title && (
            <span className="inline-block text-sm min-w-[10rem] max-w-[18rem] max-h-[3rem] overflow-y-auto dark:text-neutral-300">
              {title}
            </span>
          )}
        </td>
        <td className="text-center px-3">
          {description && (
            <span className="inline-block text-sm min-w-[10rem] max-w-[18rem] max-h-[3rem] overflow-y-auto dark:text-neutral-300">
              {description}
            </span>
          )}
        </td>
        <td className="text-center px-3">
          {url && (
            <button
              onClick={() => {
                window.open(url, "_blank");
              }}
            >
              <Image src={LinkIcon} alt="Link icon" width={20} height={20} />
            </button>
          )}
        </td>
        <td>{type && <Tag title={type} />}</td>
        <td className="text-center px-3">
          <span className="text-sm dark:text-neutral-300">
            {currency}
            {price}
          </span>
        </td>
        <td className="text-center px-3">
          <span className="text-sm dark:text-neutral-300">
            {weight} {weight_unit}
          </span>
        </td>
        <td className="text-center px-3">
          <span className="text-sm dark:text-neutral-300">{quantity}</span>
        </td>
        {!viewMode && (
          <td className=" px-3">
            <span className="flex justify-center">
              <button
                onClick={() => {
                  onSelect(item);
                  onEdit(true);
                }}
              >
                <Image
                  className="min-w-[1.3rem]"
                  src={EditIcon}
                  alt="Link icon"
                  width={20}
                  height={20}
                />
              </button>
            </span>
          </td>
        )}
      </tr>
    </>
  );
}

export default TableRow;
