import Button from "@/components/actions/button/Button";

interface Props {
  onClick: () => void;
}

export default function AddItem(props: Props) {
  const { onClick } = props;

  return (
    <tr className="border-table-rowBorder">
      <td className="text-center p-3">
        <Button onClick={onClick}>Add</Button>
      </td>
      <td className="py-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3" />
      <td className="text-center p-3" />{" "}
      <td className="text-center p-3">
        <span className="text-sm">{"price"}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{"weight"}</span>
        <span className="text-sm">{"weightUnit"}</span>
      </td>
      <td className="text-center p-3">
        <span className="text-sm">{"quantity"}</span>
      </td>
      <td>
        <span className="flex gap-5 justify-center p-3"></span>
      </td>
    </tr>
  );
}
