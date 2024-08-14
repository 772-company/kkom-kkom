"use client";

import SEARCH_TAGS from "@/constants/search-tags";
import { useSortStore } from "@/providers/sort-store-provider";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

export default function TagList() {
  const keyword = useSortStore((state) => state.keyword);
  const setKeyword = useSortStore((state) => state.setKeyword);
  const setPage = useSortStore((state) => state.setPage);
  const setOrderBy = useSortStore((state) => state.setOrderBy);
  const [emblaRef] = useEmblaCarousel({
    loop: false,
    containScroll: "keepSnaps",
    dragFree: true,
  });

  const handleTagDoubleClick = useCallback(
    (tag: string) => {
      setKeyword(tag);
      setPage(1);
      setOrderBy("recent");
    },
    [setKeyword, setPage, setOrderBy],
  );

  return (
    <section className="flex flex-1 items-center overflow-hidden text-text-primary">
      <section ref={emblaRef} className="flex w-full flex-1 overflow-hidden">
        <section className="flex w-full gap-4 md:gap-6">
          {SEARCH_TAGS.map((tag) => (
            <div
              key={tag}
              className="flex flex-shrink-0 flex-grow-0 justify-center"
            >
              <button
                className={`w-fit break-keep rounded-3xl bg-background-tertiary px-5 py-3 text-xs selection:bg-background-tertiary hover:text-[#41ff30] hover:underline md:px-6 md:text-sm ${keyword === tag ? "text-[#41ff30]" : ""}`}
                type="button"
                onClick={() => handleTagDoubleClick(tag)}
              >
                {tag}
              </button>
            </div>
          ))}
        </section>
      </section>
    </section>
  );
}
