"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";
import Image from "next/image";

interface LandingCardProps {
  variant: "second" | "third";
}

const headings = {
  second: ["간단하게 멤버들을", "초대해요"],
  third: ["할 일도 간편하게", "체크해요"],
};

export default function LandingCard({ variant }: LandingCardProps) {
  const isSecond = variant === "second";

  return (
    <LazyMotion features={domAnimation}>
      <m.section
        initial={{ opacity: 0, x: isSecond ? 100 : -100 }} // 초기 상태: 왼쪽에서 시작
        whileInView={{ opacity: 1, x: 0 }} // 뷰포트에 들어오면 애니메이션 실행
        transition={{
          duration: 0.5, // 애니메이션 지속 시간 설정
          ease: "easeOut", // 이징 설정
        }}
        viewport={{ once: true, amount: 0.5 }} // 애니메이션이 한 번만 실행되도록 설정, 50%가 보이면 실행
        className={`${isSecond ? "animate-slide-in-right border border-border-primary border-opacity-10 bg-background-tertiary" : "animate-slide-in-left bg-background-secondary dark:bg-slate-950"} animate-slide-in mx-auto flex h-[467px] min-h-[467px] w-full max-w-[996px] flex-col justify-between rounded-[40px] pb-[51px] md:h-[354px] md:min-h-[354px] xl:h-[419px] xl:min-h-[419px]`}
      >
        <div className="flex justify-center md:h-full">
          <div
            className={`flex flex-col items-start justify-center gap-[40px] md:gap-[90px] ${isSecond ? "md:flex-row-reverse" : "md:flex-row"}`}
          >
            {isSecond ? (
              <Image
                alt="그룹으로 할 일을 관리해요"
                width="235"
                height="273"
                src="/images/landing-second.svg"
              />
            ) : (
              <Image
                alt="간단하게 멤버들을 초대해요"
                width="235"
                height="273"
                src="/images/landing-third.svg"
              />
            )}
            <div className="float-start flex flex-col gap-3 md:h-full md:justify-center">
              <div className="flex size-[48px] items-center justify-center rounded-xl border border-border-primary border-opacity-10 bg-background-secondary shadow-[0px_0px_12px_2px_#00000040]">
                {isSecond ? (
                  <Image
                    src="/icons/message.svg"
                    width={24}
                    height={24}
                    alt="메시지 아이콘"
                  />
                ) : (
                  <Image
                    src="/icons/landing-done.svg"
                    width={24}
                    height={24}
                    alt="완료 아이콘"
                  />
                )}
              </div>
              <h3 className="text-lg font-medium leading-[21px] text-text-primary xl:text-2xl">
                {headings[variant][0]}
                <br />
                {headings[variant][1]}
              </h3>
            </div>
          </div>
        </div>
      </m.section>
    </LazyMotion>
  );
}
