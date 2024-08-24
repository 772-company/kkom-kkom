"use client";

import Card from "@/app/(free-board)/_components/card";
import ModalCancel from "@/app/(free-board)/_components/modal-cancel";
import { useDeleteCommentsMutation } from "@/app/(free-board)/_query/mutation";
import useArticlesCommentsQuery, {
  useUserQuery,
} from "@/app/(free-board)/_query/query";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { GetArticlesArticleIdCommentsResponse } from "@/lib/apis/type";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CommentEditCard from "./comment-edit-card";

interface CommentCardProps {
  comment: GetArticlesArticleIdCommentsResponse["list"][0];
  articleId: number;
}
export default function CommentCard({ comment, articleId }: CommentCardProps) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [isEdit, setIsEdit] = useState(false);

  const timeDiff = useMemo(
    () => convertDiffDateFromNow(new Date(comment.updatedAt)),
    [comment.updatedAt],
  );

  const { mutate: deleteMutation, isPending: isDeletePending } =
    useDeleteCommentsMutation();
  const { isFetching } = useArticlesCommentsQuery(articleId);
  const {
    data: { id },
  } = useUserQuery();

  const deleteCommentOverlay = useCustomOverlay(({ close }) => (
    <ModalCancel
      close={close}
      onCancel={() => {
        if (isDeletePending || isFetching) {
          /* eslint-disable no-alert */
          alert("삭제 중입니다. 잠시만 기다려주세요.");
        } else {
          deleteMutation({ commentId: comment.id, articleId });
        }
      }}
      title="댓글을 삭제하시겠습니까?"
      description="삭제된 댓글은 복구할 수 없습니다."
    />
  ));

  const handleDelete = deleteCommentOverlay.open;
  const handlePatch = useCallback(() => {
    setIsEdit(true);
  }, [setIsEdit]);
  const handleRead = useCallback(() => {
    setIsEdit(false);
  }, [setIsEdit]);
  const handleOpen = useCallback(() => {
    setIsOpen(false);
    if (contentRef.current) {
      contentRef.current.style.overflow = "visible";
      contentRef.current.style.height = "fit-content";
    }
  }, []);
  const handleClose = useCallback(() => {
    setIsOpen(true);
    if (contentRef.current) {
      contentRef.current.style.overflow = "hidden";
      contentRef.current.style.height = "4rem";
    }
  }, []);
  useLayoutEffect(() => {
    if (lineRef?.current && lineRef.current?.scrollHeight > 72) {
      setIsOpen(true);
    }
  }, []);

  return (
    <Card className="flex border border-black border-opacity-10 p-4 dark:border dark:border-white dark:border-opacity-10 md:px-6 md:py-5">
      {!isEdit ? (
        <>
          <section className="relative flex flex-1 flex-col justify-between">
            <section
              className="relative flex h-[72px] justify-between overflow-hidden break-all"
              ref={contentRef}
            >
              <p ref={lineRef}>
                {comment.content.split("\n").map((line) => (
                  <Fragment key={line}>
                    {line}
                    <br />
                  </Fragment>
                ))}
              </p>
            </section>
            {isOpen && (
              <button
                onClick={isOpen ? handleOpen : handleClose}
                type="button"
                className="mr-auto flex text-interaction-inactive hover:underline"
              >
                {isOpen ? "더보기" : "접기"}
              </button>
            )}
            <section className="mt-1 flex">
              <section className="flex items-center">
                <Card.Profile
                  name={comment.writer.nickname}
                  className="mr-4"
                  image={comment.writer.image}
                />
                <time
                  className="border-l border-border-primary border-opacity-10 pl-4 text-xs font-medium leading-3 text-text-disabled md:text-sm md:leading-[14px]"
                  suppressHydrationWarning
                >
                  {timeDiff}{" "}
                  {comment.updatedAt !== comment.createdAt && "(수정됨)"}
                </time>
              </section>
            </section>
          </section>
          {id === comment.writer.id && (
            <Card.KebabButton onDelete={handleDelete} onPatch={handlePatch} />
          )}
        </>
      ) : (
        <CommentEditCard
          comment={comment}
          articleId={articleId}
          onRead={handleRead}
        />
      )}
    </Card>
  );
}
