"use client";

import Button from "@/components/button/button";
import { useDropdown } from "@/components/dropdown/dropdown";
import { useSortStore } from "@/providers/sort-store-provider";
import { useCallback } from "react";

interface ResetButtonProps {
  btnSize: "large" | "x-small";
  btnStyle:
    | "outlined"
    | "solid"
    | "outlined_secondary"
    | "danger"
    | "none_background";
  className?: string;
}

export default function ResetButton({
  btnSize,
  btnStyle,
  className,
}: ResetButtonProps) {
  const { handleSelect } = useDropdown();
  const reset = useSortStore((state) => state.reset);
  const handleClick = useCallback(() => {
    reset();
    handleSelect("recent");
  }, [reset, handleSelect]);
  return (
    <Button
      btnSize={btnSize}
      btnStyle={btnStyle}
      onClick={handleClick}
      className={className}
    >
      초기화
    </Button>
  );
}
