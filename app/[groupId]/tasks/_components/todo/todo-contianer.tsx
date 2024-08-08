"use client";

import getGroupInfo from "@/lib/apis/group";
import { useQuery } from "@tanstack/react-query";
import { useCookies } from "next-client-cookies";
import React from "react";

import useCalender from "../../_hooks/use-calendar";
import TodoContents from "./todo-contents";
import TodoHeader from "./todo-header";

const TodoContainer = () => {
  const cookies = useCookies();
  const accessToken = cookies.get("accessToken") ?? "";
  const { data } = useQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: "101", cookies: accessToken }),
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
      <TodoContents list={data ? data?.taskLists : []} date={date} />
    </>
  );
};

export default TodoContainer;
