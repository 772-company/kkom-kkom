import { covertDate } from "@/utils/convert-date";
import React, { useState } from "react";

import TodoHeader from "./todo-header";

const TodoContainer = () => {
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
        const yesterDay = new Date(date.setDate(date.getDate() - 1));
        setDate(yesterDay);
        break;

      case "right":
        const tomorrow = new Date(date.setDate(date.getDate() + 1));
        setDate(tomorrow);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <TodoHeader
        onClickButton={handleClickButton}
        date={date}
        convertedDate={convertedDate}
        onChangeDate={handleChangeDate}
      />
    </>
  );
};

export default TodoContainer;
