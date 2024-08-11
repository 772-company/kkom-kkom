import { allowScroll, preventScroll } from "@/utils/scroll";
import { useEffect } from "react";

/**
 * 스크롤 방지 후, 컴포넌트가 언마운트될 때 스크롤을 허용한다.
 * 모달 같은 곳에서 스크롤을 방지할 때 사용하시면 됩니다.
 * @author 이승현
 * @example
 * ```tsx
 * // 모달 컴포넌트.tsx
 *
 * usePreventScroll();
 * ```
 */
export default function usePreventScroll() {
  useEffect(() => {
    const prevScrollY = preventScroll();
    return () => {
      allowScroll(prevScrollY);
    };
  }, []);
}
