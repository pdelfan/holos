import Button from "@/components/actions/button/Button";

interface Props {
  onClick: () => void;
  total: TotalGroup;
  weightUnit: string;
}

export default function AddItem(props: Props) {
  const { onClick, total, weightUnit } = props;

  return (
    <tr className="border-table-rowBorder">
      <td className="text-center p-3">
        <Button onClick={onClick}>Add</Button>
      </td>
      <td className="py-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3">
        <span className="text-sm">{total.price}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{total.weight}</span>
        <span className="text-sm">{weightUnit}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{total.quantity}</span>
      </td>
      <td>
        <span className="flex gap-5 justify-center p-3"></span>
      </td>
    </tr>
  );
}
