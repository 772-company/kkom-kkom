import React, { useState } from "react";

import { TaskLists } from "../_components/todo/todo-contents";

const useSelectButton = (taskLists: TaskLists) => {
  const [selectedButton, setSelectedButton] = useState(taskLists[0]["id"]);

  const handleClickName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selected = parseInt(e.currentTarget.name);
    setSelectedButton(selected);
  };
  return { handleClickName, selectedButton };
};

export default useSelectButton;
