import ArrowLeft from "@/public/icons/arrow-left.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import EnterActive from "@/public/icons/enter-active.svg";
import EnterDefault from "@/public/icons/enter-default.svg";
import X from "@/public/icons/x.svg";
import React, { HTMLAttributes } from "react";

type ButtonClassName = HTMLAttributes<HTMLButtonElement>;

interface ButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  type: "left" | "right" | "cancel" | "submit";
  disable?: boolean;
}

const Button = ({
  type,
  className,
  disable,
  ...rest
}: ButtonProps & ButtonClassName) => {
  if (type === "left")
    return (
      <button
        {...rest}
        name="left"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
      >
        <ArrowLeft width={12} height={12} />
      </button>
    );
  else if (type === "right")
    return (
      <button
        {...rest}
        name="right"
        className="flex h-4 w-4 items-center justify-center rounded-full bg-background-secondary"
      >
        <ArrowRight width={12} height={12} />
      </button>
    );
  else if (type === "cancel")
    return (
      <button className={`h-[24] w-[24px] ${className}`} {...rest}>
        <X width={24} height={24} />
      </button>
    );
  else if (type === "submit")
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

export default Button;
