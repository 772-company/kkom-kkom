import { ReactNode } from "react";

import { useDropdown } from "./dropdown";

interface BodyProps {
  children: ReactNode;
}

export default function Body({ children }: BodyProps) {
  const { isDropdownOpen } = useDropdown();

  return isDropdownOpen ? <ul>{children}</ul> : null;
}
