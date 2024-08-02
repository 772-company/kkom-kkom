export const covertDate = (date: Date) => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  return `${month}월 ${day}일${dayNames[dayOfWeek]}요일`;
};
