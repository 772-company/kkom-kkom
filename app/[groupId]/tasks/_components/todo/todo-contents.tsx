import useGetTaskList from "@/lib/apis/task-list/hooks/useGetTaskList";
import { GetTeamIdGroupsIdResponse } from "@/lib/apis/type";
import React from "react";

import useSelectButton from "../../_hooks/use-select-button";
import useSideBar from "../../_hooks/use-side-bar";
import NoList from "../no-items/no-list";
import NoTodo from "../no-items/no-todo";
import SideBar from "../side-bar";
import TodoBox from "./todo-box";
import TodoListName from "./todo-list-name";

export type TaskLists = GetTeamIdGroupsIdResponse["taskLists"];
interface TodoContentsProps {
  taskLists: TaskLists;
  date: Date;
}
const TodoContents = ({ taskLists, date }: TodoContentsProps) => {
  const { handleClickName, selectedButton } = useSelectButton(taskLists);
  const { taskList, error, isPending } = useGetTaskList(
    101,
    selectedButton,
    date,
  );

  const { isSideBarOpen, handleCancel, handleClick } = useSideBar();

  if (!taskLists.length) {
    return <NoList />;
  }
  return (
    <>
      <div className="flex gap-3">
        {taskLists.map((element) => (
          <TodoListName
            key={element.id}
            selectedButton={selectedButton}
            name={element.id.toString()}
            buttonName={element.name}
            onClick={handleClickName}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {isPending && <div>로딩중...</div>}
        {!isPending && taskList?.tasks.length === 0 && <NoTodo />}
        {!isPending &&
          taskList &&
          taskList.tasks.map((e, i) => (
            <TodoBox
              dateString={e.date}
              name={e.name}
              commentCount={e.commentCount}
              key={i}
              handleClickTodoBox={handleClick}
              isdone={false}
            />
          ))}
      </div>
      <SideBar isOpen={isSideBarOpen} handleCancelButton={handleCancel} />
    </>
  );
};

export default TodoContents;
