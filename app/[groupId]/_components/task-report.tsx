import getGroupInfo from "@/lib/apis/group";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import { useQuery } from "@tanstack/react-query";

import TodayTaskProgress from "./today-task-progress";
import TodayTaskSummary from "./today-task-summary";

interface TaskReportProps {
  groupId: string;
}

const TaskReport = ({ groupId }: TaskReportProps) => {
  const { data } = useQuery({
    queryKey: ["groupInfo"],
    queryFn: () => getGroupInfo({ groupId: groupId }),
  });

  const taskLists = data ? data.taskLists : [];

  const numberOfDone = taskLists.reduce((acc, taskList) => {
    return acc + taskList.tasks.filter((task) => task.doneAt !== null).length;
  }, 0);

  const numberOfTasks = taskLists.reduce(
    (acc, taskList) => acc + taskList.tasks.length,
    0,
  );

  return (
    <div className="relative flex flex-col gap-[16px]">
      <p className="text-[16px] font-[500] text-text-primary">리포트</p>
      <div className="flex h-[217px] w-full justify-between rounded-[12px] bg-background-secondary p-[24px]">
        <TodayTaskProgress
          numberOfTasks={numberOfTasks}
          numberOfDone={numberOfDone}
        />
        <div className="absolute right-[24px] flex flex-col gap-[16px]">
          <TodayTaskSummary type="TODO" number={numberOfTasks} />
          <TodayTaskSummary type="DONE" number={numberOfDone} />
        </div>
      </div>
    </div>
  );
};

export default TaskReport;
