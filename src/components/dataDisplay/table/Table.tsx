import { useEffect, useState } from "react";
import AddItemRow from "../addItem/AddItemRow";
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
import { packStatsAtom } from "@/store/store";
import { useSetAtom } from "jotai";
import { convertWeight } from "@/utils/numberUtils";
import EditItemForm from "@/components/forms/editItemForm/EditItemForm";
import ItemForm from "@/components/forms/itemForm/ItemForm";
import ExpandMoreIcon from "@/assets/icons/expandMoreIcon.svg";
import ExpandLessIcon from "@/assets/icons/expandLessIcon.svg";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { calculateChangedItems } from "@/utils/dndUtils";

interface Props {
  onDeleteGroup: () => void;
  group: Group;
  currency: string;
  packWeightUnit: string;
}

function Table(props: Props) {
  const { onDeleteGroup, group, currency, packWeightUnit } = props;
  const supabase = createClientComponentClient<Database>();
  const { groupData, setGroupData } = useGetGroupData({ groupID: group.id });
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PackItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
  const setPackStats = useSetAtom(packStatsAtom);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onSort = async (changedItems: PackItemWithoutInventory[]) => {
    const { error } = await supabase.from("pack_item").upsert(changedItems);

    if (error) {
      toast.error("Couldn't update new positions.");
      return;
    }

    toast.success("Updated new positions");
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = groupData.findIndex(
        (item: PackItem) => item.id === active.id
      );
      const newIndex = groupData.findIndex(
        (item: PackItem) => item.id === over.id
      );

      const reorderedData = arrayMove(groupData, oldIndex, newIndex);

      setGroupData([...reorderedData].sort((a, b) => a.position - b.position));

      const changedItems = calculateChangedItems(groupData, oldIndex, newIndex);

      if (changedItems.length === 0) return;

      // remove invnetory from changed items
      const changedItemsWithoutInventory = changedItems.map((item) => {
        const { inventory, ...rest } = item;
        return rest;
      });

      onSort(changedItemsWithoutInventory);
    }
  };

  const total = {
    price: groupData.reduce(
      (acc, item) => acc + item.inventory.price * item.quantity,
      0
    ),
    weight: groupData.reduce(
      (acc, item) =>
        acc +
        convertWeight(
          item.inventory.weight,
          item.inventory.weight_unit,
          group.weight_unit
        ) *
          item.quantity,
      0
    ),
    quantity: groupData.reduce((acc, item) => acc + item.quantity, 0),
  };

  useEffect(() => {
    const groupTotal: PackStats = {
      group_id: group.id,
      group_title: group.title,
      weight_unit: packWeightUnit,
      total_weight: groupData.reduce(
        (acc, item) =>
          acc +
          convertWeight(
            item.inventory.weight,
            item.inventory.weight_unit,
            packWeightUnit
          ) *
            item.quantity,
        0
      ),
      base_weight: groupData
        .filter((item) => item.type === "General")
        .reduce(
          (acc, item) =>
            acc +
            convertWeight(
              item.inventory.weight,
              item.inventory.weight_unit,
              packWeightUnit
            ) *
              item.quantity,
          0
        ),
      price: groupData.reduce(
        (acc, item) => acc + item.inventory.price * item.quantity,
        0
      ),
      quantity: groupData.reduce((acc, item) => acc + item.quantity, 0),
    };

    setPackStats((prev) => [
      ...prev.filter((item) => item.group_title !== group.title),
      groupTotal,
    ]);
  }, [group.id, group.title, groupData, packWeightUnit, setPackStats]);

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
          <Dropdown
            button={
              <span className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-button text-button-text hover:bg-button-hover">
                ···
              </span>
            }
          >
            <DropdownItem
              icon={EditIcon}
              onClick={() => setShowEditGroupModal(!showEditGroupModal)}
            >
              Edit
            </DropdownItem>
            <DropdownItem icon={DeleteIcon} onClick={onDeleteGroup}>
              Delete
            </DropdownItem>
            <DropdownItem
              icon={isExpanded ? ExpandLessIcon : ExpandMoreIcon}
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Fold" : "expand"}
            </DropdownItem>
          </Dropdown>
        </div>
      </div>
      <div className="relative overflow-auto rounded-xl border-2 bg-white">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          id="DndContext"
        >
          <SortableContext
            items={groupData}
            strategy={verticalListSortingStrategy}
          >
            {isExpanded && (
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
                    <th className="p-2 text-sm"></th>
                  </tr>
                </thead>
                <tbody>
                  <>
                    {groupData
                      .sort((a, b) => a.position - b.position)
                      .map((item) => (
                        <TableRow
                          key={item.id}
                          item={item}
                          onSelect={() => setSelectedItem(item)}
                          onEdit={setShowEditItemModal}
                        />
                      ))}
                  </>
                  <AddItemRow
                    onAdd={setShowAddItemModal}
                    total={total}
                    weightUnit={group.weight_unit}
                    currency={currency}
                  />
                </tbody>
              </table>
            )}
          </SortableContext>
        </DndContext>
      </div>
      {showAddItemModal && groupData && (
        <Modal>
          <ItemForm
            groupID={group.id}
            onAddItem={setGroupData}
            newPosition={groupData.length}
            onClose={() => setShowAddItemModal(false)}
          />
        </Modal>
      )}
      {showEditGroupModal && (
        <Modal>
          <EditGroupForm
            group={group}
            onClose={() => setShowEditGroupModal(false)}
          />
        </Modal>
      )}
      {showEditItemModal && selectedItem && (
        <Modal>
          <EditItemForm
            item={selectedItem}
            onClose={() => setShowEditItemModal(false)}
            onUpdate={setGroupData}
            onDelete={onDeleteItem}
          />
        </Modal>
      )}
    </section>
  );
}

export default Table;
