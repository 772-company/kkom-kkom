import Link from "next/link";

// 랜딩페이지 - 지금 시작하기
// 자유게시판 - 글 쓰기

interface LinkButtonProps {
  text: string;
  link: string;
  color: "green" | "green/gradient";
  className?: string;
}

const LinkButton = ({ text, link, color, className }: LinkButtonProps) => {
  let primaryStyle = "";
  if (color === "green") {
    primaryStyle =
      "text-white bg-[#10B981] hover:bg-[#059669] active:bg-[#047857] disabled:bg-[#94A3B8]";
  } else if (color === "green/gradient") {
    primaryStyle =
      "bg-gradient-to-r from-[#10B981] to-[#A3E635] text-white hover:from-[#059669] hover:to-[#98d832] active:from-[#0d906b] active:to-[#98c353]";
  }

  return (
    <Link href={link}>
      <button
        className={`${primaryStyle} ${className} rounded-[12px] text-[16px] font-semibold`}
      >
        {text}
      </button>
    </Link>
  );
};

export default LinkButton;
