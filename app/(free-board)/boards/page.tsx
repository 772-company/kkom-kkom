import { Suspense } from "react";

import ArticlesList from "./_components/article-list/articles-list";
import ArticleOrderbyDropdown from "./_components/article-orderby-dropdown";
import ArticleResetButton from "./_components/article-reset-button";
import ArticleTagList from "./_components/article-tag-list";
import SkeletonCardList from "./_components/skeleton-components/skeleton-card-list";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}) {
  const { orderBy, page, keyword } = searchParams;
  return (
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
            className="h-10 w-20 text-xs md:h-11 md:w-[110px] md:text-sm"
          />
          <ArticleOrderbyDropdown searchParams={searchParams} />
        </section>
      </header>
      <ArticleTagList keyword={keyword || ""} />
      <Suspense fallback={<SkeletonCardList />}>
        <ArticlesList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
