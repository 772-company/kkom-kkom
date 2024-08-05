"use client";

// QueryClient는 useContext기반이기 때문에 클라이언트 컴포넌트여야 한다.
import {
  QueryClient,
  QueryClientProvider,
  isServer,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 즉시 클라이언트단에서 refetch못하게 하려고 0 초과해서 설정한다.
        staleTime: 60 * 1000,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient() {
  if (isServer) {
    // 서버는 항상 새로운 queryClient를 만든다.
    return makeQueryClient();
  } else {
    // 브라우저에서는 이미 존재하지 않는 한 queryClient를 만든다.
    // 리액트가 초기 렌더링 중에 멈춰도 새로운 client를 다시 만들지 않는다.
    // query client 생성이 suspense boundary 아래에 있다면 필요하지 않다.
    if (!browserQueryClient) browserQueryClient = makeQueryClient();
    return browserQueryClient;
  }
}

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
