import Star from "@/public/icons/star.png";
import Image from "next/image";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface UserCompletion {
  userId: number;
  count: number;
  nickname: string;
}

interface TodayKkomkkomPeopleProps {
  topUsers: UserCompletion[];
}

function TodayKkomkkomPeople({ topUsers }: TodayKkomkkomPeopleProps) {
  return (
    <div className="mr-[20px] flex h-full w-[200px] flex-col items-center justify-center gap-[5px] md:mr-0 md:w-[320px]">
      <div className="mb-[20px] flex items-center justify-center gap-1">
        <Image src={Star} width={16} height={16} alt="star" />
        <p className="text-text-primary">오늘의 꼼꼼이</p>
        <Image src={Star} width={14} height={14} alt="star" />
      </div>
      {topUsers.length === 0 ? (
        <div>
          <p className="text-center">
            아직 칠칠이밖에
            <br className="md:hidden" /> 없습니다.
          </p>
          <p className="text-center">분발하세요!</p>
        </div>
      ) : (
        <ResponsiveContainer className="mr-[40px]">
          <BarChart data={topUsers}>
            <XAxis
              dataKey="nickname"
              tick={{ fill: "var(--text-secondary)", fontSize: 14 }}
            />
            <YAxis className="hidden md:block" />
            <Tooltip labelStyle={{ color: "#000000", fontSize: 14 }} />
            <Bar
              dataKey="count"
              fill="#10B981"
              barSize={20}
              animationEasing="linear"
              animationDuration={1000}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default TodayKkomkkomPeople;
