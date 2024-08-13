import { postComment } from "@/lib/apis/comment";
import { convertDateToY_M_D } from "@/utils/convert-date";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { useForm } from "react-hook-form";

import TaskButton from "./tasks-button";

interface CommentInputProps {
  taskListId: number | undefined;
  taskId: number | undefined;
  date: Date;
}
const CommentInput = ({ taskListId, taskId, date }: CommentInputProps) => {
  const queryClient = useQueryClient();
  const {
    formState: { isDirty },
    register,
    handleSubmit,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: { content: "" },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: (data: { content: string }) => postComment(taskId, data),
    onSuccess: () => {
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

  const serveData = (
    data: { content: string },
    event?: React.BaseSyntheticEvent,
  ) => {
    if (!data.content || !taskId) {
      return;
    }
    mutate(data);
    reset({ content: "" }, { keepDirty: true });
  };

  return (
    <form className="relative w-full" onSubmit={handleSubmit(serveData)}>
      <input
        {...register("content")}
        placeholder="댓글을 달아주세요"
        className="bg-b h-[24px] w-full bg-background-secondary text-sm text-text-default text-text-primary placeholder:font-normal"
      />
      <TaskButton
        type="submit"
        types="submit"
        disable={isDirty && !isPending ? false : true}
      />
    </form>
  );
};

export default CommentInput;
