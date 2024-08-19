import { TodoFormType } from "@/app/[groupId]/tasks/_components/modal/add-todo-modal";
import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { postTask } from "..";

const usePostTask = (
  groupId: string,
  taskListId: number | undefined,
  date: Date,
  close: () => void,
) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: TodoFormType) =>
      postTask(groupId, taskListId ?? -1, data),
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({
        queryKey: ["getTasks", taskListId, convertDateToY_M_D(date)],
      });
    },
  });
  return { isPending, mutate };
};

export default usePostTask;
