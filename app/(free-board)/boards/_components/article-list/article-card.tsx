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
      className="group/card flex p-4 py-6 duration-300 hover:bg-background-tertiary md:px-8"
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
            className="duration-150"
          />
        </Link>
      )}
      <div className="ml-4 flex flex-1 flex-col justify-between text-sm font-medium text-text-secondary md:text-[18px]">
        <section className="flex items-center justify-between">
          <Link
            href={`/boards/${article.id}`}
            className="inline hover:underline"
          >
            {article.title}
          </Link>
        </section>
        <section className="flex items-center justify-between">
          <div className="flex items-center">
            <Card.Profile name={article.writer.nickname} className="mr-4" />
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
  );
}
