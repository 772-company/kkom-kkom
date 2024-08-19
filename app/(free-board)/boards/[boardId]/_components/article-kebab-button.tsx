"use client";

import { KebabButton } from "@/app/(free-board)/_components/card";
import HandleArticleModal, {
  ArticleType,
} from "@/app/(free-board)/_components/handle-article-modal";
import ModalDelete from "@/app/(free-board)/_components/modal-delete";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { useCallback } from "react";

import {
  useDeleteArticleMutation,
  usePatchArticleMutation,
} from "../../../_query/mutation";

interface ArticleKebabButtonProps {
  articleId: number;
  image: string;
  content: string;
  title: string;
}

export default function ArticleKebabButton({
  articleId,
  image,
  content,
  title,
}: ArticleKebabButtonProps) {
  const patchArticleMutation = usePatchArticleMutation();
  const handlePatch = useCallback(
    (formData: ArticleType) => {
      patchArticleMutation.mutate({
        articleId,
        image: formData.image,
        title: formData.title,
        content: formData.content,
      });
    },
    [patchArticleMutation, articleId],
  );

  const editOverlay = useCustomOverlay(({ close }) => (
    <HandleArticleModal
      close={close}
      defaultContent={content}
      defaultImage={image}
      defaultTitle={title}
      onSubmit={handlePatch}
    />
  ));

  const deleteArticleMutation = useDeleteArticleMutation();
  const handleDelete = useCallback(
    (id: string) => {
      deleteArticleMutation.mutate(Number(id));
    },
    [deleteArticleMutation],
  );
  const deleteOverlay = useCustomOverlay(({ close }) => (
    <ModalDelete
      close={close}
      onDelete={() => handleDelete(String(articleId))}
    />
  ));

  return (
    <KebabButton onDelete={deleteOverlay.open} onPatch={editOverlay.open} />
  );
}
