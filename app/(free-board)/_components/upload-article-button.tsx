"use client";

import Button from "@/components/button/button";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { SubmitHandler } from "react-hook-form";

import { useUploadArticleMutation } from "../_query/mutation";
import ArticleModal from "./handle-article-modal";
import { ArticleType } from "./handle-article-modal/types";

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
      btnStyle="outlined_secondary"
      className="fixed bottom-20 right-4 w-[104px] border border-black border-opacity-10 dark:border dark:border-white dark:border-opacity-10 md:right-6 xl:right-[calc(50vw-600px)]"
      onClick={overlay.open}
    >
      + 글쓰기
    </Button>
  );
}
