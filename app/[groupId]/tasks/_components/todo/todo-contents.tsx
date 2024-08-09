import useGetTasks from "@/lib/apis/task/hooks/use-get-tasks";
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
  groupId: string;
}
const TodoContents = ({ taskLists, date, groupId }: TodoContentsProps) => {
  const { handleClickName, selectedButton } = useSelectButton(taskLists);
  const { tasks, error, isPending } = useGetTasks(
    groupId,
    selectedButton,
    date,
  );

  const { todoId, isSideBarOpen, handleCancel, handleClick } =
    useSideBar(selectedButton);

  if (taskLists.length === 0) {
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
        {!isPending && tasks?.length === 0 && <NoTodo />}
        {!isPending &&
          tasks &&
          tasks.map((e) => (
            <TodoBox
              id={e.id}
              dateString={e.date}
              title={e.name}
              commentCount={e.commentCount}
              key={e.id}
              handleClickTodoBox={handleClick}
              isdone={false}
            />
          ))}
        <SideBar
          taskListId={selectedButton}
          gropId={groupId}
          todoId={todoId}
          isOpen={isSideBarOpen}
          handleCancelButton={handleCancel}
        />
      </div>
    </>
  );
};

export default TodoContents;
