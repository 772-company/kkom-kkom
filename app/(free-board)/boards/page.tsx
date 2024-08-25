import getQueryClient from "@/app/get-query-client";
import { getArticles } from "@/lib/apis/article";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

import ArticlesList from "./_components/article-list/articles-list";
import ArticleOrderbyDropdown from "./_components/article-orderby-dropdown";
import ArticleResetButton from "./_components/article-reset-button";
import ArticleTagList from "./_components/article-tag-list";
import SkeletonCardList from "./_components/skeleton-components/skeleton-card-list";

export default function Page({
  searchParams,
}: {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}) {
  const page = searchParams.page || "1";
  const orderBy = searchParams.orderBy || "recent";
  const keyword = searchParams.keyword || "";
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["articles", { page, orderBy, keyword }],
    queryFn: () => getArticles({ page, orderBy, keyword }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mt-4 pb-12">
        <header className="mb-6 flex h-10 items-center justify-between text-base font-medium text-text-primary md:h-11">
          <h2 className="flex-1 selection:bg-inherit">
            {!keyword || keyword.length === 0 ? (
              "게시글 목록"
            ) : (
              <span>
                <span className="font-black text-brand-primary">{keyword}</span>{" "}
                에 대한 검색 결과입니다.
              </span>
            )}
          </h2>
          <section className="flex gap-3">
            <ArticleResetButton
              btnSize="large"
              btnStyle="outlined_secondary"
              className="h-10 w-20 border border-black border-opacity-10 text-xs dark:border dark:border-border-primary dark:border-opacity-10 md:h-11 md:w-[110px] md:text-sm"
            />
            <ArticleOrderbyDropdown searchParams={searchParams} />
          </section>
        </header>
        <ArticleTagList keyword={keyword} />
        <Suspense
          key={JSON.stringify(searchParams)}
          fallback={<SkeletonCardList />}
        >
          <ArticlesList searchParams={searchParams} />
        </Suspense>
      </section>
    </HydrationBoundary>
  );
}
