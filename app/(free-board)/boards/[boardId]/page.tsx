import { getQueryClient } from "@/app/get-query-client";
import { getArticlesArticleId } from "@/lib/apis/article";
import { getArticlesArticleIdComments } from "@/lib/apis/article-comment";
import { instance } from "@/lib/apis/myFetch/instance";
import { GetArticlesArticleIdResponse } from "@/lib/apis/type";
import { getUser } from "@/lib/apis/user";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import type { Metadata } from "next";
import { Suspense } from "react";

import SkeletonArticleContent from "../_components/skeleton-components/skeleton-article-content";
import SkeletonArticleHeader from "../_components/skeleton-components/skeleton-article-header";
import SkeletonArticleLikeSection from "../_components/skeleton-components/skeleton-article-like-section";
import SkeletonCommentForm from "../_components/skeleton-components/skeleton-comment-form";
import SkeletonCommentList from "../_components/skeleton-components/skeleton-comment-list";
import ArticleContent from "./_components/article-content";
import ArticleHeader from "./_components/article-header";
import CommentForm from "./_components/comment-form";
import CommentsList from "./_components/comments-list";
import LikeSection from "./_components/like-section";

type Props = {
  params: { boardId: string };
};

export async function generateMetadata({
  params: { boardId },
}: Props): Promise<Metadata> {
  try {
    const product = await instance<GetArticlesArticleIdResponse>(
      `/articles/${boardId}`,
    );
    return {
      title: `${product.title} | 꼼꼼`,
    };
  } catch (e) {
    if (e instanceof Error) {
      console.error(e.message);
      throw e;
    } else {
      console.error(e);
    }
  }
  return {
    title: "알 수 없는 경로입니다.",
  };
}

export default async function Page({ params: { boardId } }: Props) {
  const articleId = Number(boardId);
  const queryClient = getQueryClient();

  queryClient.prefetchInfiniteQuery({
    queryKey: ["comments", { articleId }],
    queryFn: ({ pageParam }) =>
      getArticlesArticleIdComments({ cursor: pageParam, articleId }),
    initialPageParam: 0,
  });

  queryClient.prefetchQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  queryClient.prefetchQuery({
    queryKey: ["article", { articleId }],
    queryFn: () => getArticlesArticleId({ articleId }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<SkeletonArticleHeader />}>
        <ArticleHeader articleId={articleId} />
      </Suspense>
      <Suspense fallback={<SkeletonArticleContent />}>
        <ArticleContent articleId={articleId} />
      </Suspense>
      <Suspense fallback={<SkeletonArticleLikeSection />}>
        <LikeSection articleId={articleId} />
      </Suspense>
      <Suspense fallback={<SkeletonCommentForm />}>
        <CommentForm articleId={articleId} />
      </Suspense>
      <Suspense fallback={<SkeletonCommentList />}>
        <CommentsList articleId={articleId} />
      </Suspense>
    </HydrationBoundary>
  );
}
