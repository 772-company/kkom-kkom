import Popover from "@/components/popover/popover";
import Kebab from "@/public/icons/kebab-small.svg";
import React from "react";

interface KebabPopoverProps {
  openEditModal?: () => void;
  openDeleteModal: () => void;
}

const KebabPopover = ({
  openEditModal,
  openDeleteModal,
}: KebabPopoverProps) => {
  const handleClickEdit = () => {};
  const handleClickReomove = () => {};
  const constent = [
    {
      text: "수정하기",
      onClick: () => {
        console.log("test");

        // openEditModal();
      },
    },
    { text: "삭제하기", onClick: openDeleteModal },
  ];

  return (
    <Popover
      triggerSvg={Kebab}
      triggerWidth={16}
      triggerHeight={16}
      content={constent}
      contentClassName="h-[80px] w-[120px] bg-background-secondary"
    />
  );
};

export default KebabPopover;
