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
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useGetPackData from "@/hooks/useGetPackData";

interface Props {
  params: { id: string };
}

export default function Pack(props: Props) {
  const { params } = props;
  const supabase = createClientComponentClient<Database>();
  const { pack, setPack } = useGetPack({
    packID: params.id,
  });
  const { currency } = useGetPreferredCurrency();
  const [showAddGroupModal, setShowAddGroupModal] = useState(false);
  const [packStats, setPackStats] = useState<PackStats[] | []>([]);
  const [chartData, setChartData] = useState<ChartData[] | []>([]);

  const { packData, setPackData } = useGetPackData({ packID: params.id });

  const onDeleteGroup = async (id: number) => {
    const { error } = await supabase.from("group").delete().eq("id", id);
    if (error) {
      toast.error("Couldn't delete this group.");
      return;
    }
    setPackData(packData.filter((item) => item.id !== id));
    setPackStats(packStats.filter((item) => item.group_id !== id));

    toast.success("Deleted group.");
  };

  // get total base weight, total weight, total price, total quantity
  const total: PackSummary = {
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
      group_id: group.group_id,
      weight: parseFloat(group.total_weight.toFixed(2)),
      weight_unit: group.weight_unit,
    }));    
    setChartData(visualizationData);
  }, [packStats]);

  return (
    <>
      {pack && (
        <>
          <section className="flex flex-wrap justify-between items-center gap-3">
            <div>
              <h1 className="text-3xl font-semibold text-header-1">
                {pack.title}
              </h1>
              <h2 className="font-medium text-header-2 mt-1 max-w-2xl">
                {pack.description}
              </h2>
            </div>
            <Button bgColor="bg-purple" textColor="text-white" icon={ShareIcon}>
              Share
            </Button>
          </section>
          <section className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-5">
            <ChartSummary data={chartData} />
            <PackSummary data={total} />
          </section>
          <section className="flex flex-col gap-10 mt-12">
            {packData.length > 0 &&
              packData.map((group) => (
                <Table
                  key={group.id}
                  group={group}
                  setGroupData={setPackData}
                  onUpdateGroup={setPackData}
                  onDeleteGroup={() => onDeleteGroup(group.id)}
                  setPackStats={setPackStats}
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
                  onUpdate={setPackData}
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
