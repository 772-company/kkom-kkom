import React from "react";
import { ControllerRenderProps } from "react-hook-form";

interface DayButtonProps {
  field: ControllerRenderProps<TodoFormType, "weekDays">;
  name: string;
  value: number;
}
interface TodoFormType {
  name: string;
  description: string;
  startDate: Date;
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  monthDay?: number;
  weekDays?: number[];
}

function DayButton({ field, name, value }: DayButtonProps) {
  const handleClickButton = () => {
    if (field.value && !field.value.includes(value)) {
      return field.onChange([...field.value, value]);
    }
    const newArray = field.value?.filter((e) => e !== value);
    field.onChange(newArray);
    return 0;
  };

  return (
    <button
      type="button"
      onClick={handleClickButton}
      className={`${field.value?.includes(value) ? "bg-brand-primary" : "bg-background-third"} h-[48px] w-[44px] rounded-xl text-text-primary`}
    >
      {name}
    </button>
  );
}

export default DayButton;
