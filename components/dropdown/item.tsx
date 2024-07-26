import { ReactNode } from "react";

import { useDropdown } from "./dropdown";

interface ItemProps {
  children: ReactNode;
}

/**
 * @author 김서영
 * 드롭다운 선택 항목에 대한 컴포넌트입니다.
 * @param children : li 안에 포함될 내용을 적습니다
 * @param styles : 너비 및 배경색 등 추가적으로 적용될 스타일을 지정해주는 프롭입니다.
 * @example  <Dropdown.Item><div className="flex gap-2"><p>Seo</p><span>Young</span></div></Dropdown.Item>
 **/
export default function Item({ children }: ItemProps) {
  const { handleSelect, handleDropdown } = useDropdown();

  const onSelect = () => {
    handleSelect(children);
    handleDropdown();
  };
  return (
    <li className="cursor-pointer" onClick={onSelect}>
      {children}
    </li>
  );
}
