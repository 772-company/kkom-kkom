import Button from "@/components/button/button";
import React, { forwardRef } from "react";
import { ButtonHTMLAttributes, DOMAttributes } from "react";
import DatePicker from "react-datepicker";
import { ControllerRenderProps } from "react-hook-form";

import { TodoFormType } from "./add-todo-modal";

interface CalendarButtonProps {
  field: ControllerRenderProps<TodoFormType, "startDate">;
}

type CustomButtonProps = DOMAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const TodoCalendarButton = ({ field }: CalendarButtonProps) => {
  const CustomTodoCalendarButton = forwardRef<
    HTMLButtonElement,
    CustomButtonProps
  >(({ value, onClick, className }, ref) => (
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
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => {
        if (date) {
          field.onChange(date);
        }
      }}
      calendarClassName="mt-1"
      dateFormat="yyyy년 MM월 dd일"
      customInput={
        <CustomTodoCalendarButton className="h-[48px] w-[336px] bg-background-secondary text-text-default" />
      }
    />
  );
};

export default TodoCalendarButton;
