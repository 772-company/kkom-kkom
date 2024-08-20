import { useCallback, useState } from "react";

export default function useNextPage() {
  const [isNext, setIsNext] = useState(false);
  const handleNext = useCallback(() => {
    setIsNext(true);
  }, []);
  const handlePrev = useCallback(() => {
    setIsNext(false);
  }, []);
  return { handleNext, handlePrev, isNext };
}
