import { getArticles } from "@/lib/apis/article";
import Fire from "@/public/icons/fire.svg";
import Medal from "@/public/icons/medal.svg";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import Link from "next/link";

export default async function RankingChart() {
  const article = await getArticles({ page: 1, orderBy: "like" });
  return (
    <>
      <header className="mb-3 flex items-center gap-1 text-base font-medium text-text-primary">
        <Medal width={16} height={16} />
        <h2 className="selection:bg-inherit">베스트 랭킹</h2>
      </header>
      <ol className="mb-8 grid grid-flow-col grid-cols-1 grid-rows-10 gap-1.5 gap-x-10 rounded-xl border-background-tertiary bg-background-secondary p-5 text-text-primary md:mb-10 md:grid-cols-2 md:grid-rows-5">
        {article.list.map((article, i) => (
          <li
            key={i}
            className={`flex items-center justify-between gap-1 ${i <= 2 && "font-bold text-[#fe6c08]"}`}
          >
            <Link
              href={`/boards/${article.id}`}
              className="flex gap-1 truncate hover:text-[#41ff30]"
            >
              {`${i + 1}. ${article.title}`}
              {i <= 2 && <Fire className="h-4 w-4" />}
            </Link>
            <div className="flex-shrink-0 text-sm font-normal text-text-disabled">
              {convertDiffDateFromNow(new Date(article.createdAt))}
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
