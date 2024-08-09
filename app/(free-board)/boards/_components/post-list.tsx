"use client";

import Image from "next/image";
import Link from "next/link";

import Card from "../../_components/card";
import { articles } from "../mock";

export default function PostList() {
  // TODO fetch 요청
  const data = articles;
  const handleDelete = (id: number) => {
    // TODO delete 요청
    console.log(id);
  };
  const handlePatch = (id: number) => {
    // TODO patch 요청
    console.log(id);
  };
  return (
    <section className="mt-6 flex flex-col gap-6 md:mt-8">
      {data.list.map((article) => (
        <Card key={article.id} className="group/card flex p-4 py-6 md:px-8">
          <figure className="relative h-24 w-24 md:h-32 md:w-32">
            <Image
              fill
              src={article.image}
              alt="thumbnail"
              sizes="(min-width: 744px) 128px, 96px"
              className="duration-150 group-hover/card:scale-110"
            />
          </figure>
          <div className="ml-4 flex flex-1 flex-col justify-between text-sm font-medium text-text-secondary md:text-[18px]">
            <section className="flex items-center justify-between">
              <Link
                href={`/board/${article.id}`}
                className="inline group-hover/card:underline"
              >
                {article.title}
              </Link>
              <Card.KebabButton
                onDelete={() => handleDelete(article.id)}
                onPatch={() => handlePatch(article.id)}
              />
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
      ))}
    </section>
  );
}
