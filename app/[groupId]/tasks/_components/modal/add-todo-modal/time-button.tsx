import Button from "@/components/button/button";
import { ko } from "date-fns/locale";
import React, { forwardRef } from "react";
import { ButtonHTMLAttributes, DOMAttributes } from "react";
import DatePicker from "react-datepicker";
import { ControllerRenderProps } from "react-hook-form";

import { TodoFormType } from ".";

interface TimeButtonProps {
  field: ControllerRenderProps<TodoFormType, "startDate">;
}
type CustomTimeButtonProps = DOMAttributes<HTMLButtonElement> &
  ButtonHTMLAttributes<HTMLButtonElement>;

const TimeButton = ({ field }: TimeButtonProps) => {
  const CustomTimeButton = forwardRef<HTMLButtonElement, CustomTimeButtonProps>(
    ({ value, onClick, className }, ref) => (
      <Button
        type="button"
        btnSize="large"
        btnStyle="outlined"
        className={className}
        onClick={onClick}
      >
        {value}
      </Button>
    ),
  );
  CustomTimeButton.displayName = "CustomTimeButton";
  return (
    <DatePicker
      selected={field.value}
      onChange={(date) => {
        if (date) {
          field.onChange(date);
        }
      }}
      showTimeSelect
      showTimeSelectOnly
      timeIntervals={30}
      locale={ko}
      dateFormat="aa h:mm "
      customInput={
        <CustomTimeButton className="h-[48px] w-[124px] bg-background-secondary text-text-default" />
      }
    />
  );
};

export default TimeButton;
