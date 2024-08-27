import React, { ButtonHTMLAttributes } from "react";

interface TodoListNameProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
  selectedButton: number | undefined;
}

export default function TodoListName({
  buttonName,
  selectedButton,
  ...rest
}: TodoListNameProps) {
  return (
    <button
      {...rest}
      className={`h-[25px] text-[16px] font-medium ${rest.name === selectedButton?.toString() ? "border- border-b border-solid border-text-tertiary" : "text-text-default"}`}
      onClick={rest.onClick}
      type="button"
    >
      <p className="h-[19px]">{buttonName}</p>
    </button>
  );
}
