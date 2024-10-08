import SkeletonPagination from "./skeleton-article-pagination";

export default function SkeletonCardList() {
  return (
    <>
      <section className="mt-6 flex flex-col gap-6 md:mt-8 xl:grid xl:grid-cols-2 xl:grid-rows-5">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((article) => (
          <section
            key={article}
            className="group/card flex rounded-xl border border-background-tertiary bg-background-tertiary p-4 py-6 md:px-8"
          >
            <section className="h-24 md:h-32" />
          </section>
        ))}
      </section>
      <SkeletonPagination />
    </>
  );
}
