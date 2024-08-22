import Popover from "@/components/popover/popover";
import Kebab from "@/public/icons/kebab-small.svg";
import React from "react";

interface KebabPopoverProps {
  openEditModal: () => void;
  openDeleteModal: () => void;
}

const KebabPopover = ({
  openEditModal,
  openDeleteModal,
}: KebabPopoverProps) => {
  const constent = [
    {
      text: "수정하기",
      onClick: openEditModal,
    },
    { text: "삭제하기", onClick: openDeleteModal },
  ];

  return (
    <Popover
      triggerSvg={Kebab}
      triggerWidth={16}
      triggerHeight={16}
      content={constent}
      className=""
      contentClassName="h-[80px] w-[120px] bg-background-secondary !border border-background-tertiary"
    />
  );
};

export default KebabPopover;
