// import React from "react";
// import { CHART_COLOURS } from "@/utils/chartUtils";

// interface ChartProps {
//   children: React.ReactNode;
//   width: number;
//   height: number;
// }

// const Chart = (props: ChartProps) => {
//   const { children, width, height } = props;
//   return (
//     <svg viewBox={`0 0 ${width} ${height}`} className="inline-block max-h-8">
//       {children}
//     </svg>
//   );
// };

// interface BarProps {
//   x: number;
//   y: number;
//   height: number;
//   width: number;
//   colour: string;
// }
// const Bar = (props: BarProps) => {
//   const { x, y, height, width, colour } = props;
//   return (
//     <rect x={x} y={y} height={height} width={width} fill={colour} rx="2" />
//   );
// };

// interface Props {
//   data: ChartData[];
// }

// function ChartSummary(props: Props) {
//   const { data } = props;
//   const chartData = data.sort((a, b) => b.weight - a.weight);
//   const barHeight = 100;
//   const barMargin = 10;
//   const height = barHeight;
//   const maxValue = Math.max(...data.map((datum) => datum.weight));
//   const totalWidth = data.reduce((total, datum) => total + datum.weight, 0);
//   const totalMargin = barMargin * (data.length - 1);
//   const width = (totalWidth / maxValue) * 600 + totalMargin;
//   let accumulatedX = 0;

//   return (
//     <>
//       {data.length === 0 && (
//         <p>Add items to see a visual breakdown of your pack.</p>
//       )}
//       {data.length > 0 && (
//         <div className="flex flex-col">
//           <Chart height={height} width={width}>
//             {chartData.map((datum, index) => {
//               const x = accumulatedX;
//               const y = 0;
//               const barWidth = (datum.weight / maxValue) * 600;
//               accumulatedX += barWidth + barMargin;

//               return (
//                 <Bar
//                   key={datum.group}
//                   x={x}
//                   y={y}
//                   width={barWidth}
//                   height={barHeight}
//                   colour={CHART_COLOURS[index]}
//                 />
//               );
//             })}
//           </Chart>

//           <div className="flex flex-wrap gap-x-5 gap-y-2 mt-3">
//             {chartData.map((datum, index) => (
//               // legend
//               <div key={index} className="flex gap-1.5 items-center">
//                 <div
//                   className="h-3 w-3"
//                   style={{ backgroundColor: CHART_COLOURS[index] }}
//                 />
//                 <span className="text-sm">{datum.group}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// export default ChartSummary;

import React from "react";
import { CHART_COLOURS } from "@/utils/chartUtils";

interface Props {
  data: ChartData[];
}

function ChartSummary(props: Props) {
  const { data } = props;
  const chartData = data.sort((a, b) => b.weight - a.weight);
  const totalWidth = data.reduce((total, datum) => total + datum.weight, 0);

  return (
    <>
      {data.length === 0 && (
        <p>Add items to see a visual breakdown of your pack.</p>
      )}
      {data.length > 0 && (
        <div className="flex flex-col grow">
          <div className="flex gap-1">
            {chartData.map((datum, index) => {
              const barWidth = Math.floor((datum.weight / totalWidth) * 100);

              return (
                <div
                  key={datum.group}
                  className="h-6 rounded-sm"
                  style={{
                    backgroundColor: CHART_COLOURS[index],
                    width: `${barWidth}%`,
                  }}
                />
              );
            })}
          </div>

          <div className="flex flex-wrap gap-x-5 gap-y-2 mt-2">
            {chartData.map((datum, index) => (
              // legend
              <div key={index} className="flex gap-1.5 items-center">
                <div
                  className="h-3 w-3"
                  style={{ backgroundColor: CHART_COLOURS[index] }}
                />
                <span className="text-sm">{datum.group}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ChartSummary;
