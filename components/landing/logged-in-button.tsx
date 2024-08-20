import { getUser } from "@/lib/apis/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import LoggedInButtonContent from "./Logged-in-button-content";

export default async function LoggedInButton() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <LoggedInButtonContent />
    </HydrationBoundary>
  );
}
