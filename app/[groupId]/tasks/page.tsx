import getGroupInfo from "@/lib/apis/group";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
  useQuery,
} from "@tanstack/react-query";
import { getCookies } from "next-client-cookies/server";
import React from "react";

import TodoContainer from "./_components/todo-contianer";

const page = async () => {
  const queryClient = new QueryClient();
  const cookies = getCookies();
  // prefetch를 통해 서버에서 생성할 HTML에 필요한 데이터를 미리 생성합니다.

  const accessToken = cookies.get("accessToken") ?? "";
  await queryClient.prefetchQuery({
    queryKey: ["getGroupInfo"],
    queryFn: () => getGroupInfo({ groupId: "101", cookies: accessToken }),
  });

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
