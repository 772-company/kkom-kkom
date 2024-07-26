import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

import Body from "./body";
import Button from "./button";
import Item from "./item";

interface DropdownState {
  isDropdownOpen: boolean;
  handleDropdown: () => void;
  selected: ReactNode;
  handleSelect: (value: ReactNode) => void;
}

// NOTE - 컨텍스트 생성
const DropdownState = createContext<DropdownState | undefined>(undefined);

export function useDropdown() {
  const dropdownState = useContext(DropdownState);

  if (!dropdownState) {
    throw new Error("드롭다운 컴포넌트 안에서 사용되어야 합니다");
  }
  return dropdownState;
}

interface DropdownProps {
  children: ReactNode;
  defaultSelected: ReactNode;
}

/**
 * @author 김서영
 * @param children : 드롭다운과 관련된 컴포넌트들이 해당됩니다.
 * @param defaultSelected : 기본적으로 드롭다운 버튼에 보일 내용입니다.
 * @example    <Dropdown defaultSelected="항목을 선택하세요">...</Dropdown>
 **/
export function Dropdown({ children, defaultSelected }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selected, setSelected] = useState<ReactNode>(defaultSelected);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: ReactNode) => setSelected(value);
  const handleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // NOTE - 드롭다운이 열려있는 경우 외부 영역 클릭하면 닫히도록 하는 함수
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <DropdownState.Provider
      value={{
        isDropdownOpen,
        handleDropdown,
        selected,
        handleSelect,
      }}
    >
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownState.Provider>
  );
}

Dropdown.Button = Button;
Dropdown.Body = Body;
Dropdown.Item = Item;
