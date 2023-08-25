import Button from "@/components/actions/button/Button";
import { useState } from "react";

export default function AddItem() {
  const [showForm, setShowForm] = useState(false);
  return (
    <tr className="border-table-rowBorder">
      <td className="text-center p-3">
        <Button>Add</Button>
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
