"use client";

import Fire from "@/public/icons/fire.svg";
import Medal from "@/public/icons/medal.svg";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import Link from "next/link";

import { articles } from "../mock";

export default function RankingChart() {
  // 10개만 가져왔음
  const article = articles.list;
  return (
    <>
      <header className="mb-3 flex items-center gap-1 text-base font-medium text-text-primary">
        <Medal className="h-4 w-4" />
        <h2 className="selection:bg-inherit">베스트 랭킹</h2>
      </header>
      <ol className="mb-8 grid grid-flow-col grid-cols-1 grid-rows-10 gap-1.5 gap-x-10 rounded-xl border-background-tertiary bg-background-secondary p-5 text-text-primary md:mb-10 md:grid-cols-2 md:grid-rows-5">
        {article.map((article, i) => (
          <li
            key={i}
            className={`flex items-center justify-between gap-1 ${i <= 2 && "font-bold text-[#fe6c08]"}`}
          >
            <Link
              href={`/board/${article.id}`}
              className="flex gap-1 hover:underline"
            >
              {`${i + 1}. ${article.title}`}
              {i <= 2 && <Fire className="h-4 w-4" />}
            </Link>
            <span className="text-sm font-normal text-text-disabled">
              {convertDiffDateFromNow(new Date(article.createdAt))}
            </span>
          </li>
        ))}
      </ol>
    </>
  );
}
