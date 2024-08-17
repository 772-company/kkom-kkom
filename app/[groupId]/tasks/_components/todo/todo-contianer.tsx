"use client";

import getGroupInfo from "@/lib/apis/group";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import useCalender from "../../_hooks/use-calendar";
import TodoContents from "./todo-contents";
import TodoHeader from "./todo-header";

interface TodoContainerProps {
  groupId: string;
}
const TodoContainer = ({ groupId }: TodoContainerProps) => {
  const { data } = useQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: groupId }),
  });
  const { date, convertedDate, handleChangeDate, handleClickButton } =
    useCalender();
  return (
    <>
      <TodoHeader
        groupId={groupId}
        onClickButton={handleClickButton}
        date={date}
        convertedDate={convertedDate}
        onChangeDate={handleChangeDate}
      />
      <TodoContents
        taskLists={data ? data?.taskLists : []}
        date={date}
        groupId={groupId}
      />
    </>
  );
};

export default TodoContainer;
