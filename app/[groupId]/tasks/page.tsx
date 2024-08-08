import getGroupInfo from "@/lib/apis/group";
import { getTaskList } from "@/lib/apis/task-list";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

import TodoContainer from "./_components/todo/todo-contianer";

const page = async () => {
  const queryClient = new QueryClient();

  const result = await queryClient.fetchQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: "101" }),
  });

  if (result.taskLists) {
    await queryClient.prefetchQuery({
      queryKey: ["getTaskList", result.taskLists[0].id],
      queryFn: () => getTaskList(result.id, result.taskLists[0].id),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-h-sc max-w-screen-lg mx-auto h-[524px]">
        <h1 className="text text-xl font-bold text-text-primary">할일</h1>
        <TodoContainer />
      </div>
    </HydrationBoundary>
  );
};

export default page;
