import React, { ChangeEvent, useState } from "react";

import NoTodo from "./noTodo";
import TodoBox from "./todo-box";
import TodoBoxContainer from "./todo-box-Container";
import TodoListName from "./todo-list-name";

interface TodoContentsProps {
  list: string[];
}
const TodoContents = ({ list }: TodoContentsProps) => {
  const [selectedButton, setSelectedButton] = useState(list[0]);
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
      <div className="flex flex-col gap-4">
        {list.map((e, i) => (
          <TodoBoxContainer key={i} />
        ))}
      </div>
    </>
  );
};

export default TodoContents;
