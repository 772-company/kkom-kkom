import ArticleSearchBar from "./boards/_components/article-search-bar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative mx-4 pb-14 md:mx-6 xl:mx-auto xl:max-w-[1200px]">
      <header className="mt-8">
        <h1 className="mb-6 text-lg font-bold text-text-primary selection:bg-inherit">
          자유게시판
        </h1>
        <ArticleSearchBar />
      </header>
      <section className="mt-6 md:mt-8">{children}</section>
    </div>
  );
}
