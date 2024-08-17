"use client";

import LinkWithProgress from "@/components/link-with-progress";
import SEARCH_TAGS from "@/constants/search-tags";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";

interface ArticleTagListProps {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}

export default function ArticleTagList({ searchParams }: ArticleTagListProps) {
  const keyword = searchParams.keyword || "";
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  return (
    <section className="flex flex-1 items-center overflow-hidden text-text-primary">
      <section ref={emblaRef} className="flex w-full flex-1 overflow-hidden">
        <section className="flex w-full gap-4 md:gap-6">
          {SEARCH_TAGS.map((tag) => (
            <div
              key={tag}
              className="flex flex-shrink-0 flex-grow-0 justify-center"
            >
              <LinkWithProgress
                className={`w-fit break-keep rounded-3xl bg-background-tertiary px-5 py-3 text-xs selection:bg-background-tertiary hover:text-[#41ff30] hover:underline md:px-6 md:text-sm ${keyword === tag ? "text-[#41ff30]" : ""}`}
                href={`/boards?keyword=${tag}`}
              >
                {tag}
              </LinkWithProgress>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
}
