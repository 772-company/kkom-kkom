"use client";

import { getArticlesArticleId } from "@/lib/apis/article";
import { getArticlesArticleIdComments } from "@/lib/apis/article-comment";
import { getUser } from "@/lib/apis/user";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";

export default function useArticlesCommentsQuery(articleId: number) {
  return useInfiniteQuery({
    queryKey: ["comments", { articleId }],
    queryFn: ({ pageParam }) =>
      getArticlesArticleIdComments({ cursor: pageParam, articleId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}

export function useUserQuery() {
  return useQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });
}

export function useArticleQuery(articleId: number) {
  return useQuery({
    queryKey: ["article", { articleId }],
    queryFn: () => getArticlesArticleId({ articleId }),
  });
}
