import getGroupInfo from "@/lib/apis/group";
import { getTasks } from "@/lib/apis/task";
import { myConvertDateToYMD } from "@/utils/convert-date";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

import TodoContainer from "./_components/todo/todo-contianer";

const page = async (context: any) => {
  const queryClient = new QueryClient();
  const { req, res, query, params } = context;
  const result = await queryClient.fetchQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: params.groupId }),
  });

  if (result.taskLists[0]) {
    myConvertDateToYMD(new Date());
    await queryClient.prefetchQuery({
      queryKey: [
        "getTasks",
        result.taskLists[0].id,
        myConvertDateToYMD(new Date()),
      ],
      queryFn: () =>
        getTasks(params.groupId, result.taskLists[0].id, new Date()),
    });
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="max-h-sc max-w-screen-lg mx-auto h-[524px]">
        <h1 className="text text-xl font-bold text-text-primary">할일</h1>
        <TodoContainer groupId={params.groupId} />
      </div>
    </HydrationBoundary>
  );
};

export default page;
