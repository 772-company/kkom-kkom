import { myFetch } from "@/lib/apis/myFetch";
import { GetArticlesArticleIdResponse } from "@/lib/apis/type";
import type { Metadata } from "next";
import Image from "next/image";

import { DateDescription, Profile } from "../../_components/card";
import { article } from "../mock";
import CommentsList from "./_components/comments-list";
import LikeSection from "./_components/like-section";
import PostComment from "./_components/post-comment";
import PostKebabButton from "./_components/post-kebab-button";

type Props = {
  params: { boardId: string };
};

export async function generateMetadata({
  params: { boardId },
}: Props): Promise<Metadata> {
  try {
    const product = await myFetch<GetArticlesArticleIdResponse>(
      `${process.env.NEXT_PUBLIC_KKOM_KKOM_URL}/articles/${boardId}`,
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

export default function Page({ params: { boardId } }: Props) {
  return (
    <>
      <header className="flex justify-between border-b border-border-primary border-opacity-10 pb-4 pt-6 text-lg font-medium md:mt-14 md:text-xl">
        <h1>{article.title}</h1>
        <PostKebabButton boardId={boardId} />
      </header>
      <section className="mb-6 mt-4 flex items-center pb-6">
        <Profile name={article.writer.nickname} className="mr-4" />
        <DateDescription
          date={article.createdAt}
          className="border-l border-border-primary border-opacity-10 pl-4"
        />
      </section>
      <section>{article.content}</section>
      <section className="relative mx-auto mb-20 mt-6 aspect-square w-[50%]">
        <Image
          src={"/icons/alert.svg"}
          alt="thumbnail"
          layout="fill"
          sizes="50%"
        />
      </section>
      <LikeSection
        boardId={boardId}
        isClicked={article.isLiked}
        likeCount={article.likeCount}
      />
      <PostComment boardId={boardId} />
      <CommentsList boardId={boardId} />
    </>
  );
}
