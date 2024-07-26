import { ReactNode } from "react";

import { useDropdown } from "./dropdown";

interface DropdownButtonProps {
  children: ReactNode;
}

/**
 * @author : 김서영
 * 드롭다운에서 Select field 영역입니다.
 * Select field는 드롭다운 리스트에서 선택한 항목을 필드에 표시하는 영역입니다.
 * 클릭 시 드롭다운 리스트가 열립니다.
 * 항목을 선택하는 경우 선택한 항목이 필드에 표시됩니다.
 * @param children : 선택 항목과 관련 없는 토글 아이콘 등이 사용됩니다
 * @returns : 버튼 컴포넌트를 반환합니다.
 * @example : <Dropdown.Button>▽</Dropdown.Button>
 **/
export default function Button({ children }: DropdownButtonProps) {
  const { handleDropdown, selected } = useDropdown();

  return (
    <button onClick={handleDropdown} className="flex w-full justify-between">
      <div>{selected}</div>
      {children}
    </button>
  );
}
