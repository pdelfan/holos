"use client";

import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import ChartSummary from "@/components/dataDisplay/chartSummary/ChartSummary";
import Table from "@/components/dataDisplay/table/Table";
import { Database } from "@/lib/database.types";
import { convertWeight } from "@/utils/numberUtils";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Image from "next/image";
import FallingIcon from "@/assets/icons/fallingIcon.svg";
import Link from "next/link";
import useGetSharedPack from "@/hooks/useGetSharedPack";
import useGetSharedPackData from "@/hooks/useGetSharedPackData";
import useGetPublicUser from "@/hooks/useGetPublicUser";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PackSkeleton from "@/components/dataDisplay/packSkeleton/PackSkeleton";
import { getCurrencySymbol } from "@/utils/currencyUtils";

interface Props {
  params: { id: string };
}

export default function SharedPack(props: Props) {
  const { params } = props;
  const supabase = createClientComponentClient<Database>();
  const { pack } = useGetSharedPack({
    shareID: params.id,
  });
  const { packData, setPackData, isLoadingPackData } = useGetSharedPackData({
    packID: pack?.id.toString() ?? "",
  });
  const [packStats, setPackStats] = useState<PackStats[]>([]);
  const [chartData, setChartData] = useState<ChartData[] | []>([]);

  const { user, avatar, preferredCurrency } = useGetPublicUser({
    shareID: params.id,
  });
  const currencySymbol = getCurrencySymbol(preferredCurrency);

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
  const total: PackSummary = {
    weight_unit: pack?.weight_unit ?? "kg",
    currency: currencySymbol,
    base_weight: packStats.reduce(
      (acc, group: PackStats) =>
        acc +
        convertWeight(
          group.base_weight,
          group.weight_unit,
          pack?.weight_unit ?? "kg"
        ),
      0
    ),
    total_weight: packStats.reduce(
      (acc, group: PackStats) =>
        acc +
        convertWeight(
          group.total_weight,
          group.weight_unit,
          pack?.weight_unit ?? "kg"
        ),
      0
    ),
    total_cost: packStats.reduce(
      (acc, group: PackStats) => acc + group.price,
      0
    ),
    total_items: packStats.reduce(
      (acc, group: PackStats) => acc + group.quantity,
      0
    ),
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
      {isLoadingPackData && <PackSkeleton />}

      {!isLoadingPackData && !pack && (
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
            href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
          >
            Return Home
          </Link>
        </section>
      )}

      {user && pack && pack.is_public && (
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
            {user && (
              <div className="flex flex-wrap gap-2 items-center">
                <div className="flex flex-col flex-wrap">
                  <span className="text-xs font-medium text-gray-500 dark:text-neutral-400">
                    Created by
                  </span>
                  <span className="font-medium text-sm dark:text-neutral-100">
                    {user}
                  </span>
                </div>
                <Avatar size="small" name={user} image={avatar} />
              </div>
            )}
          </section>
          <section className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-5">
            <ChartSummary data={chartData} />
            <PackSummary data={total} />
          </section>
          <section className="flex flex-col gap-10 mt-12">
            {packData &&
              packData.length > 0 &&
              packData.map((group) => (
                <Table
                  key={group.id}
                  group={group}
                  viewMode={true}
                  setGroupData={setPackData}
                  onUpdateGroup={setPackData}
                  onDeleteGroup={() => onDeleteGroup(group.id)}
                  setPackStats={setPackStats}
                  currency={currencySymbol}
                  packWeightUnit={pack.weight_unit}
                />
              ))}
          </section>
        </>
      )}
    </>
  );
}
