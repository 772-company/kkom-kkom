export default function SkeletonArticleLikeSection() {
  return (
    <section className="flex justify-center">
      <section className="mb-8 h-[48px] w-[94px] animate-pulse rounded-lg bg-background-tertiary py-3 text-base md:mb-10 md:w-[140px]">
        <section className="flex items-center gap-1 overflow-visible text-sm font-normal leading-4 text-text-disabled" />
      </section>
    </section>
  );
}
