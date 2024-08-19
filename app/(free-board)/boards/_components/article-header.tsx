interface ArticleHeaderProps {
  searchParams: {
    orderBy?: "recent" | "like";
    page?: string;
    keyword?: string;
  };
}

export default function ArticleHeader({ searchParams }: ArticleHeaderProps) {
  const keyword = searchParams.keyword || "";
  return (
    <h2 className="flex-1 selection:bg-inherit">
      {keyword.length === 0 ? (
        "게시글 목록"
      ) : (
        <span>
          <span className="font-black text-brand-primary">{keyword}</span> 에
          대한 검색 결과입니다.
        </span>
      )}
    </h2>
  );
}
