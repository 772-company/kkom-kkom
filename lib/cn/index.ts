import clsx from "clsx";
import { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 조건부 처리 및 우선순위 충돌 해결된 tailwind 코드를 반환합니다.
 * clsx + cva + twMerge 를 모두 사용할 수 있습니다.
 * @param inputs cva variants
 * @returns 조건부 처리 완료 및 우선순위 충돌 해결된 tailwind 코드
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
