"use client";

import { useHandleArticleLikeMutation } from "@/app/(free-board)/_query/mutation";
import { useArticleQuery } from "@/app/(free-board)/_query/query";
import Button from "@/components/button/button";
import LikeButtonColored from "@/public/icons/like-button-colored";

interface LikeSectionProps {
  articleId: number;
}

export default function LikeSection({ articleId }: LikeSectionProps) {
  const { data, isFetching } = useArticleQuery(articleId);
  const { mutate, isPending } = useHandleArticleLikeMutation();
  if (!data) return null;
  const { likeCount, isLiked } = data;
  const handleClick = () => {
    if (isFetching || isPending) {
      alert(
        "공감/비공감 후 일정시간 동안 추가적인 공감/비공감을 제한하고 있습니다.",
      );
      return;
    }
    mutate({ articleId, isLiked });
  };

  return (
    <section className="flex justify-center">
      <Button
        btnSize="large"
        btnStyle="outlined_secondary"
        className="mb-8 w-[94px] border border-black border-opacity-10 bg-background-inverse hover:bg-[#e5e5e5] dark:border dark:border-white dark:border-opacity-10 md:mb-10 md:w-[140px]"
        onClick={handleClick}
      >
        <section className="flex items-center gap-1 overflow-visible text-sm font-normal leading-4 text-text-disabled">
          <LikeButtonColored size={24} isClicked={isLiked} />
          Like {likeCount > 9999 ? "9999+" : likeCount}
        </section>
      </Button>
    </section>
  );
}
