import { getArticlesArticleId } from "@/lib/apis/article";
import { getArticlesArticleIdComments } from "@/lib/apis/article-comment";
import { instance } from "@/lib/apis/myFetch/instance";
import { GetArticlesArticleIdResponse } from "@/lib/apis/type";
import { getUser } from "@/lib/apis/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";
import Image from "next/image";

import { DateDescription, Profile } from "../../_components/card";
import ArticleKebabButton from "./_components/article-kebab-button";
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
  const queryClient = new QueryClient();

  const [article] = await Promise.all([
    getArticlesArticleId({ articleId }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["comments", { articleId }],
      queryFn: ({ pageParam }) =>
        getArticlesArticleIdComments({ cursor: pageParam, articleId }),
      initialPageParam: 0,
    }),
    queryClient.prefetchQuery({
      queryKey: ["getUser"],
      queryFn: getUser,
    }),
  ]);

  await queryClient.prefetchQuery({
    queryKey: ["article", { articleId }],
    queryFn: () => article,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <header className="flex justify-between border-b border-border-primary border-opacity-10 pb-4 pt-6 text-lg font-medium md:mt-14 md:text-xl">
        <h1>{article.title}</h1>
        <ArticleKebabButton
          articleId={articleId}
          image={article.image}
          content={article.content}
          title={article.title}
        />
      </header>
      <section className="mb-6 mt-4 flex items-center pb-6">
        <Profile name={article.writer.nickname} className="mr-4" />
        <DateDescription
          date={article.updatedAt}
          className="border-l border-border-primary border-opacity-10 pl-4"
        />
      </section>
      <section>{article.content}</section>
      <section className="mb-20 mt-6">
        <Image
          priority
          src={article.image}
          alt="thumbnail"
          sizes="(max-width: 744px) 80vw, 33vw"
          className="h-auto w-[80vw] md:w-[33vw]"
          width={744}
          height={744}
        />
      </section>
      <section className="flex justify-center">
        <LikeSection articleId={articleId} />
      </section>
      <CommentForm articleId={articleId} />
      <CommentsList articleId={articleId} />
    </HydrationBoundary>
  );
}
