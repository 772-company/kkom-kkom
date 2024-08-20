interface NoArticleProps {
  searchParams: {
    keyword?: string;
    page?: string;
    orderBy?: "recent" | "like";
  };
}

export default function NoArticle({
  searchParams: { keyword },
}: NoArticleProps) {
  return (
    <div className="font-base flex w-full items-center justify-center pb-[200px] pt-[200px] text-lg text-text-primary xl:col-span-2 xl:row-span-5">
      {keyword ? (
        <span>
          <span className="font-bold text-brand-primary">{`${keyword} `}</span>
          에 해당하는 게시물이 없습니다.
        </span>
      ) : (
        "게시물이 아직 없어요"
      )}
    </div>
  );
}
