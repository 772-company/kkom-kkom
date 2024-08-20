"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "./get-query-client";

export default function QueryProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  // NOTE: 첫 렌더링 때 중단되면 client를 버린다. 근데 거기엔 boundary가 없기 때문에
  //       query client를 초기화 할때 일시 중단 될 수 있는 코드와 초기화 코드 사이에 suspense boundary가
  //       없다면 useState를 사용하지 마라.
  const queryClient = getQueryClient();
  // getQueryClient로 queryClient를 받아온다. (서버든 클라이언트든)

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider> // Provider로 제한함
  );
}
