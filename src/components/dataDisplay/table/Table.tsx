import { ReactNode, useState } from "react";
import AddItem from "../addItem/AddItem";
import Button from "@/components/actions/button/Button";
import EditIcon from "@/assets/icons/editIcon.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditGroupForm from "@/components/forms/editGroupForm/EditGroupForm";
import Modal from "@/components/feedback/modal/Modal";

interface Props {
  children?: ReactNode;
  onAddItem: () => void;
  onDeleteGroup: () => void;
  title: string;
  groupID: number;
}

function Table(props: Props) {
  const { children, onAddItem, onDeleteGroup, title, groupID } = props;
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  return (
    <section>
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-lg">{title}</h3>
        <div className="flex gap-2">
          <Button icon={EditIcon} onClick={() => setShowEditGroupModal(!showEditGroupModal)}>
            Rename
          </Button>
          <Button icon={DeleteIcon} onClick={onDeleteGroup}>
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
            <AddItem
              onClick={onAddItem}
              total={{ price: 0, weight: 0, quantity: 0 }}
              weightUnit=""
            />
          </tbody>
        </table>
        {showEditGroupModal && (
          <Modal>
            <EditGroupForm
              title={title}
              groupID={groupID}
              onClose={() => setShowEditGroupModal(false)}
            />
          </Modal>
        )}
      </div>
    </section>
  );
}

export default Table;
