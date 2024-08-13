import { convertDateToY_M_D } from "@/utils/convert-date";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTasks } from "..";

const useGetTasks = (groupId: string, id: number | undefined, date: Date) => {
  const isValid = () => {
    return typeof id === "number";
  };

  convertDateToY_M_D(date);
  const { data, error, isPending } = useQuery({
    enabled: isValid(),
    queryKey: ["getTasks", id, convertDateToY_M_D(date)],
    queryFn: () => getTasks(groupId, id, date),
  });
  const tasks = data;
  return {
    tasks,
    error,
    isPending,
  };
};

export default useGetTasks;
