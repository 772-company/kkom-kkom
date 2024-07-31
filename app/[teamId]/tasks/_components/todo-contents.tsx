import React from "react";

interface TodoContentsProps {
  list: string[];
}
const TodoContents = ({ list = [] }: TodoContentsProps) => {
  if (!list.length) {
    return (
      <p className="mx-auto mt-3 h-[34px] w-[156px] text-text-default">
        아직 할 일이 목록이없습니다.
        <br />할 일을 추가해보세요.
      </p>
    );
  }
};

export default TodoContents;
