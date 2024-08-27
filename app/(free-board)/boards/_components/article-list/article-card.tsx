"use client";

import { GetArticlesResponse } from "@/lib/apis/type";
import Image from "next/image";
import Link from "next/link";

import Card from "../../../_components/card";

interface ArticleCardProps {
  article: GetArticlesResponse["list"][0];
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <Card
      key={article.id}
      className="group/card flex flex-1 border border-black border-opacity-10 p-4 py-6 duration-300 hover:bg-background-tertiary dark:border dark:border-white dark:border-opacity-10 md:px-8"
    >
      {article.image && (
        <Link
          href={`/boards/${article.id}`}
          className="relative h-24 w-24 md:h-32 md:w-32"
        >
          <Image
            fill
            src={article.image}
            priority
            alt="thumbnail"
            sizes="(min-width: 744px) 128px, 96px"
            className="rounded-md duration-150"
          />
        </Link>
      )}
      <div className="ml-4 flex flex-1 flex-col justify-between text-sm font-medium text-text-secondary md:text-[18px]">
        <section className="flex items-center justify-between">
          <Link
            href={`/boards/${article.id}`}
            className="line-clamp-2 hover:underline"
          >
            {article.title}
          </Link>
        </section>
        <section className="flex items-center justify-between">
          <div className="flex flex-col gap-1 md:flex-row md:items-center md:gap-0">
            <Card.Profile name={article.writer.nickname} className="mr-4" />
            <Card.DateDescription
              date={article.updatedAt}
              className="border-l border-l-background-tertiary md:pl-4"
            />
          </div>
          <div className="flex items-center gap-2">
            <Card.CommentIcon commentCount={article.commentCount} size={16} />
            <Card.LikeDescription likeCount={article.likeCount} isClicked />
          </div>
        </section>
      </div>
    </Card>
  );
}
