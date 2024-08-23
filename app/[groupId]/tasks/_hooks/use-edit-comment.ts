import { getUser } from "@/lib/apis/user";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";

const useEditComment = () => {
  const { data } = useQuery({ queryKey: ["getUser"], queryFn: getUser });
  const [isEidtMode, setIsEditMode] = useState<boolean>(false);
  const handleCancelEditMode = () => {
    setIsEditMode(false);
  };
  const handleClickEditMode = () => {
    setIsEditMode(true);
  };

  const userData = data;
  return { userData, handleCancelEditMode, handleClickEditMode, isEidtMode };
};

export default useEditComment;
