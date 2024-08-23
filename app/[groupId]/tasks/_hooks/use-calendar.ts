import { covertDate } from "@/utils/convert-date";
import React, { useState } from "react";

const useCalender = () => {
  const [date, setDate] = useState<Date>(new Date());
  const convertedDate = covertDate(date);
  const handleChangeDate = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };
  const handleClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    switch (e.currentTarget.name) {
      case "left": {
        const beforeMonth = new Date(date.setMonth(date.getMonth() - 1));
        setDate(beforeMonth);
        break;
      }

      case "right": {
        const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
        setDate(nextMonth);
        break;
      }

      default:
        break;
    }
  };

  return { date, convertedDate, handleChangeDate, handleClickButton };
};

export default useCalender;
