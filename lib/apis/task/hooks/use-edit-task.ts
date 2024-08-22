import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { patchTask } from "..";

const useEditTask = (
  date: Date,
  groupId: string,
  taskListId: number | undefined,
  taskId: number,
  close: () => void,
) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { name: string; description: string }) =>
      patchTask(groupId, taskListId, taskId, {
        name: data.name,
        description: data.description,
      }),
    onSuccess: () => {
      close();
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getTask", taskId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getTasks", taskListId, convertDateToY_M_D(date)],
        }),
      ]);
    },
  });

  return { mutate, tooglePending: isPending, isPending };
};

export default useEditTask;
