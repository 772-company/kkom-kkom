import React, { useState } from "react";

const useCalendarStatus = () => {
  const [isOpen, setIsopen] = useState<boolean>(false);
  return { isOpen, setIsopen };
};

export default useCalendarStatus;
