"use client";

import { Cell, Pie, PieChart } from "recharts";

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

  const numberOfOngoing = numberOfTasks - numberOfDone;
  const progressPercent = Math.round((numberOfDone / numberOfTasks) * 100);

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

  const tempData = [
    {
      name: "temp",
      value: 1,
    },
  ];

  return (
    <div className="flex items-center gap-[64px]">
      <PieChart width={170} height={170} className="z-10">
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
      <div className="absolute">
        <PieChart width={170} height={170}>
          <Pie
            data={tempData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            cornerRadius={20}
            isAnimationActive={false}
            fill="#334155"
            stroke="#334155"
          />
        </PieChart>
      </div>
      <div>
        <p className="text-[14px] font-[500] text-text-primary">
          오늘의<br></br>진행 상황
        </p>
        <p className="bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-[40px] font-[700] text-brand-primary text-transparent">
          {progressPercent}%
        </p>
      </div>
    </div>
  );
};
export default TodayTaskProgress;
