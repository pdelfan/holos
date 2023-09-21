"use client";
import Button from "@/components/actions/button/Button";
import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import ChartSummary from "@/components/dataDisplay/chartSummary/ChartSummary";
import Table from "@/components/dataDisplay/table/Table";
import Modal from "@/components/feedback/modal/Modal";
import GroupForm from "@/components/forms/groupForm/GroupForm";
import useGetGroups from "@/hooks/useGetGroups";
import useGetPack from "@/hooks/useGetPack";
import useGetPreferredCurrency from "@/hooks/useGetPreferredCurrency";
import { Database } from "@/lib/database.types";
import { packStatsAtom } from "@/store/store";
import { convertWeight } from "@/utils/numberUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useAtom } from "jotai";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  const supabase = createClientComponentClient<Database>();
  const { pack, setPack, error, isLoading, isValidating } = useGetPack({
    packID: params.id,
  });
  const { currency } = useGetPreferredCurrency();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const {
    groups,
    setGroups,
    isLoading: isLoadingGroups,
  } = useGetGroups({
    packID: params.id,
  });
  const [packStats, setPackStats] = useAtom(packStatsAtom);
  const [chartData, setChartData] = useState<ChartData[] | []>([]);

  const onDeleteGroup = async (id: number) => {
    const { error } = await supabase.from("group").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this group.");
      return;
    }
    setGroups(groups.filter((item) => item.id !== id));
    setPackStats(packStats.filter((item) => item.group_id !== id));

    toast.success("Deleted group.");
  };

  // get total base weight, total weight, total price, total quantity
  const total = {
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

  useEffect(() => {
    const visualizationData = packStats.map((group) => ({
      group: group.group_title,
      weight: parseFloat(group.total_weight.toFixed(2)),
      weight_unit: group.weight_unit,
    }));
    setChartData(visualizationData);
  }, [packStats]);

  return (
    <>
      {pack && (
        <>
          <h1 className="text-3xl font-semibold text-header-1">{pack.title}</h1>
          <h2 className="font-medium text-header-2 mt-1 max-w-2xl">
            {pack.description}
          </h2>
          <section className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-5">
            <ChartSummary data={chartData} />
            <PackSummary data={total} />
          </section>
          <section className="flex flex-col gap-10 mt-12">
            {groups.length > 0 &&
              groups.map((group) => (
                <Table
                  key={group.id}
                  group={group}
                  onDeleteGroup={() => onDeleteGroup(group.id)}
                  currency={currency}
                  packWeightUnit={pack.weight_unit}
                />
              ))}
          </section>
          <section className="mt-5">
            <Button onClick={() => setShowAddGroupModal(!showAddGroupModal)}>
              Add Group
            </Button>
            {showAddGroupModal && (
              <Modal>
                <GroupForm
                  packID={Number(params.id)}
                  onClose={() => setShowAddGroupModal(false)}
                />
              </Modal>
            )}
          </section>
          <section></section>
        </>
      )}
    </>
  );
}
