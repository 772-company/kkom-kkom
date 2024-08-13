import { convertDateToY_M_D } from "./convert-date";

export const checkTodo = (doneAt: string | null, date: Date) => {
  if (doneAt === null) {
    return false;
  }
  const done = new Date(doneAt);
  const doneDate = convertDateToY_M_D(done);
  const todayDate = convertDateToY_M_D(date);

  if (doneDate === todayDate) {
    return true;
  }
  return false;
};
