"use client";

import { useSortStore } from "@/providers/sort-store-provider";

export default function PostHeader() {
  const keyWord = useSortStore((state) => state.keyword);
  return (
    <h2 className="flex-1 selection:bg-inherit">
      {keyWord.length === 0 ? (
        "게시글"
      ) : (
        <span>
          <span className="font-black text-[#41ff30]">{keyWord}</span> 에 대한
          검색 결과입니다.
        </span>
      )}
    </h2>
  );
}
