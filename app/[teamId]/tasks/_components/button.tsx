import ArrowLeft from "@/public/icons/arrow-left.svg";
import ArrowRight from "@/public/icons/arrow-right.svg";
import React from "react";

interface ButtonProps extends React.DOMAttributes<HTMLButtonElement> {
  type: "left" | "right" | "cancel";
}

const Button = ({ type, ...rest }: ButtonProps) => {
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
  else if (type === "cancel") return <button>x</button>;
};

export default Button;
