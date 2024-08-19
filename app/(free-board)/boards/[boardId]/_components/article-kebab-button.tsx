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
  boardId: string;
  image: string;
  content: string;
  title: string;
}

export default function ArticleKebabButton({
  boardId,
  image,
  content,
  title,
}: ArticleKebabButtonProps) {
  const patchArticleMutation = usePatchArticleMutation();
  const handlePatch = useCallback(
    (formData: ArticleType) => {
      patchArticleMutation.mutate({
        articleId: Number(boardId),
        image: formData.image,
        title: formData.title,
        content: formData.content,
      });
    },
    [patchArticleMutation, boardId],
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
    <ModalDelete close={close} onDelete={() => handleDelete(boardId)} />
  ));

  return (
    <KebabButton onDelete={deleteOverlay.open} onPatch={editOverlay.open} />
  );
}
