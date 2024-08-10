import CheckBoxActive from "@/public/icons/checkbox-active.svg";
import CheckboxDefault from "@/public/icons/checkbox-default.svg";
import { checkTodo } from "@/utils/checkTodo";
import React from "react";

interface CheckBoxProps {
  doneAt: string | null;
  date: Date;
}
const CheckBox = ({ doneAt, date }: CheckBoxProps) => {
  return (
    <button>
      {checkTodo(doneAt, date) ? (
        <CheckBoxActive width={16} height={16} />
      ) : (
        <CheckboxDefault width={16} height={16} />
      )}
    </button>
  );
};

export default CheckBox;
