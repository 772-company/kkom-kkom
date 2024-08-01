import { covertDate } from "@/utils/convert-date";
import React, { useState } from "react";

import useCalender from "../_hooks/use-calendar";
import TodoContents from "./todo-contents";
import TodoHeader from "./todo-header";

const TodoContainer = () => {
  const { date, convertedDate, handleChangeDate, handleClickButton } =
    useCalender();

  return (
    <>
      <TodoHeader
        onClickButton={handleClickButton}
        date={date}
        convertedDate={convertedDate}
        onChangeDate={handleChangeDate}
      />
      <TodoContents list={["테스트", "주주총회", "문서관리"]} />
    </>
  );
};

export default TodoContainer;
