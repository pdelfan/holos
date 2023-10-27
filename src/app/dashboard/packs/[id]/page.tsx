"use client";

import ShareIcon from "@/assets/icons/shareIcon.svg";
import ViewIcon from "@/assets/icons/viewIcon.svg";
import EditIcon from "@/assets/icons/editIcon.svg";
import FallingIcon from "@/assets/icons/fallingIcon.svg";
import Button from "@/components/actions/button/Button";
import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import ChartSummary from "@/components/dataDisplay/chartSummary/ChartSummary";
import Table from "@/components/dataDisplay/table/Table";
import Modal from "@/components/feedback/modal/Modal";
import GroupForm from "@/components/forms/groupForm/GroupForm";
import Image from "next/image";
import Link from "next/link";
import useGetPack from "@/hooks/useGetPack";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { useEffect, useState, useMemo } from "react";
import useGetPackData from "@/hooks/useGetPackData";
import ShareForm from "@/components/forms/shareForm/ShareForm";
import PackSkeleton from "@/components/dataDisplay/packSkeleton/PackSkeleton";

import {
  calculateGroupTotals,
  calculatePackTotal,
  totalsAreEqual,
} from "@/utils/packUtils";
import {
  deleteGroup,
  updateGroupPositions,
  updatePackTotals,
} from "@/utils/api/packAPI";
import useDND from "@/hooks/useDND";
import { calculateChangedItems } from "@/utils/dndUtils";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  const { pack, isLoadingPack } = useGetPack({ id: params.id });
  const { packData, setPackData, isLoadingPackData } = useGetPackData({
    id: params.id,
  });
  const { currency } = useGetPreferredCurrency({});
  const [viewMode, setViewMode] = useState(false);
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [packStats, setPackStats] = useState<PackStats[] | []>([]);
  const [packTotal, setPackTotal] = useState<PackSummary | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | []>([]);
  const {
    sensors,
    DndContext,
    closestCenter,
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
  } = useDND();

  const onSort = async (chagnedGroups: Group[]) => {
    updateGroupPositions(chagnedGroups);
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

      setPackData(reorderedData);

      const changedItems = calculateChangedItems(packData, oldIndex, newIndex);
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
    deleteGroup(id, packData);
    setPackData(packData.filter((item) => item.id !== id));
    setPackStats(packStats.filter((item) => item.group_id !== id));
  };

  // update stats (group totals)
  const groupTotals = useMemo(() => {
    if (!packData || !pack?.weight_unit) return [];
    return calculateGroupTotals(packData, pack.weight_unit);
  }, [pack?.weight_unit, packData]);

  useEffect(() => {
    setPackStats(groupTotals);
  }, [groupTotals]);

  // update overall pack total (sum of all group totals)
  useEffect(() => {
    if (!pack?.weight_unit || packStats.length === 0 || !currency || !pack?.id)
      return;
    const newPackTotal = calculatePackTotal(
      packStats,
      pack.weight_unit,
      currency
    );

    // check if total has changed. if not, return
    if (totalsAreEqual(packTotal, newPackTotal)) {
      return;
    }

    setPackTotal(newPackTotal);

    // update pack total in db if total has changed
    if (!packTotal) return;

    updatePackTotals(pack.id, newPackTotal);
  }, [currency, pack, packStats, packTotal]);

  // update chart data
  const visualizationData = useMemo(
    () =>
      packStats.map((group) => ({
        group: group.group_title,
        group_id: group.group_id,
        weight: parseFloat(group.total_weight.toFixed(2)),
        weight_unit: group.weight_unit,
      })),
    [packStats]
  );
  useEffect(() => {
    setChartData(visualizationData);
  }, [visualizationData]);

  return (
    <>
      {isLoadingPackData && <PackSkeleton />}

      {!isLoadingPackData && !isLoadingPack && !pack && (
        <section className="flex flex-col items-center justify-center p-3 h-[85svh]">
          <Image
            src={FallingIcon}
            alt="A person falling"
            width={80}
            height={80}
          />
          <h1 className="text-header-2 text-center text-lg sm:text-xl font-medium mt-1 dark:text-neutral-100">
            The pack you are looking for could not be found.
          </h1>
          <Link
            className="mt-6 px-4 py-2 rounded-full font-medium text-sm bg-button text-button-text dark:bg-neutral-700 dark:text-neutral-200 hover:brightness-95"
            href={`${process.env.NEXT_PUBLIC_SITE_URL}/dashboard/packs`}
          >
            Return Home
          </Link>
        </section>
      )}
      {!isLoadingPackData && pack && currency && (
        <section className="animate-fade">
          <section className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="text-2xl sm:text-3xl font-semibold text-header-1 dark:text-neutral-100">
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
            <PackSummary
              data={
                packTotal ?? {
                  weight_unit: pack.weight_unit,
                  base_weight: pack.base_weight,
                  total_weight: pack.total_weight,
                  currency: currency,
                  total_cost: pack.total_cost,
                  total_items: pack.total_items,
                }
              }
            />
          </section>
          <section className="flex flex-col gap-10 mt-12">
            {packData && (
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
                      currency={currency}
                      packWeightUnit={pack.weight_unit}
                    />
                  ))}
                </SortableContext>
              </DndContext>
            )}
          </section>
          <section className="mt-5">
            {!viewMode && pack && (
              <Button
                bgColor="bg-button dark:bg-neutral-700"
                textColor="text-button-text dark:text-neutral-200"
                onClick={() => setShowAddGroupModal(!showAddGroupModal)}
              >
                Add Group
              </Button>
            )}

            {packStats && showAddGroupModal && (
              <Modal>
                <GroupForm
                  packID={Number(params.id)}
                  newPosition={packStats.length}
                  onUpdate={setPackData}
                  onClose={() => setShowAddGroupModal(false)}
                />
              </Modal>
            )}
            {pack && showShareModal && (
              <Modal>
                <ShareForm
                  pack={pack}
                  onClose={() => setShowShareModal(false)}
                />
              </Modal>
            )}
          </section>
        </section>
      )}
    </>
  );
}
