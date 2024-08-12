"use client";

import { KebabButton } from "@/app/(free-board)/_components/card";

interface PostKebabButtonProps {
  boardId: string;
}

export default function PostKebabButton({ boardId }: PostKebabButtonProps) {
  const handleDelete = () => {
    // TODO delete 요청
    console.log(boardId);
  };
  const handlePatch = () => {
    // TODO patch 요청
    console.log(boardId);
  };
  return <KebabButton onDelete={handleDelete} onPatch={handlePatch} />;
}
