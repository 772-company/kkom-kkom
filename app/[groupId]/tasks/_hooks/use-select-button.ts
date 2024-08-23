import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import React, { useEffect, useState } from "react";

type TaskLists = GetTeamIdGroupsIdResponse["taskLists"];

function useSelectButton(taskLists: TaskLists) {
  const [selectedButton, setSelectedButton] = useState<number | undefined>(
    taskLists[0]?.id,
  );

  const handleClickName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selected = parseInt(e.currentTarget.name, 10);
    setSelectedButton(selected);
  };

  useEffect(() => {
    if (taskLists) {
      setSelectedButton(taskLists[taskLists.length - 1]?.id);
    }
  }, [taskLists]);

  return { handleClickName, selectedButton };
}

export default useSelectButton;
