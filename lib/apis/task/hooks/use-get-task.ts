import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTask } from "..";

const useGetTask = (
  groupId: string,
  taskListId: number | undefined,
  taskId: number | undefined,
) => {
  console.log(groupId, taskListId, taskId);

  const isValid = () => {
    return typeof taskId === "number";
  };
  const { data, isPending } = useQuery({
    enabled: isValid(),
    queryKey: ["getTask", taskId],
    queryFn: () => getTask(groupId, taskListId, taskId),
  });
  const taskDetail = data;
  return { isPending, taskDetail };
};

export default useGetTask;
