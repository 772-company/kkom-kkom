"use client";

import { Cell, Pie, PieChart, RadialBar, RadialBarChart } from "recharts";

interface TodayTaskProgressProps {
  numberOfTasks: number;
  numberOfDone: number;
}

const TodayTaskProgress = ({
  numberOfTasks,
  numberOfDone,
}: TodayTaskProgressProps) => {
  // 임시 값
  numberOfTasks = 20;
  numberOfDone = 8;
  const numberOfOngoing = 12;
  // 임시 값

  const progressPercent = Math.round((numberOfDone / numberOfTasks) * 100);
  const todayProgressData1 = [
    {
      name: "numberOfTasks",
      value: numberOfTasks,
      fill: "#1E293B",
      index: 0,
    },
    {
      name: "numberOfDone",
      value: numberOfDone,
      fill: "#34D399",
      index: 1,
    },
  ];

  const todayProgressData2 = [
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
    <div className="flex items-center gap-[64px]">
      <RadialBarChart
        width={200}
        height={200}
        innerRadius="40%"
        outerRadius="100%"
        data={todayProgressData1}
        startAngle={270}
        endAngle={630}
      >
        <RadialBar
          dataKey="value"
          cornerRadius={20}
          stroke="#1E293B"
          background={{ fill: "#334155" }}
          isAnimationActive={false}
        />
      </RadialBarChart>
      <div>
        <p className="text-[14px] font-[500] text-text-primary">
          오늘의<br></br>진행 상황
        </p>
        <p className="text-[40px] font-[700] text-brand-primary">
          {progressPercent}%
        </p>
      </div>
      <PieChart width={170} height={170}>
        <defs>
          <linearGradient id="ongoingGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="rgba(16,185,129,1)" />
            <stop offset="100%" stopColor="rgba(163,230,53,1)" />
          </linearGradient>
        </defs>
        <Pie
          data={todayProgressData2}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={55}
          outerRadius={85}
          cornerRadius={20}
        >
          {todayProgressData2.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={
                entry.name === "numberOfDone"
                  ? "url(#ongoingGradient)"
                  : "#334155"
              }
              strokeWidth={0}
            />
          ))}
        </Pie>
      </PieChart>
    </div>
  );
};
export default TodayTaskProgress;
