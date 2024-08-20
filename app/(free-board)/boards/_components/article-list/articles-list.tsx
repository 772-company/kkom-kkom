import Pagination from "@/app/(free-board)/boards/_components/pagination/pagination";
import { getArticles } from "@/lib/apis/article";

import ArticleCard from "./article-card";
import NoArticle from "./no-article";

interface ArticlesListProps {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}

export default async function ArticlesList({
  searchParams,
}: ArticlesListProps) {
  const { orderBy, page, keyword } = searchParams;

  const { list: articles, totalCount } = await getArticles({
    orderBy,
    page,
    keyword,
  });

  return (
    <>
      <section className="mt-6 flex flex-col gap-6 md:mt-8 xl:grid xl:grid-cols-2 xl:grid-rows-5">
        {articles && articles.length > 0 ? (
          articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))
        ) : (
          <NoArticle searchParams={searchParams} />
        )}
      </section>
      <Pagination
        className="mt-6"
        total={totalCount}
        searchParams={searchParams}
      />
    </>
  );
}
