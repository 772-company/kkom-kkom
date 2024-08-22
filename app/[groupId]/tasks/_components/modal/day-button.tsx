import React from "react";
import { ControllerRenderProps } from "react-hook-form";

import { TodoFormType } from "./add-todo-modal";

interface DayButtonProps {
  field: ControllerRenderProps<TodoFormType, "weekDays">;
  name: string;
  value: number;
}
const DayButton = ({ field, name, value }: DayButtonProps) => {
  const handleClickButton = () => {
    if (field.value && !field.value.includes(value)) {
      return field.onChange([...field.value, value]);
    }
    const newArray = field.value?.filter((e) => e !== value);
    field.onChange(newArray);
  };

  return (
    <button
      type="button"
      onClick={handleClickButton}
      className={`${field.value?.includes(value) ? "bg-brand-primary" : "bg-[#18212F]"} h-[48px] w-[44px] rounded-xl`}
    >
      {name}
    </button>
  );
};

export default DayButton;
