import Popover from "@/components/popover/popover";
import Kebab from "@/public/icons/kebab-small.svg";
import React from "react";

interface KebabPopverProps {
  userId: number | undefined;
  commentUserId: number;
  handleClickEditMode: () => void;
  handleClickDeleteComment: () => void;
}

function CommentKebabPopOver({
  userId,
  commentUserId,
  handleClickDeleteComment,
  handleClickEditMode,
}: KebabPopverProps) {
  const popOverContent = [
    { text: "수정하기", onClick: handleClickEditMode },
    { text: "삭제하기", onClick: handleClickDeleteComment },
  ];
  return (
    <Popover
      content={userId !== commentUserId ? popOverContent : []}
      triggerWidth={16}
      triggerHeight={16}
      triggerSvg={Kebab}
      triggerImageAlt="케밥"
      className="h-4 w-4"
      contentClassName="h-[80px] w-[120px] bg-background-secondary !border border-background-tertiary"
    />
  );
}

export default CommentKebabPopOver;
