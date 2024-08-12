import { getUser } from "@/lib/apis/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import LoggedInHeaderContent from "./LoggedIn-header-content";

export default async function LoggedInHeader() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LoggedInHeaderContent />
    </HydrationBoundary>
  );
}
