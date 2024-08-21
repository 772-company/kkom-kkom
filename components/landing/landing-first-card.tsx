"use client";

import Folder from "@/public/icons/folder.svg";
import First from "@/public/images/landing-first.svg";
import { motion } from "framer-motion";

export default function LandingFirstCard() {
  return (
    <motion.section
      initial={{ opacity: 0, x: -100 }} // 초기 상태: 왼쪽에서 시작
      whileInView={{ opacity: 1, x: 0 }} // 뷰포트에 들어오면 애니메이션 실행
      transition={{
        duration: 0.5, // 애니메이션 지속 시간 설정
        ease: "easeOut", // 이징 설정
      }}
      viewport={{ once: true, amount: 0.5 }} // 애니메이션이 한 번만 실행되도록 설정, 50%가 보이면 실행
      className="mx-auto mt-[48px] h-[467px] w-full max-w-[996px] animate-slide-in-left rounded-[40px] bg-gradient-to-r from-brand-primary to-brand-tertiary p-[1px] shadow-[0px_0px_12px_2px_#FFFFFF40] md:mt-[119px] md:h-[354px] xl:mt-[180px] xl:h-[419px]"
    >
      <div className="flex h-full justify-center rounded-[40px] bg-background-secondary dark:bg-background-primary">
        <div className="flex flex-col justify-end gap-[40px] md:flex-row-reverse md:items-end md:gap-[100px]">
          <div className="flex flex-col gap-4 md:h-full md:justify-center">
            <div className="flex size-[48px] items-center justify-center rounded-xl border border-border-primary border-opacity-10 bg-background-secondary shadow-[0px_0px_12px_2px_#00000040]">
              <Folder width={24} height={24} />
            </div>
            <h3 className="text-lg font-medium leading-[21px] text-text-primary xl:text-2xl">
              그룹으로
              <br /> 할 일을 관리해요
            </h3>
          </div>
          <First />
        </div>
      </div>
    </motion.section>
  );
}
