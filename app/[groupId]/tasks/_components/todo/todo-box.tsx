import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import Calendar from "@/public/icons/calendar.svg";
import Comment from "@/public/icons/comment.svg";
import Repeat from "@/public/icons/repeat.svg";
import Time from "@/public/icons/time.svg";
import { checkTodo } from "@/utils/checkTodo";
import { convertDateToTime, convertDateToYMD } from "@/utils/convert-date";
import { covertFrequency } from "@/utils/convert-frequency";
import React from "react";

import CheckBox from "../check-box";
import DeleteTodoModal from "../modal/delete-todo-modal";
import EditTodoModal from "../modal/edit-todo-modal";
import KebabPopover from "./kebab-popover";

interface TodoBoxProps {
  userId: number;
  frequency: "ONCE" | "DAILY" | "WEEKLY" | "MONTHLY";
  groupId: string;
  taskListId: number | undefined;
  date: Date;
  id: number;
  recurringId: number;
  title: string;
  description: string;
  commentCount: number;
  doneAt: string | null;
  dateString: string;
  handleClickTodoBox: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
}

function TodoBox({
  userId,
  groupId,
  taskListId,
  id,
  recurringId,
  title,
  description,
  date,
  doneAt,
  frequency,
  commentCount,
  dateString,
  handleClickTodoBox,
}: TodoBoxProps) {
  const editTodoModalOverlay = useCustomOverlay(({ close }) => (
    <EditTodoModal
      groupId={groupId}
      taskListId={taskListId}
      taskId={id}
      description={description}
      title={title}
      close={close}
      date={date}
    />
  ));
  const deleteTodoModalOverlay = useCustomOverlay(({ close }) => (
    <DeleteTodoModal
      groupId={groupId}
      taskListId={taskListId}
      taskId={id}
      recurringId={recurringId}
      title={title}
      close={close}
    />
  ));

  const { year, month, day } = convertDateToYMD(new Date(dateString));
  const { ampm, hoursString, minutesString } = convertDateToTime(
    new Date(dateString),
  );

  return (
    <div
      data-index={id}
      role="presentation"
      onClick={handleClickTodoBox}
      className="flex h-[74px] cursor-pointer flex-col justify-center rounded-lg bg-background-secondary px-3"
    >
      <div className="ml-1 flex justify-between">
        <div className="flex items-center gap-3">
          <CheckBox
            doneAt={doneAt}
            date={date}
            groupId={groupId}
            taskListId={taskListId}
            taskId={id}
          />
          <p
            className={`text-text-primary ${checkTodo(doneAt, date) ? "line-through" : ""} text-sm font-normal`}
          >
            {title}
          </p>
          <div className="flex items-center">
            <Comment width={16} height={16} />
            <p className="text-xs font-normal text-text-default">
              {commentCount}
            </p>
          </div>
        </div>
        <KebabPopover
          commentUserId={userId}
          openEditModal={editTodoModalOverlay.open}
          openDeleteModal={deleteTodoModalOverlay.open}
        />
      </div>
      <div className="flex items-center gap-[10px]">
        <Calendar width={16} height={16} />
        <p className="text-xs text-text-default">
          {year}년 {month}월 {day}일
        </p>
        <Time width={16} height={16} />
        <p className="text-xs text-text-default">
          {ampm} {hoursString}:{minutesString}
        </p>
        <Repeat width={16} height={16} />
        <p className="text-xs text-text-default">
          {covertFrequency(frequency)}
        </p>
      </div>
    </div>
  );
}

export default TodoBox;
