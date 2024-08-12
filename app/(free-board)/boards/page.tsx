import OrderedBySelector from "./_components/ordered-by-selector";
import PostList from "./_components/post-list";
import TagList from "./_components/tag-list";

export default function Page() {
  return (
    <section className="mt-8">
      <header className="mb-6 flex h-10 items-center justify-between text-base font-medium text-text-primary md:h-11">
        <h2 className="flex-1 selection:bg-inherit">게시글</h2>
        <OrderedBySelector />
      </header>
      <TagList />
      <PostList />
    </section>
  );
}
