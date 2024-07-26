import { ReactNode } from "react";

import { useDropdown } from "./dropdown";

interface ItemProps {
  children: ReactNode;
}

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
