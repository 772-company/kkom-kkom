"use client";

import useArticlesCommentsQuery from "@/app/(free-board)/_query/query";
import IntersectionArea from "@/components/intersection-area/intersection-area";
import Image from "next/image";

import CommentCard from "./comment-card";

interface CommentListProps {
  articleId: number;
}

export default function CommentsList({ articleId }: CommentListProps) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useArticlesCommentsQuery(articleId);

  return (
    <>
      <h2 className="mb-4 block pt-8 text-base font-medium text-text-primary md:mb-6 md:pt-10 md:text-xl">
        댓글 목록
      </h2>
      {status === "pending" ? (
        <section className="mt-14 flex justify-center">
          <Image
            src="/icons/tube-spinner.svg"
            alt="로딩 중"
            width={56}
            height={56}
            className="md:h-auto md:w-auto"
          />
        </section>
      ) : status === "error" ? (
        <p>에러 발생</p>
      ) : (
        <>
          <section className="flex flex-col gap-4">
            {data.pages ? (
              data.pages.map((commentPage) =>
                commentPage.list.map((comment) => (
                  <CommentCard
                    key={comment.id}
                    comment={comment}
                    articleId={articleId}
                  />
                )),
              )
            ) : (
              <section className="flex h-[500px] w-full items-center justify-center text-sm font-medium text-text-default md:text-base">
                아직 작성된 댓글이 없습니다.
              </section>
            )}
          </section>
          {hasNextPage && !isFetching && (
            <IntersectionArea func={fetchNextPage} />
          )}
          {isFetching ? (
            <section className="mt-14 flex justify-center">
              <Image
                src="/icons/tube-spinner.svg"
                alt="로딩 중"
                width={56}
                height={56}
                className="md:h-auto md:w-auto"
              />
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
