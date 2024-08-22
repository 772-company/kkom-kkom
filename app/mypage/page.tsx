import { getUser } from "@/lib/apis/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { Suspense } from "react";

import { getQueryClient } from "../get-query-client";
import SecessionButton from "./_component/secession- button";
import SkeletonUpdateUser from "./_component/skeleton-update-user";
import UpdateUserForm from "./_component/update-user-form";

export default async function Page() {
  // const queryClient = new QueryClient();
  const queryClient = getQueryClient();

  queryClient.prefetchQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="relative">
        <h1 className="text-lg font-bold text-text-primary md:text-xl">
          계정 설정
        </h1>
        <Suspense fallback={<SkeletonUpdateUser />}>
          <UpdateUserForm />
        </Suspense>
        <SecessionButton />
      </section>
    </HydrationBoundary>
  );
}
