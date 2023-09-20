import Image from "next/image";
import Tag from "../../contentDisplay/tag/Tag";
import { SetStateAction, useCallback, useState } from "react";
import LinkIcon from "@/assets/icons/linkIcon.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import DragIcon from "@/assets/icons/dragIcon.svg";
import { useDraggable } from "@dnd-kit/core";
import Modal from "@/components/feedback/modal/Modal";
import EditItemForm from "@/components/forms/editItemForm/EditItemForm";

interface Props {
  item: PackItem;
  onDelete: (id: number) => void;
  onUpdate: (item: SetStateAction<[] | PackItem[]>) => void;
}

function TableRow(props: Props) {
  const { item, onDelete, onUpdate } = props;
  const { id, position, quantity, group_id, type } = item;
  const {
    title,
    image_url: image,
    url,
    description,
    price,
    weight,
    weight_unit,
  } = item.inventory;

  const imageLoader = useCallback(({ src }: { src: string }) => {
    return src;
  }, []);

  const [showEditItemModal, setShowEditItemModal] = useState(false);

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
            width={40}
            height={40}
            loader={imageLoader}
          />
        )}
      </td>
      <td className="text-center p-3">
        {title && <span className="text-sm">{title}</span>}
      </td>
      <td className="text-center p-3">
        {description && (
          <span className="inline-block text-sm max-w-xs">{description}</span>
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
        <span className="text-sm">${price}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{weight}</span>
        <span className="text-sm">{weight_unit}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{quantity}</span>
      </td>
      <td>
        <span className="flex justify-center p-3">
          <button onClick={() => setShowEditItemModal(!showEditItemModal)}>
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
      {showEditItemModal && (
        <Modal>
          <EditItemForm
            item={item}
            onClose={() => setShowEditItemModal(false)}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        </Modal>
      )}
    </tr>
  );
}

export default TableRow;
