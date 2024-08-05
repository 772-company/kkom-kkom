import { getUserHistory } from "@/lib/apis/user";
import { getCookies } from "cookies-next";
import { cookies } from "next/headers";

import { myHistoryMockData } from "../mock";
import DateBoxCard from "./date-box-card";

export default async function DateBoxList() {
  // const cookie = getCookies({ cookies });
  // const data = await getUserHistory(cookie.accessToken);
  // const data = myHistoryMockData[0].tasksDone;
  const data = myHistoryMockData;
  return (
    <section className="mt-[27px] flex flex-col gap-10 md:mt-6">
      {data.map((TaskDone) => (
        <DateBoxCard
          key={TaskDone.tasksDone[0].date}
          date={TaskDone.tasksDone[0].date}
          tasksDone={TaskDone.tasksDone}
        />
      ))}
    </section>
  );
}
