import Link from "next/link";

import OrderedBySelector from "./_components/ordered-by-selector";
import PostList from "./_components/post-list";
import RankingChart from "./_components/ranking-chart";
import SearchBar from "./_components/search-bar";
import TagList from "./_components/tag-list";

export default function Page() {
  return (
    <>
      <header className="mt-8">
        <h1 className="mb-6 text-lg font-bold text-text-primary">자유게시판</h1>
        <SearchBar />
      </header>
      <section className="mt-6 md:mt-8">
        <section className="border-b border-text-primary border-opacity-10">
          <header className="mb-6 flex justify-between text-base font-medium text-text-primary">
            <h2>베스트 랭킹</h2>
            <Link href="/boards/ranking">더보기</Link>
          </header>
          <RankingChart />
        </section>
        <section className="mt-8">
          <header className="mb-6 flex h-10 items-center gap-10 text-base font-medium text-text-primary md:h-11">
            <h2>게시글</h2>
            <TagList />
            <OrderedBySelector />
          </header>
          <PostList />
        </section>
      </section>
    </>
  );
}
