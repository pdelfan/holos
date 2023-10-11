"use client";
import Button from "@/components/actions/button/Button";
import ShareIcon from "@/assets/icons/shareIcon.svg";
import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import ChartSummary from "@/components/dataDisplay/chartSummary/ChartSummary";
import Table from "@/components/dataDisplay/table/Table";
import Modal from "@/components/feedback/modal/Modal";
import GroupForm from "@/components/forms/groupForm/GroupForm";
import useGetPack from "@/hooks/useGetPack";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { Database } from "@/lib/database.types";
import { convertWeight } from "@/utils/numberUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import useGetPackData from "@/hooks/useGetPackData";
import ShareForm from "@/components/forms/shareForm/ShareForm";
import PackSkeleton from "@/components/dataDisplay/packSkeleton/PackSkeleton";
import ViewIcon from "@/assets/icons/viewIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
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
import { calculateChangedGroups } from "@/utils/dndUtils";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  const supabase = createClientComponentClient<Database>();
  const { pack } = useGetPack({
    packID: params.id,
  });
  const { currency } = useGetPreferredCurrency({});
  const [viewMode, setViewMode] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const { packData, setPackData } = useGetPackData({ packID: params.id });
  const [packStats, setPackStats] = useState<PackStats[]>([]);
  const [chartData, setChartData] = useState<ChartData[] | []>([]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const onSort = async (chagnedGroups: Group[]) => {
    const { error } = await supabase.from("group").upsert(chagnedGroups);

    if (error) {
      toast.error("Couldn't update new positions.");
      return;
    }
  };

  const handleDragEnd = (event: any) => {
    if (!packData) return;

    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = packData.findIndex(
        (item: GroupData) => item.id === active.id
      );
      const newIndex = packData.findIndex(
        (item: GroupData) => item.id === over.id
      );

      const reorderedData = arrayMove(packData, oldIndex, newIndex).sort(
        (a, b) => a.position - b.position
      );

      // find group and update groups
      setPackData((prev) => {
        if (!prev) return prev;
        const indexToUpdate = prev.findIndex((item) => item.id === active.id);

        if (indexToUpdate === -1) {
          // item not found, return the previous array
          return prev;
        }

        return [
          ...prev.slice(0, indexToUpdate), // items before the updated item
          { ...prev, ...prev[indexToUpdate], position: newIndex }, // updated item
          ...prev.slice(indexToUpdate + 1), // items after the updated item
        ];
      });

      const changedItems = calculateChangedGroups(packData, oldIndex, newIndex);

      if (changedItems.length === 0) return;

      // remove pack_item from changed groups
      const changedGroupsWithoutPackItem = changedItems.map((item) => {
        const { pack_item, ...rest } = item;
        return rest;
      });

      onSort(changedGroupsWithoutPackItem);
    }
  };

  const onDeleteGroup = async (id: number) => {
    if (!packData) return;
    const { error } = await supabase.from("group").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this group.");
      return;
    }
    setPackData(packData.filter((item) => item.id !== id));
    setPackStats(packStats.filter((item) => item.group_id !== id));
  };

  useEffect(() => {
    if (!packData) return;
    const updatedTotal: PackStats[] = packData.map((group) => {
      const total_weight = group.pack_item.reduce(
        (acc, item) =>
          acc +
          convertWeight(
            item.inventory.weight,
            item.inventory.weight_unit,
            pack?.weight_unit ?? "kg"
          ) *
            item.quantity,
        0
      );
      const base_weight = group.pack_item
        .filter((item) => item.type === "General")
        .reduce(
          (acc, item) =>
            acc +
            convertWeight(
              item.inventory.weight,
              item.inventory.weight_unit,
              pack?.weight_unit ?? "kg"
            ) *
              item.quantity,
          0
        );
      const price = group.pack_item.reduce(
        (acc, item) => acc + item.inventory.price * item.quantity,
        0
      );
      const quantity = group.pack_item.reduce(
        (acc, item) => acc + item.quantity,
        0
      );

      return {
        group_id: group.id,
        group_title: group.title,
        weight_unit: pack?.weight_unit ?? "kg",
        total_weight,
        base_weight,
        price,
        quantity,
      };
    });
    setPackStats(updatedTotal);
  }, [pack?.weight_unit, packData]);

  // get total base weight, total weight, total price, total quantity
  const total: PackSummary = useMemo(() => {
    return {
      weight_unit: pack?.weight_unit ?? "kg",
      currency: currency,
      base_weight: packStats.reduce(
        (acc, group) =>
          acc +
          convertWeight(
            group.base_weight,
            group.weight_unit,
            pack?.weight_unit ?? "kg"
          ),
        0
      ),
      total_weight: packStats.reduce(
        (acc, group) =>
          acc +
          convertWeight(
            group.total_weight,
            group.weight_unit,
            pack?.weight_unit ?? "kg"
          ),
        0
      ),
      total_cost: packStats.reduce((acc, group) => acc + group.price, 0),
      total_items: packStats.reduce((acc, group) => acc + group.quantity, 0),
    };
  }, [pack, packStats, currency]);

  useEffect(() => {
    const visualizationData = packStats.map((group) => ({
      group: group.group_title,
      group_id: group.group_id,
      weight: parseFloat(group.total_weight.toFixed(2)),
      weight_unit: group.weight_unit,
    }));
    setChartData(visualizationData);
  }, [packStats]);

  return (
    <>
      {!pack && <PackSkeleton />}
      {pack && packData && packStats && (
        <>
          <section className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-header-1 dark:text-neutral-100">
                {pack.title}
              </h1>
              <h2 className="font-medium text-header-2 mt-1 max-w-2xl dark:text-neutral-400">
                {pack.description}
              </h2>
            </div>
            <span className="flex flex-wrap gap-3">
              <Button
                bgColor="bg-button dark:bg-neutral-700"
                textColor="text-button-text dark:text-neutral-300"
                icon={viewMode ? EditIcon : ViewIcon}
                onClick={() => setViewMode(!viewMode)}
              >
                {viewMode ? "Edit" : "View"}
              </Button>
              <Button
                bgColor="bg-purple"
                textColor="text-white"
                icon={ShareIcon}
                onClick={() => setShowShareModal(!showShareModal)}
              >
                Share
              </Button>
            </span>
          </section>
          <section className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-5">
            <ChartSummary data={chartData} />
            <PackSummary data={total} />
          </section>
          <section className="flex flex-col gap-10 mt-12">
            {packData.length > 0 && (
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
                id="GroupDndContext"
              >
                <SortableContext
                  items={packData
                    .sort((a, b) => a.position - b.position)
                    .map((group) => group.id)}
                  strategy={verticalListSortingStrategy}
                >
                  {packData.map((group) => (
                    <Table
                      key={group.id}
                      group={group}
                      viewMode={viewMode}
                      setGroupData={setPackData}
                      onUpdateGroup={setPackData}
                      onDeleteGroup={() => onDeleteGroup(group.id)}
                      setPackStats={setPackStats}
                      currency={currency}
                      packWeightUnit={pack.weight_unit}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </section>

          <section className="mt-5">
            {!viewMode && (
              <Button
                bgColor="bg-button dark:bg-neutral-700"
                textColor="text-button-text dark:text-neutral-200"
                onClick={() => setShowAddGroupModal(!showAddGroupModal)}
              >
                Add Group
              </Button>
            )}

            {showAddGroupModal && (
              <Modal>
                <GroupForm
                  packID={Number(params.id)}
                  newPosition={packStats.length}
                  onUpdate={setPackData}
                  onClose={() => setShowAddGroupModal(false)}
                />
              </Modal>
            )}
            {showShareModal && (
              <Modal>
                <ShareForm
                  pack={pack}
                  onClose={() => setShowShareModal(false)}
                />
              </Modal>
            )}
          </section>
        </>
      )}
    </>
  );
}
