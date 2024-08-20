import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";

import { patchComment } from "..";

const usePatchComment = (
  taskId: number,

  commentId: number,

  handleCancelEditMode: () => void,
) => {
  const queryClient = useQueryClient();
  const { isPending, mutate } = useMutation({
    mutationFn: (data: { content: string }) =>
      patchComment(taskId, commentId, data),
    onSuccess: () => {
      Promise.all([
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

export default usePatchComment;
