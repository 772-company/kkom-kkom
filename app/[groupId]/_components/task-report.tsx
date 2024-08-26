"use client";

import { getGroupInfo } from "@/lib/apis/group";
import { useQuery } from "@tanstack/react-query";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useState } from "react";

import TodayKkomkkomPeople from "./today-kkomkkom-people";
import TodayTaskProgress from "./today-task-progress";
import TodayTaskSummary from "./today-task-summary";

interface TaskReportProps {
  groupId: string;
}

interface UserCompletionCountType {
  userId: number;
  count: number;
  nickname: string;
}

function TaskReport({ groupId }: TaskReportProps) {
  const { data } = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfo({ groupId }),
  });

  const taskLists = data ? data.taskLists : [];

  const numberOfDone = taskLists.reduce(
    (acc, taskList) =>
      acc + taskList.tasks.filter((task) => task.doneAt !== null).length,
    0,
  );

  const numberOfTasks = taskLists.reduce(
    (acc, taskList) => acc + taskList.tasks.length,
    0,
  );

  const userCompletionCount: UserCompletionCountType[] = [];

  taskLists.forEach((taskList) => {
    taskList.tasks.forEach((task) => {
      if (task.doneBy && task.doneBy.user) {
        const userId = task.doneBy.user.id;
        const existingUser = userCompletionCount.find(
          (user) => user.userId === userId,
        );
        if (existingUser) {
          existingUser.count += 1;
        } else {
          userCompletionCount.push({
            userId,
            count: 1,
            nickname: task.doneBy.user.nickname,
          });
        }
      }
    });
  });

  const topUsers = userCompletionCount
    .sort((a, b) => b.count - a.count)
    .slice(0, 3);

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    dragFree: false,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setScrollSnaps(emblaApi.scrollSnapList());
    emblaApi.on("select", onSelect);
  }, [emblaApi, onSelect]);

  const scrollTo = useCallback(
    (index: number) => emblaApi && emblaApi.scrollTo(index),
    [emblaApi],
  );

  return (
    <div className="relative flex flex-col gap-[16px]">
      <p className="text-[16px] font-[500] text-text-primary">리포트</p>
      <div className="flex h-[218px] w-full flex-col justify-between rounded-[12px] bg-background-secondary p-[24px]">
        <div className="hidden gap-[30px] lg:flex">
          <TodayTaskProgress
            numberOfTasks={numberOfTasks}
            numberOfDone={numberOfDone}
          />
          <TodayKkomkkomPeople topUsers={topUsers} />
        </div>

        <div className="lg:hidden">
          <div
            ref={emblaRef}
            className="w-[140px] overflow-hidden md:w-[303px]"
          >
            <div className="flex">
              <div>
                <TodayTaskProgress
                  numberOfTasks={numberOfTasks}
                  numberOfDone={numberOfDone}
                />
              </div>
              <div>
                <TodayKkomkkomPeople topUsers={topUsers} />
              </div>
            </div>
          </div>

          {/* Dot Navigation */}
          <div className="embla__dots absolute bottom-2 flex h-3 w-[140px] justify-center gap-[3px] md:w-[303px]">
            {scrollSnaps.map((_, index) => (
              <button
                type="button"
                aria-label="dot navigation"
                key={_}
                className={`h-3 w-3 rounded-full border-[1px] border-white ${index === selectedIndex ? "bg-[#10B981]" : ""}`}
                onClick={() => scrollTo(index)}
              />
            ))}
          </div>
        </div>

        <div className="absolute right-[24px] flex flex-col gap-[16px]">
          <TodayTaskSummary type="TODO" number={numberOfTasks} />
          <TodayTaskSummary type="DONE" number={numberOfDone} />
        </div>
      </div>
    </div>
  );
}

export default TaskReport;
