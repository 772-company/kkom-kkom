"use client";

import useArticlesCommentsQuery, {
  useArticleQuery,
} from "@/app/(free-board)/_query/query";
import LinkButton from "@/components/button/link-button";
import IntersectionArea from "@/components/intersection-area/intersection-area";
import TubeSpinner from "@/public/icons/tube-spinner.svg";

import CommentCard from "./comment-card";

interface CommentListProps {
  articleId: number;
}

export default function CommentsList({ articleId }: CommentListProps) {
  const {
    data: commentsData,
    fetchNextPage,
    hasNextPage,
    isFetching,
  } = useArticlesCommentsQuery(articleId);
  const { data: article } = useArticleQuery(articleId);

  return (
    <>
      <h2 className="mb-4 block pt-8 text-base font-medium text-text-primary md:mb-6 md:pt-10 md:text-xl">
        댓글 목록 {article.commentCount ? `(${article.commentCount})` : ""}
      </h2>
      <section className="flex flex-col gap-4">
        {commentsData.pages[0].list.length > 0 ? (
          commentsData.pages.map((commentPage) =>
            commentPage.list.map((comment) => (
              <CommentCard
                key={comment.id}
                comment={comment}
                articleId={articleId}
              />
            )),
          )
        ) : (
          <p className="flex h-[300px] w-full items-center justify-center text-sm font-medium text-text-default md:h-[500px] md:text-base">
            아직 작성된 댓글이 없습니다.
          </p>
        )}
      </section>
      {hasNextPage && !isFetching && <IntersectionArea func={fetchNextPage} />}
      {isFetching ? (
        <section className="flex justify-center">
          <TubeSpinner width={56} height={56} />
        </section>
      ) : null}
      <section className="mt-8 flex w-full justify-center">
        <LinkButton
          href="/boards"
          btnSize="large"
          btnStyle="outlined"
          className="w-[184px]"
        >
          목록
        </LinkButton>
      </section>
    </>
  );
}
