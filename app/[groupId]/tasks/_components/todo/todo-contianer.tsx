"use client";

import { getGroupInfo } from "@/lib/apis/group/";
import { useQuery } from "@tanstack/react-query";
import React from "react";

import useCalender from "../../_hooks/use-calendar";
import TodoContents from "./todo-contents";
import TodoHeader from "./todo-header";

interface TodoContainerProps {
  groupId: string;
}
function TodoContainer({ groupId: id }: TodoContainerProps) {
  const { data } = useQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: id }),
  });
  const { date, convertedDate, handleChangeDate, handleClickButton } =
    useCalender();
  return (
    <div>
      <TodoHeader
        groupId={id}
        onClickButton={handleClickButton}
        date={date}
        convertedDate={convertedDate}
        onChangeDate={handleChangeDate}
      />
      <TodoContents
        taskLists={data ? data?.taskLists : []}
        date={date}
        groupId={id}
      />
    </div>
  );
}

export default TodoContainer;
