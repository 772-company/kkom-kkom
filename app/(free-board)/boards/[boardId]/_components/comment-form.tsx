"use client";

import { usePostCommentsMutation } from "@/app/(free-board)/_query/mutation";
import { useUserQuery } from "@/app/(free-board)/_query/query";
import Button from "@/components/button/button";
import { BasicTextarea } from "@/components/input-field/textarea";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { object, string } from "yup";

const schema = object().shape({
  content: string().required("내용을 입력해주세요"),
});

interface CommentForm {
  content: string;
}

interface ArticleCommentProps {
  boardId: string;
}

export default function CommentForm({ boardId }: ArticleCommentProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const { data: user } = useUserQuery();

  const { mutate } = usePostCommentsMutation({
    image: user?.image || "",
    nickname: user?.nickname || "",
    id: user?.id || 0,
  });

  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    mutate({ articleId: Number(boardId), content: data.content });
    setValue("content", "");
  };

  const onInvalid = (error: any) => {
    alert(error.content.message);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit, onInvalid)} className="w-full">
      <h2 className="mb-4 block text-base font-medium text-text-primary md:mb-6 md:text-xl">
        댓글달기
      </h2>
      <BasicTextarea
        id="content"
        register={register}
        placeholder="댓글을 입력해주세요."
        className="focus:ring-primary h-[104px] w-full rounded-lg border border-border-primary bg-background-secondary px-6 py-4 text-sm text-text-primary focus:outline-none focus:ring focus:ring-opacity-50 md:text-base"
      />
      <section className="mt-4 flex justify-end border-b border-text-primary border-opacity-10 pb-8 md:pb-10">
        <Button
          btnSize="x-small"
          btnStyle="solid"
          className="block w-[74px] md:hidden"
        >
          등록
        </Button>
        <Button
          btnSize="large"
          btnStyle="solid"
          className="hidden w-[184px] md:block"
        >
          등록
        </Button>
      </section>
    </form>
  );
}
