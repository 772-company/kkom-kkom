import { ReactNode } from "react";

import { useDropdown } from "./dropdown";

interface DropdownButtonProps {
  children: ReactNode;
}

export default function Button({ children }: DropdownButtonProps) {
  const { handleDropdown, selected } = useDropdown();

  return (
    <button onClick={handleDropdown} className="flex w-full justify-between">
      <div>{selected}</div>
      {children}
    </button>
  );
}
