import { ReactNode } from "react";
import AddItem from "../addItem/AddItem";
import Button from "@/components/actions/button/Button";
import EditIcon from "@/assets/icons/editIcon.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";

interface Props {
  children?: ReactNode;
  onAddItem: () => void;
}

function Table(props: Props) {
  const { children, onAddItem } = props;
  return (
    <section>
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-lg">Group name</h3>
        <div className="flex gap-2">
          <Button icon={EditIcon} onClick={() => {}}>
            Rename
          </Button>
          <Button icon={DeleteIcon} onClick={() => {}}>
            Delete
          </Button>
        </div>
      </div>
      <div className="relative overflow-auto rounded-xl border-2 bg-white">
        <table className="border-collapse table-auto w-full">
          <thead className="bg-table-head">
            <tr className=" rounded-xl">
              <th className="p-2" />
              <th className="p-2 text-sm">Image</th>
              <th className="p-2 text-sm">Item</th>
              <th className="p-2 text-sm">Description</th>
              <th className="p-2 text-sm">Link</th>
              <th className="p-2 text-sm">Type</th>
              <th className="p-2 text-sm">Price</th>
              <th className="p-2 text-sm">Weight</th>
              <th className="p-2 text-sm">QTY</th>
              <th className="p-2 text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            {children}
            <AddItem onClick={onAddItem} />
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default Table;
