import { Dispatch, SetStateAction, useState } from "react";
import AddItemRow from "../addItem/AddItemRow";
import EditIcon from "@/assets/icons/editIcon.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import EditGroupForm from "@/components/forms/editGroupForm/EditGroupForm";
import Modal from "@/components/feedback/modal/Modal";
import TableRow from "../tableRow/TableRow";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/lib/database.types";
import toast from "react-hot-toast";
import Dropdown from "@/components/actions/dropdown/Dropdown";
import DropdownItem from "@/components/actions/dropdown/DropdownItem";
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
import Button from "@/components/actions/button/Button";

interface Props {
  onUpdateGroup: Dispatch<SetStateAction<[] | GroupData[] | null>>;
  onDeleteGroup: () => void;
  setPackStats: React.Dispatch<React.SetStateAction<PackStats[]>>;
  setGroupData: Dispatch<SetStateAction<[] | GroupData[] | null>>;
  shareMode?: boolean;
  group: GroupData;
  currency: string;
  packWeightUnit: string;
}

function Table(props: Props) {
  const {
    onUpdateGroup,
    onDeleteGroup,
    setGroupData,
    shareMode,
    group,
    currency,
  } = props;
  const supabase = createClientComponentClient<Database>();
  const [showEditGroupModal, setShowEditGroupModal] = useState(false);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [showEditItemModal, setShowEditItemModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState<PackItem | null>(null);
  const [isExpanded, setIsExpanded] = useState(true);
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
      const oldIndex = group.pack_item.findIndex(
        (item: PackItem) => item.id === active.id
      );
      const newIndex = group.pack_item.findIndex(
        (item: PackItem) => item.id === over.id
      );

      const reorderedData = arrayMove(group.pack_item, oldIndex, newIndex).sort(
        (a, b) => a.position - b.position
      );

      // find group and update pack_item
      setGroupData((prev) => {
        if (!prev) return prev;
        const indexToUpdate = prev.findIndex((item) => item.id === group.id);

        if (indexToUpdate === -1) {
          // item not found, return the previous array
          return prev;
        }

        return [
          ...prev.slice(0, indexToUpdate), // items before the updated item
          { ...group, pack_item: reorderedData }, // updated item
          ...prev.slice(indexToUpdate + 1), // items after the updated item
        ];
      });

      const changedItems = calculateChangedItems(
        group.pack_item,
        oldIndex,
        newIndex
      );

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
    price: group.pack_item.reduce(
      (acc, item) => acc + item.inventory.price * item.quantity,
      0
    ),
    weight: group.pack_item.reduce(
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
    quantity: group.pack_item.reduce((acc, item) => acc + item.quantity, 0),
  };

  const onDeleteItem = async (id: number) => {
    const { error } = await supabase.from("pack_item").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this item.");
      return;
    }

    // remove item from group's pack_item
    setGroupData((prev) => {
      if (!prev) return prev;
      const foundGroup: any = prev.find(
        (groupInPack) => groupInPack.id === group.id
      );
      if (!foundGroup) return prev;
      return [
        ...prev.filter((groupInPack) => groupInPack.id !== foundGroup.id),
        {
          ...group,
          pack_item: [
            ...foundGroup.pack_item.filter((item: PackItem) => item.id !== id),
          ],
        },
      ];
    });

    toast.success("Deleted item from gorup.");
  };

  return (
    <section>
      <div className="flex justify-between mb-2">
        <h3 className="font-medium text-lg dark:text-neutral-200">{group.title}</h3>
        {!shareMode && (
          <div className="flex gap-2">
            <Dropdown
              button={
                <Button
                  bgColor="bg-button dark:bg-neutral-700"
                  textColor="text-button-text dark:text-neutral-200"
                >
                  ···
                </Button>
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
                {isExpanded ? "Fold" : "Expand"}
              </DropdownItem>
            </Dropdown>
          </div>
        )}
      </div>
      <div className="relative overflow-auto rounded-xl border-2 bg-white dark:border-neutral-600">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
          id="DndContext"
        >
          <SortableContext
            items={group.pack_item}
            strategy={verticalListSortingStrategy}
          >
            {isExpanded && (
              <table className="border-collapse table-auto w-full bg-white dark:bg-neutral-800">
                <thead className="bg-table-head dark:bg-neutral-900">
                  <tr className=" rounded-xl">
                    {!shareMode && <th className="p-2" />}
                    <th className="p-2 text-sm dark:text-neutral-300">Image</th>
                    <th className="p-2 text-sm dark:text-neutral-300">Item</th>
                    <th className="p-2 text-sm dark:text-neutral-300">
                      Description
                    </th>
                    <th className="p-2 text-sm dark:text-neutral-300">Link</th>
                    <th className="p-2 text-sm dark:text-neutral-300">Type</th>
                    <th className="p-2 text-sm dark:text-neutral-300">Price</th>
                    <th className="p-2 text-sm dark:text-neutral-300">
                      Weight
                    </th>
                    <th className="p-2 text-sm dark:text-neutral-300">QTY</th>
                    {!shareMode && <th className="p-2 text-sm"></th>}
                  </tr>
                </thead>
                <tbody>
                  <>
                    {group.pack_item
                      .sort((a, b) => a.position - b.position)
                      .map((item) => (
                        <TableRow
                          key={item.id}
                          item={item}
                          shareMode={shareMode}
                          onSelect={() => setSelectedItem(item)}
                          onEdit={setShowEditItemModal}
                        />
                      ))}
                  </>
                  <AddItemRow
                    onAdd={setShowAddItemModal}
                    shareMode={shareMode}
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
      {showAddItemModal && group.pack_item && (
        <Modal>
          <ItemForm
            groupID={group.id}
            onAddItem={setGroupData}
            newPosition={group.pack_item.length}
            onClose={() => setShowAddItemModal(false)}
          />
        </Modal>
      )}
      {showEditGroupModal && (
        <Modal>
          <EditGroupForm
            group={group}
            onUpdate={onUpdateGroup}
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
