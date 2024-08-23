"use client";

import {
  CommentIcon,
  DateDescription,
  KebabButton,
  LikeCountSection,
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
import { useArticleQuery, useUserQuery } from "@/app/(free-board)/_query/query";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { useCallback } from "react";

interface ArticleHeaderProps {
  articleId: number;
}

export default function ArticleHeader({ articleId }: ArticleHeaderProps) {
  const { data: article } = useArticleQuery(articleId);
  const { title, content, image } = article;
  const patchArticleMutation = usePatchArticleMutation();
  const {
    data: { id },
  } = useUserQuery();
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
    (willDeletedId: string) => {
      deleteArticleMutation.mutate(Number(willDeletedId));
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
      <header className="flex justify-between border-b border-black border-opacity-10 pb-4 pt-6 text-lg font-medium dark:border-b dark:border-white dark:border-opacity-10 md:mt-14 md:text-xl">
        <h1>{article.title}</h1>
        {id === article.writer.id && (
          <KebabButton
            onDelete={deleteOverlay.open}
            onPatch={editOverlay.open}
          />
        )}
      </header>
      <div className="mb-6 mt-4 flex items-center justify-between pb-6">
        <section className="flex items-center">
          <Profile name={article.writer.nickname} className="mr-4" />
          <DateDescription
            date={article.updatedAt}
            className="border-l border-border-primary border-opacity-10 pl-4"
          />
        </section>
        <section className="flex items-center gap-4">
          <LikeCountSection isClicked likeCount={article.likeCount} />
          <CommentIcon
            commentCount={article.commentCount}
            size={16}
            className=""
          />
        </section>
      </div>
    </>
  );
}
