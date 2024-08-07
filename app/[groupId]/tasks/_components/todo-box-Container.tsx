import React, { useState } from "react";

import TodoBox from "./todo-box";

const TodoBoxContainer = () => {
  const [isDone, setisDone] = useState<boolean>(false);
  const handleClickDoneButton = () => {
    setisDone(!isDone);
  };
  return <TodoBox isdone={isDone} handleClickTodoBox={handleClickDoneButton} />;
};

export default TodoBoxContainer;
