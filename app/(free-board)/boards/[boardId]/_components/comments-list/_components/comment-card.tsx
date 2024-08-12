"use client";

import Card from "@/app/(free-board)/_components/card";
import Button from "@/components/button/button";
import { GetArticlesArticleIdCommentsResponse } from "@/lib/apis/type";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import { useCallback, useRef, useState } from "react";

interface CommentCardProps {
  comment: GetArticlesArticleIdCommentsResponse["list"][0];
}
export default function CommentCard({ comment }: CommentCardProps) {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [isOpen, setIsOpen] = useState(comment.content.length > 400);
  const handleDelete = useCallback(() => {
    // TODO delete 요청
    console.log(comment.id);
  }, [comment.id]);
  const handlePatch = useCallback(() => {
    // TODO patch 요청
    console.log(comment.id);
  }, [comment.id]);
  const handleClick = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (contentRef.current) {
      contentRef.current.style.overflow = "visible";
      contentRef.current.style.height = "auto";
    }
  }, []);

  return (
    <Card className="flex flex-col justify-between gap-8 p-4 md:px-6 md:py-5">
      <section className="relative flex justify-between">
        <p className="h-16 overflow-hidden break-all" ref={contentRef}>
          {comment.content}
        </p>
        <Card.KebabButton onDelete={handleDelete} onPatch={handlePatch} />
        {isOpen && (
          <section className="absolute left-0 right-0 top-[70%] h-[70%]">
            <Button
              btnSize="x-small"
              btnStyle="outlined_secondary"
              onClick={handleClick}
              className="mx-auto w-[72px] md:w-[104px]"
            >
              더보기
            </Button>
          </section>
        )}
      </section>
      <section className="flex">
        <section className="flex items-center">
          <Card.Profile name={comment.writer.nickname} className="mr-4" />
          <time className="border-l border-border-primary border-opacity-10 pl-4 text-xs font-medium leading-3 text-text-disabled md:text-sm md:leading-[14px]">
            {convertDiffDateFromNow(new Date(comment.createdAt))}
          </time>
        </section>
      </section>
    </Card>
  );
}
