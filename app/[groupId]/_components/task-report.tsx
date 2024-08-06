import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";

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
    <div className="text-text-primary">
      <p>리포트</p>
      <p>오늘의 할 일 : {NUMBER_OF_TASKS} </p>
      <p>완료한 일 : {NUMBER_OF_DONE}</p>
    </div>
  );
};

export default TaskReport;
