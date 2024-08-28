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
        const yesterDay = new Date(date.setDate(date.getDate() - 1));
        setDate(yesterDay);
        break;
      }

      case "right": {
        const tomrrow = new Date(date.setDate(date.getDate() + 1));
        setDate(tomrrow);
        break;
      }

      default:
        break;
    }
  };

  return { date, convertedDate, handleChangeDate, handleClickButton };
};

export default useCalender;
