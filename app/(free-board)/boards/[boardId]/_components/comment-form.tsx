"use client";

import { usePostCommentsMutation } from "@/app/(free-board)/_query/mutation";
import useArticlesCommentsQuery, {
  useUserQuery,
} from "@/app/(free-board)/_query/query";
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
  const { register, handleSubmit, setValue } = useForm({
    mode: "onSubmit",
    resolver: yupResolver(schema),
  });
  const articleId = Number(boardId);
  const { data: user } = useUserQuery();
  const { isFetching } = useArticlesCommentsQuery(articleId);
  const { mutate, isPending } = usePostCommentsMutation();

  const onSubmit: SubmitHandler<CommentForm> = (formData) => {
    if (isFetching || isPending) {
      alert(
        "도배 방지를 위하여 글을 입력한 후 일정시간 동안 추가입력을 제한하고 있습니다.",
      );
      return;
    }
    if (!user) {
      alert("잠시 후에 다시 시도해주세요.");
      return;
    }
    mutate({
      articleId,
      content: formData.content,
      id: user.id,
      image: user.image,
      nickname: user.nickname,
    });
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
          btnSize="large"
          btnStyle="solid"
          className="h-[32px] w-[74px] py-1.5 text-sm md:h-[48px] md:w-[184px] md:py-3 md:text-base"
        >
          등록
        </Button>
      </section>
    </form>
  );
}
