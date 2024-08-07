import Done from "@/public/images/done.png";
import Todo from "@/public/images/todo.png";
import Image from "next/image";

interface TodayTaskSummaryProps {
  type: "TODO" | "DONE";
  number: number;
}

const TodayTaskSummary = ({ type, number }: TodayTaskSummaryProps) => {
  return (
    <div className="flex h-[76.5px] w-[142px] items-center justify-between rounded-[12px] bg-background-tertiary p-[16px] md:w-[280px] xl:w-[400px]">
      <div className="flex flex-col justify-center">
        <p className="text-[12px] font-[500] text-text-secondary">
          {type === "TODO" ? "오늘의 할 일" : "오늘의 한 일"}
        </p>
        <p className="text-[24px] font-[700] text-brand-tertiary">{number}개</p>
      </div>
      {type === "TODO" ? (
        <Image src={Todo} alt="할 일 아이콘" height={40} width={40} />
      ) : (
        <Image src={Done} alt="완료한 일 아이콘" height={40} width={40} />
      )}
    </div>
  );
};

export default TodayTaskSummary;
