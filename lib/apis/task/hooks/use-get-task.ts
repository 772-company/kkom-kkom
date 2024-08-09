import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTask } from "..";

const useGetTask = (groupId: string, taskListId: number, taskId: number) => {
  const { data, isPending } = useQuery({
    queryKey: ["getTask", taskId],
    queryFn: () => getTask(groupId, taskListId, taskId),
  });
  const taskDetail = data;
  return { isPending, taskDetail };
};

export default useGetTask;
