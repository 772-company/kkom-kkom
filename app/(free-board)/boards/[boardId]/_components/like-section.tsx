"use client";

import { LikeCountSection } from "@/app/(free-board)/_components/card";

interface LikeSectionProps {
  boardId: string;
  likeCount: number;
  isClicked: boolean;
}

export default function LikeSection({
  boardId,
  likeCount,
  isClicked,
}: LikeSectionProps) {
  return (
    <section className="mb-8 md:mb-10">
      <LikeCountSection
        size="24px"
        likeCount={likeCount}
        isClicked={isClicked}
      />
    </section>
  );
}
