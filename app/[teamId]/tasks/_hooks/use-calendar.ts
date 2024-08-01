import { covertDate } from "@/utils/convert-date";
import React, { useState } from "react";

const useCalender = () => {
  const [date, setDate] = useState<Date>(new Date());
  const convertedDate = covertDate(date);
  const handleChangeDate = (date: Date | null) => {
    if (date) {
      setDate(date);
    }
  };
  const handleClickButton = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    switch (e.currentTarget.name) {
      case "left":
        const beforeMonth = new Date(date.setMonth(date.getMonth() - 1));
        console.log(beforeMonth);

        setDate(beforeMonth);
        break;

      case "right":
        const nextMonth = new Date(date.setMonth(date.getMonth() + 1));
        setDate(nextMonth);
        break;

      default:
        break;
    }
  };

  return { date, convertedDate, handleChangeDate, handleClickButton };
};

export default useCalender;
