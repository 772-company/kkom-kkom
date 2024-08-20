export const covertFrequency = (value: string | null) => {
  switch (value) {
    case "ONCE":
      return "한 번";

    case "DAILY":
      return "매일";

    case "WEEKLY":
      return "주 반복";

    case "MONTHLY":
      return "월 반복";

    default:
      return "반복 안함";
  }
};
