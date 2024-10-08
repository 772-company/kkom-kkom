import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchTask } from "..";

const useToggleDoneTask = (
  date: Date,
  groupId: string,
  taskListId: number | undefined,
  taskId: number,
  doneAt: string | null,
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => patchTask(groupId, taskListId, taskId, { done: !doneAt }),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getTask", taskId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getTasks", taskListId, convertDateToY_M_D(date)],
        }),
        queryClient.invalidateQueries({
          queryKey: ["groupInfo", groupId],
        }),
      ]);
    },
  });

  return { mutate, tooglePending: isPending, isPending };
};

export default useToggleDoneTask;
