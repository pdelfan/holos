import { ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

function Table(props: Props) {
  const { children } = props;
  return (
    <div className="relative overflow-auto rounded-xl ring-offset-0 ring-1 ring-table-headBorder bg-white">
      <table className="border-collapse table-auto w-full">
        <thead className="border-b border-table-headBorder">
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
        <tbody>{children}</tbody>
      </table>
      <tr className="border border-table-rowBorder bg-white">
        <td className="p-3">
          <button>Add new item</button>
        </td>
      </tr>
    </div>
  );
}

export default Table;

// import { ReactNode } from "react";

// interface Props {
//   children?: ReactNode;
// }

// function Table(props: Props) {
//   const { children } = props;
//   return (
//     <ul className="overflow-x-auto bg-pink-400">
//       <li className="flex bg-table-head border border-table-headBorder rounded-t-xl px-2 py-3 font-medium justify-between">
//         <span className="basis-10 shrink-0 text-center"></span>
//         <span className="basis-20 shrink-0 text-center">Image</span>
//         <span className="basis-40 shrink-0 text-center">Item</span>
//         <span className="basis-72 shrink-0 text-center">Description</span>
//         <span className="basis-20 shrink-0 text-center">Link</span>
//         <span className="basis-40 shrink-0 text-center">Type</span>
//         <span className="basis-20 shrink-0 text-center">Price</span>
//         <span className="basis-20 shrink-0 text-center">Weight</span>
//         <span className="basis-20 shrink-0 text-center">QTY</span>
//         <span className="basis-40 shrink-0 text-center">Actions</span>
//       </li>

//       {children}
//       <li className="bg-white border border-table-rowBorder p-3 rounded-b-xl">
//         <button>Add new item</button>
//       </li>
//     </ul>
//   );
// }

// export default Table;
