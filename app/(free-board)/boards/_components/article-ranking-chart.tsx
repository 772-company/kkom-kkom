"use client";

import Fire from "@/public/icons/fire.svg";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import shortenString from "@/utils/shorten-string";
import Link from "next/link";

import { useArticlesQuery } from "../../_query/query";

export default function ArticleRankingChart() {
  const { data: article } = useArticlesQuery({
    orderBy: "like",
    page: "1",
    keyword: "",
  });

  return (
    <ol className="mb-8 grid grid-flow-col grid-cols-1 grid-rows-10 gap-1.5 gap-x-10 rounded-xl border border-black border-opacity-10 bg-background-secondary p-5 text-text-primary dark:border dark:border-white dark:border-opacity-10 md:grid-cols-2 md:grid-rows-5">
      {article.list.map((article, i) => (
        <li
          key={i}
          className={`flex items-center justify-between gap-1 ${i <= 2 ? "font-extrabold" : "font-base"}`}
        >
          <span className="flex gap-1">
            <span className="hover:no-underline">{`${i + 1}. `}</span>
            <Link
              href={`/boards/${article.id}`}
              className="flex gap-1 truncate hover:underline"
            >
              {`${shortenString(article.title, 16)}`}
              {i <= 2 && <Fire className="h-4 w-4" />}
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
