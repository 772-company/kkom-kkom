"use client";

import {
  DateDescription,
  KebabButton,
  Profile,
} from "@/app/(free-board)/_components/card";
import HandleArticleModal, {
  ArticleType,
} from "@/app/(free-board)/_components/handle-article-modal";
import ModalDelete from "@/app/(free-board)/_components/modal-delete";
import {
  useDeleteArticleMutation,
  usePatchArticleMutation,
} from "@/app/(free-board)/_query/mutation";
import { useArticleQuery } from "@/app/(free-board)/_query/query";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { useCallback } from "react";

interface ArticleHeaderProps {
  articleId: number;
}

export default function ArticleHeader({ articleId }: ArticleHeaderProps) {
  const { data: article } = useArticleQuery(articleId);
  const patchArticleMutation = usePatchArticleMutation();
  const { title, content, image } = article;
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
    <>
      <header className="flex justify-between border-b border-border-primary border-opacity-10 pb-4 pt-6 text-lg font-medium md:mt-14 md:text-xl">
        <h1>{article.title}</h1>
        <KebabButton onDelete={deleteOverlay.open} onPatch={editOverlay.open} />
      </header>
      <section className="mb-6 mt-4 flex items-center pb-6">
        <Profile name={article.writer.nickname} className="mr-4" />
        <DateDescription
          date={article.updatedAt}
          className="border-l border-border-primary border-opacity-10 pl-4"
        />
      </section>
    </>
  );
}
