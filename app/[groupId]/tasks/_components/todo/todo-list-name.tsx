import React, { ButtonHTMLAttributes, useState } from "react";

interface TodoListNameProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  buttonName: string;
  selectedButton: number | undefined;
}

const TodoListName = ({
  buttonName,
  selectedButton,
  ...rest
}: TodoListNameProps) => {
  return (
    <button
      {...rest}
      className={`h-[25px] text-[16px] font-medium ${rest.name === selectedButton?.toString() ? "border- border-b border-solid border-text-tertiary" : "text-text-default"}`}
      onClick={rest.onClick}
    >
      <p className="h-[19px]">{buttonName}</p>
    </button>
  );
};

export default TodoListName;
