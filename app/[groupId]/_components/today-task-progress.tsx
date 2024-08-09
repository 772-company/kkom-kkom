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
  const progressPercent = numberOfTasks === 0 ? 0 : Math.round((numberOfDone / numberOfTasks) * 100);

  return (
    <div className="flex items-center gap-[64px]">
      <div className="relative">
        <div className="h-[170px] w-[170px] rounded-full border-[30px] border-background-tertiary bg-background-secondary" />
        <div className="absolute bottom-[45px] left-[45px] flex h-[80px] w-[80px] flex-col items-center justify-center md:hidden">
          <p className="text-[12px] font-[500] text-text-primary">오늘</p>
          <p className="bg-gradient-to-r from-brand-primary to-brand-tertiary bg-clip-text text-[20px] font-[700] text-brand-primary text-transparent">
            {progressPercent}%
          </p>
        </div>
        <div className="absolute bottom-0">
          <TodayTaskProgressChart
            numberOfTasks={numberOfTasks}
            numberOfDone={numberOfDone}
          />
        </div>
      </div>
      <div className="hidden md:block">
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
