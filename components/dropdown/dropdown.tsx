"use client";

import useClickOutside from "@/hooks/use-click-outside";
import {
  ButtonHTMLAttributes,
  OlHTMLAttributes,
  ReactNode,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface DropdownState {
  isDropdownOpen: boolean;
  handleDropdown: () => void;
  selected: string;
  handleSelect: (value: string) => void;
}

// NOTE - 컨텍스트 생성
const DropdownContext = createContext<DropdownState | undefined>(undefined);

export function useDropdown() {
  const dropdownState = useContext(DropdownContext);

  if (!dropdownState) {
    throw new Error("드롭다운 컴포넌트 안에서 사용되어야 합니다");
  }
  return dropdownState;
}

// NOTE - Button
interface DropdownButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

function Button({ children, className, ...rest }: DropdownButtonProps) {
  const { handleDropdown, selected } = useDropdown();
  return (
    <button
      type="button"
      onClick={handleDropdown}
      className={`flex w-full items-center ${className}`}
      {...rest}
    >
      {selected}
      {children}
    </button>
  );
}

// NOTE - Body
interface BodyProps extends OlHTMLAttributes<HTMLUListElement> {
  children: ReactNode;
  className?: string;
}

function Body({ children, className, ...rest }: BodyProps) {
  const { isDropdownOpen } = useDropdown();

  return isDropdownOpen ? (
    <ul className={`absolute z-50 ${className}`} {...rest}>
      {children}
    </ul>
  ) : null;
}

// NOTE - Item
interface ItemProps extends OlHTMLAttributes<HTMLLIElement> {
  children: ReactNode;
  value: string;
}

function Item({ children, value, ...rest }: ItemProps) {
  const { handleSelect, handleDropdown } = useDropdown();

  const onSelect = () => {
    handleSelect(value);
    handleDropdown();
  };
  return (
    <li
      className="cursor-pointer"
      role="presentation"
      onClick={onSelect}
      {...rest}
    >
      {children}
    </li>
  );
}

// NOTE - CloseItem
function CloseItem({ children, ...rest }: OlHTMLAttributes<HTMLLIElement>) {
  const { handleDropdown } = useDropdown();

  const onClose = () => {
    handleDropdown();
  };

  return (
    <li
      className="cursor-pointer"
      role="presentation"
      onClick={onClose}
      {...rest}
    >
      {children}
    </li>
  );
}

interface DropdownProps {
  children: ReactNode;
  selected: string;
  setSelected: (value: string) => void;
}

/**
 * @author 김서영
 * @param children : 드롭다운과 관련된 컴포넌트들이 해당됩니다.
 * @param defaultSelected : 기본적으로 드롭다운 버튼에 보일 내용입니다.
 * @example    <Dropdown defaultSelected="항목을 선택하세요">...</Dropdown>
 */
export function Dropdown({ children, selected, setSelected }: DropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleSelect = (value: string) => setSelected(value);
  const handleDropdown = () => setIsDropdownOpen((prev) => !prev);

  // NOTE - 드롭다운이 열려있는 경우 외부 영역 클릭하면 닫히도록 하는 함수
  const dropdownRef = useClickOutside<HTMLDivElement>(() => {
    setIsDropdownOpen(false);
  });

  // NOTE - useMemo로 컨텍스트 값 메모이제이션
  const contextValue = useMemo(
    () => ({
      isDropdownOpen,
      handleDropdown,
      selected,
      handleSelect,
    }),
    [isDropdownOpen, selected],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

Dropdown.Button = Button;
Dropdown.Body = Body;
Dropdown.Item = Item;
Dropdown.CloseItem = CloseItem;
