interface ArrowReturnProps {
  handleCancel: () => void;
}

export default function ArrowReturn({ handleCancel }: ArrowReturnProps) {
  return (
    <svg
      aria-label="돌아가기"
      className="h-6 w-6 cursor-pointer"
      fill="currentColor"
      height="24"
      role="img"
      viewBox="0 0 24 24"
      width="24"
      onClick={handleCancel}
    >
      <title>돌아가기</title>
      <line
        fill="none"
        stroke="rgb(16 185 129)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        x1="2.909"
        x2="22.001"
        y1="12.004"
        y2="12.004"
      ></line>
      <polyline
        fill="none"
        points="9.276 4.726 2.001 12.004 9.276 19.274"
        stroke="rgb(16 185 129)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      ></polyline>
    </svg>
  );
}
