"use client";

import Modal from "@/components/modal/modal";
import Pagination from "@/components/pagination/pagination";
import SkeletonPagination from "@/components/pagination/skeleton/skeleton-pagination";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import { getArticles } from "@/lib/apis/article";
import { useSortStore } from "@/providers/sort-store-provider";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect } from "react";

// import ArticleModal from "../../_components/article-modal";
import EditArticleModal from "../../_components/article-modal/edit-article-modal";
import Card from "../../_components/card";
// import {
//   useDeleteArticleMutation,
//   usePatchArticleMutation,
// } from "../../_query/query";
import Loading from "../../loading";

export default function PostList() {
  const orderBy = useSortStore((state) => state.orderBy);
  const page = useSortStore((state) => state.page);
  const keyword = useSortStore((state) => state.keyword);

  const queryClient = useQueryClient();
  const { data, isPending } = useQuery({
    queryKey: ["articles", { page, orderBy, keyword }],
    queryFn: () => getArticles({ page, orderBy, keyword }),
  });
  // const deleteArticlesMutation = useDeleteArticleMutation();
  // const patchArticlesMutation = usePatchArticleMutation();

  // const handleDelete = useCallback(
  //   (id: number) => {
  //     deleteArticlesMutation.mutate(id);
  //   },
  //   [deleteArticlesMutation],
  // );

  // const editOverlay = (
  //   articleId: number,
  //   image: string,
  //   title: string,
  //   content: string,
  // ) =>
  //   useCustomOverlay(({ close }) => (
  //     <Modal close={close} closeOnFocusOut={false}>
  //       <Modal.HeaderWithClose className="fixed right-7 top-7" />
  //       <EditArticleModal
  //         close={close}
  //         articleId={articleId}
  //         content={content}
  //         image={image}
  //         title={title}
  //       />
  //     </Modal>
  //   ));

  const articles = data?.list;

  useEffect(() => {
    if (!data || data.totalCount === 0 || isPending) {
      return;
    }
    const maximumPage =
      data.totalCount % 10 === 0
        ? data.totalCount / 10
        : Math.floor(data.totalCount / 10) + 1;
    if (maximumPage - 1 > page) {
      queryClient.prefetchQuery({
        queryKey: ["articles", { page: page + 2, keyword, orderBy }],
        queryFn: () => getArticles({ page: page + 2, keyword, orderBy }),
      });
    }
    if (maximumPage > page) {
      queryClient.prefetchQuery({
        queryKey: ["articles", { page: page + 1, keyword, orderBy }],
        queryFn: () => getArticles({ page: page + 1, keyword, orderBy }),
      });
    }
    if (page > 1) {
      queryClient.prefetchQuery({
        queryKey: ["articles", { page: page - 1, keyword, orderBy }],
        queryFn: () => getArticles({ page: page - 1, keyword, orderBy }),
      });
    }
    if (page > 2) {
      queryClient.prefetchQuery({
        queryKey: ["articles", { page: page - 2, keyword, orderBy }],
        queryFn: () => getArticles({ page: page - 2, keyword, orderBy }),
      });
    }
  }, [data, isPending, page, queryClient, keyword, orderBy]);

  return (
    <section className="mt-6 flex flex-col gap-6 md:mt-8">
      {isPending && <Loading />}
      {articles && articles.length > 0
        ? articles.map((article) => (
            <Card
              key={article.id}
              className="group/card flex p-4 py-6 duration-300 hover:scale-[1.02] md:px-8"
            >
              {article.image && (
                <Link
                  href={`/boards/${article.id}`}
                  className="relative h-24 w-24 md:h-32 md:w-32"
                >
                  <Image
                    fill
                    src={article.image}
                    alt="thumbnail"
                    sizes="(min-width: 744px) 128px, 96px"
                    className="duration-150"
                  />
                </Link>
              )}
              <div className="ml-4 flex flex-1 flex-col justify-between text-sm font-medium text-text-secondary md:text-[18px]">
                <section className="flex items-center justify-between">
                  <Link
                    href={`/boards/${article.id}`}
                    className="inline hover:underline group-hover/card:text-[#41ff30]"
                  >
                    {article.title}
                  </Link>
                  {/* <Card.KebabButton
                    onDelete={() => handleDelete(article.id)}
                    onPatch={
                      editOverlay(
                        article.id,
                        article.image,
                        article.title,
                        article.content,
                      ).open
                    }
                  /> */}
                </section>
                <section className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Card.Profile
                      name={article.writer.nickname}
                      className="mr-4"
                    />
                    <Card.DateDescription
                      date={article.createdAt}
                      className="border-l border-l-background-tertiary pl-4"
                    />
                  </div>
                  <Card.LikeDescription
                    likeCount={article.likeCount}
                    isClicked={true}
                  />
                </section>
              </div>
            </Card>
          ))
        : !isPending && (
            <div className="font-base flex w-full items-center justify-center pb-[200px] pt-[200px] text-lg text-text-primary">
              {keyword ? (
                <span>
                  <span className="font-bold text-[#41ff30]">{`${keyword} `}</span>
                  에 해당하는 게시물이 없습니다.
                </span>
              ) : (
                "게시물이 아직 없어요"
              )}
            </div>
          )}
      {data ? (
        <Pagination total={data?.totalCount} disabled={isPending} />
      ) : (
        <SkeletonPagination />
      )}
    </section>
  );
}
