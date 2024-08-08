import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTaskList } from "..";

const useGetTaskList = (groupId: number, id: number, date?: Date) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["getTaskList", id],
    queryFn: () => getTaskList(groupId, id),
  });
  const taskList = data;
  return {
    taskList,
    error,
    isPending,
  };
};

export default useGetTaskList;
