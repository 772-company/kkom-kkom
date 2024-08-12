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

const TaskButton = ({
  types,
  className,
  disable,
  ...rest
}: ButtonProps & ButtonClassName & ButtonAttribute) => {
  if (types === "arrow")
    return (
      <button
        {...rest}
        name={rest.name}
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
      >
        {rest.name === "left" ? (
          <ArrowLeft width={12} height={12} />
        ) : rest.name === "right" ? (
          <ArrowRight width={12} height={12} />
        ) : (
          ""
        )}
      </button>
    );
  else if (types === "cancel")
    return (
      <button className={`h-[24] w-[24px] ${className}`} {...rest}>
        <X width={24} height={24} />
      </button>
    );
  else if (types === "submit")
    return (
      <button
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
};

export default TaskButton;
