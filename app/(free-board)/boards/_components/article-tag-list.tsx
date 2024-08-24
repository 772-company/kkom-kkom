"use client";

import SEARCH_TAGS from "@/constants/search-tags";
import { useProgress } from "@/hooks/use-progress";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

interface ArticleTagListProps {
  keyword: string;
}

export default function ArticleTagList({ keyword }: ArticleTagListProps) {
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    dragFree: true,
  });
  const progress = useProgress();

  return (
    <section className="flex flex-1 items-center overflow-hidden text-text-primary">
      <section ref={emblaRef} className="flex w-full flex-1 overflow-hidden">
        <section className="flex w-full gap-2">
          {SEARCH_TAGS.map((tag) => (
            <div
              key={tag}
              className="flex flex-shrink-0 flex-grow-0 justify-center"
            >
              <Link
                className={`w-fit break-keep rounded-2xl border border-black border-opacity-10 bg-background-tertiary px-3 py-2 text-xs font-bold selection:bg-background-tertiary hover:text-brand-primary dark:border dark:border-white dark:border-opacity-10 md:px-6 md:text-sm ${keyword === tag ? "text-brand-primary" : ""}`}
                href={`/boards?keyword=${tag}`}
                onClick={progress(`/boards?keyword=${tag}`)}
              >
                #{tag}
              </Link>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
}
