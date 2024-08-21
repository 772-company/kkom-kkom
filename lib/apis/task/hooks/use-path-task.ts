import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchTask } from "..";

const usePatchTask = (
  date: Date,
  groupId: string,
  taskListId: number | undefined,
  taskId: number,
  doneAt?: string | null,
  isEditModal?: boolean,
  close?: () => void,
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data?: { name: string; description: string }) =>
      patchTask(groupId, taskListId, taskId, {
        done: !isEditModal && doneAt ? false : true,
        name: data?.name,
        description: data?.description,
      }),
    onSuccess: () => {
      close && close();
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getTasks", taskListId, convertDateToY_M_D(date)],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getTask", taskId],
        }),
      ]);
    },
  });

  return { mutate, tooglePending: isPending, isPending };
};

export default usePatchTask;
