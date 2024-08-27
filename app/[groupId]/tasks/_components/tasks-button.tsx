import ArrowLeft from "@/public/icons/arrow-left.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import EnterActive from "@/public/icons/enter-active.svg";
import EnterDefault from "@/public/icons/enter-default.svg";
import X from "@/public/icons/x.svg";
import React, { ButtonHTMLAttributes, HTMLAttributes } from "react";

type ButtonClassName = HTMLAttributes<HTMLButtonElement>;
type ButtonAttribute = ButtonHTMLAttributes<HTMLButtonElement>;
interface ButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  types: "arrow" | "cancel" | "submit";
  disable?: boolean;
}

export default function TaskButton({
  types,
  className,
  disable,
  ...rest
}: ButtonProps & ButtonClassName & ButtonAttribute) {
  if (types === "arrow") {
    return (
      <button
        type="button"
        {...rest}
        name={rest.name}
        aria-label="arrow-button"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
      >
        {rest.name === "left" ? (
          <ArrowLeft width={12} height={12} />
        ) : (
          <ArrowRight width={12} height={12} />
        )}
      </button>
    );
  }
  if (types === "cancel") {
    return (
      <button
        type="button"
        className={`h-[24px] w-[24px] ${className}`}
        aria-label="cancel-button"
        {...rest}
      >
        <X width={24} height={24} />
      </button>
    );
  }
  if (types === "submit") {
    return (
      <button
        type="button"
        className={`absolute right-1 h-[24px] w-[24px] rounded-full ${disable ? "cursor-default" : "cursor-pointer"}`}
        {...rest}
      >
        {disable ? (
          <EnterDefault width={24} height={24} />
        ) : (
          <EnterActive width={24} height={24} />
        )}
      </button>
    );
  }
}
