export default function SkeletonCommentList() {
  return (
    <>
      <div className="mb-4 mt-8 block h-6 w-20 animate-pulse rounded-lg bg-background-tertiary text-base font-medium text-text-primary md:mb-6 md:h-7 md:pt-10 md:text-xl" />
      <section className="flex flex-col gap-4">
        {[1, 2, 3].map((value) => (
          <section
            key={value}
            className="h-[161px] w-full animate-pulse rounded-lg bg-background-tertiary md:h-[169px]"
          />
        ))}
      </section>
    </>
  );
}
