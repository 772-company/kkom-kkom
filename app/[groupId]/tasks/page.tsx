import { getGroupInfo } from "@/lib/apis/group/index";
import { getTasks } from "@/lib/apis/task/index";
import { convertDateToY_M_D } from "@/utils/convert-date";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import React from "react";

import TodoContainer from "./_components/todo/todo-contianer";

export const revalidate = 0;

const page = async (context: any) => {
  const queryClient = new QueryClient();
  const { params, searchParams } = context;
  console.log(context);

  Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["groupInfo"],
      queryFn: () => getGroupInfo({ groupId: params.groupId }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["getTasks", searchParams.id, convertDateToY_M_D(new Date())],
      queryFn: () =>
        getTasks(params.groupId, parseInt(searchParams.id, 10), new Date()),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mx-auto max-w-screen-lg">
        <h1 className="text pt-8 text-xl font-bold text-text-primary">할일</h1>
        <TodoContainer groupId={params.groupId} />
      </div>
    </HydrationBoundary>
  );
};

export default page;
