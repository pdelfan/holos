import { ReactNode } from "react";
import AddItem from "../addItem/AddItem";

interface Props {
  children?: ReactNode;  
}

function Table(props: Props) {
  const { children } = props;
  return (
    <div className="relative overflow-auto rounded-xl border-2 bg-white">
      <table className="border-collapse table-auto w-full">
        <thead className="bg-table-head">
          <tr className=" rounded-xl">
            <th className="p-2"></th>
            <th className="p-2">Image</th>
            <th className="p-2">Item</th>
            <th className="p-2">Description</th>
            <th className="p-2">Link</th>
            <th className="p-2">Type</th>
            <th className="p-2">Price</th>
            <th className="p-2">Weight</th>
            <th className="p-2">QTY</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {children}
          <AddItem />
        </tbody>
      </table>
    </div>
  );
}

export default Table;
