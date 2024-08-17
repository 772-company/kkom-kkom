import { Suspense } from "react";

import ArticleHeader from "./_components/article-header";
import ArticlesList from "./_components/article-list/articles-list";
import ArticleOrderbyDropdown from "./_components/article-orderby-dropdown";
import ArticleResetButton from "./_components/article-reset-button";
import ArticleTagList from "./_components/article-tag-list";
import SkeletonArticleList from "./_components/skeleton-components/skeleton-article-list";

export default async function Page({
  searchParams,
}: {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}) {
  return (
    <section className="mt-8">
      <header className="mb-6 flex h-10 items-center justify-between text-base font-medium text-text-primary md:h-11">
        <ArticleHeader searchParams={searchParams} />
        <section className="flex gap-3">
          <ArticleResetButton
            btnSize="large"
            btnStyle="outlined_secondary"
            className="h-10 w-20 text-xs md:h-11 md:w-[110px] md:text-sm"
          />
          <ArticleOrderbyDropdown searchParams={searchParams} />
        </section>
      </header>
      <ArticleTagList searchParams={searchParams} />
      <Suspense fallback={<SkeletonArticleList />}>
        <ArticlesList searchParams={searchParams} />
      </Suspense>
    </section>
  );
}
