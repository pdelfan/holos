import Button from "@/components/actions/button/Button";
import Modal from "@/components/feedback/modal/Modal";
import ItemForm from "@/components/forms/itemForm/ItemForm";
import { SetStateAction, useState } from "react";

interface Props {
  onAddItem: (item: SetStateAction<[] | PackItem[]>) => void;
  total: TotalGroup;
  weightUnit: string;
  currency: string;
  groupID: number;
}

export default function AddItem(props: Props) {
  const { onAddItem, total, weightUnit, currency, groupID } = props;
  const [showAddForm, setShowAddForm] = useState(false);

  return (
    <>
      <tr className="border-table-rowBorder">
        <td className="text-center p-3">
          <Button onClick={() => setShowAddForm(!showAddForm)}>Add</Button>
        </td>
        <td className="py-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3">
          <span className="text-sm">
            {currency}
            {total.price}
          </span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm">{total.weight} {weightUnit}</span>          
        </td>
        <td className="text-center p-3">
          <span className="text-sm">{total.quantity}</span>
        </td>
        <td>
          <span className="flex gap-5 justify-center p-3"></span>
        </td>
      </tr>
      {showAddForm && (
        <Modal>
          <ItemForm groupID={groupID} onAddItem={onAddItem} onClose={() => setShowAddForm(false)} />
        </Modal>
      )}
    </>
  );
}
