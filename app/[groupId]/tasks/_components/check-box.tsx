import usePatchTask from "@/lib/apis/task/hooks/use-path-task";
import CheckBoxActive from "@/public/icons/checkbox-active.svg";
import CheckboxDefault from "@/public/icons/checkbox-default.svg";
import { checkTodo } from "@/utils/checkTodo";
import React from "react";

interface CheckBoxProps {
  doneAt: string | null;
  date: Date;
  groupId: string;
  taskListId: number | undefined;
  taskId: number;
}
const CheckBox = ({
  doneAt,
  date,
  groupId,
  taskListId,
  taskId,
}: CheckBoxProps) => {
  const { mutate, isPending } = usePatchTask(
    date,
    groupId,
    taskListId,
    taskId,
    doneAt,
  );
  const handleClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation();
    mutate();
  };
  return (
    <button onClick={handleClick} disabled={isPending}>
      {checkTodo(doneAt, date) ? (
        <CheckBoxActive width={16} height={16} />
      ) : (
        <CheckboxDefault width={16} height={16} />
      )}
    </button>
  );
};

export default CheckBox;
