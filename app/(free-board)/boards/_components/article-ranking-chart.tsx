"use client";

import { convertDiffDateFromNow } from "@/utils/convert-date";
import shortenString from "@/utils/shorten-string";
import Image from "next/image";
import Link from "next/link";

import { useArticlesQuery } from "../../_query/query";

export default function ArticleRankingChart() {
  const { data: articles } = useArticlesQuery({
    orderBy: "like",
    page: "1",
    keyword: "",
  });
  return (
    <ol className="mb-8 grid grid-flow-col grid-cols-1 grid-rows-10 gap-1.5 gap-x-10 rounded-xl border border-black border-opacity-10 bg-background-secondary p-5 text-text-primary dark:border dark:border-white dark:border-opacity-10 md:grid-cols-2 md:grid-rows-5">
      {articles.list.map((article, i) => (
        <li
          key={article.id}
          className={`flex items-center justify-between gap-1 ${i <= 2 ? "font-extrabold" : "font-base"}`}
        >
          <span className="flex gap-1">
            <span className="hover:no-underline">{`${i + 1}. `}</span>
            <Link
              href={`/boards/${article.id}`}
              className="flex gap-1 hover:underline"
            >
              {`${shortenString(article.title, 16)}`}
              {i <= 2 && (
                <Image
                  src="/icons/fire.svg"
                  alt="Fire"
                  width={16}
                  height={16}
                />
              )}
            </Link>
          </span>
          <div className="flex-shrink-0 text-sm font-normal text-text-disabled">
            {convertDiffDateFromNow(new Date(article.updatedAt))}
          </div>
        </li>
      ))}
    </ol>
  );
}
