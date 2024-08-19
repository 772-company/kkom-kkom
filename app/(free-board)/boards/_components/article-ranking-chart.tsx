import LinkWithProgress from "@/components/link-with-progress";
import { getArticles } from "@/lib/apis/article";
import Fire from "@/public/icons/fire.svg";
import { convertDiffDateFromNow } from "@/utils/convert-date";
import { shortenString } from "@/utils/shorten-string";

export default async function ArticleRankingChart() {
  const article = await getArticles({ page: "1", orderBy: "like" });
  return (
    <ol className="mb-8 grid grid-flow-col grid-cols-1 grid-rows-10 gap-1.5 gap-x-10 rounded-xl border-background-tertiary bg-background-secondary p-5 text-text-primary md:grid-cols-2 md:grid-rows-5">
      {article.list.map((article, i) => (
        <li
          key={i}
          className={`flex items-center justify-between gap-1 ${i <= 2 ? "font-bold" : "font-light"}`}
        >
          <span className="flex gap-1">
            <span className="hover:no-underline">{`${i + 1}. `}</span>
            <LinkWithProgress
              href={`/boards/${article.id}`}
              className="flex gap-1 truncate hover:underline"
            >
              {`${shortenString(article.title, 16)}`}
              {i <= 2 && <Fire className="h-4 w-4" />}
            </LinkWithProgress>
          </span>
          <div className="flex-shrink-0 text-sm font-normal text-text-disabled">
            {convertDiffDateFromNow(new Date(article.createdAt))}
          </div>
        </li>
      ))}
    </ol>
  );
}
