import ButtonFloating from "@/components/button-floating/button-floating";
import { useCustomOverlay } from "@/hooks/use-custom-overlay";
import useGetTasks from "@/lib/apis/task/hooks/use-get-tasks";
import { GetGroupsIdResponse } from "@/lib/apis/type";
import React from "react";

import useSelectButton from "../../_hooks/use-select-button";
import useSideBar from "../../_hooks/use-side-bar";
import AddTodoModal from "../modal/add-todo-modal";
import NoList from "../no-items/no-list";
import NoTodo from "../no-items/no-todo";
import SideBar from "../side-bar";
import TodoBox from "./todo-box";
import TodoListName from "./todo-list-name";

type TaskLists = GetGroupsIdResponse["taskLists"];
interface TodoContentsProps {
  taskLists: TaskLists;
  date: Date;
  groupId: string;
}
function TodoContents({ taskLists, date, groupId }: TodoContentsProps) {
  const { handleClickName, selectedButton } = useSelectButton();
  const { tasks, isPending } = useGetTasks(groupId, selectedButton, date);
  const { todoId, isSideBarOpen, handleCancel, handleClick } = useSideBar();
  const addTodoOverlay = useCustomOverlay(({ close }) => (
    <AddTodoModal
      groupId={groupId}
      taskListId={selectedButton}
      close={close}
      date={date}
    />
  ));

  const hanleClickAddTodoButton = () => {
    addTodoOverlay.open();
  };

  if (taskLists.length === 0) {
    return <NoList />;
  }
  return (
    <>
      <div className="flex h-[50px] gap-3 overflow-x-auto whitespace-nowrap">
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
      <div className="mt-4 flex flex-col gap-4 pb-3">
        {isPending && <div>로딩중...</div>}
        {!isPending && tasks?.length === 0 && <NoTodo />}
        {!isPending &&
          tasks &&
          tasks.map((e) => (
            <TodoBox
              userId={e.writer.id}
              key={e.id}
              groupId={groupId}
              taskListId={selectedButton}
              id={e.id}
              recurringId={e.recurringId}
              title={e.name}
              description={e.description}
              frequency={e.frequency}
              doneAt={e.doneAt}
              date={date}
              commentCount={e.commentCount}
              dateString={e.date}
              handleClickTodoBox={handleClick}
            />
          ))}

        <SideBar
          groupId={groupId}
          date={date}
          taskListId={selectedButton}
          todoId={todoId}
          isOpen={isSideBarOpen}
          handleCancelButton={handleCancel}
        />
      </div>
      <div className="fixed bottom-8 right-[30px] h-[48px] w-[125px]">
        <ButtonFloating
          btnStyle="solid"
          btnSize="large"
          onClick={hanleClickAddTodoButton}
        >
          할 일 추가
        </ButtonFloating>
      </div>
    </>
  );
}

export default TodoContents;
