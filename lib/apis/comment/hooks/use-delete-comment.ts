import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { deleteComment } from "..";

const useDeleteComment = (
  taskListId: number,
  taskId: number,
  commentId: number,
  date: Date,
  handleCancelEditMode: () => void,
) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: () => deleteComment(taskId, commentId),
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["getTasks", taskListId, convertDateToY_M_D(date)],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getTask", taskId],
        }),
        queryClient.invalidateQueries({
          queryKey: ["getComment", taskId],
        }),
      ]);
      handleCancelEditMode();
    },
  });
  return { isPending, mutate };
};

export default useDeleteComment;
