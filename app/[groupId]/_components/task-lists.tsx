"use client";

import Popover from "@/components/popover/popover";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import Kebab from "@/public/icons/kebab-small.svg";
import ProgressDone from "@/public/icons/progress-done.svg";
import ProgressOngoing from "@/public/icons/progress-ongoing.svg";

import ModalTaskListAdd from "./modal/modal-task-list-add";

type TaskListType = GetTeamIdGroupsIdResponse["taskLists"][0];

interface TaskListProps {
  taskList: TaskListType;
}

interface TaskListsProps {
  taskLists: TaskListType[];
}

const COLORS = [
  "bg-point-pink",
  "bg-point-rose",
  "bg-point-orange",
  "bg-point-yellow",
  "bg-point-cyan",
  "bg-point-blue",
  "bg-point-purple",
];

const TaskList = ({ taskList }: TaskListProps) => {
  const colorIndex = taskList.displayIndex % 7;
  const pointColor = COLORS[colorIndex];
  const numberOfDone = taskList.tasks.filter(
    (tasks) => tasks.doneAt != null,
  ).length;

  const isDone = numberOfDone === taskList.tasks.length ? true : false;

  return (
    <div className="flex h-[40px] items-center justify-between rounded-[12px] bg-background-secondary text-[14px] font-[500] leading-[40px] text-text-primary">
      <div className="flex gap-[12px]">
        <div className={`w-[12px] rounded-l-[12px] ${pointColor}`}></div>
        <p className="">{taskList.name}</p>
      </div>
      <div className="flex items-center gap-[10px] pr-[8px]">
        <div className="flex h-[25px] items-center gap-[4px] rounded-[12px] bg-background-primary px-[8px]">
          {isDone ? (
            <ProgressDone className="h-[16px] w-[16px]" />
          ) : (
            <ProgressOngoing className="h-[16px] w-[16px] animate-spin" />
          )}
          <p>
            {numberOfDone} / {taskList.tasks.length}
          </p>
        </div>
        <Popover
          triggerSvg={Kebab}
          triggerHeight={16}
          triggerWidth={16}
          content={[{ text: "수정하기" }, { text: "삭제하기" }]}
          contentClassName="z-10 border-[1px] absolute right-0 bg-background-secondary border-border-primary/10 w-[120px] h-[80px] text-white"
        />
      </div>
    </div>
  );
};

const TaskLists = ({ taskLists }: TaskListsProps) => {
  const ModalTaskListAddOverlay = useCustomOverlay(({ close }) => (
    <ModalTaskListAdd close={close} />
  ));
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <p className="text-[16px] font-[500] text-text-primary">할 일 목록</p>
          <p className="text-[16px] font-[400] text-text-default">
            ({taskLists.length}개)
          </p>
        </div>
        <button
          className="text-[14px] font-[400] text-brand-primary"
          onClick={ModalTaskListAddOverlay.open}
        >
          + 새로운 목록 추가하기
        </button>
      </div>
      <div className="flex h-[208px] flex-col gap-[10px] overflow-y-scroll scrollbar-custom">
        {taskLists.length > 0 ? (
          taskLists.map((taskList) => (
            <TaskList taskList={taskList} key={taskList.id} />
          ))
        ) : (
          <p className="text-text-primary">아직 할 일 목록이 없습니다</p>
        )}
      </div>
    </div>
  );
};

export default TaskLists;
