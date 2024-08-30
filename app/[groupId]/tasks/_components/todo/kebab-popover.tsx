import Popover from "@/components/popover/popover";
import { getUser } from "@/lib/apis/user";
import Kebab from "@/public/icons/kebab-small.svg";
import { useQuery } from "@tanstack/react-query";
import React from "react";

interface KebabPopoverProps {
  todoUserId?: number;
  openEditModal: () => void;
  openDeleteModal: () => void;
}

function KebabPopover({
  openEditModal,
  openDeleteModal,

  todoUserId,
}: KebabPopoverProps) {
  const { data: user } = useQuery({ queryKey: ["getUser"], queryFn: getUser });
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
      contentClassName={`h-[80px] w-[120px] bg-background-secondary !border border-background-tertiary text-text-primary ${user?.id !== todoUserId && "hidden"}`}
    />
  );
}

export default KebabPopover;
