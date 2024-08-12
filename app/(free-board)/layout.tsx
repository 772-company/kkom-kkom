import AddBoard from "./_components/add-board";
import RankingChart from "./boards/_components/ranking-chart";
import SearchBar from "./boards/_components/search-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <div className="relative mx-4 md:mx-6 xl:mx-auto xl:max-w-[1200px]">
        <header className="mt-8">
          <h1 className="mb-6 text-lg font-bold text-text-primary selection:bg-inherit">
            자유게시판
          </h1>
          <SearchBar />
        </header>
        <section className="mt-6 md:mt-8">
          <section className="border-b border-text-primary border-opacity-10">
            <RankingChart />
          </section>
          {children}
        </section>
        <AddBoard />
      </div>
    </>
  );
}
