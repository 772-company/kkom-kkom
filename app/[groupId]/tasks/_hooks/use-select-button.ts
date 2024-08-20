import React, { useEffect, useState } from "react";

import { TaskLists } from "../_components/todo/todo-contents";

const useSelectButton = (taskLists: TaskLists) => {
  const [selectedButton, setSelectedButton] = useState<number | undefined>(
    taskLists[0]?.id,
  );

  const handleClickName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selected = parseInt(e.currentTarget.name);
    setSelectedButton(selected);
  };

  useEffect(() => {
    if (taskLists) {
      setSelectedButton(taskLists[taskLists.length - 1]?.id);
    }
  }, [taskLists]);

  return { handleClickName, selectedButton };
};

export default useSelectButton;
