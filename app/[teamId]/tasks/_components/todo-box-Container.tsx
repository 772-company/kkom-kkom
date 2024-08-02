import React, { useState } from "react";

import SideBar from "./side-bar";
import TodoBox from "./todo-box";

const TodoBoxContainer = () => {
  const [isDone, setisDone] = useState<boolean>(false);
  const [isSideBarOpen, setIsSiderOpen] = useState<boolean>(false);

  const handleClickTodoBox = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
  ) => {
    setIsSiderOpen(true);
  };
  return (
    <>
      <TodoBox handleClickTodoBox={handleClickTodoBox} isdone={isDone} />

      {isSideBarOpen && <SideBar />}
    </>
  );
};

export default TodoBoxContainer;
