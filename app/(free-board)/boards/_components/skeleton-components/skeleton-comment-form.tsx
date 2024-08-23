export default function SkeletonCommentForm() {
  return (
    <div className="w-full">
      <div className="mb-4 block h-6 w-14 animate-pulse rounded-lg bg-background-tertiary text-base font-medium text-text-primary md:mb-6 md:h-7 md:w-20 md:text-xl" />
      <div
        id="content"
        className="focus:ring-primary my-4 h-[104px] w-full animate-pulse resize-none rounded-lg bg-background-tertiary px-6 text-sm text-text-primary focus:outline-none focus:ring focus:ring-opacity-50 md:text-base"
      />
      <section className="mt-4 flex justify-end border-b border-text-primary border-opacity-10 pb-8 md:pb-10">
        <div className="h-[32px] w-[74px] animate-pulse rounded-lg bg-background-tertiary py-1.5 text-sm md:h-[48px] md:w-[184px] md:py-3 md:text-base" />
      </section>
    </div>
  );
}
