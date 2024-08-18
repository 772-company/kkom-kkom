"use client";

import Button from "@/components/button/button";
import Modal from "@/components/modal/modal";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { SubmitHandler } from "react-hook-form";

import { useUploadArticleMutation } from "../_query/mutation";
import ArticleModal, { SubmitFormType } from "./handle-article-modal";

export default function UploadArticleButton() {
  const uploadPostMutation = useUploadArticleMutation();
  const handlePost: SubmitHandler<SubmitFormType> = (formData) => {
    uploadPostMutation.mutate({
      content: formData.content,
      image: formData.image,
      title: formData.title,
    });
  };
  const overlay = useCustomOverlay(({ close }) => {
    return (
      <Modal close={close} closeOnFocusOut={false}>
        <Modal.HeaderWithClose className="fixed right-7 top-7" />
        <ArticleModal
          close={close}
          defaultContent={null}
          defaultImage={null}
          defaultTitle={null}
          onSubmit={handlePost}
        />
      </Modal>
    );
  });

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
