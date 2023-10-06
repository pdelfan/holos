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
  onEdit: (showEditItemModal: SetStateAction<boolean>) => void;
  onSelect: (item: SetStateAction<[] | PackItem>) => void;
}

function TableRow(props: Props) {
  const { item, viewMode, onEdit, onSelect } = props;
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
    touchAction: "none",
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
              className="p-2 hover:bg-button-hover rounded-lg dark:hover:bg-neutral-700"
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
        <td className="py-3">
          {image && (
            <Image
              className="border p-1 rounded-lg mx-auto min-w-[3rem] w-[3rem] h-[3.2rem] object-contain dark:border-neutral-400 bg-white"
              src={image}
              alt="Item image"
              height={40}
              width={40}
            />
          )}
        </td>
        <td className="text-center p-3">
          {title && (
            <span className="text-sm dark:text-neutral-300">{title}</span>
          )}
        </td>
        <td className="text-center p-3">
          {description && (
            <span className="inline-block text-sm max-w-xs dark:text-neutral-300">
              {description}
            </span>
          )}
        </td>
        <td className="text-center p-3">
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
        <td className="p-3">{type && <Tag title={type} />}</td>
        <td className="text-center p-3">
          <span className="text-sm dark:text-neutral-300">${price}</span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm dark:text-neutral-300">
            {weight} {weight_unit}
          </span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm dark:text-neutral-300">{quantity}</span>
        </td>
        {!viewMode && (
          <td>
            <span className="flex justify-center p-3">
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
