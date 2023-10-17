import React from "react";
import { CHART_COLOURS } from "@/utils/chartUtils";

interface Props {
  data: ChartData[];
  viewMode?: boolean;
}

function ChartSummary(props: Props) {
  const { data, viewMode = false } = props;
  const chartData = data.sort((a, b) => b.weight - a.weight);
  const totalWidth = data.reduce((total, datum) => total + datum.weight, 0);

  return (
    <>
      {data.length === 0 && (
        <div className="flex flex-col gap-2 grow">
          <p className="text-neutral-400 dark:text-neutral-300">
            {viewMode
              ? "There are no items to display."
              : "Add items to see a visual breakdown of your pack."}
          </p>
          <div className="h-6 rounded-sm max-w-6xl grow bg-neutral-200 dark:bg-neutral-600" />
        </div>
      )}
      {data.length > 0 && (
        <div className="flex flex-col grow max-w-6xl">
          <div className="flex gap-1">
            {chartData.map((datum, index) => {
              const barWidth = Math.floor((datum.weight / totalWidth) * 100);

              return (
                <div
                  key={datum.group_id}
                  className="h-6 rounded-sm group hover:ring-2 hover:ring-gray relative dark:hover:ring-gray-500"
                  style={{
                    backgroundColor: CHART_COLOURS[index],
                    width: `${barWidth}%`,
                  }}
                >
                  <div className="absolute max-w-xs text-center mt-8 opacity-0 group-hover:opacity-100 bg-gray-800 text-white whitespace-nowrap font-medium text-sm border border-gray-900 rounded-lg p-2 shadow-lg right-0 dark:bg-neutral-700">
                    <span>{`${datum.weight} ${datum.weight_unit}`}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
            {chartData.map((datum, index) => (
              // legend
              <div key={datum.group_id} className="flex gap-1.5 items-center">
                <div
                  className="h-3 w-3"
                  style={{ backgroundColor: CHART_COLOURS[index] }}
                />
                <span className="text-sm dark:text-neutral-200">
                  {datum.group}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ChartSummary;
