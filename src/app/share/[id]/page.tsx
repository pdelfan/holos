"use client";

import PackSummary from "@/components/contentDisplay/packSummary/PackSummary";
import ChartSummary from "@/components/dataDisplay/chartSummary/ChartSummary";
import Table from "@/components/dataDisplay/table/Table";
import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import FallingIcon from "@/assets/icons/fallingIcon.svg";
import Link from "next/link";
import useGetPublicUser from "@/hooks/useGetPublicUser";
import Avatar from "@/components/dataDisplay/avatar/Avatar";
import PackSkeleton from "@/components/dataDisplay/packSkeleton/PackSkeleton";
import { getCurrencySymbol } from "@/utils/currencyUtils";
import {
  calculateGroupTotals,
  calculatePackTotal,
  totalsAreEqual,
} from "@/utils/packUtils";
import useGetPack from "@/hooks/useGetPack";
import useGetPackData from "@/hooks/useGetPackData";

interface Props {
  params: { id: string };
}

export default function SharedPack(props: Props) {
  const { params } = props;
  const { pack, isLoadingPack } = useGetPack({
    id: params.id,
    isShared: true,
  });
  const { packData, setPackData, isLoadingPackData } = useGetPackData({
    id: pack?.id.toString() ?? "",
    isShared: true,
  });
  const [packStats, setPackStats] = useState<PackStats[] | []>([]);
  const [packTotal, setPackTotal] = useState<PackSummary | null>(null);
  const [chartData, setChartData] = useState<ChartData[] | []>([]);

  const { user, avatar, preferredCurrency } = useGetPublicUser({
    shareID: params.id,
  });
  const currencySymbol = getCurrencySymbol(preferredCurrency);

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
    if (
      !pack?.weight_unit ||
      packStats.length === 0 ||
      !currencySymbol ||
      !pack?.id
    )
      return;
    const newPackTotal = calculatePackTotal(
      packStats,
      pack.weight_unit,
      currencySymbol
    );

    // check if total has changed. if not, return
    if (totalsAreEqual(packTotal, newPackTotal)) {
      return;
    }

    setPackTotal(newPackTotal);

    // update pack total in db if total has changed
    if (!packTotal) return;
  }, [currencySymbol, pack?.id, pack?.weight_unit, packStats, packTotal]);

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
            href={`${process.env.NEXT_PUBLIC_SITE_URL}`}
          >
            Return Home
          </Link>
        </section>
      )}

      {!isLoadingPackData &&
        pack &&
        pack.is_public &&
        user &&
        preferredCurrency && (
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
            </section>
            <section className="mt-8 flex flex-wrap justify-between gap-x-8 gap-y-5">
              <ChartSummary data={chartData} viewMode={true} />
              <PackSummary
                data={
                  packTotal ?? {
                    weight_unit: pack.weight_unit,
                    base_weight: pack.base_weight,
                    total_weight: pack.total_weight,
                    currency: preferredCurrency,
                    total_cost: pack.total_cost,
                    total_items: pack.total_items,
                  }
                }
              />
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
                    onDeleteGroup={() => {}}
                    currency={currencySymbol}
                    packWeightUnit={pack.weight_unit}
                  />
                ))}
            </section>
          </section>
        )}
    </>
  );
}
