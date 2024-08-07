"use client";

import dynamic from "next/dynamic";

const TodayTaskProgressChart = dynamic(
  () => import("./today-task-progress-chart"),
  { ssr: false },
);

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

  const progressPercent = Math.round((numberOfDone / numberOfTasks) * 100);

  return (
    <div className="flex items-center gap-[64px]">
      <div className="relative">
        <div className="h-[170px] w-[170px] rounded-full border-[30px] border-background-tertiary bg-background-secondary" />
        <div className="absolute bottom-0">
          <TodayTaskProgressChart
            numberOfTasks={numberOfTasks}
            numberOfDone={numberOfDone}
          />
        </div>
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
