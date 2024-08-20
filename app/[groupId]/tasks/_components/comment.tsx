import Button from "@/components/button/button";
import Popover from "@/components/popover/popover";
import ProfileIcon from "@/components/profile-Icon/profile-icon";
import useDeleteComment from "@/lib/apis/comment/hooks/use-delete-comment";
import usePatchComment from "@/lib/apis/comment/hooks/use-patch-comment";
import { GetCommentResponse } from "@/lib/apis/comment/type";
import { getUser } from "@/lib/apis/user";
import Kebab from "@/public/icons/kebab-small.svg";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

interface CommentProps {
  taskListId: number | undefined;
  date: Date;
  commentData: GetCommentResponse;
}

const Comment = ({ date, taskListId, commentData }: CommentProps) => {
  const { data } = useQuery({ queryKey: ["getUser"], queryFn: getUser });
  const [isEidtMode, setIsEditMode] = useState<boolean>(false);
  const handleCancelEditMode = () => {
    setIsEditMode(false);
  };
  const handleClcikEditMode = () => {
    setIsEditMode(true);
  };

  const hanleClickDeleteComment = () => {
    deleteCommentMutate();
  };
  const { mutate: deleteCommentMutate, isPending: isDeletePending } =
    useDeleteComment(
      taskListId ?? -1,
      commentData.taskId,
      commentData.id,
      date,
      handleCancelEditMode,
    );
  const { mutate, isPending } = usePatchComment(
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

  const serveData = (
    data: { content: string },
    event?: React.BaseSyntheticEvent,
  ) => {
    if (taskListId !== -1) {
      mutate(data);
    }
  };
  const array = [
    data?.id === commentData.userId ? { text: "취소" } : undefined,
    data?.id === commentData.userId
      ? { text: "수정하기", onClick: handleClcikEditMode }
      : undefined,
    data?.id === commentData.userId
      ? { text: "삭제하기", onClick: hanleClickDeleteComment }
      : undefined,
  ].filter((item) => item !== undefined);
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
            <Popover
              content={array}
              triggerWidth={16}
              triggerHeight={16}
              triggerSvg={Kebab}
              triggerImageAlt="케밥"
              className="h-4 w-4"
              contentClassName="bg-background-secondary"
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
};

export default Comment;
