import { useQueries } from "@tanstack/react-query";

import { getTask } from "..";
import { getComment } from "../../comment";

const useGetTask = (
  groupId: string,
  taskListId: number | undefined,
  taskId: number | undefined,
) => {
  const isValid = () => typeof taskId === "number";
  const data = useQueries({
    queries: [
      {
        enabled: isValid(),
        queryKey: ["getTask", taskId],
        queryFn: () => getTask(groupId, taskListId, taskId),
      },
      {
        enabled: isValid(),
        queryKey: ["getComment", taskId],
        queryFn: () => getComment(taskId),
      },
    ],
  });
  const [taskDetailData, commentData] = data;
  const isPending = taskDetailData.isPending || commentData.isPending;
  const taskDetail = taskDetailData.data;
  const comment = commentData.data;
  return { isPending, taskDetail, comment };
};

export default useGetTask;
