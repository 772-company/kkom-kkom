import convertToInt from "@/utils/convert-to-int";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";

function useSelectButton() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const resultId = convertToInt(id);

  const [selectedButton, setSelectedButton] = useState<number | undefined>(
    resultId,
  );

  const handleClickName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selected = parseInt(e.currentTarget.name, 10);
    setSelectedButton(selected);
  };

  return { handleClickName, selectedButton };
}

export default useSelectButton;
