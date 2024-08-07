import React, { useState } from "react";

import NoTodo from "./noTodo";
import SideBar from "./side-bar";
import TodoBox from "./todo-box";
import TodoListName from "./todo-list-name";

interface TodoContentsProps {
  list: string[];
}
const TodoContents = ({ list }: TodoContentsProps) => {
  const [selectedButton, setSelectedButton] = useState(list[0]);
  const [isSideBarOpen, setIsSiderOpen] = useState<boolean>(false);
  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSiderOpen(true);
  };
  const handleCancel = () => {
    setIsSiderOpen(false);
  };
  const handleClickName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    setSelectedButton(e.currentTarget.name);
  };
  if (!list.length) {
    return <NoTodo />;
  }
  return (
    <>
      <div className="flex gap-3">
        {list.map((element, i) => (
          <TodoListName
            key={i}
            selectedButton={selectedButton}
            name={element}
            buttonName={element}
            onClick={handleClickName}
          />
        ))}
      </div>
      <div className="mt-4 flex flex-col gap-4">
        {list.map((e, i) => (
          <TodoBox key={i} handleClickTodoBox={handleClick} isdone={false} />
        ))}
      </div>
      <SideBar isOpen={isSideBarOpen} handleCancelButton={handleCancel} />
    </>
  );
};

export default TodoContents;
