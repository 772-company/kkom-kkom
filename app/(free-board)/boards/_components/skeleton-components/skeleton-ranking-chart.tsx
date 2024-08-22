export default function SkeletonRankingChart() {
  return (
    <ol className="mb-8 grid grid-flow-col grid-cols-1 grid-rows-10 gap-1.5 gap-x-10 rounded-xl border-background-tertiary bg-background-secondary p-5 text-text-primary md:mb-10 md:grid-cols-2 md:grid-rows-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((article, i) => (
        <li
          key={i}
          className={`flex animate-pulse items-center justify-between gap-1 ${i <= 2 && "font-bold text-[#fe6c08]"}`}
        >
          <span className="h-6"></span>
        </li>
      ))}
    </ol>
  );
}
