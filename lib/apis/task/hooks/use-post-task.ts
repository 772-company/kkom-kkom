import { useMutation, useQueryClient } from "@tanstack/react-query";

import { postTask } from "..";

interface TodoFormType {
  name: string;
  description: string;
  startDate?: string;
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  monthDay?: number;
  weekDays?: number[];
}
const usePostTask = (
  groupId: string,
  taskListId: number | undefined,
  close: () => void,
) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: TodoFormType) =>
      postTask(groupId, taskListId ?? -1, data),
    onSuccess: () => {
      close();
      queryClient.invalidateQueries({
        queryKey: ["getTasks", taskListId],
      });
    },
  });
  return { isPending, mutate };
};

export default usePostTask;
