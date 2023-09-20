import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import AddItem from "../addItem/AddItem";
import Button from "@/components/actions/button/Button";
import EditIcon from "@/assets/icons/editIcon.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditGroupForm from "@/components/forms/editGroupForm/EditGroupForm";
import Modal from "@/components/feedback/modal/Modal";
import useGetGroupData from "@/hooks/useGetGroupData";
import TableRow from "../tableRow/TableRow";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import DropdownItem from "@/components/actions/dropdown/DropdownItem";

interface Props {
  onDeleteGroup: () => void;
  group: Group;
  currency: string;
  weightUnit: string;
}

function Table(props: Props) {
  const { onDeleteGroup, group, currency, weightUnit } = props;
  const supabase = createClientComponentClient<Database>();
  const { groupData, setGroupData } = useGetGroupData({ groupID: group.id });
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const total = {
    price: groupData.reduce(
      (acc, item) => acc + item.inventory.price * item.quantity,
      0
    ),
    weight: groupData.reduce(
      (acc, item) => acc + item.inventory.weight * item.quantity,
      0
    ),
    quantity: groupData.reduce((acc, item) => acc + item.quantity, 0),
  };

  const onDeleteItem = async (id: number) => {
    const { error } = await supabase.from("pack_item").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this item.");
      return;
    }
    setGroupData(groupData.filter((item) => item.id !== id));
    toast.success("Deleted item from gorup.");
  };

  return (
    <section>
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-lg">{group.title}</h3>
        <div className="flex gap-2">
          <Dropdown button={<Button>···</Button>}>
            <DropdownItem
              icon={EditIcon}
              onClick={() => setShowEditGroupModal(!showEditGroupModal)}
            >
              Rename
            </DropdownItem>
            <DropdownItem icon={DeleteIcon} onClick={onDeleteGroup}>
              Delete
            </DropdownItem>
          </Dropdown>
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
            <>
              {groupData.map((item) => (
                <TableRow
                  key={item.id}
                  item={item}
                  onDelete={onDeleteItem}
                  onUpdate={setGroupData}
                />
              ))}
            </>
            <AddItem
              onAddItem={setGroupData}
              total={total}
              weightUnit={weightUnit}
              currency={currency}
              groupID={group.id}
            />
          </tbody>
        </table>
        {showEditGroupModal && (
          <Modal>
            <EditGroupForm
              group={group}
              onClose={() => setShowEditGroupModal(false)}
            />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default Table;
