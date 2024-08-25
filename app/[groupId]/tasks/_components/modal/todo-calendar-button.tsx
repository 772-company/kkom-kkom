import Button from "@/components/button/button";
import { useTheme } from "next-themes";
import React, { ButtonHTMLAttributes, DOMAttributes, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ControllerRenderProps } from "react-hook-form";

import "../calendar-style/custom-date-picker.css";

interface TodoFormType {
  name: string;
  description: string;
  startDate: Date;
  frequencyType: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  monthDay?: number;
  weekDays?: number[];
}

interface CalendarButtonProps {
  field: ControllerRenderProps<TodoFormType, "startDate">;
}

type CustomButtonProps = DOMAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const CustomTodoCalendarButton = forwardRef<
  HTMLButtonElement,
  CustomButtonProps
>(({ value, onClick, className }) => (
  <Button
    type="button"
    btnSize="large"
    btnStyle="outlined"
    className={className}
    onClick={onClick}
  >
    {value}
  </Button>
));
CustomTodoCalendarButton.displayName = "CustomTodoCalendarButton";

function TodoCalendarButton({ field }: CalendarButtonProps) {
  const { theme } = useTheme();

  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => {
        if (date) {
          field.onChange(date);
        }
      }}
      calendarClassName={
        theme === "dark" ? "customDarkModal" : "customLightModal"
      }
      dateFormat="yyyy년 MM월 dd일"
      shouldCloseOnSelect={false}
      customInput={
        <CustomTodoCalendarButton className="h-[48px] w-[336px] bg-background-secondary text-text-default" />
      }
    />
  );
}

export default TodoCalendarButton;
