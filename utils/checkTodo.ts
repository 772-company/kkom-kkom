import { myConvertDateToYMD } from "./convert-date";

export const checkTodo = (doneAt: string | null, date: Date) => {
  if (doneAt === null) {
    return false;
  }
  const done = new Date(doneAt);
  const doneDate = myConvertDateToYMD(done);
  const todayDate = myConvertDateToYMD(date);
  console.log(doneDate, todayDate);

  if (doneDate === todayDate) {
    return true;
  }
  return false;
};
