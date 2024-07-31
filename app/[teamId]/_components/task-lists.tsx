import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import Kebab from "@/public/icons/kebab-small.svg";
import ProgressDone from "@/public/icons/progress-done.svg";
import ProgressOngoing from "@/public/icons/progress-ongoing.svg";

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
  const COLOR_INDEX = taskList.displayIndex % 7;
  const POINT_COLOR = COLORS[COLOR_INDEX];
  const DONE = taskList.tasks.filter((tasks) => tasks.doneAt != null).length;

  let PROGRESS_ICON;
  if (DONE === taskList.tasks.length) {
    PROGRESS_ICON = ProgressDone;
  } else {
    PROGRESS_ICON = ProgressOngoing;
  }

  return (
    <div className="flex h-[40px] items-center justify-between bg-background-secondary text-[14px] font-[500] leading-[40px] text-text-primary">
      <div className="flex gap-[12px]">
        <div className={`w-[12px] rounded-l-[12px] ${POINT_COLOR}`}></div>
        <p className="">{taskList.name}</p>
      </div>
      <div className="flex items-center gap-[10px]">
        <div className="flex h-[25px] items-center gap-[4px] rounded-[12px] bg-background-primary px-[8px]">
          <PROGRESS_ICON className="h-[16px] w-[16px]" />
          <p>
            {DONE} / {taskList.tasks.length}
          </p>
        </div>
        <Kebab className="h-[16px] w-[16px]" />
      </div>
    </div>
  );
};

const TaskLists = ({ taskLists }: TaskListsProps) => {
  return (
    <div className="flex flex-col gap-[16px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-[8px]">
          <p className="text-[16px] font-[500] text-text-primary">할 일 목록</p>
          <p className="text-[16px] font-[400] text-text-default">
            ({taskLists.length}개)
          </p>
        </div>
        <p className="text-[14px] font-[400] text-brand-primary">
          + 새로운 목록 추가하기
        </p>
      </div>
      <div className="flex h-[208px] flex-col gap-[10px] overflow-y-scroll">
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
