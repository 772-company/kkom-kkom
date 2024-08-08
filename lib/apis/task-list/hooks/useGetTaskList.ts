import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import React from "react";

import { getTaskList } from "..";

const useGetTaskList = (groupId: number, id: number, date?: Date) => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") ?? "";
  const { data, error, isPending } = useQuery({
    queryKey: ["getTaskList", id],
    queryFn: () => getTaskList(groupId, id, accessToken),
  });
  const taskList = data;
  return {
    taskList,
    error,
    isPending,
  };
};

export default useGetTaskList;
