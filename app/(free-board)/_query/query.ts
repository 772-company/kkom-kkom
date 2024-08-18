"use client";

import { getArticlesArticleIdComments } from "@/lib/apis/article-comment";
import { useInfiniteQuery } from "@tanstack/react-query";

export default function useArticlesCommentsQuery(articleId: number) {
  return useInfiniteQuery({
    queryKey: ["comments"],
    queryFn: ({ pageParam }) =>
      getArticlesArticleIdComments({ cursor: pageParam, articleId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
