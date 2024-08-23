import ArrowLeft from "@/public/icons/arrow-left.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import React from "react";

interface CalendarButtonProps {
  type: "left" | "right";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function CalendarButton({ type, onClick }: CalendarButtonProps) {
  if (type === "left") {
    return (
      <button
        aria-label="left"
        type="button"
        name="left"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
        onClick={onClick}
      >
        <ArrowLeft width={12} height={12} />
      </button>
    );
  }
  if (type === "right") {
    return (
      <button
        aria-label="right"
        type="button"
        name="right"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
        onClick={onClick}
      >
        <ArrowRight width={12} height={12} />
      </button>
    );
  }
}
