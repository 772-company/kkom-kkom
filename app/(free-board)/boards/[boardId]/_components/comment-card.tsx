"use client";

import Card from "@/app/(free-board)/_components/card";
import ModalCancel from "@/app/(free-board)/_components/modal-cancel";
import { useDeleteCommentsMutation } from "@/app/(free-board)/_query/mutation";
import useArticlesCommentsQuery from "@/app/(free-board)/_query/query";
import Button from "@/components/button/button";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { GetArticlesArticleIdCommentsResponse } from "@/lib/apis/type";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import {
  Fragment,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
} from "react";

interface CommentCardProps {
  comment: GetArticlesArticleIdCommentsResponse["list"][0];
  articleId: number;
}
export default function CommentCard({ comment, articleId }: CommentCardProps) {
  const lineRef = useRef<HTMLParagraphElement>(null);
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isOpen, setIsOpen] = useState<boolean | null>(null);

  const { mutate: deleteMutation, isPending } = useDeleteCommentsMutation();
  const { isFetching } = useArticlesCommentsQuery(articleId);

  const deleteCommentOverlay = useCustomOverlay(({ close }) => (
    <ModalCancel
      close={close}
      onCancel={() => {
        if (isPending || isFetching) {
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
    // TODO patch 요청
    console.log(comment.id);
  }, [comment.id]);
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
    <Card className="flex p-4 md:px-6 md:py-5">
      <section className="relative flex flex-1 flex-col justify-between gap-8">
        <section
          className="relative flex h-16 justify-between overflow-hidden break-all"
          ref={contentRef}
        >
          <p ref={lineRef}>
            {comment.content.split("\n").map((line, idx) => (
              <Fragment key={idx}>
                {line}
                <br />
              </Fragment>
            ))}
          </p>
        </section>
        {isOpen === null ? null : isOpen ? (
          <section className="absolute left-0 right-0 top-[70%] h-[70%]">
            <Button
              btnSize="x-small"
              btnStyle="outlined_secondary"
              onClick={handleOpen}
              type="button"
              className="mx-auto w-[72px] md:w-[104px]"
            >
              더보기
            </Button>
          </section>
        ) : (
          <section className="absolute left-0 right-0 top-[70%] h-[70%]">
            <Button
              btnSize="x-small"
              btnStyle="outlined_secondary"
              onClick={handleClose}
              type="button"
              className="mx-auto w-[72px] md:w-[104px]"
            >
              접기
            </Button>
          </section>
        )}
        <section className="flex">
          <section className="flex items-center">
            <Card.Profile name={comment.writer.nickname} className="mr-4" />
            <time className="border-l border-border-primary border-opacity-10 pl-4 text-xs font-medium leading-3 text-text-disabled md:text-sm md:leading-[14px]">
              {convertDiffDateFromNow(new Date(comment.createdAt))}
            </time>
          </section>
        </section>
      </section>
      <Card.KebabButton
        className=""
        onDelete={handleDelete}
        onPatch={handlePatch}
      />
    </Card>
  );
}
