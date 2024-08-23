import { LinkButton } from "@/components/button/button";

interface ArticleResetButtonProps {
  btnSize: "large" | "x-small";
  btnStyle:
    | "outlined"
    | "solid"
    | "outlined_secondary"
    | "danger"
    | "none_background";
  className?: string;
}

export default function ArticleResetButton({
  btnSize,
  btnStyle,
  className,
}: ArticleResetButtonProps) {
  return (
    <LinkButton
      href="/boards"
      btnSize={btnSize}
      btnStyle={btnStyle}
      className={className}
    >
      초기화
    </LinkButton>
  );
}
