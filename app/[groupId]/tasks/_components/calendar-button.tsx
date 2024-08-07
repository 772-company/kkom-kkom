import ArrowLeft from "@/public/icons/arrow-left.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import React from "react";

interface CalendarButtonProps {
  type: "left" | "right";
  onClick: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const CalendarButton = ({ type, onClick }: CalendarButtonProps) => {
  if (type === "left")
    return (
      <button
        name="left"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
        onClick={onClick}
      >
        <ArrowLeft width={12} height={12} />
      </button>
    );
  else if (type === "right")
    return (
      <button
        name="right"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
        onClick={onClick}
      >
        <ArrowRight width={12} height={12} />
      </button>
    );
};

export default CalendarButton;
