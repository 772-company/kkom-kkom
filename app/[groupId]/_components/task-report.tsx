import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";

import TodayTaskProgress from "./today-task-progress";
import TodayTaskSummary from "./today-task-summary";

type TaskListType = GetTeamIdGroupsIdResponse["taskLists"][0];

interface TaskReportProps {
  taskLists: TaskListType[];
}

const TaskReport = ({ taskLists }: TaskReportProps) => {
  const NUMBER_OF_DONE = taskLists.reduce((acc, taskList) => {
    return acc + taskList.tasks.filter((task) => task.doneAt !== null).length;
  }, 0);

  const NUMBER_OF_TASKS = taskLists.reduce(
    (acc, taskList) => acc + taskList.tasks.length,
    0,
  );

  return (
    <div className="flex flex-col gap-[16px]">
      <p className="text-[16px] font-[500] text-text-primary">리포트</p>
      <div className="flex w-full justify-between rounded-[12px] bg-background-secondary p-[24px]">
        <TodayTaskProgress
          numberOfTasks={NUMBER_OF_TASKS}
          numberOfDone={NUMBER_OF_DONE}
        />
        <div className="flex flex-col gap-[16px]">
          <TodayTaskSummary type="TODO" number={NUMBER_OF_TASKS} />
          <TodayTaskSummary type="DONE" number={NUMBER_OF_DONE} />
        </div>
      </div>
    </div>
  );
};

export default TaskReport;
