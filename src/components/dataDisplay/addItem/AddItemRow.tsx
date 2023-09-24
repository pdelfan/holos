import Button from "@/components/actions/button/Button";
import { SetStateAction, useState } from "react";

interface Props {
  onAdd: (showAddItemModal: SetStateAction<boolean>) => void;
  total: TotalGroup;
  weightUnit: string;
  currency: string;  
}

export default function AddItemRow(props: Props) {
  const { onAdd, total, weightUnit, currency } = props;

  return (
    <>
      <tr className="border-table-rowBorder">
        <td className="text-center p-3">
          <Button onClick={() => onAdd(true)}>Add</Button>
        </td>
        <td className="py-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3">
          <span className="text-sm">
            {currency}
            {Number.parseFloat(total.price.toFixed(2))}
          </span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm">
            {Number.parseFloat(total.weight.toFixed(2))} {weightUnit}
          </span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm">{total.quantity}</span>
        </td>
        <td>
          <span className="flex gap-5 justify-center p-3"></span>
        </td>
      </tr>
    </>
  );
}
