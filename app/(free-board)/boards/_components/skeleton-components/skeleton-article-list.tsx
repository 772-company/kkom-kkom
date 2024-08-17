import Card from "@/app/(free-board)/_components/card";

import SkeletonPagination from "./skeleton-article-pagination";

export default function SkeletonArticleList() {
  return (
    <section className="mt-6 flex animate-pulse flex-col gap-6 md:mt-8">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((article) => (
        <Card
          key={article}
          className="group/card flex bg-background-tertiary p-4 py-6 md:px-8"
        >
          <section className="h-24 md:h-32"></section>
        </Card>
      ))}
      <SkeletonPagination />
    </section>
  );
}
