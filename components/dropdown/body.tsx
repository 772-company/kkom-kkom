import { ReactNode } from "react";

import { useDropdown } from "./dropdown";

interface BodyProps {
  children: ReactNode;
  styles: string;
}

/**
 * @author 김서영
 * 클릭 시에 나타나는 드롭다운 리스트를 감싸는 부분입니다
 * @param children : Item들이 children에 해당됩니다.
 * @param styles : 너비 및 배경색 등 추가적으로 적용될 스타일을 지정해주는 프롭입니다.
 * @example  <Dropdown.Body styles="w-36 bg-blue-200">...</Dropdown.Body>
 **/
export default function Body({ children, styles }: BodyProps) {
  const { isDropdownOpen } = useDropdown();

  return isDropdownOpen ? (
    <ul className={`${styles} absolute z-50 mt-2`}>{children}</ul>
  ) : null;
}
