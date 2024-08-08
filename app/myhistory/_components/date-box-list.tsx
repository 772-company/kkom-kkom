import { getUserHistory } from "@/lib/apis/user";

import DateBoxCard from "./date-box-card";

export default async function DateBoxList() {
  const data = await getUserHistory();
  const history = data[0].tasksDone.reduce((acc, cur) => {
    acc.set(cur.date, [...(acc.get(cur.date) || []), cur]);
    return acc;
  }, new Map());

  return (
    <section className="mt-[27px] flex flex-col gap-10 md:mt-6">
      {[...history.entries()].map(([date, history]) => (
        <DateBoxCard key={date} date={date} tasksDone={history} />
      ))}
    </section>
  );
}
