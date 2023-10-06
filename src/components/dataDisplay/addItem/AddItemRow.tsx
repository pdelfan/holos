import Button from "@/components/actions/button/Button";
import { SetStateAction } from "react";

interface Props {
  onAdd: (showAddItemModal: SetStateAction<boolean>) => void;
  viewMode?: boolean;
  total: TotalGroup;
  weightUnit: string;
  currency: string;
}

export default function AddItemRow(props: Props) {
  const { onAdd, viewMode, total, weightUnit, currency } = props;

  return (
    <>
      <tr className="border-table-rowBorder dark:bg-neutral-700">
        <td className="text-center p-3">
          {!viewMode && (
            <Button
              bgColor="bg-button dark:bg-neutral-400"
              textColor="text-button-text dark:text-neutral-600"
              onClick={() => onAdd(true)}
            >
              Add
            </Button>
          )}
        </td>
        {!viewMode && <td className="py-3" />}
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3" />
        <td className="text-center p-3">
          <span className="text-sm dark:text-neutral-300">
            {currency}
            {Number.parseFloat(total.price.toFixed(2))}
          </span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm dark:text-neutral-300">
            {Number.parseFloat(total.weight.toFixed(2))} {weightUnit}
          </span>
        </td>
        <td className="text-center p-3">
          <span className="text-sm dark:text-neutral-300">
            {total.quantity}
          </span>
        </td>
        {!viewMode && (
          <td>
            <span className="flex gap-5 justify-center p-3"></span>
          </td>
        )}
      </tr>
    </>
  );
}
