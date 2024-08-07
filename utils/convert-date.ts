export const covertDate = (date: Date) => {
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = date.getDay();

  return `${month}월 ${day}일${dayNames[dayOfWeek]}요일`;
};
export const myConvertDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${month}-${day}`;
};

export const convertDateToYMD = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return { year, month, day };
};

/**
 * 지금과 날짜 차이를 계산하여 문자열로 반환
 * @author 이승현
 * @param date
 * @returns
 */
export const convertDiffDateFromNow = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffYears = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHours = diff / (1000 * 60 * 60);
  const diffMinutes = diff / (1000 * 60);
  const diffList = [diffYears, diffMonths, diffDays, diffHours, diffMinutes];

  const diffListString = ["년", "개월", "일", "시간", "분"];

  for (let i = 0; i < diffList.length; i++) {
    if (diffList[i] > 1) {
      return `${Math.floor(diffList[i])}${diffListString[i]} 전`;
    }
  }
  return "방금 전";
};

/**
 * 지금과 날짜 차이를 계산하여 문자열로 반환
 * @author 이승현
 * @param date
 * @returns
 */
export const convertDiffDateFromNow = (date: Date) => {
  const now = new Date();
  const diff = now.getTime() - date.getTime();
  const diffYears = diff / (1000 * 60 * 60 * 24 * 30 * 12);
  const diffMonths = diff / (1000 * 60 * 60 * 24 * 30);
  const diffDays = diff / (1000 * 60 * 60 * 24);
  const diffHours = diff / (1000 * 60 * 60);
  const diffMinutes = diff / (1000 * 60);
  const diffList = [diffYears, diffMonths, diffDays, diffHours, diffMinutes];

  const diffListString = ["년", "개월", "일", "시간", "분"];

  for (let i = 0; i < diffList.length; i++) {
    if (diffList[i] > 1) {
      return `약 ${Math.floor(diffList[i])}${diffListString[i]} 전`;
    }
  }
  return "방금 전";
};
