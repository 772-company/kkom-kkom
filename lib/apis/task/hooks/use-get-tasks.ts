import { myConvertDateToYMD } from "@/utils/convert-date";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getTasks } from "..";

const useGetTasks = (groupId: string, id: number, date: Date) => {
  myConvertDateToYMD(date);
  const { data, error, isPending } = useQuery({
    queryKey: ["getTasks", id, myConvertDateToYMD(date)],
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
