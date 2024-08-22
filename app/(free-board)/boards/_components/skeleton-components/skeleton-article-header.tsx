export default function SkeletonArticleHeader() {
  return (
    <>
      <header className="flex justify-between border-b border-border-primary border-opacity-10 pb-4 pt-6 text-lg font-medium md:mt-14 md:text-xl">
        <h1 className="h-7 w-7/12 animate-pulse rounded-lg bg-background-tertiary"></h1>
      </header>
      <section className="mb-6 mt-4 flex w-1/4 animate-pulse items-center rounded-lg bg-background-tertiary pb-6"></section>
    </>
  );
}
