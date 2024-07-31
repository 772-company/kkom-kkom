"use client";

import React from "react";

import TodoContainer from "./_components/todo-contianer";

const page = () => {
  return (
    <div>
      <h2 className="text text-xl font-bold text-text-primary">할일</h2>
      <TodoContainer />
    </div>
  );
};

export default page;
