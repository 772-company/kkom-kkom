import Pagination from "@/app/(free-board)/boards/_components/pagination/pagination";
import SkeletonPagination from "@/app/(free-board)/boards/_components/skeleton-components/skeleton-article-pagination";
import Modal from "@/components/modal/modal";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getArticles } from "@/lib/apis/article";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { Suspense, useCallback, useEffect } from "react";

// import ArticleModal from "../../_components/article-modal";
import EditArticleModal from "../../../_components/article-modal/edit-article-modal";
import Card from "../../../_components/card";
import ArticleCard from "./article-card";
// import {
//   useDeleteArticleMutation,
//   usePatchArticleMutation,
// } from "../../_query/query";
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
  const orderBy = searchParams.orderBy || "recent";
  const page = searchParams.page || "1";
  const keyword = searchParams.keyword || "";

  const { list: articles, totalCount } = await getArticles({
    orderBy,
    page,
    keyword,
  });

  return (
    <section className="mt-6 flex flex-col gap-6 md:mt-8">
      {articles && articles.length > 0 ? (
        articles.map((article) => (
          <ArticleCard key={article.id} article={article} />
        ))
      ) : (
        <NoArticle searchParams={searchParams} />
      )}
      <Pagination total={totalCount} searchParams={searchParams} />
    </section>
  );
}
