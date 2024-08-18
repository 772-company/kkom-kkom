"use client";

import Button from "@/components/button/button";
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

export default function ArticleComment({ boardId }: ArticleCommentProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const onSubmit: SubmitHandler<CommentForm> = (data) => {
    // TODO: 댓글 등록 요청
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <h2 className="mb-4 block text-base font-medium text-text-primary md:mb-6 md:text-xl">
        댓글달기
      </h2>
      {/* TODO 공통 textarea 컴포넌트로 교체 */}
      <textarea
        placeholder="댓글을 입력해주세요."
        {...register("content")}
        className="focus:ring-primary h-[104px] w-full rounded-lg border border-border-primary bg-background-secondary px-6 py-4 text-sm text-text-primary focus:outline-none focus:ring focus:ring-opacity-50 md:text-base"
      />
      {errors.content && (
        <p className="text-red-500">{errors.content.message}</p>
      )}
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
