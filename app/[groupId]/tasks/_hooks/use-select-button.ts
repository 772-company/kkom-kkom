import React, { useEffect, useState } from "react";

const useSelectButton = (list: any) => {
  const [selectedButton, setSelectedButton] = useState(list[0]["id"]);
  useEffect(() => {
    setSelectedButton(list[0]["id"]);
  }, []);

  const handleClickName = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    const selected = parseInt(e.currentTarget.name);
    setSelectedButton(selected);
  };
  return { handleClickName, selectedButton };
};

export default useSelectButton;
