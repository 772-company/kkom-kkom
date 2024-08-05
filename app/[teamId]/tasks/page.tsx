import React from "react";

import TodoContainer from "./_components/todo-contianer";

const page = () => {
  return (
    <>
      <div className="pt-7">
        <h1 className="text-xl font-bold text-text-primary">할일</h1>
        <TodoContainer />
      </div>
    </>
  );
};

export default page;
