import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 조건부 처리 및 우선순위 충돌 해결된 tailwind 코드를 반환합니다.
 * clsx + cva + twMerge 를 모두 사용할 수 있습니다.
 * @author shadcn (옮긴이: 이승현)
 * @param inputs cva variants
 * @returns 조건부 처리 완료 및 우선순위 충돌이 해결된 tailwind 문자열
 * @example
 *   // 공통 버튼 컴포넌트 한번 봐주세요!
 *   // variants: cva로 정의한 버튼 조건부 스타일
 *   className={cn(variants({ btnStyle, btnSize, className }))}
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
