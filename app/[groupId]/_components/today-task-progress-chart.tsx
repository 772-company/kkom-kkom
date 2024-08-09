"use client";

import { Cell, Pie, PieChart } from "recharts";

interface TodayTaskProgressChartProps {
  numberOfTasks: number;
  numberOfDone: number;
}

const TodayTaskProgressChart = ({
  numberOfTasks,
  numberOfDone,
}: TodayTaskProgressChartProps) => {
  const numberOfOngoing = numberOfTasks - numberOfDone;

  const todayProgressData = [
    {
      name: "numberOfOngoing",
      value: numberOfOngoing,
    },
    {
      name: "numberOfDone",
      value: numberOfDone,
    },
  ];

  return (
    <PieChart width={170} height={170} className="z-5">
      <defs>
        <linearGradient id="doneGradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(163,230,53,1)" />
          <stop offset="100%" stopColor="rgba(16,185,129,1)" />
        </linearGradient>
      </defs>
      <Pie
        data={todayProgressData}
        dataKey="value"
        nameKey="name"
        cx="50%"
        cy="50%"
        innerRadius={55}
        outerRadius={85}
        cornerRadius={20}
      >
        {todayProgressData.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={
              entry.name === "numberOfDone" ? "url(#doneGradient)" : "#334155"
            }
            strokeWidth={0}
          />
        ))}
      </Pie>
    </PieChart>
  );
};
export default TodayTaskProgressChart;
