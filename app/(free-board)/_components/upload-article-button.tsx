"use client";

import Button from "@/components/button/button";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { SubmitHandler } from "react-hook-form";

import { useUploadArticleMutation } from "../_query/mutation";
import ArticleModal, { ArticleType } from "./handle-article-modal";

export default function UploadArticleButton() {
  const uploadPostMutation = useUploadArticleMutation();
  const handlePost: SubmitHandler<ArticleType> = (formData) => {
    uploadPostMutation.mutate({
      content: formData.content,
      image: formData.image,
      title: formData.title,
    });
  };
  const overlay = useCustomOverlay(({ close }) => (
    <ArticleModal
      close={close}
      defaultContent={null}
      defaultImage={null}
      defaultTitle={null}
      onSubmit={handlePost}
    />
  ));

  return (
    <Button
      btnSize="x-small"
      btnStyle="solid"
      className="fixed bottom-20 right-4 w-[104px] md:right-6 xl:right-[calc(50vw-600px)]"
      onClick={overlay.open}
    >
      + 글쓰기
    </Button>
  );
}
