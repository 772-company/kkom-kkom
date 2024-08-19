import Medal from "@/public/icons/medal.svg";
import { Suspense } from "react";

import AddArticle from "./_components/add-article";
import ArticleRankingChart from "./boards/_components/article-ranking-chart";
import ArticleSearchBar from "./boards/_components/article-search-bar";
import SkeletonRankingChart from "./boards/_components/skeleton-components/skeleton-ranking-chart";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative mx-4 pb-14 md:mx-6 xl:mx-auto xl:max-w-[1200px]">
        <header className="mt-8">
          <h1 className="mb-6 text-lg font-bold text-text-primary selection:bg-inherit">
            자유게시판
          </h1>
          <ArticleSearchBar />
        </header>
        <section className="mt-6 md:mt-8">
          <section className="border-b border-text-primary border-opacity-10">
            <header className="mb-1 flex items-center gap-1 text-base font-medium text-text-primary">
              <Medal width={16} height={16} />
              <h2 className="selection:bg-inherit">베스트 랭킹</h2>
            </header>
            <Suspense fallback={<SkeletonRankingChart />}>
              <ArticleRankingChart />
            </Suspense>
          </section>
          {children}
        </section>
        <AddArticle />
      </div>
    </>
  );
}
