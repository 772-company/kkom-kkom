import Calendar from "@/public/icons/calendar.svg";
import { ko } from "date-fns/locale";
import React, { useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import TaskButton from "../tasks-button";

interface TodoHeaderUIProps {
  date: Date;
  convertedDate: string;
  onChangeDate: (date: Date | null) => void;
  onClickButton: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const TodoHeader = ({
  date,
  convertedDate,
  onChangeDate,
  onClickButton,
}: TodoHeaderUIProps) => {
  const datePickerRef = useRef<DatePicker | null>(null);
  const handleClick = () => {
    if (datePickerRef.current) {
      datePickerRef.current.setFocus();
    }
  };

  return (
    <div className="mt-6 flex justify-between">
      <div className="flex items-center">
        <h2 className="inline-block h-6 w-28">{convertedDate}</h2>
        <div className="flex h-3 items-center gap-1">
          <TaskButton types="arrow" name="left" onClick={onClickButton} />
          <TaskButton types="arrow" name="right" onClick={onClickButton} />

          <button
            onClick={handleClick}
            className="relative flex h-6 w-6 items-center justify-center rounded-full bg-background-secondary"
          >
            <Calendar width={12} height={12} />
          </button>
          <DatePicker
            className="h-0 w-0"
            selected={date}
            locale={ko}
            onChange={onChangeDate}
            ref={datePickerRef}
          />
        </div>
      </div>

      <button className="text-sm font-normal text-brand-primary">
        + 새로운 목록 추가하기
      </button>
    </div>
  );
};

export default TodoHeader;
