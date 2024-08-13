import { getUser } from "@/lib/apis/user";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import SecessionButton from "./_component/secession- button";
import UpdateUserForm from "./_component/update-user-form";

export default async function Page() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["getUser"],
    queryFn: getUser,
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="relative">
        <h1 className="text-lg font-bold text-text-primary md:text-xl">
          계정 설정
        </h1>
        <UpdateUserForm />
        <SecessionButton />
      </section>
    </HydrationBoundary>
  );
}
