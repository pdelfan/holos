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
import Image from "next/image";
import DragIcon from "@/assets/icons/dragIcon.svg";
import {
  DndContext,
  DragOverlay,
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
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { calculateChangedItems } from "@/utils/dndUtils";
import { CSS } from "@dnd-kit/utilities";

interface Props {
  onUpdateGroup: Dispatch<SetStateAction<[] | GroupData[] | null>>;
  onDeleteGroup: () => void;
  setGroupData: Dispatch<SetStateAction<[] | GroupData[] | null>>;
  viewMode?: boolean;
  group: GroupData;
  currency: string;
  packWeightUnit: string;
}

function Table(props: Props) {
  const {
    onUpdateGroup,
    onDeleteGroup,
    setGroupData,
    viewMode,
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

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: group.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  const onSort = async (changedItems: PackItemWithoutInventory[]) => {
    const { error } = await supabase.from("pack_item").upsert(changedItems);

    if (error) {
      toast.error("Couldn't update new positions.");
      return;
    }
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

      setGroupData((prev) => {
        if (!prev) return prev;

        return prev.map((item) => {
          if (item.id === group.id) {
            return { ...item, pack_item: reorderedData };
          }
          return item;
        });
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
  };

  return (
    <>
      <section ref={setNodeRef} style={style}>
        <div className="flex justify-between mb-2">
          <span className="flex items-center gap-1">
            {!viewMode && (
              <button
                className="touch-none p-2 hover:bg-button-hover rounded-lg dark:hover:bg-neutral-700"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                {...listeners}
                {...attributes}
              >
                <Image
                  draggable={false}
                  className="w-auto h-auto"
                  src={DragIcon}
                  alt="Drag icon"
                  width={10}
                  height={10}
                />
              </button>
            )}

            <h3 className="font-medium text-base sm:text-lg dark:text-neutral-200">
              {group.title}
            </h3>
          </span>
          {!viewMode && (
            <div className="flex gap-2">
              <Dropdown
                button={
                  <span className="flex items-center justify-center gap-2 px-4 py-2 rounded-full font-medium text-sm bg-button dark:bg-neutral-700 text-button-text dark:text-neutral-200 hover:brightness-95">
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
                  {isExpanded ? "Fold" : "Expand"}
                </DropdownItem>
              </Dropdown>
            </div>
          )}
        </div>
        <div className="relative overflow-auto rounded-xl border-2 border-table-rowBorder bg-white dark:border-neutral-600">
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
                <table
                  className="border-collapse table-auto w-full bg-white dark:bg-neutral-800"
                  style={{
                    filter: isDragging ? "contrast(0.9)" : "contrast(1)",
                  }}
                >
                  <thead className="bg-table-head dark:bg-neutral-900">
                    <tr className=" rounded-xl">
                      {!viewMode && <th className="p-2" />}
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Image
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Item
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Description
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Link
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Type
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Price
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">
                        Weight
                      </th>
                      <th className="p-2 text-sm dark:text-neutral-300">QTY</th>
                      {!viewMode && <th className="p-2 text-sm"></th>}
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
                            viewMode={viewMode}
                            currency={currency}
                            onSelect={() => setSelectedItem(item)}
                            onEdit={setShowEditItemModal}
                          />
                        ))}
                    </>
                    <AddItemRow
                      onAdd={setShowAddItemModal}
                      viewMode={viewMode}
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
      </section>
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
    </>
  );
}

export default Table;
