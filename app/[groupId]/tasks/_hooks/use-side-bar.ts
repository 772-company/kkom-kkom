import React, { useState } from "react";

const useSideBar = () => {
  const [isSideBarOpen, setIsSiderOpen] = useState<boolean>(false);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsSiderOpen(true);
  };
  const handleCancel = () => {
    setIsSiderOpen(false);
  };
  return { isSideBarOpen, handleClick, handleCancel };
};

export default useSideBar;
