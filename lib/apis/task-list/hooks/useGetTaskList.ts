import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTaskList } from "..";

const useGetTaskList = (groupId: number, id: number, date?: Date) => {
  const { data, error, isPending } = useQuery({
    queryKey: ["getTaskList"],
    queryFn: () => getTaskList(groupId, id, date),
  });

  return {
    data,
    error,
    isPending,
  };
};

export default useGetTaskList;
