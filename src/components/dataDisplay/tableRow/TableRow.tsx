import Image from "next/image";
import Tag from "../../contentDisplay/tag/Tag";
import { useCallback } from "react";
import LinkIcon from "@/assets/icons/linkIcon.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import DragIcon from "@/assets/icons/dragIcon.svg";
import { useDraggable } from "@dnd-kit/core";

interface Props {
  data: PackItem;
}

function TableRow(props: Props) {
  const { data } = props;
  const {
    position,
    image,
    title,
    description,
    link,
    type,
    price,
    weight,
    weightUnit,
    quantity,
    groupID,
  } = data;

  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  return (
    <tr className=" bg-table-row border-y-2 align-middle">
      <td className="text-center pl-1">
        <button className="p-2 hover:bg-button-hover rounded-lg">
          <Image
            draggable={false}
            className="min-w-[0.6rem]"
            src={DragIcon}
            alt="Drag icon"
            width={10}
            height={10}
          />
        </button>
      </td>
      <td className="py-3">
        {image && (
          <Image
            className="bg-white border p-1 rounded-lg mx-auto min-w-[3rem]"
            src={image}
            alt="Item image"
            width={50}
            height={50}
            loader={imageLoader}
          />
        )}
      </td>
      <td className="text-center p-3">
        {title && <span className="text-sm">{title}</span>}
      </td>
      <td className="text-center p-3">
        {description && <span className="text-sm">{description}</span>}
      </td>
      <td className="text-center p-3">
        {link && (
          <button
            onClick={() => {
              window.open(link, "_self");
            }}
          >
            <Image src={LinkIcon} alt="Link icon" width={20} height={20} />
          </button>
        )}
      </td>
      <td className="p-3">{type && <Tag title={type} />}</td>
      <td className="text-center p-3">
        <span className="text-sm">${price}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{weight}</span>
        <span className="text-sm">{weightUnit}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{quantity}</span>
      </td>
      <td>
        <span className="flex gap-5 justify-center p-3">
          <button>
            <Image
              className="min-w-[1.3rem]"
              src={EditIcon}
              alt="Link icon"
              width={20}
              height={20}
            />
          </button>
          <button>
            <Image
              className="min-w-[1.3rem]"
              src={DeleteIcon}
              alt="Link icon"
              width={20}
              height={20}
            />
          </button>
        </span>
      </td>
    </tr>
  );
}

export default TableRow;