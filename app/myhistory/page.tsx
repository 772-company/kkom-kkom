import { Suspense } from "react";

import DateBoxList from "./_components/date-box-list";
import DateBoxListSkeleton from "./_components/date-box-list-skeleton";

export default function Page() {
  return (
    <>
      <h1 className="lg:mt-10 mt-6 text-lg font-bold text-text-primary md:text-xl">
        마이 히스토리
      </h1>
      <Suspense fallback={<DateBoxListSkeleton />}>
        <DateBoxList />
      </Suspense>
      <DateBoxListSkeleton />
    </>
  );
}
