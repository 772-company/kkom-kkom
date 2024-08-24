"use client";

import { BasicInput } from "@/components/input-field/basic-input";
import {
  AnimatePresence,
  LazyMotion,
  domAnimation,
  m,
  useInView,
} from "framer-motion";
import { useRouter } from "next-nprogress-bar";
import Image from "next/image";
import { useRef } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface ArticleSearchBarForm {
  keyword: string;
}

export default function ArticleSearchBar() {
  const formRef = useRef<HTMLFormElement>(null);
  const isInView = useInView(formRef, { amount: "some" });
  const {
    handleSubmit,
    register,
    setValue,
    formState: { isSubmitting },
  } = useForm<{ keyword: string }>();
  const router = useRouter();
  const onSubmit: SubmitHandler<ArticleSearchBarForm> = (data) => {
    if (!isSubmitting) {
      setValue("keyword", "");
      router.push(`/boards?keyword=${data.keyword}`);
    }
  };

  return (
    <>
      <form
        className="relative"
        onSubmit={handleSubmit(onSubmit)}
        ref={formRef}
      >
        <BasicInput
          register={register}
          id="keyword"
          placeholder="검색어를 입력해주세요"
          className="h-12 border border-black border-opacity-10 pl-[48px] text-sm font-normal text-text-default md:h-14 md:pl-[52px] md:text-base"
        />
        <Image
          src="/icons/search.svg"
          alt="돋보기"
          width={24}
          height={24}
          className="absolute left-4 top-3 md:top-4"
        />
      </form>
      <AnimatePresence>
        {!isInView && (
          <LazyMotion features={domAnimation}>
            <m.section
              transition={{ type: "tween", duration: 0.3 }}
              initial={{ opacity: 0, y: -100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -100 }}
              className="fixed left-0 right-0 top-[58px] z-30 bg-background-secondary px-4 pb-2 pt-1 shadow-xl"
            >
              <form
                className="relative mx-auto w-full max-w-[1200px] rounded-xl px-4 md:px-0"
                onSubmit={handleSubmit(onSubmit)}
              >
                <BasicInput
                  register={register}
                  id="keyword"
                  placeholder="검색어를 입력해주세요"
                  className="h-12 bg-background-tertiary pl-[48px] text-sm font-normal text-text-default md:h-14 md:pl-[52px] md:text-base"
                />
                <Image
                  src="/icons/search.svg"
                  alt="돋보기"
                  width={24}
                  height={24}
                  className="absolute left-8 top-3 md:left-4 md:top-4"
                />
              </form>
            </m.section>
          </LazyMotion>
        )}
      </AnimatePresence>
    </>
  );
}
