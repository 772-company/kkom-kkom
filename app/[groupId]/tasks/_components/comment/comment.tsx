import Button from "@/components/button/button";
import ProfileIcon from "@/components/profile-Icon/profile-icon";
import useDeleteComment from "@/lib/apis/comment/hooks/use-delete-comment";
import usePatchComment from "@/lib/apis/comment/hooks/use-patch-comment";
import { GetCommentResponse } from "@/lib/apis/comment/type";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import React from "react";
import { useForm } from "react-hook-form";

import useEditComment from "../../_hooks/use-edit-comment";
import CommentKebabPopOver from "./kebab-pop-over";

interface CommentProps {
  taskListId: number | undefined;
  date: Date;
  commentData: GetCommentResponse;
}

function Comment({ date, taskListId, commentData }: CommentProps) {
  const { isEidtMode, userData, handleCancelEditMode, handleClickEditMode } =
    useEditComment();

  const { mutate: deleteCommentMutate } = useDeleteComment(
    taskListId ?? -1,
    commentData.taskId,
    commentData.id,
    date,
    handleCancelEditMode,
  );

  const handleClickDeleteComment = () => {
    deleteCommentMutate();
  };

  const { mutate: patchCommentMutate } = usePatchComment(
    commentData.taskId,
    commentData.id,
    handleCancelEditMode,
  );

  const { register, handleSubmit } = useForm({
    mode: "onSubmit",
    defaultValues: {
      content: commentData.content,
    },
  });

  const serveData = (data: { content: string }) => {
    if (taskListId !== -1) {
      patchCommentMutate(data);
    }
  };

  return (
    <div className="flex min-h-[98px] w-full flex-col gap-4 border-b border-border-primary">
      <div className="mb-3">
        <div className="flex justify-between">
          {isEidtMode && (
            <form
              className="relative h-[90px] w-full"
              onSubmit={handleSubmit(serveData)}
            >
              <textarea
                {...register("content")}
                className="h-full w-full resize-none bg-background-secondary text-sm font-normal text-text-primary"
              />
              <div className="absolute bottom-4 right-0 flex h-[32px] w-[130px] gap-2">
                <Button
                  type="button"
                  onClick={handleCancelEditMode}
                  btnStyle="outlined_secondary"
                  className="h-[32px] w-[48px] bg-background-secondary"
                  btnSize="x-small"
                >
                  취소
                </Button>

                <Button
                  type="submit"
                  btnStyle="outlined"
                  btnSize="x-small"
                  className="h-[32px] w-[74px]"
                >
                  수정하기
                </Button>
              </div>
            </form>
          )}

          {!isEidtMode && (
            <p className="max-w-[371px] text-sm font-normal text-text-primary">
              {commentData.content}
            </p>
          )}
          {!isEidtMode && (
            <CommentKebabPopOver
              userId={userData?.id}
              commentUserId={commentData.id}
              handleClickDeleteComment={handleClickDeleteComment}
              handleClickEditMode={handleClickEditMode}
            />
          )}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ProfileIcon
              image={commentData.user.image}
              type="myProfile"
              width={32}
              height={32}
            />
            <p className="text-sm font-medium text-text-primary">
              {commentData.user.nickname}
            </p>
          </div>
          <p className="text-sm font-normal text-text-secondary">
            {convertDiffDateFromNow(new Date(commentData.updatedAt))}
            {commentData.updatedAt !== commentData.createdAt && "(수정됨)"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Comment;
