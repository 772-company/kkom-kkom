"use client";

import Card from "@/app/(free-board)/_components/card";
import { usePatchCommentsMutation } from "@/app/(free-board)/_query/mutation";
import useArticlesCommentsQuery from "@/app/(free-board)/_query/query";
import Button from "@/components/button/button";
import { BasicTextarea } from "@/components/input-field/textarea";
import { GetArticlesArticleIdCommentsResponse } from "@/lib/apis/type";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { commentSchema } from "./comment-form";

interface CommentEditCardProps {
  comment: GetArticlesArticleIdCommentsResponse["list"][0];
  articleId: number;
  onRead: () => void;
}

export default function CommentEditCard({
  comment,
  articleId,
  onRead,
}: CommentEditCardProps) {
  const { register, handleSubmit, setValue, setFocus } = useForm({
    defaultValues: {
      content: comment.content,
    },
    mode: "onSubmit",
    resolver: yupResolver(commentSchema),
  });

  const { mutate: patchMutation, isPending: isPatchPending } =
    usePatchCommentsMutation();
  const { isFetching } = useArticlesCommentsQuery(articleId);

  const onInvalid = (error: any) => {
    alert(error.content.message);
  };

  const onSubmit = (formData: { content: string }) => {
    onRead();
    if (isFetching || isPatchPending) {
      alert(
        "도배 방지를 위하여 글을 입력한 후 일정시간 동안 추가입력을 제한하고 있습니다.",
      );
      return;
    }
    patchMutation({
      articleId,
      commentId: comment.id,
      data: { content: formData.content },
    });
    setValue("content", "");
  };

  useEffect(() => {
    setFocus("content");
  }, [setFocus]);

  return (
    <form
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      className="relative flex h-full w-full flex-col justify-between gap-8"
    >
      <section className="w-full">
        <BasicTextarea
          id="content"
          register={register}
          placeholder="댓글을 입력해주세요."
          className="focus:ring-primary h-[104px] w-full resize-none rounded-lg border border-border-primary bg-background-secondary px-6 py-4 text-sm text-text-primary focus:outline-none focus:ring focus:ring-opacity-50 md:text-base"
        />
      </section>
      <section className="flex justify-between">
        <section className="flex items-center">
          <Card.Profile name={comment.writer.nickname} className="mr-4" />
          <time className="border-l border-border-primary border-opacity-10 pl-4 text-xs font-medium leading-3 text-text-disabled md:text-sm md:leading-[14px]">
            {convertDiffDateFromNow(new Date(comment.updatedAt))}{" "}
            {comment.updatedAt !== comment.createdAt && "(수정됨)"}
          </time>
        </section>
        <section className="flex gap-4">
          <Button
            btnSize="x-small"
            btnStyle="outlined_secondary"
            type="button"
            onClick={onRead}
            className="w-[72px] md:w-[104px]"
          >
            취소
          </Button>
          <Button
            btnSize="x-small"
            btnStyle="solid"
            className="w-[72px] md:w-[104px]"
          >
            수정
          </Button>
        </section>
      </section>
    </form>
  );
}
