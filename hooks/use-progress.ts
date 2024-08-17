import { useRouter } from "next-nprogress-bar";
import { MouseEventHandler } from "react";

/**
 * 페이지 이동을 위한 함수입니다.
 * @param href : 이동할 페이지의 경로입니다.
 * @example
 * ```tsx
 * const handleProgress = useProgress();
 * <Button onClick={handleProgress("/")} />
 * <Link href="/" onClick={handleProgress("/")} />
 * ```
 * @author 이승현
 * @returns
 */
export function useProgress() {
  const router = useRouter();
  const handleProgress: (href: string) => MouseEventHandler = (href) => (e) => {
    e.preventDefault();
    router.push(href);
  };
  return handleProgress;
}
