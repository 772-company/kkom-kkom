"use client";

import { KebabButton } from "@/app/(free-board)/_components/card";

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
  const deleteArticleMutation = useDeleteArticleMutation();
  const patchArticleMutation = usePatchArticleMutation();

  const handleDelete = () => {
    deleteArticleMutation.mutate(Number(boardId));
  };
  const handlePatch = () => {
    patchArticleMutation.mutate({
      articleId: Number(boardId),
      image,
      title,
      content,
    });
  };
  return <KebabButton onDelete={handleDelete} onPatch={handlePatch} />;
}
