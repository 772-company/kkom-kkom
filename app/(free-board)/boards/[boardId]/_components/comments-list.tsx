"use client";

import useArticlesCommentsQuery from "@/app/(free-board)/_query/query";
import IntersectionArea from "@/components/intersection-area/intersection-area";
import TubeSpinner from "@/public/icons/tube-spinner.svg";

import CommentCard from "./comment-card";

export default function CommentsList({ boardId }: { boardId: string }) {
  const { data, fetchNextPage, hasNextPage, isFetching, status } =
    useArticlesCommentsQuery(Number(boardId));
  return (
    <>
      <h2 className="mb-4 block pt-8 text-base font-medium text-text-primary md:mb-6 md:pt-10 md:text-xl">
        댓글 목록
      </h2>
      {status === "pending" ? (
        <section className="mt-14 flex justify-center">
          <TubeSpinner className="h-14 w-14 md:h-auto md:w-auto" />
        </section>
      ) : status === "error" ? (
        <p>에러 발생</p>
      ) : (
        <>
          <section className="flex flex-col gap-4">
            {data.pages ? (
              data.pages.map((commentPage) =>
                commentPage.list.map((comment) => (
                  <CommentCard key={comment.id} comment={comment} />
                )),
              )
            ) : (
              <section className="flex h-[500px] w-full items-center justify-center text-sm font-medium text-text-default md:text-base">
                아직 작성된 댓글이 없습니다.
              </section>
            )}
          </section>
          {hasNextPage && <IntersectionArea func={fetchNextPage} />}
          {isFetching ? (
            <section className="mt-14 flex justify-center">
              <TubeSpinner className="h-14 w-14 md:h-auto md:w-auto" />
            </section>
          ) : null}
        </>
      )}
    </>
  );
}
