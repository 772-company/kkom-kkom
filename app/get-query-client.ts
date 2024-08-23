import {
  QueryClient,
  defaultShouldDehydrateQuery,
  isServer,
} from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
      dehydrate: {
        // include pending queries in dehydration
        shouldDehydrateQuery: (query) =>
          defaultShouldDehydrateQuery(query) ||
          query.state.status === "pending",
      },
    },
  });
}

/* eslint-disable */
let browserQueryClient: QueryClient | undefined = undefined;

export default function getQueryClient() {
  if (isServer) {
    // 서버는 항상 새로운 queryClient를 만든다.
    return makeQueryClient();
  }
  // 브라우저에서는 이미 존재하지 않는 한 queryClient를 만든다.
  // 리액트가 초기 렌더링 중에 멈춰도 새로운 client를 다시 만들지 않는다.
  // query client 생성이 suspense boundary 아래에 있다면 필요하지 않다.
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}
