import { getArticles } from "@/lib/apis/article";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";

import OrderedBySelector from "./_components/ordered-by-selector";
import PostHeader from "./_components/post-header";
import PostList from "./_components/post-list";
import TagList from "./_components/tag-list";

export default async function Page() {
  const queryClient = new QueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: ["articles", { page: 1, keyword: "", orderBy: "like" }],
      queryFn: () => getArticles({ page: 1, keyword: "", orderBy: "like" }),
    }),
    queryClient.prefetchQuery({
      queryKey: ["articles", { page: 1, keyword: "", orderBy: "recent" }],
      queryFn: () => getArticles({ page: 1, keyword: "", orderBy: "recent" }),
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <section className="mt-8">
        <header className="mb-6 flex h-10 items-center justify-between text-base font-medium text-text-primary md:h-11">
          <PostHeader />
          <section className="flex gap-3">
            <OrderedBySelector />
          </section>
        </header>
        <TagList />
        <PostList />
      </section>
    </HydrationBoundary>
  );
}
