"use client";

import getGroupInfo from "@/lib/apis/group";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";

import useCalender from "../../_hooks/use-calendar";
import TodoContents from "./todo-contents";
import TodoHeader from "./todo-header";

const TodoContainer = () => {
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: "101" }),
  });
  const { date, convertedDate, handleChangeDate, handleClickButton } =
    useCalender();
  return (
    <>
      <TodoHeader
        onClickButton={handleClickButton}
        date={date}
        convertedDate={convertedDate}
        onChangeDate={handleChangeDate}
      />
      <TodoContents taskLists={data ? data?.taskLists : []} date={date} />
    </>
  );
};

export default TodoContainer;
