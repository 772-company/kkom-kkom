"use client";

import { useArticleQuery } from "@/app/(free-board)/_query/query";
import Image from "next/image";
import { Fragment } from "react";

export default function ArticleContent({ articleId }: { articleId: number }) {
  const { data: article } = useArticleQuery(articleId);
  const { content, image } = article;
  if (!article) return null;
  return (
    <>
      <section>
        {content.split("\n").map((line) => (
          <Fragment key={line}>
            {line}
            <br />
          </Fragment>
        ))}
      </section>
      <section className="mb-20 mt-6">
        <Image
          priority
          src={image}
          alt="thumbnail"
          sizes="(max-width: 744px) 80vw, 33vw"
          className="h-auto w-[80vw] md:w-[33vw]"
          width={744}
          height={744}
        />
      </section>
    </>
  );
}
